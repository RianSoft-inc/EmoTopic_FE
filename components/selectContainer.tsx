import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function SelectContainer({ src, name, link }: any) {
  return (
    <div className="border-solid border-2 flex flex-col items-center justify-center rounded-3xl text-xl w-1/4 ">
      <Image
        src={src}
        alt="Load Fail"
        className="w-36 h-36 rounded-full m-10"
      />
      <h2 className="font-bold">{name}</h2>
      <p className="text-center m-5">
        Lorem ipsum dolor sit amet consectetur adipiscing elit semper dalar
        elementum tempus hac tellus libero accumsan.
      </p>
      <Link href={link}>
        <button
          type="button"
          className={`${
            name === "상담사"
              ? "text-gray-400 bg-gray-200 hover:bg-gray-300 hover:text-gray-600 focus:ring-gray-200 dark:focus:ring-gray-800"
              : "text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-purple-300 dark:focus:ring-purple-800"
          } font-medium rounded-lg text-sm px-20 py-5 text-center mt-5 mb-10`}
        >
          {name === "상담사" ? "서비스 예정" : "시작하기"}
        </button>
      </Link>
    </div>
  );
}
