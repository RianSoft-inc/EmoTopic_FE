// components/Navbar.tsx
"use client";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const handleNavClick = () => {
    router.push("/"); // 클릭 시 "/"로 이동
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white text-blue-700 py-4 border-b shadow-lg">
      <div className="container mx-auto flex justify-center">
        <h1
          className="text-2xl font-bold cursor-pointer gradient-text"
          onClick={handleNavClick}
        >
          Flowtalk
        </h1>
      </div>
      <style jsx>{`
        .gradient-text {
          background: linear-gradient(90deg, #3555e3, #c5aeff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
