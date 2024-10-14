"use client";
import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // 눈 아이콘을 사용하기 위한 라이브러리 (react-icons)

// 로딩 상태 컴포넌트
function Loading() {
  return <p>로딩 중...</p>;
}

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 표시 상태
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리
  const router = useRouter();

  const validatePassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{10,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("회원가입 폼 제출됨");
    console.log("사용자 이름:", username);
    console.log("비밀번호:", password);

    if (!validatePassword(password)) {
      setErrorMessage(
        "비밀번호는 최소 10자이며, 영문 대소문자, 숫자, 특수문자를 각각 하나 이상 포함해야 합니다."
      );
      console.log("비밀번호가 유효하지 않음");
      return;
    }

    console.log("비밀번호가 유효함");
    setIsLoading(true); // 로딩 상태 시작

    try {
      console.log("회원가입 API 요청 시작");
      const response = await fetch("/api/proxy/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      console.log("요청 보낸 데이터: ", { username, password });

      if (response.ok) {
        const responseData = await response.json();
        console.log("회원가입 성공:", responseData);
        setIsLoading(false); // 로딩 상태 종료
        // 성공 시 로그인 페이지로 리다이렉트
        router.push("/login");
      } else {
        const errorResponse = await response.json();
        setErrorMessage("회원가입에 실패했습니다.");
        console.log("회원가입 실패:", errorResponse);
      }
    } catch (error) {
      console.error("회원가입 중 오류 발생:", error);
      setErrorMessage("회원가입 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false); // 로딩 상태 종료
    }
  };

  // 비밀번호 표시 상태를 토글하는 함수
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-5 text-center">회원가입</h2>
          <form onSubmit={handleSubmit}>
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
                type={showPassword ? "text" : "password"} // showPassword가 true면 텍스트로 표시
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
                className={`bg-purple-500 text-white font-bold py-2 px-4 rounded hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full ${
                  isLoading ? "cursor-not-allowed" : ""
                }`}
                disabled={isLoading} // 로딩 중일 때는 버튼 비활성화
              >
                {isLoading ? "회원가입 중..." : "회원가입"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Suspense>
  );
}
