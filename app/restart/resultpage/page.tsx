"use client";

import { Suspense, useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";

export default function Resultpage() {
  return (
    <Suspense fallback={<p>로딩 중...</p>}>
      <ResearcherResultpageContent />
    </Suspense>
  );
}

function ResearcherResultpageContent() {
  // const searchParams = useSearchParams();
  // const stringResult = searchParams.get("result"); // URL에서 'result' 값 가져오기
  const [objResult, setObjResult] = useState<any>(null); // 객체 상태 관리

  // useEffect(() => {
  //   if (stringResult) {
  //     try {
  //       const parsedResult = JSON.parse(decodeURIComponent(stringResult)); // JSON 파싱
  //       setObjResult(parsedResult); // 파싱된 결과 객체를 상태로 저장
  //       console.log("객체 결과 데이터", parsedResult); // 콘솔에 객체 출력
  //     } catch (error) {
  //       console.error("JSON 파싱 오류:", error); // 파싱 실패 시 오류 출력
  //     }
  //   }
  // }, [stringResult]); // stringResult가 변경될 때마다 실행

  useEffect(() => {
    const savedResult = sessionStorage.getItem("analysisResult");
    if (savedResult) {
      setObjResult(JSON.parse(savedResult));
      console.log(
        "Session Storage에서 가져온 데이터:",
        JSON.parse(savedResult)
      );
    }
  }, []);

  if (!objResult) {
    return <p>결과를 로드하는 중입니다...</p>;
  }

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-5">분석 결과</h1>
      <div>
        {/* objResult 전체를 JSON 형식으로 출력 */}
        <pre>{JSON.stringify(objResult, null, 2)}</pre>
      </div>
    </div>
  );
}
