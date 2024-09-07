import { NextApiRequest, NextApiResponse } from "next";
import { parseHtmlWithLLM } from "@/lib/llmParser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { productName, category, feedbackType } = req.body;

    if (!productName || !category || !feedbackType) {
      return res
        .status(400)
        .json({ error: "Missing product name, category, or feedback type" });
    }

    const prompt = `
You are an AI designed to automatically generate feedback forms for stores. Based on the product category and feedback type below, generate specific and concise questions to collect feedback from users. Ensure that the questions are simple and end with a single sentence so users can easily answer them.

- Product Name: ${productName}
- Category: ${category}
- Feedback Type: ${feedbackType}

Please format the questions in a numbered list as shown below. Do not include any extra information beyond the questions:

1. [Question]
2. [Question]
3. [Question]
4. [Question]
5. [Question]

Example output:
1. Is this product appealing to you?
2. Does this product meet your expectations?
3. Is the packaging of the product attractive?
4. Is the price of this product reasonable?
5. Would you recommend this product to others?

Using the format above, generate 5 questions based on the provided information.
    `;

    const response = await parseHtmlWithLLM(prompt);
    const questions = response.split("\n").filter((q) => q.trim() !== "");
    res.status(200).json({ questions });
  } catch (error: any) {
    console.error("Error in generate-questions API:", error);
    res.status(500).json({
      error: "Failed to generate questions",
      details: error.message || "An unknown error occurred",
    });
  }
}
