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
 あなたは、店舗のフィードバックフォームを自動的に生成するためのAIです。以下の商品カテゴリとフィードバックタイプに基づいて、ユーザーからのフィードバックを集めるための具体的で簡潔な質問を生成してください。質問は、番号付きでリスト形式にしてください。また、ユーザーが質問に簡単に答えられるように、質問は一文で終わるようにしてください。

- 商品名: ${productName}
- カテゴリ: ${category}
- フィードバックタイプ: ${feedbackType}

質問のフォーマットは以下のようにしてください、それ以外の補足情報は出力しないでください：

1. [質問内容]
2. [質問内容]
3. [質問内容]
4. [質問内容]
5. [質問内容]

出力例:
1. この商品の品質についてどのように評価しますか？
2. この商品は期待に応えましたか？
3. この商品の使いやすさについてどう思いますか？
4. 改善点があれば教えてください。
5. 他にコメントがあれば教えてください。

上記の例を参考にして、以下の情報に基づいて5つの質問を生成してください。
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
