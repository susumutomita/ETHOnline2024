// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/FeedbackSystem.sol";

contract FeedbackSystemTest is Test {
    FeedbackSystem public feedbackSystem;
    address public user1 = address(0x1);
    address public user2 = address(0x2);
    address public owner = address(this);

    function setUp() public {
        feedbackSystem = new FeedbackSystem();
    }

    function test_CreateFeedbackForm() public {
        string[] memory questions = new string[](3);
        questions[0] = "How is the product?";
        questions[1] = "Was the price appropriate?";
        questions[2] = "Would you recommend this product?";

        feedbackSystem.createFeedbackForm("Product A", "Category 1", questions);

        (
            string memory productName,
            string memory category,
            uint256 totalFeedbackScore,
            uint256 feedbackCount
        ) = feedbackSystem.feedbackForms(1);

        assertEq(productName, "Product A");
        assertEq(category, "Category 1");
        assertEq(totalFeedbackScore, 0);
        assertEq(feedbackCount, 0);

        FeedbackSystem.Question[] memory formQuestions = feedbackSystem
            .getQuestions(1);
        assertEq(formQuestions.length, 3);
        assertEq(formQuestions[0].text, "How is the product?");
        assertEq(formQuestions[1].text, "Was the price appropriate?");
        assertEq(formQuestions[2].text, "Would you recommend this product?");
    }

    function test_SubmitFeedback() public {
        string[] memory questions = new string[](3);
        questions[0] = "How is the product?";
        questions[1] = "Was the price appropriate?";
        questions[2] = "Would you recommend this product?";

        feedbackSystem.createFeedbackForm("Product B", "Category 2", questions);

        vm.prank(user1);
        feedbackSystem.submitFeedback(1, 4, "Good product!");

        (, , uint256 totalFeedbackScore, uint256 feedbackCount) = feedbackSystem
            .feedbackForms(1);

        assertEq(totalFeedbackScore, 4);
        assertEq(feedbackCount, 1);

        FeedbackSystem.Feedback[] memory feedbacks = feedbackSystem
            .getFeedbacks(1);
        assertEq(feedbacks.length, 1);
        assertEq(feedbacks[0].score, 4);
        assertEq(
            keccak256(bytes(feedbacks[0].comment)),
            keccak256(bytes("Good product!"))
        );
    }

    function test_SubmitFeedbackBatch() public {
        string[] memory questions = new string[](3);
        questions[0] = "How is the product?";
        questions[1] = "Was the price appropriate?";
        questions[2] = "Would you recommend this product?";

        feedbackSystem.createFeedbackForm("Product D", "Category 4", questions);

        // スコアとコメントの配列定義を修正
        uint256[] memory scores = new uint256[](3);
        scores[0] = 4;
        scores[1] = 5;
        scores[2] = 3;

        string[] memory comments = new string[](3);
        comments[0] = "Good value!";
        comments[1] = "Excellent quality!";
        comments[2] = "Nice product!";

        vm.prank(user1);
        feedbackSystem.submitFeedbackBatch(1, scores, comments);

        (, , uint256 totalFeedbackScore, uint256 feedbackCount) = feedbackSystem
            .feedbackForms(1);

        assertEq(totalFeedbackScore, 12); // (4 + 5 + 3)
        assertEq(feedbackCount, 3);

        FeedbackSystem.Feedback[] memory feedbacks = feedbackSystem
            .getFeedbacks(1);
        assertEq(feedbacks.length, 3);
        assertEq(feedbacks[0].score, 4);
        assertEq(feedbacks[1].score, 5);
        assertEq(feedbacks[2].score, 3);
    }

    function test_ScoreOutOfBounds() public {
        string[] memory questions = new string[](3);
        questions[0] = "How is the product?";
        questions[1] = "Was the price appropriate?";
        questions[2] = "Would you recommend this product?";

        feedbackSystem.createFeedbackForm("Product C", "Category 3", questions);

        vm.prank(user1);
        vm.expectRevert("Score must be between 1 and 5");
        feedbackSystem.submitFeedback(1, 6, "Too high score!");

        vm.prank(user1);
        vm.expectRevert("Score must be between 1 and 5");
        feedbackSystem.submitFeedback(1, 0, "Too low score!");
    }

    function test_SubmitFeedbackToNonExistentForm() public {
        vm.prank(user1);
        vm.expectRevert("Feedback form does not exist");
        feedbackSystem.submitFeedback(999, 3, "This form does not exist!");
    }

    function test_GetFormIds() public {
        string[] memory questions = new string[](2);
        questions[0] = "Is the product durable?";
        questions[1] = "Would you buy this again?";

        feedbackSystem.createFeedbackForm("Product X", "Category X", questions);
        feedbackSystem.createFeedbackForm("Product Y", "Category Y", questions);

        uint256 formIdCounter = feedbackSystem.getFeedbackIdCounter();
        assertEq(formIdCounter, 2);
    }

    function test_GetAverageScore() public {
        string[] memory questions = new string[](3);
        questions[0] = "How is the product?";
        questions[1] = "Was the price appropriate?";
        questions[2] = "Would you recommend this product?";

        feedbackSystem.createFeedbackForm("Product C", "Category 3", questions);

        vm.prank(user1);
        feedbackSystem.submitFeedback(1, 3, "Average product.");

        vm.prank(user2);
        feedbackSystem.submitFeedback(1, 5, "Excellent product!");

        uint256 averageScore = feedbackSystem.getAverageScore(1);
        assertEq(averageScore, 4);
    }

    function test_SendToken() public {
        uint256 initialBalance = feedbackSystem.balanceOf(user1);
        uint256 amount = 100;

        feedbackSystem.sendToken(user1, amount);

        uint256 newBalance = feedbackSystem.balanceOf(user1);
        assertEq(newBalance, initialBalance + amount);
    }
}
