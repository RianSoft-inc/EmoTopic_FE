import { BiHome } from "react-icons/bi";
import { useRouter } from "next/navigation";

const HomeButton: React.FC = () => {
  const router = useRouter();

  // 기본 클릭 동작 ("/"로 이동)
  const handleHomeClick = () => {
    router.push("/"); // "/" 경로로 이동
  };

  return (
    <div className="fixed bottom-14 left-0 right-0 flex justify-center items-center text-slate-600 font-medium text-md px-14 py-5 text-center">
      <span
        className="hover:font-bold hover:text-blue-500 border-slate-600 flex items-center cursor-pointer"
        onClick={handleHomeClick}
      >
        <BiHome /> &nbsp;메인화면
      </span>
    </div>
  );
};

export default HomeButton;
