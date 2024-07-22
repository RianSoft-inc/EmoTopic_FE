import Image from "next/image";
export default function SelectContainer({ src, name }: any) {
  return (
    <div className=" border-solid border-2 flex flex-col items-center justify-center m-5 rounded-3xl text-xl w-1/4 ">
      <Image
        src={src}
        alt="Load Fail"
        className="w-72 h-72 rounded-full my-10"
      />
      <h2 className=" m-5 font-bold">{name}</h2>
      <p className="text-center m-5">
        Lorem ipsum dolor sit amet consectetur adipiscing elit semper dalar
        elementum tempus hac tellus libero accumsan.
      </p>
      <button
        type="button"
        className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-20 py-5 text-center me-5 mb-5 mt-5"
      >
        Purple
      </button>
    </div>
  );
}
