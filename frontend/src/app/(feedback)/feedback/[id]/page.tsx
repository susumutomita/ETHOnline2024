"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // useParams を使って URL の動的パラメータを取得
import SubmitFeedbackForm from "@/components/FeedbackForm/SubmitFeedbackForm";

export default function SubmitFeedbackPage() {
  const params = useParams(); // 動的ルートのパラメータを取得

  // 'params' が存在し、'id' が文字列かどうかを確認
  const id = params?.id as string | undefined;

  if (!id) {
    return <p>Error: Invalid or missing ID</p>;
  }

  return (
    <div className="text-center">
      <SubmitFeedbackForm id={id} />
    </div>
  );
}
