// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./EscrowStorage.sol";

abstract contract EscrowLogic is EscrowStorage {
    // Declare events locally so emit works
    event TaskAssigned(uint256 indexed taskId, address freelancer);
    event MilestoneSubmitted(uint256 indexed taskId, string uri);
    event MilestoneApproved(uint256 indexed taskId, uint256 milestoneIndex);
    event MilestoneRejected(uint256 indexed taskId, uint256 milestoneIndex);
    event TaskCompleted(uint256 indexed taskId);
    event TaskCancelled(uint256 indexed taskId);
    event FallbackClaimed(uint256 indexed taskId);
    event FundsReleased(uint256 indexed taskId, uint256 amount);
    event ValidatorRewardClaimed(uint256 indexed taskId, address validator);
    event DisputeVoted(uint256 indexed taskId, address voter, bool votedForFreelancer);
    event DisputeFinalized(uint256 indexed taskId, string outcome);
    event DAOChanged(address indexed oldDao, address indexed newDao);

    // ---------------------- 1. TASK & MILESTONE FLOW ----------------------

    function _assignTask(uint256 taskId, address freelancer) internal {
        Task storage task = tasks[taskId];
        task.freelancer = freelancer;
        task.status = TaskStatus.Assigned;
        task.lastActionAt = block.timestamp;

        emit TaskAssigned(taskId, freelancer);
    }

    function _submitMilestone(uint256 taskId, string calldata uri) internal {
        milestones[taskId].push(Milestone({
            deliverableUri: uri,
            submitted: true,
            approved: false,
            submittedAt: block.timestamp
        }));

        tasks[taskId].status = TaskStatus.Submitted;
        tasks[taskId].lastActionAt = block.timestamp;

        emit MilestoneSubmitted(taskId, uri);
    }

    function _approveMilestone(uint256 taskId) internal {
        uint256 index = milestones[taskId].length - 1;
        milestones[taskId][index].approved = true;
        tasks[taskId].status = TaskStatus.Approved;

        _releaseFunds(taskId, index);

        if (_areAllMilestonesApproved(taskId)) {
            _finalizeTask(taskId);
        }

        tasks[taskId].lastActionAt = block.timestamp;

        emit MilestoneApproved(taskId, index);
    }

    function _rejectMilestone(uint256 taskId) internal {
        tasks[taskId].status = TaskStatus.Disputed;
        tasks[taskId].disputed = true;
        tasks[taskId].lastActionAt = block.timestamp;

        emit MilestoneRejected(taskId, milestones[taskId].length - 1);
    }

    function _finalizeTask(uint256 taskId) internal {
        tasks[taskId].status = TaskStatus.Completed;
        tasks[taskId].lastActionAt = block.timestamp;

        emit TaskCompleted(taskId);
    }

    // ---------------------- 2. PAYMENT & ESCROW LOGIC ----------------------

    function _releaseFunds(uint256 taskId, uint256 milestoneIndex) internal {
        Task storage task = tasks[taskId];
        Milestone storage ms = milestones[taskId][milestoneIndex];

        require(ms.submitted && ms.approved, "Milestone not approved");

        uint256 milestoneAmount = task.amount / milestones[taskId].length;
        _transferEscrow(payable(task.freelancer), milestoneAmount);

        emit FundsReleased(taskId, milestoneAmount);
    }

    function _refundClient(uint256 taskId) internal {
        _transferEscrow(payable(tasks[taskId].client), tasks[taskId].amount);
        tasks[taskId].status = TaskStatus.Cancelled;

        emit TaskCancelled(taskId);
    }

    function _applyFallback(uint256 taskId) internal {
        Task storage task = tasks[taskId];
        uint256 freelancerAmount = (task.amount * fallbackPercent) / 100;
        uint256 clientAmount = task.amount - freelancerAmount;

        _transferEscrow(payable(task.freelancer), freelancerAmount);
        _transferEscrow(payable(task.client), clientAmount);

        disputes[taskId].fallbackApplied = true;
        disputes[taskId].resolved = true;
        tasks[taskId].status = TaskStatus.Completed;

        emit FallbackClaimed(taskId);
    }
function _payJudges(uint256 taskId, uint256 totalReward) internal {
    address[] memory judges = disputeJudges[taskId];
    require(judges.length > 0, "No judges assigned");
    uint256 share = totalReward / judges.length;

    for (uint256 i = 0; i < judges.length; i++) {
        _transferEscrow(payable(judges[i]), share);
        emit ValidatorRewardClaimed(taskId, judges[i]);
    }

    platformFeeBalance -= totalReward;
}

    function _withdrawFallback(uint256 taskId, address caller) internal view {
        require(disputes[taskId].fallbackApplied, "Fallback not triggered");
        require(tasks[taskId].freelancer == caller, "Only freelancer");

        // Funds already released in _applyFallback
    }

    function _splitAndDistribute(
        uint256 taskId,
        uint256 amount,
        address toFreelancer,
        address[] memory judges
    ) internal {
        require(judges.length > 0, "No judges");
        uint256 validatorReward = (tasks[taskId].amount * judgePercent) / 100;
        require(platformFeeBalance >= validatorReward, "Insufficient platform fees");

        uint256 perJudge = validatorReward / judges.length;
        for (uint256 i = 0; i < judges.length; i++) {
            _transferEscrow(payable(judges[i]), perJudge);
            emit ValidatorRewardClaimed(taskId, judges[i]);
        }

        platformFeeBalance -= validatorReward;
        _transferEscrow(payable(toFreelancer), amount);

        emit FundsReleased(taskId, amount);
    }

    function _transferEscrow(address payable to, uint256 amount) internal {
        require(to != address(0), "Invalid address");
        (bool sent, ) = to.call{value: amount}("");
        require(sent, "Transfer failed");
    }

    // ---------------------- 3. DISPUTE RESOLUTION ----------------------

    function _assignJudges(uint256 taskId, address[] memory validators) internal {
        disputeJudges[taskId] = validators;
    }

    function _voteDispute(uint256 taskId, address voter, bool voteForFreelancer) internal {
        Dispute storage dispute = disputes[taskId];
        require(!dispute.voted[voter], "Already voted");

        dispute.voted[voter] = true;
        dispute.voters.push(voter);

        if (voteForFreelancer) {
            dispute.freelancerVotes++;
        } else {
            dispute.clientVotes++;
        }

        emit DisputeVoted(taskId, voter, voteForFreelancer);
    }

    function _tallyVotes(uint256 taskId) internal view returns (string memory outcome) {
        Dispute storage dispute = disputes[taskId];
        if (dispute.freelancerVotes > dispute.clientVotes) {
            return "FreelancerWins";
        } else if (dispute.clientVotes > dispute.freelancerVotes) {
            return "ClientWins";
        } else {
            return "Fallback";
        }
    }

    function _finalizeDispute(uint256 taskId) internal {
        string memory result = _tallyVotes(taskId);

        if (keccak256(bytes(result)) == keccak256("FreelancerWins")) {
            _releaseFunds(taskId, milestones[taskId].length - 1);
        } else if (keccak256(bytes(result)) == keccak256("ClientWins")) {
            _refundClient(taskId);
        } else {
            _applyFallback(taskId);
        }

        disputes[taskId].resolved = true;
        tasks[taskId].status = TaskStatus.Completed;

        emit DisputeFinalized(taskId, result);
    }

    // ---------------------- 4. DAO CONFIGURATION ----------------------

    function _setFallbackPercent(uint256 percent) internal {
        fallbackPercent = percent;
    }

    function _setJudgePercent(uint256 percent) internal {
        judgePercent = percent;
    }

    function _updateDAO(address newDao) internal {
        address oldDao = dao;
        dao = newDao;

        emit DAOChanged(oldDao, newDao);
    }

    // ---------------------- 5. TIMEOUTS & SAFETY ----------------------

    function _checkSubmissionTimeout(uint256 taskId) internal view returns (bool) {
        return block.timestamp > tasks[taskId].deadline;
    }

    function _checkApprovalTimeout(uint256 taskId, uint256 gracePeriod) internal view returns (bool) {
        return block.timestamp > tasks[taskId].lastActionAt + gracePeriod;
    }

    function _checkAssignmentTimeout(uint256 taskId, uint256 limit) internal view returns (bool) {
        return block.timestamp > tasks[taskId].createdAt + limit;
    }

    function _triggerTimeoutCheck(uint256 /*taskId*/) internal pure returns (string memory) {
        return "TimeoutChecked";
    }

    // ---------------------- 6. UTILITIES & VALIDATION ----------------------

    function _updateLastAction(uint256 taskId) internal {
        tasks[taskId].lastActionAt = block.timestamp;
    }

    function _getValidatorList(uint256 taskId) internal view returns (address[] memory) {
        return disputeJudges[taskId];
    }

    function _isValidator(address who, address[] memory judgeList) internal pure returns (bool) {
        for (uint256 i = 0; i < judgeList.length; i++) {
            if (judgeList[i] == who) return true;
        }
        return false;
    }

    function _isMilestoneComplete(uint256 taskId, uint256 index) internal view returns (bool) {
        Milestone memory m = milestones[taskId][index];
        return m.submitted && m.approved;
    }

    function _areAllMilestonesApproved(uint256 taskId) internal view returns (bool) {
        Milestone[] memory all = milestones[taskId];
        for (uint256 i = 0; i < all.length; i++) {
            if (!all[i].approved) return false;
        }
        return true;
    }
}
