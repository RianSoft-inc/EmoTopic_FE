"use client";
import { useState } from "react";
import FileUpload from "@/components/dragTxtFileContainer";
import Title from "@/components/title";
import CollapseMenu from "@/components/collapseMenu";
export default function MainSelectPage() {
  const [first, SetFirst] = useState(false);
  const [inform, Setinform] = useState(false);
  const [file, setFile] = useState("");
  const [fileEnter, setFileEnter] = useState(false);
  const onfirstClick = () => {
    SetFirst(!first);
  };
  const oninformClick = () => {
    Setinform(!inform);
  };
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <script src="https://cdn.tailwindcss.com/3.3.3"></script>
      {/* 타이틀 */}
      <Title
        h1={"이모토픽 분석 시작하기"}
        p={
          "Lorem ipsum dolor sit amet consectetur adipiscing elit semper dalar elementum tempus hac tellus libero accumsan."
        }
        style={{ paddingBottom: 0 }}
      />
      {/* 박스 네개 container */}
      <div className="flex justify-center px-44">
        <div className="w-1/2 flex flex-col justify-center">
          <CollapseMenu />
        </div>
        <div className="w-1/2 flex flex-col items-center ">
          <FileUpload
            file={file}
            setFile={() => setFile}
            setFileEnter={() => setFileEnter(true)}
            fileEnter={fileEnter}
          ></FileUpload>
          <button
            type="button"
            className="flex justify-center items-center gap-3 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm w-72 px-20 py-5 text-center mb-5"
          >
            <i className="fa-solid fa-magnifying-glass"></i>분석하기
            {/* <i className="fa-solid fa-arrow-right"></i> */}
          </button>
        </div>
      </div>
    </>
  );
}
