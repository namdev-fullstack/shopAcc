"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Shield,
  Flame,
  Phone,
  HomeIcon,
  Menu,
  X,
  UserPlus,
  Wallet,
  LogOut,
  Settings,
  Bell,
} from "lucide-react"
import { Button } from "./ui/button"
import DepositButton from "./depositButton"
import { useAuth } from "@/context/AuthContext"
import { auth } from "@/utils/firebaseConfig"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, loading } = useAuth()

  const displayName = user?.displayName || user?.email?.split("@")[0] || "User"

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              ShopLiênQuân
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-700 hover:text-violet-600 transition-all font-semibold group"
            >
              <HomeIcon className="w-5 h-5 text-gray-500 group-hover:text-violet-600 transition-colors" />
              <span>Trang Chủ</span>
            </Link>
            <Link
              href="/products"
              className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-all font-semibold group"
            >
              <Flame className="w-5 h-5 text-gray-500 group-hover:text-red-600 transition-colors" />
              <span>Danh Sách Acc</span>
            </Link>
            <Link
              href="https://zalo.me/0563275607"
              target="_blank"
              className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-all font-semibold group"
            >
              <Phone className="w-5 h-5 text-gray-500 group-hover:text-green-600 transition-colors" />
              <span>Liên Hệ</span>
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <DepositButton />

            {!loading && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="focus:outline-none flex items-center gap-2">
                    <Avatar className="w-9 h-9 border border-gray-200 shadow-sm hover:scale-105 transition">
                      <AvatarImage src="/avatar2-removebg-preview.png" alt={displayName} />
                      <AvatarFallback>{displayName[0]?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="font-semibold uppercase">{displayName}</span>

                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel>
                    <span className="font-semibold uppercase">{displayName}</span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem>
                    <Wallet className="w-4 h-4 mr-2 text-violet-500" />
                    Số dư: <span className="ml-1 font-medium text-gray-700">0 VNĐ</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <Bell className="w-4 h-4 mr-2 text-gray-600" />
                    Thông báo
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    className="text-red-600 focus:text-red-700 cursor-pointer"
                    onClick={() => auth.signOut()}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 border-violet-500 text-violet-600 hover:bg-violet-50 hover:scale-105 transition-all"
                >
                  <UserPlus className="w-4 h-4" /> Đăng ký / Đăng nhập
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
       {/* Mobile Menu */}
{mobileMenuOpen && (
  <div className="fixed inset-x-0 top-14 z-50 backdrop-blur-xl bg-white/90 border-b border-gray-200/50 shadow-lg animate-fade-in-down rounded-b-2xl">
    <nav className="flex flex-col space-y-4 px-6 py-6">
      <Link
        href="/"
        className="flex items-center gap-3 text-gray-800 font-semibold hover:text-violet-600 transition-colors"
      >
        <HomeIcon className="w-5 h-5 text-violet-500" /> Trang Chủ
      </Link>
      <Link
        href="/products"
        className="flex items-center gap-3 text-gray-800 font-semibold hover:text-pink-600 transition-colors"
      >
        <Flame className="w-5 h-5 text-pink-500" /> Danh Sách Acc
      </Link>
      <Link
        href="https://zalo.me/0563275607"
        target="_blank"
        className="flex items-center gap-3 text-gray-800 font-semibold hover:text-green-600 transition-colors"
      >
        <Phone className="w-5 h-5 text-green-500" /> Liên Hệ
      </Link>

      <div className="border-t border-gray-200/50 pt-4 flex flex-col space-y-3">
        <DepositButton />

        {!loading && user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 focus:outline-none">
                <Avatar className="w-9 h-9 border border-gray-200 shadow-sm">
                  <AvatarImage src="/avatar2-removebg-preview.png" alt={displayName} />
                  <AvatarFallback>{displayName[0]?.toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="font-semibold uppercase">{displayName}</span>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56" align="start" forceMount>
              <DropdownMenuLabel>
                <span className="font-semibold uppercase">{displayName}</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <Wallet className="w-4 h-4 mr-2 text-violet-500" />
                Số dư: <span className="ml-1 font-medium text-gray-700">0 VNĐ</span>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Bell className="w-4 h-4 mr-2 text-gray-600" />
                Thông báo
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="text-red-600 focus:text-red-700 cursor-pointer"
                onClick={() => auth.signOut()}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Đăng xuất
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/auth">
            <Button
              variant="outline"
              className="flex items-center gap-2 border-violet-500 text-violet-600 hover:bg-violet-50"
            >
              <UserPlus className="w-4 h-4" /> Đăng ký / Đăng nhập
            </Button>
          </Link>
        )}
      </div>
    </nav>
  </div>
)}

      </div>
    </header>
  )
}
