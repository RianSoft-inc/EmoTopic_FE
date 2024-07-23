export default function SelectUserStartContainer({ click, setClick }: any) {
  return (
    <>
      <div
        className={`flex items-center m-10  justify-between gap-x-16 gap-y-8 rounded-2xl bg-gray-100 p-8 
     dark:bg-gray-900 dark:bg-opacity-60 dark:backdrop-blur-md shadow-lg
     shadow-black/10 ring-2 ring-transparent 
       hover:ring-indigo-400 hover:cursor-pointer`}
        onClick={() => setClick()}
      >
        <p className="text-lg font-semibold text-gray-900 dark:text-white">
          이모토픽이 처음이신가요?
        </p>
        {/* chevron 아이콘 시작*/}
        <p
          className={`fa-solid fa-chevron-right fa-2xl flex-none  text-gray-900 dark:text-white hover:cursor-pointer ${
            click === true ? "rotate-90 transition" : "rotate-270 transition"
          }`}
        ></p>
        {/* chevron 아이콘 끝 */}
        {/* <div className="sm:w-80 sm:shrink "> */}
        <p
          className={`sm:w-80 sm:shrink mt-2 text-base leading-7 text-gray-600 dark:text-gray-200 ${
            click === true ? "" : "hidden"
          }`}
        >
          With new additions every now and then, feel free to suggest some
          additions!
        </p>
        {/* </div> */}
      </div>
    </>
  );
}
