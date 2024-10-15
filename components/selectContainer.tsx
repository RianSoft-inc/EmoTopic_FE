import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function SelectContainer({ src, name, summary, link }: any) {
  return (
    <div className="border-solid border-2 flex flex-col items-center justify-center rounded-3xl text-xl w-1/4 h-[500px]">
      <Image
        src={src}
        alt="Load Fail"
        className="w-36 h-36 rounded-full m-10"
      />
      <h2 className="font-bold">{name}</h2>
      <p className="text-left m-5 px-3 text-sm text-slate-500 ">{summary}</p>
      <Link href={link}>
        <button
          type="button"
          className={`${
            name === "상담사"
              ? "text-gray-400 bg-gray-200 hover:bg-gray-300 hover:text-gray-600 focus:ring-gray-200 dark:focus:ring-gray-800"
              : "text-white bg-gradient-to-r from-[#3555e3] to-[#c5aeff] hover:bg-gradient-to-br focus:ring-blue-300 dark:focus:ring-purple-800"
          } font-medium rounded-lg text-sm px-20 py-5 text-center mt-5 mb-10`}
        >
          {name === "상담사" ? "서비스 예정" : "시작하기"}
        </button>
      </Link>
    </div>
  );
}
