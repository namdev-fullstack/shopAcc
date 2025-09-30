"use client"
import { 
  Shield, Flame, Zap, Phone, HomeIcon, 
  Menu, X, LogIn, UserPlus, Wallet 
} from 'lucide-react'
import { Button } from './ui/button'
import { useEffect, useState } from 'react'

const heroSlides = [
  {
    title: "🎮 Tài Khoản Game VIP",
    subtitle: "✨ Giá Ưu Đãi Nhất Thị Trường ✨",
    description: "🔥 Mua ngay các tài khoản game hot với giá tốt nhất, uy tín và an toàn 🔥",
    image: "https://images.pexels.com/photos/7915437/pexels-photo-7915437.jpeg",
    cta: "🚀 Khám Phá Ngay",
    gradient: "from-purple-600/95 via-pink-600/90 to-red-500/85"
  },
  {
    title: "⚡ Flash Sale Hôm Nay",
    subtitle: "🎯 Giảm Đến 50% Tất Cả Game 🎯",
    description: "💎 Cơ hội vàng sở hữu tài khoản VIP với giá không thể tốt hơn 💎",
    image: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg",
    cta: "💰 Mua Ngay",
    gradient: "from-blue-600/95 via-cyan-500/90 to-teal-500/85"
  },
  {
    title: "🛡️ Bảo Hành Trọn Đời",
    subtitle: "🌟 An Tâm Mua Sắm 🌟",
    description: "💯 Cam kết bảo hành và hỗ trợ 24/7 cho mọi tài khoản 💯",
    image: "https://images.pexels.com/photos/8721318/pexels-photo-8721318.jpeg",
    cta: "🔍 Tìm Hiểu Thêm",
    gradient: "from-green-600/95 via-emerald-500/90 to-lime-500/85"
  }
]

export default function Header() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Hero slider auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      {/* Header */}
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
              <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-violet-600 transition-all font-semibold group">
                <HomeIcon className="w-5 h-5 text-gray-500 group-hover:text-violet-600 transition-colors" />
                <span>Trang Chủ</span>
              </a>
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
              <Button 
                className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:scale-105 hover:shadow-lg transition-all text-white"
              >
                <Wallet className="w-4 h-4" />
                Nạp tiền
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center gap-2 border-violet-500 text-violet-600 hover:bg-violet-50 hover:scale-105 transition-all"
              >
                <UserPlus className="w-4 h-4" />
                Đăng ký
              </Button>
              <Button 
                className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 hover:scale-105 hover:shadow-lg transition-all text-white"
              >
                <LogIn className="w-4 h-4" />
                Đăng nhập
              </Button>
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
                <a href="#" className="flex items-center gap-3 text-gray-800 font-semibold hover:text-violet-600 transition-colors">
                  <HomeIcon className="w-5 h-5 text-violet-500" /> Trang Chủ
                </a>
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
                  <Button className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:scale-105 transition-all">
                    <Wallet className="w-4 h-4" /> Nạp tiền
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2 border-violet-500 text-violet-600 hover:bg-violet-50">
                    <UserPlus className="w-4 h-4" /> Đăng ký
                  </Button>
                  <Button className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:scale-105 transition-all">
                    <LogIn className="w-4 h-4" /> Đăng nhập
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  )
}
