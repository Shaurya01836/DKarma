// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

/// @title ValidatorRegistry
/// @notice Manages and tracks dispute validators using AccessControl
contract ValidatorRegistry is AccessControl {
    bytes32 public constant VALIDATOR_ROLE = keccak256("VALIDATOR_ROLE");

    /// @notice List of validator addresses (for off-chain indexing or random selection)
    address[] public validatorList;

    /// @dev Tracks if an address is already in validatorList
    mapping(address => bool) public isListed;

    /// @param dao The DAO address that will receive DEFAULT_ADMIN_ROLE (0x00)
    constructor(address dao) {
        _grantRole(DEFAULT_ADMIN_ROLE, dao); // ✅ Use _grantRole instead of _setupRole
    }

    function addValidator(address account) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(!hasRole(VALIDATOR_ROLE, account), "Already a validator");
        grantRole(VALIDATOR_ROLE, account);

        if (!isListed[account]) {
            validatorList.push(account);
            isListed[account] = true;
        }
    }

    function removeValidator(address account) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(hasRole(VALIDATOR_ROLE, account), "Not a validator");
        revokeRole(VALIDATOR_ROLE, account);
    }

    function isValidator(address account) external view returns (bool) {
        return hasRole(VALIDATOR_ROLE, account);
    }

    function getAllValidators() external view returns (address[] memory) {
        return validatorList;
    }
}
