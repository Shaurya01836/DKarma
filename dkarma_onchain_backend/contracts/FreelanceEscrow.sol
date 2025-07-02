// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "./EscrowLogic.sol";
import "./ValidatorRegistry.sol";

/// @title FreelanceEscrow (Upgradeable)
/// @notice Main entrypoint for clients, freelancers, and validators
contract FreelanceEscrow is Initializable, AccessControlUpgradeable, EscrowLogic {
    /// @notice External validator registry reference
    ValidatorRegistry public validatorRegistry;


    /// @notice Emitted when DAO address changes
    event DAOChanged(address indexed oldDao, address indexed newDao);

    /// @notice Emitted when a new task is created
    event TaskCreated(uint256 indexed taskId, address indexed client, uint256 amount);

    /// @notice Emitted on all major task events
    event MilestoneSubmitted(uint256 indexed taskId, string uri);
    event MilestoneApproved(uint256 indexed taskId);
    event MilestoneRejected(uint256 indexed taskId, uint256 milestoneId);
    event TaskCancelled(uint256 indexed taskId);
    event DisputeRaised(uint256 indexed taskId, address by);
    event DisputeVoted(uint256 indexed taskId, address validator, bool votedForFreelancer);
    event DisputeFinalized(uint256 indexed taskId, string outcome);
    event FallbackClaimed(uint256 indexed taskId);
    event FundsReleased(uint256 indexed taskId, uint256 amount);
    event ValidatorRewardClaimed(uint256 indexed taskId, address validator);
    event TaskTimeoutTriggered(uint256 indexed taskId, string reason);
    /// @notice Initializer (replaces constructor for upgradeable contracts)
    function initialize(address _dao, address _validatorRegistry) public initializer {
        _grantRole(DEFAULT_ADMIN_ROLE, _dao);
        dao = _dao;
        fallbackPercent = 30;
        judgePercent = 10;
        validatorRegistry = ValidatorRegistry(_validatorRegistry);
        emit DAOChanged(address(0), _dao);
    }



    function createTask(uint256 amount, uint256 deadline) external payable {
        require(msg.value == amount, "Escrow must match amount");

        uint256 taskId = ++taskCounter;
        tasks[taskId] = Task({
            client: msg.sender,
            freelancer: address(0),
            amount: amount,
            createdAt: block.timestamp,
            deadline: deadline,
            status: TaskStatus.Open,
            lastActionAt: block.timestamp,
            disputed: false
        });

        emit TaskCreated(taskId, msg.sender, amount);
    }

    function approveMilestone(uint256 taskId) external {
        require(tasks[taskId].client == msg.sender, "Only client can approve");
        _approveMilestone(taskId);
        emit MilestoneApproved(taskId);
    }

    function cancelTask(uint256 taskId) external {
        require(tasks[taskId].client == msg.sender, "Only client");
        require(tasks[taskId].status == TaskStatus.Open, "Not cancellable");
        _refundClient(taskId);
        tasks[taskId].status = TaskStatus.Cancelled;
        emit TaskCancelled(taskId);
    }

    function triggerTimeoutCheck(uint256 taskId) external {
        // Implement your timeout check logic here and set the reason accordingly
        string memory reason = "Timeout check not implemented";
        emit TaskTimeoutTriggered(taskId, reason);
    }

    // ---------------------- FREELANCER FUNCTIONS ----------------------

    function acceptTask(uint256 taskId) external {
        require(tasks[taskId].status == TaskStatus.Open, "Not open");
        _assignTask(taskId, msg.sender);
    }

    function submitMilestone(uint256 taskId, string calldata uri) external {
        require(tasks[taskId].freelancer == msg.sender, "Not freelancer");
        _submitMilestone(taskId, uri);
        emit MilestoneSubmitted(taskId, uri);
    }

    function withdrawFallback(uint256 taskId) external {
        require(tasks[taskId].freelancer == msg.sender, "Only freelancer");
        _withdrawFallback(taskId, msg.sender);
        emit FallbackClaimed(taskId);
    }

    // ---------------------- SHARED ----------------------

    function raiseDispute(uint256 taskId) external {
        require(
            msg.sender == tasks[taskId].freelancer || msg.sender == tasks[taskId].client,
            "Unauthorized"
        );
        tasks[taskId].status = TaskStatus.Disputed;
        tasks[taskId].disputed = true;
        disputes[taskId].raisedBy = msg.sender;
        emit DisputeRaised(taskId, msg.sender);
    }

    // ---------------------- VALIDATOR FUNCTIONS ----------------------

    function voteDispute(uint256 taskId, bool voteForFreelancer) external {
        require(validatorRegistry.isValidator(msg.sender), "Not a validator");
        _voteDispute(taskId, msg.sender, voteForFreelancer);
        emit DisputeVoted(taskId, msg.sender, voteForFreelancer);
    }

    function finalizeDispute(uint256 taskId) external {
        string memory result = _tallyVotes(taskId);
        _finalizeDispute(taskId);
        emit DisputeFinalized(taskId, result);
    }

    function claimValidatorReward(uint256 taskId) external {
        require(validatorRegistry.isValidator(msg.sender), "Not a validator");
        _payJudges(taskId, (tasks[taskId].amount * judgePercent) / 100);
        emit ValidatorRewardClaimed(taskId, msg.sender);
    }

    // ---------------------- ADMIN FUNCTIONS ----------------------

    function setFallbackPercent(uint256 percent) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _setFallbackPercent(percent);
    }

    function setJudgePercent(uint256 percent) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _setJudgePercent(percent);
    }

    function changeDAO(address newDao) external onlyRole(DEFAULT_ADMIN_ROLE) {
        emit DAOChanged(dao, newDao);
        dao = newDao;
        _grantRole(DEFAULT_ADMIN_ROLE, newDao);
        _revokeRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function addValidator(address validator) external onlyRole(DEFAULT_ADMIN_ROLE) {
        validatorRegistry.addValidator(validator);
    }

    function removeValidator(address validator) external onlyRole(DEFAULT_ADMIN_ROLE) {
        validatorRegistry.removeValidator(validator);
    }
}