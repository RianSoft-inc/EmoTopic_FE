"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function WordCloudInfo({ data }: { data: any }) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!data || !data.wordCloudGetUrl) {
      console.error("No data or wordCloudGetUrl available.");
      return;
    }

    // data에서 wordCloudGetUrl 값에서 ID 추출
    const idMatch = data.wordCloudGetUrl.match(/\/api\/word-cloud\/(\d+)/);
    if (idMatch) {
      const id = parseInt(idMatch[1], 10); // 문자열을 정수로 변환
      console.log("Extracted ID:", id);

      if (id) {
        // 프록시 서버를 통해 워드 클라우드 이미지를 가져옴
        fetch(`/api/proxy/word-cloud/${id}`, {
          method: "GET",
        })
          .then((response) => {
            console.log("Response status:", response.status);
            if (!response.ok) {
              return response.text().then((text) => {
                console.error(`Error ${response.status}: ${text}`);
                throw new Error(`Error ${response.status}: ${text}`);
              });
            }
            return response.blob(); // 이미지 데이터를 blob으로 변환
          })
          .then((blob) => {
            const imageUrl = URL.createObjectURL(blob); // blob을 이미지 URL로 변환
            setImageUrl(imageUrl); // 이미지 URL 설정
          })
          .catch((error) => console.error("Image fetch error:", error));
      } else {
        console.error("Invalid ID extracted.");
      }
    } else {
      console.error("Failed to extract ID from wordCloudGetUrl.");
    }
  }, [data]);

  if (!data) {
    return <p>워드 클라우드 이미지를 불러오는 중입니다...</p>;
  }

  return (
    <div className="flex justify-center my-20">
      {imageUrl ? (
        <Image src={imageUrl} alt="워드 클라우드" width={350} height={350} />
      ) : (
        <p>이미지를 불러오는 중입니다...</p>
      )}
    </div>
  );
}
