"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { UserPlus, LogIn, Mail, Lock } from "lucide-react"

// Khởi tạo client (client-side)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function SignUpPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signUp({ email, password })

    setLoading(false)

    if (error) {
      setError(error.message)
    } else {
      router.push("/sign-in")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-600 via-pink-500 to-orange-400 p-4">
      <Card className="w-full max-w-md shadow-2xl border-none rounded-2xl bg-white/90 backdrop-blur-md">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto w-14 h-14 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full flex items-center justify-center">
            <UserPlus className="w-7 h-7 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">Đăng ký tài khoản</CardTitle>
          <CardDescription>Nhập email và mật khẩu để tạo tài khoản</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSignUp} className="space-y-5">
            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="email"
                placeholder="Nhập email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10"
              />
            </div>

            {/* Error */}
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:from-violet-700 hover:to-blue-700"
            >
              <UserPlus className="w-4 h-4" />
              {loading ? "Đang đăng ký..." : "Đăng ký"}
            </Button>
          </form>

          {/* Link sang Sign In */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Đã có tài khoản?{" "}
            <Button
              variant="link"
              className="text-violet-600 hover:text-violet-800 font-semibold flex items-center gap-1"
              onClick={() => router.push("/sign-in")}
            >
              <LogIn className="w-4 h-4" /> Đăng nhập
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
