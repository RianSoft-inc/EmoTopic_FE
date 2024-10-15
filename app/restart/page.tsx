"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Title from "@/components/title";
import CollapseMenu from "@/components/collapseMenu";
import CustomDropzone from "@/components/customDropzone";
import HomeButton from "@/components/homeButton";

export default function ResearchPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileUpload = async () => {
    setIsLoading(true);

    if (!file) {
      alert("파일을 업로드해주세요.");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file, "uploadedFile.csv");

    try {
      const response = await fetch("/api/proxy/researcher", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("파일 업로드 실패");
      }

      const textResponse = await response.text();
      console.log("응답 텍스트:", textResponse);

      // JSON 변환 성공 후, 세션에 저장
      try {
        const jsonResult = JSON.parse(textResponse);
        if (jsonResult && Object.keys(jsonResult).length > 0) {
          sessionStorage.setItem("analysisResult", JSON.stringify(jsonResult));
        } else {
          console.error("서버에서 빈 응답을 받았습니다.");
        }

        // 페이지 전환 전에 데이터를 콘솔에서 확인
        const storedData = sessionStorage.getItem("analysisResult");
        console.log("저장된 데이터:", storedData);

        // 분석 결과 페이지로 리다이렉션
        router.push("/restart/resultpage");
      } catch (jsonError) {
        console.error("JSON 변환 중 오류 발생:", jsonError);
      }
    } catch (error) {
      console.error("파일 전송 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center">
      <Title
        h1={"연구 데이터를 심층 분석하고, 인사이트를 발견하세요"}
        p={
          "연구 데이터를 분석하여 숨겨진 패턴을 파악하고, 신뢰할 수 있는 결과를 얻어보세요. 플로우톡을 통해 연구의 핵심을 발견하고, 중요한 인사이트를 도출할 수 있습니다."
        }
      />
      <div className="flex justify-center px-20">
        <div className="w-1/2 flex flex-col justify-center">
          <CollapseMenu />
        </div>
        <div className="w-1/2 flex flex-col items-center gap-10">
          <CustomDropzone
            fileType="csv"
            onFileSelect={(selectedFile: File) => {
              setFile(selectedFile);
            }}
          />
          <button
            type="button"
            onClick={handleFileUpload}
            className={`flex justify-center items-center gap-3 text-white bg-gradient-to-r from-[#3555e3] to-[#c5aeff] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm w-72 px-20 py-5 text-center mb-5 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "분석 중..." : "분석하기"}
          </button>
        </div>
      </div>
      <HomeButton />
    </div>
  );
}
