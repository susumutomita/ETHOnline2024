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
    }

    struct FeedbackForm {
        string productName;
        string category;
        uint256 totalFeedbackScore;
        uint256 feedbackCount;
    }

    mapping(uint256 => FeedbackForm) public feedbackForms;
    mapping(uint256 => Feedback[]) public feedbacks;

    event FeedbackFormCreated(uint256 indexed formId, string productName, string category);
    event FeedbackSubmitted(uint256 indexed formId, address indexed customer, uint256 score, string comment);

    constructor() ERC20("FeedbackToken", "FBT") Ownable(msg.sender) {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    function createFeedbackForm(string memory _productName, string memory _category) external onlyOwner {
        feedbackIdCounter += 1;
        uint256 newFormId = feedbackIdCounter;

        feedbackForms[newFormId] =
            FeedbackForm({productName: _productName, category: _category, totalFeedbackScore: 0, feedbackCount: 0});

        emit FeedbackFormCreated(newFormId, _productName, _category);
    }

    function submitFeedback(uint256 _formId, uint256 _score, string memory _comment) external {
        require(_score >= 1 && _score <= 5, "Score must be between 1 and 5");
        require(bytes(feedbackForms[_formId].productName).length > 0, "Feedback form does not exist");

        feedbacks[_formId].push(
            Feedback({id: feedbacks[_formId].length + 1, customer: msg.sender, score: _score, comment: _comment})
        );

        feedbackForms[_formId].totalFeedbackScore += _score;
        feedbackForms[_formId].feedbackCount += 1;

        emit FeedbackSubmitted(_formId, msg.sender, _score, _comment);
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

    function sendToken(address recipient, uint256 amount) external {
        _transfer(msg.sender, recipient, amount);
    }

    receive() external payable {
        revert("Direct transfers not allowed");
    }
}
