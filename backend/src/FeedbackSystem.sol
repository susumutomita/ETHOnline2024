// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FeedbackSystem is ERC20, Ownable {
    uint256 private feedbackIdCounter;

    struct Feedback {
        uint256 id;
        address customer;
        uint256 score;
        string comment;
        string attestationId; // 追加: アテステーションIDを保存
    }

    struct FeedbackForm {
        string productName;
        string category;
        uint256 totalFeedbackScore;
        uint256 feedbackCount;
    }

    struct Question {
        uint256 id;
        string text;
    }

    mapping(uint256 => FeedbackForm) public feedbackForms;
    mapping(uint256 => Feedback[]) public feedbacks;
    mapping(uint256 => Question[]) public questions;
    uint256[] public formIds;

    event FeedbackFormCreated(uint256 indexed formId, string productName, string category);
    event FeedbackSubmitted(
        uint256 indexed formId, address indexed customer, uint256 score, string comment, string attestationId
    ); // 追加: イベントにattestationIdを含める

    constructor() ERC20("FeedbackToken", "FBT") Ownable(msg.sender) {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    function createFeedbackForm(string memory _productName, string memory _category, string[] memory _questions)
        external
        onlyOwner
    {
        feedbackIdCounter += 1;
        uint256 newFormId = feedbackIdCounter;

        feedbackForms[newFormId] =
            FeedbackForm({productName: _productName, category: _category, totalFeedbackScore: 0, feedbackCount: 0});

        for (uint256 i = 0; i < _questions.length; i++) {
            questions[newFormId].push(Question({id: i + 1, text: _questions[i]}));
        }

        formIds.push(newFormId);
        emit FeedbackFormCreated(newFormId, _productName, _category);
    }

    function getFormIds() external view returns (uint256[] memory) {
        return formIds;
    }

    // 単一のフィードバック送信: attestationIdを追加
    function submitFeedback(uint256 _formId, uint256 _score, string memory _comment, string memory _attestationId)
        external
    {
        require(_score >= 1 && _score <= 5, "Score must be between 1 and 5");
        require(bytes(feedbackForms[_formId].productName).length > 0, "Feedback form does not exist");

        feedbacks[_formId].push(
            Feedback({
                id: feedbacks[_formId].length + 1,
                customer: msg.sender,
                score: _score,
                comment: _comment,
                attestationId: _attestationId
            })
        );

        feedbackForms[_formId].totalFeedbackScore += _score;
        feedbackForms[_formId].feedbackCount += 1;

        emit FeedbackSubmitted(_formId, msg.sender, _score, _comment, _attestationId);
    }

    // 複数のフィードバック送信: attestationIdを追加
    function submitFeedbackBatch(
        uint256 formId,
        uint256[] memory scores,
        string[] memory comments,
        string memory attestationId
    ) external {
        require(scores.length == comments.length, "Scores and comments length mismatch");
        require(scores.length > 0, "No feedback provided");

        uint256 totalScoreForThisFeedback = 0;

        for (uint256 i = 0; i < scores.length; i++) {
            require(scores[i] >= 1 && scores[i] <= 5, "Invalid score");
            feedbacks[formId].push(
                Feedback({
                    id: feedbacks[formId].length + 1,
                    customer: msg.sender,
                    score: scores[i],
                    comment: comments[i],
                    attestationId: attestationId // アテステーションIDを記録
                })
            );

            totalScoreForThisFeedback += scores[i];
        }

        feedbackForms[formId].totalFeedbackScore += totalScoreForThisFeedback;
        feedbackForms[formId].feedbackCount += 1;

        emit FeedbackSubmitted(formId, msg.sender, scores[0], comments[0], attestationId); // イベントにattestationIdを追加
    }

    function getFeedbackIdCounter() external view returns (uint256) {
        return feedbackIdCounter;
    }

    function getFeedbacks(uint256 _formId) external view returns (Feedback[] memory) {
        return feedbacks[_formId];
    }

    function getAverageScore(uint256 _formId) external view returns (uint256) {
        if (feedbackForms[_formId].feedbackCount == 0) {
            return 0;
        }
        return feedbackForms[_formId].totalFeedbackScore / feedbackForms[_formId].feedbackCount;
    }

    function getQuestions(uint256 _formId) external view returns (Question[] memory) {
        return questions[_formId];
    }

    function sendToken(address recipient, uint256 amount) external {
        _transfer(msg.sender, recipient, amount);
    }

    receive() external payable {
        revert("Direct transfers not allowed");
    }
}
