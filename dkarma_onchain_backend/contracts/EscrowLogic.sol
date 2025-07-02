// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./EscrowStorage.sol";

abstract contract EscrowLogic is EscrowStorage {
    // ---------------------- 1. TASK & MILESTONE FLOW ----------------------

    function _assignTask(uint256 taskId, address freelancer) internal {
        Task storage task = tasks[taskId];
        task.freelancer = freelancer;
        task.status = TaskStatus.Assigned;
        task.lastActionAt = block.timestamp;
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
    }

    function _approveMilestone(uint256 taskId) internal {
        uint256 index = milestones[taskId].length - 1;
        milestones[taskId][index].approved = true;
        tasks[taskId].status = TaskStatus.Approved;
        _releaseFunds(taskId, index);

        // Check if all milestones are done
        if (_areAllMilestonesApproved(taskId)) {
            _finalizeTask(taskId);
        }

        tasks[taskId].lastActionAt = block.timestamp;
    }

    function _rejectMilestone(uint256 taskId) internal {
        tasks[taskId].status = TaskStatus.Disputed;
        tasks[taskId].disputed = true;
        tasks[taskId].lastActionAt = block.timestamp;
    }

    function _finalizeTask(uint256 taskId) internal {
        tasks[taskId].status = TaskStatus.Completed;
        tasks[taskId].lastActionAt = block.timestamp;
    }

    // ---------------------- 2. PAYMENT & ESCROW LOGIC ----------------------

    function _releaseFunds(uint256 taskId, uint256 ) internal virtual {
        
        payable(tasks[taskId].freelancer).transfer(tasks[taskId].amount);
    }

    function _refundClient(uint256 taskId) internal {
        payable(tasks[taskId].client).transfer(tasks[taskId].amount);
    }

    function _applyFallback(uint256 taskId) internal {
        Task storage task = tasks[taskId];
        uint256 freelancerAmount = (task.amount * fallbackPercent) / 100;
        uint256 clientAmount = task.amount - freelancerAmount;

        payable(task.freelancer).transfer(freelancerAmount);
        payable(task.client).transfer(clientAmount);

        disputes[taskId].fallbackApplied = true;
    }

    function _withdrawFallback(uint256 taskId, address caller) internal {
        require(tasks[taskId].freelancer == caller, "Not freelancer");
        require(disputes[taskId].resolved == false, "Already resolved");

        _applyFallback(taskId);
    }

    function _splitAndDistribute(address payable recipient, uint256 amount) internal {
        uint256 judgeCut = (amount * judgePercent) / 100;
        uint256 daoCut = amount - judgeCut;
        payable(recipient).transfer(daoCut);
        // Validators paid separately via _payJudges
    }

    function _transferEscrow(address payable to, uint256 amount) internal {
        to.transfer(amount);
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
    }

    function _payJudges(uint256 taskId, uint256 totalReward) internal {
        address[] memory judges = disputeJudges[taskId];
        uint256 share = totalReward / judges.length;
        for (uint256 i = 0; i < judges.length; i++) {
            payable(judges[i]).transfer(share);
        }
    }

    function _storeVerdict(uint256 taskId, string memory result) internal {
        // store verdict off-chain or emit from FreelanceEscrow
    }

    // ---------------------- 4. DAO CONFIGURATION ----------------------

    function _setFallbackPercent(uint256 percent) internal {
        fallbackPercent = percent;
    }

    function _setJudgePercent(uint256 percent) internal {
        judgePercent = percent;
    }

    function _updateDAO(address newDao) internal {
        dao = newDao;
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

 function _triggerTimeoutCheck(uint256 /* taskId */) internal pure returns (string memory) {
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
