// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/FeedbackSystem.sol";

contract FeedbackSystemTest is Test {
    FeedbackSystem public feedbackSystem;
    address public user1 = address(0x1);
    address public user2 = address(0x2);

    function setUp() public {
        feedbackSystem = new FeedbackSystem(); // 新しいFeedbackSystemコントラクトをデプロイ
    }

    function test_CreateFeedbackForm() public {
        feedbackSystem.createFeedbackForm("Product A", "Category 1");

        (string memory productName, string memory category, uint256 totalFeedbackScore, uint256 feedbackCount) =
            feedbackSystem.feedbackForms(1);

        assertEq(productName, "Product A");
        assertEq(category, "Category 1");
        assertEq(totalFeedbackScore, 0);
        assertEq(feedbackCount, 0);
    }

    function test_SubmitFeedback() public {
        feedbackSystem.createFeedbackForm("Product B", "Category 2");

        vm.prank(user1);
        feedbackSystem.submitFeedback(1, 4, "Good product!");

        (,, uint256 totalFeedbackScore, uint256 feedbackCount) = feedbackSystem.feedbackForms(1);

        assertEq(totalFeedbackScore, 4);
        assertEq(feedbackCount, 1);

        FeedbackSystem.Feedback[] memory feedbacks = feedbackSystem.getFeedbacks(1);
        assertEq(feedbacks.length, 1);
        assertEq(feedbacks[0].score, 4);
        assertEq(keccak256(bytes(feedbacks[0].comment)), keccak256(bytes("Good product!")));
    }

    function test_GetAverageScore() public {
        feedbackSystem.createFeedbackForm("Product C", "Category 3");

        vm.prank(user1);
        feedbackSystem.submitFeedback(1, 3, "Average product.");

        vm.prank(user2);
        feedbackSystem.submitFeedback(1, 5, "Excellent product!");

        uint256 averageScore = feedbackSystem.getAverageScore(1);
        assertEq(averageScore, 4); // (3 + 5) / 2 = 4
    }

    function test_SendToken() public {
        uint256 initialBalance = feedbackSystem.balanceOf(user1);
        uint256 amount = 100;

        feedbackSystem.sendToken(user1, amount);

        uint256 newBalance = feedbackSystem.balanceOf(user1);
        assertEq(newBalance, initialBalance + amount);
    }
}
