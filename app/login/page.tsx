"use client";
import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // 눈 모양 아이콘 추가

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 표시 여부 상태
  const [buttonText, setButtonText] = useState("로그인");
  const router = useRouter();

  // 비밀번호 표시 여부 토글 함수
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true); // 로딩 상태 시작
    setButtonText("계정 확인 중...");

    try {
      const response = await fetch("/api/proxy/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        router.push("/restart");
      } else {
        setErrorMessage("로그인 실패: 잘못된 사용자 이름 또는 비밀번호입니다.");
        setButtonText("로그인 실패");
      }
    } catch (error) {
      setErrorMessage("서버 오류 발생");
    } finally {
      setIsPending(false);
      setButtonText("로그인");
    }
  };

  return (
    <Suspense fallback={<p>로딩 중...</p>}>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-5 text-center">로그인</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                사용자 이름
              </label>
              <input
                type="text"
                placeholder="사용자 이름"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="mb-6 relative">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                비밀번호
              </label>
              <input
                type={showPassword ? "text" : "password"} // 비밀번호 표시 여부에 따라 텍스트로 변경
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {/* 눈 모양 아이콘 */}
              <div
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            {errorMessage && (
              <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
            )}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className={`${
                  isPending ? "bg-gray-400" : "bg-purple-500"
                } text-white font-bold py-2 px-4 rounded hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full`}
                disabled={isPending} // 로딩 중일 때 버튼 비활성화
              >
                {buttonText}
              </button>
            </div>
          </form>
          {/* Home 버튼 추가 */}
          <button
            onClick={() => router.push("/")}
            className="mt-4 w-full bg-gray-300 text-white font-bold py-2 px-4 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Home으로 돌아가기
          </button>
        </div>
      </div>
    </Suspense>
  );
}
