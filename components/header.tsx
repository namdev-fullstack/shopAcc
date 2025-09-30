"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Shield, Flame, Zap, Phone, HomeIcon, 
  Menu, X, LogIn, UserPlus, Wallet, LogOut 
} from "lucide-react";
import { Button } from "./ui/button";
import DepositButton from "./depositButton";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/utils/firebaseConfig";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, loading } = useAuth();

  // Lấy displayName nếu có, fallback email
  const displayName = user?.displayName || user?.email?.split("@")[0] || "";

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              ShopLQ
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2 text-gray-700 hover:text-violet-600 transition-all font-semibold group">
              <HomeIcon className="w-5 h-5 text-gray-500 group-hover:text-violet-600 transition-colors" />
              <span>Trang Chủ</span>
            </Link>
            <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-all font-semibold group">
              <Flame className="w-5 h-5 text-gray-500 group-hover:text-red-600 transition-colors" />
              <span>Danh Sách Acc</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-all font-semibold group">
              <Phone className="w-5 h-5 text-gray-500 group-hover:text-green-600 transition-colors" />
              <span>Liên Hệ</span>
            </a>
          </nav>

          {/* Action buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <DepositButton />

            {!loading && user ? (
              // Nếu đã đăng nhập
              <>
                <span className="font-semibold text-gray-700">Hi, {displayName}</span>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 border-red-500 text-red-600 hover:bg-red-50 transition-all"
                  onClick={() => auth.signOut()} // Đăng xuất
                >
                  <LogOut className="w-4 h-4" /> Logout
                </Button>
              </>
            ) : (
              // Nếu chưa đăng nhập
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

          {/* Mobile menu button */}
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
        {mobileMenuOpen && (
          <div className="fixed inset-x-0 top-14 z-50 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-lg animate-fade-in-down rounded-b-2xl">
            <nav className="flex flex-col space-y-4 px-6 py-6">
              <Link href="/" className="flex items-center gap-3 text-gray-800 font-semibold hover:text-violet-600 transition-colors">
                <HomeIcon className="w-5 h-5 text-violet-500" /> Trang Chủ
              </Link>
              <a href="#" className="flex items-center gap-3 text-gray-800 font-semibold hover:text-pink-600 transition-colors">
                <Flame className="w-5 h-5 text-pink-500" /> Game Hot
              </a>
              <a href="#" className="flex items-center gap-3 text-gray-800 font-semibold hover:text-orange-600 transition-colors">
                <Zap className="w-5 h-5 text-orange-500" /> Flash Sale
              </a>
              <a href="#" className="flex items-center gap-3 text-gray-800 font-semibold hover:text-green-600 transition-colors">
                <Phone className="w-5 h-5 text-green-500" /> Liên Hệ
              </a>

              <div className="border-t border-gray-200/50 pt-4 flex flex-col space-y-3">
                <DepositButton />

                {!loading && user ? (
                  <>
                    <span className="font-semibold text-gray-700 px-2">Hi, {displayName}</span>
                    <Button className="flex items-center gap-2 border-red-500 text-red-600 hover:bg-red-50 transition-all" onClick={() => auth.signOut()}>
                      <LogOut className="w-4 h-4" /> Logout
                    </Button>
                  </>
                ) : (
                  <Link href="/auth">
                    <Button variant="outline" className="flex items-center gap-2 border-violet-500 text-violet-600 hover:bg-violet-50">
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
  );
}
