"use client";
import HoursInfo from "@/components/resultdata/hours/getHours-info";
import KeywordInfo from "@/components/resultdata/keyword/getKeyword-info";
import ParticipantsInfo from "@/components/resultdata/participants/getParticipants-info";
import TimelineInfo from "@/components/resultdata/timeline/getTimeline-info";
import WordCloudInfo from "@/components/resultdata/wordcloud/getWordCloud-info";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import React from "react";

export default function Resultpage() {
  const searchParams = useSearchParams();
  const stringResult = searchParams.get("result");
  const [objResult, setObjResult] = useState(null);

  useEffect(() => {
    if (stringResult) {
      try {
        const parsedResult = JSON.parse(stringResult);
        setObjResult(parsedResult);
        console.log("객체 결과 데이터", parsedResult);
      } catch (error) {
        console.error("JSON 파싱 오류:", error);
      }
    }
  }, [stringResult]);

  return (
    <div className="text-center h-full bg-violet-100 py-16 px-24">
      {/* <h1>분석 결과 페이지</h1> */}
      {objResult && (
        <>
          <ParticipantsInfo data={objResult} />
          <KeywordInfo data={objResult} />
          {/* 메시지 전송 횟수 분석 */}
          <TimelineInfo data={objResult} />
          <HoursInfo data={objResult} />
          <WordCloudInfo data={objResult} />
        </>
      )}
      {!objResult && <p>결과를 불러오는 중입니다...</p>}
    </div>
  );
}
