// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {FeedbackSystem} from "../src/FeedbackSystem.sol";

contract FeedbackSystemScript is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();
        FeedbackSystem feedbackSystem = new FeedbackSystem();
        console.log("FeedbackSystem deployed at:", address(feedbackSystem));
        vm.stopBroadcast();
    }
}
