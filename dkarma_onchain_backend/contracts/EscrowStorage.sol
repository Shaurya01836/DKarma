// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./ValidatorRegistry.sol";

abstract contract EscrowStorage {
    // ---------- Enums ----------
    enum TaskStatus {
        Open,
        Assigned,
        Submitted,
        Approved,
        Completed,
        Cancelled,
        Disputed
    }

    // ---------- Structs ----------
    struct Task {
        address client;
        address freelancer;
        uint256 amount;
        uint256 createdAt;
        uint256 deadline;
        TaskStatus status;
        uint256 lastActionAt;
        bool disputed;
    }

    struct Milestone {
        string deliverableUri;
        bool submitted;
        bool approved;
        uint256 submittedAt;
    }

    struct Dispute {
        address raisedBy;
        bool resolved;
        address[] voters;
        mapping(address => bool) voted;
        uint256 freelancerVotes;
        uint256 clientVotes;
        bool fallbackApplied;
    }

    // ---------- State Variables ----------
    uint256 public taskCounter;

    mapping(uint256 => Task) public tasks;
    mapping(uint256 => Milestone[]) public milestones;
    mapping(uint256 => Dispute) public disputes;
    mapping(uint256 => address[]) public disputeJudges;

    address public dao;
    uint256 public fallbackPercent;
    uint256 public judgePercent;

    uint256 public platformFeeBalance;

    ValidatorRegistry public validatorRegistry;

    // Optional: tracking helper mappings (add if needed)
    // mapping(uint256 => uint256) public taskFees;
    // mapping(uint256 => uint256) public taskToDisputeId;

    // ---------- Upgradeable Storage Gap ----------
    uint256[50] private __gap; // Reserve slots for future state variables
}
