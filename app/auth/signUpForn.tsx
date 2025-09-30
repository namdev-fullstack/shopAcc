"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Mail, Lock, User } from "lucide-react"
import { toast } from "sonner"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/utils/firebaseConfig"

export default function AuthPage() {
  const router = useRouter()

  const [mode, setMode] = useState<"signup" | "login">("signup") // chế độ: signup hoặc login
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (mode === "signup") {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      
        toast.success("🎉 Đăng ký thành công!")
      } else {
        await signInWithEmailAndPassword(auth, email, password)
        toast.success("🎉 Đăng nhập thành công!")
      }

      router.push("/") // chuyển về trang chủ
    } catch (error: any) {
      let message = "Đã có lỗi xảy ra!";
      switch (error.code) {
        case "auth/email-already-in-use":
          message = "Email này đã được sử dụng.";
          break;
        case "auth/invalid-email":
          message = "Email không hợp lệ.";
          break;
        case "auth/weak-password":
          message = "Mật khẩu quá yếu (ít nhất 6 ký tự).";
          break;
        case "auth/user-not-found":
          message = "Người dùng không tồn tại.";
          break;
        case "auth/invalid-credential":
          message = "Mật khẩu hoặc Email không đúng.";
          break;
        default:
          message = error.message || "Đã có lỗi xảy ra!";
      }
      toast.error(message);
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md border rounded-xl shadow-md p-6 bg-white">
        <h1 className="text-2xl font-bold text-center mb-6">
          {mode === "signup" ? "Đăng ký" : "Đăng nhập"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
         

          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-10"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pl-10"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:opacity-90 transition rounded-lg"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" /> Đang xử lý...
              </span>
            ) : mode === "signup" ? (
              "Đăng ký"
            ) : (
              "Đăng nhập"
            )}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          {mode === "signup" ? (
            <>
              Đã có tài khoản?{" "}
              <button
                onClick={() => setMode("login")}
                className="text-violet-600 font-semibold hover:underline"
              >
                Đăng nhập
              </button>
            </>
          ) : (
            <>
              Chưa có tài khoản?{" "}
              <button
                onClick={() => setMode("signup")}
                className="text-violet-600 font-semibold hover:underline"
              >
                Đăng ký
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  )
}
