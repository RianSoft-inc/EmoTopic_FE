"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Title from "@/components/title";
import CollapseMenu from "@/components/collapseMenu";
import CustomDropzone from "@/components/customDropzone";

export default function ResearchPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null); // 파일 객체 저장
  const [fileContent, setFileContent] = useState<string>(""); // 파일 내용 저장
  const [isLoading, setIsLoading] = useState<boolean>(false); // 로딩 상태 추가
  const [accessToken, setAccessToken] = useState<string | null>(null); // Access Token 저장

  // 로그인 후 localStorage에서 accessToken을 가져옴
  useEffect(() => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        setAccessToken(token);
      } else {
        router.push("/login"); // 로그인 페이지로 리다이렉션
      }
    } catch (error) {
      console.error("토큰을 불러오는 중 오류가 발생했습니다.", error);
      router.push("/login"); // 로그인 페이지로 리다이렉션
    }
  }, []);

  const handleSubmit = async () => {
    // 로딩 상태 시작
    setIsLoading(true);

    if (!file || !fileContent) {
      alert("파일을 업로드해주세요.");
      setIsLoading(false); // 로딩 상태 종료
      return;
    }

    // 파일을 FormData로 전송 준비
    const formData = new FormData();
    const fileBlob = new Blob([fileContent], { type: "text/csv" });
    formData.append("file", fileBlob, "uploadedFile.csv"); // 파일 추가

    try {
      const response = await fetch("/api/proxy/researcher", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`, // 로그인 시 받은 Access Token을 헤더에 추가
        },
      });

      if (response.ok) {
        const resultData = await response.json();
        console.log("응답 데이터:", resultData);

        // 성공적으로 데이터를 수신하면 결과 페이지로 이동
        router.push(
          `/restart/resultpage?result=${encodeURIComponent(
            JSON.stringify(resultData)
          )}`
        );
      } else {
        console.error("파일 전송 실패:", response.statusText);
        alert("파일 전송에 실패했습니다.");
      }
    } catch (error) {
      console.error("파일 전송 중 오류 발생:", error);
      alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false); // 로딩 상태 종료
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center">
      <div className="mb-12">
        <Title
          h1={"연구자용 데이터 분석 페이지"}
          p={"연구자용 데이터를 분석하고 결과를 확인하세요."}
        />
      </div>
      <div className="flex justify-center px-20">
        {" "}
        {/* px-44를 px-20으로 줄여서 여백 최소화 */}
        <div className="w-1/2 flex flex-col justify-center">
          <CollapseMenu />
        </div>
        <div className="w-1/2 flex flex-col items-center">
          <CustomDropzone
            fileType="csv"
            onFileSelect={(selectedFile: File, fileContent: string) => {
              setFile(selectedFile); // 파일 저장
              setFileContent(fileContent); // 파일 내용 저장
            }}
          />
          <button
            type="button"
            onClick={handleSubmit}
            className={`flex justify-center items-center gap-3 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm w-72 px-20 py-5 text-center mb-5 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`} // 로딩 중일 때 버튼 비활성화 스타일 적용
            disabled={isLoading} // 로딩 중일 때 버튼 비활성화
          >
            {isLoading ? "분석 중..." : "분석하기"}{" "}
            {/* 로딩 상태에 따른 버튼 텍스트 */}
          </button>
        </div>
      </div>
    </div>
  );
}
