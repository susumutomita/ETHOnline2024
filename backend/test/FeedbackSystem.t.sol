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

    // フィードバックフォーム作成テスト
    function test_CreateFeedbackForm() public {
        // 配列を初期化
        string[] memory questions = new string[](3);
        questions[0] = "How is the product?";
        questions[1] = "Was the price appropriate?";
        questions[2] = "Would you recommend this product?";

        feedbackSystem.createFeedbackForm("Product A", "Category 1", questions);

        (string memory productName, string memory category, uint256 totalFeedbackScore, uint256 feedbackCount) =
            feedbackSystem.feedbackForms(1);

        assertEq(productName, "Product A");
        assertEq(category, "Category 1");
        assertEq(totalFeedbackScore, 0);
        assertEq(feedbackCount, 0);

        // 質問が正しく保存されているか確認
        FeedbackSystem.Question[] memory formQuestions = feedbackSystem.getQuestions(1);
        assertEq(formQuestions.length, 3);
        assertEq(formQuestions[0].text, "How is the product?");
        assertEq(formQuestions[1].text, "Was the price appropriate?");
        assertEq(formQuestions[2].text, "Would you recommend this product?");
    }

    // フィードバック送信テスト
    function test_SubmitFeedback() public {
        // 配列を初期化
        string[] memory questions = new string[](3);
        questions[0] = "How is the product?";
        questions[1] = "Was the price appropriate?";
        questions[2] = "Would you recommend this product?";

        feedbackSystem.createFeedbackForm("Product B", "Category 2", questions);

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

    // スコアの境界値テスト（範囲外のスコアを送信）
    function test_ScoreOutOfBounds() public {
        // 配列を初期化
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

    // 存在しないフィードバックフォームに対するエラー処理テスト
    function test_SubmitFeedbackToNonExistentForm() public {
        vm.prank(user1);
        vm.expectRevert("Feedback form does not exist");
        feedbackSystem.submitFeedback(999, 3, "This form does not exist!");
    }

    // フォームID取得テスト
    function test_GetFormIds() public {
        string[] memory questions = new string[](2);
        questions[0] = "Is the product durable?";
        questions[1] = "Would you buy this again?";

        feedbackSystem.createFeedbackForm("Product X", "Category X", questions);
        feedbackSystem.createFeedbackForm("Product Y", "Category Y", questions);

        // 2つのフィードバックフォームが作成されているか確認
        uint256 formIdCounter = feedbackSystem.getFeedbackIdCounter();
        assertEq(formIdCounter, 2);
    }
    // 平均スコアの計算テスト

    function test_GetAverageScore() public {
        // 配列を初期化
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
        assertEq(averageScore, 4); // (3 + 5) / 2 = 4
    }

    // トークン送信テスト
    function test_SendToken() public {
        uint256 initialBalance = feedbackSystem.balanceOf(user1);
        uint256 amount = 100;

        feedbackSystem.sendToken(user1, amount);

        uint256 newBalance = feedbackSystem.balanceOf(user1);
        assertEq(newBalance, initialBalance + amount);
    }
}
