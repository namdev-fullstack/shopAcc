'use client';

import { useState, useEffect } from 'react';
import { ChevronRight, Star, Users, ShoppingCart, Clock, Zap, Shield, Award, TrendingUp, Menu, X, Sparkles, Crown, Flame, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 36,
    seconds: 3
  });

  // Hero slider auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
  ];

  const popularGames = [
    {
      id: 1,
      name: "Liên Quân Mobile",
      description: "MOBA số 1 Việt Nam",
      accounts: 2847,
      priceFrom: 50000,
      rating: 4.9,
      image: "https://images.pexels.com/photos/7915437/pexels-photo-7915437.jpeg",
      hot: true
    },
    {
      id: 2,
      name: "Liên Minh Huyền Thoại",
      description: "MOBA PC kinh điển",
      accounts: 1923,
      priceFrom: 100000,
      rating: 4.9,
      image: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg",
      hot: true
    },
    {
      id: 3,
      name: "Valorant",
      description: "FPS chiến thuật hàng đầu",
      accounts: 856,
      priceFrom: 200000,
      rating: 4.9,
      image: "https://images.pexels.com/photos/8721318/pexels-photo-8721318.jpeg",
      hot: false
    },
    {
      id: 4,
      name: "PUBG Mobile",
      description: "Battle Royale đình đám",
      accounts: 1456,
      priceFrom: 75000,
      rating: 4.8,
      image: "https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg",
      hot: true
    }
  ];

  const flashSaleItems = [
    {
      id: 1,
      name: "Liên Quân Mobile",
      category: "Thách Đấu",
      originalPrice: 2599000,
      salePrice: 1299000,
      discount: 50,
      sold: 98,
      total: 267,
      savings: 1300000,
      image: "./acc.jpg"
    },
    {
      id: 2,
      name: "Liên Minh Huyền Thoại",
      category: "Cao Thủ",
      originalPrice: 1499000,
      salePrice: 899000,
      discount: 40,
      sold: 89,
      total: 189,
      savings: 600000,
      image: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg"
    },
    {
      id: 3,
      name: "Valorant",
      category: "Bất Tử",
      originalPrice: 3499000,
      salePrice: 2199000,
      discount: 37,
      sold: 18,
      total: 67,
      savings: 1300000,
      image: "https://images.pexels.com/photos/8721318/pexels-photo-8721318.jpeg"
    },
    {
      id: 4,
      name: "PUBG Mobile",
      category: "Ace Chính Phục",
      originalPrice: 999000,
      salePrice: 599000,
      discount: 40,
      sold: 124,
      total: 156,
      savings: 400000,
      image: "https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg"
    }
  ];

  const hotAccounts = [
    {
      id: 1,
      name: "Liên Quân Mobile",
      category: "Thách Đấu",
      price: 2500000,
      originalPrice: 3200000,
      savings: 22,
      accounts: 95,
      views: 234,
      image: "https://images.pexels.com/photos/7915437/pexels-photo-7915437.jpeg",
      verified: true
    },
    {
      id: 2,
      name: "Liên Minh Huyền Thoại",
      category: "Kim Cương I",
      price: 1800000,
      originalPrice: 2100000,
      savings: 14,
      accounts: 78,
      views: 156,
      image: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg",
      verified: true
    },
    {
      id: 3,
      name: "Valorant",
      category: "Bất Tử",
      price: 3200000,
      originalPrice: 3800000,
      savings: 16,
      accounts: 18,
      views: 45,
      image: "https://images.pexels.com/photos/8721318/pexels-photo-8721318.jpeg",
      verified: true
    },
    {
      id: 4,
      name: "PUBG Mobile",
      category: "Ace Chính Phục",
      price: 950000,
      originalPrice: 1200000,
      savings: 21,
      accounts: 89,
      views: 124,
      image: "https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg",
      verified: true
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                  ShopLQ
                </span>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-violet-600 transition-colors font-medium">Trang Chủ</a>
              <a href="#" className="text-gray-600 hover:text-violet-600 transition-colors font-medium">Game Hot</a>
              <a href="#" className="text-gray-600 hover:text-violet-600 transition-colors font-medium">Flash Sale</a>
              <a href="#" className="text-gray-600 hover:text-violet-600 transition-colors font-medium">Liên Hệ</a>
            </nav>

            <div className="flex items-center space-x-4">
            
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200 py-4 animate-fade-in-down">
              <nav className="flex flex-col space-y-4 px-4">
                <a href="#" className="text-gray-600 hover:text-violet-600 transition-colors font-medium py-2">Trang Chủ</a>
                <a href="#" className="text-gray-600 hover:text-violet-600 transition-colors font-medium py-2">Game Hot</a>
                <a href="#" className="text-gray-600 hover:text-violet-600 transition-colors font-medium py-2">Flash Sale</a>
                <a href="#" className="text-gray-600 hover:text-violet-600 transition-colors font-medium py-2">Liên Hệ</a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Banner Slider */}
      <section className="relative h-full md:h-[650px] overflow-hidden">
        <section className="py-20 h-full bg-gradient-to-br from-sky-50 via-blue-100 to-indigo-50 relative overflow-hidden">

          {/* Background blur circles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 right-32 w-40 h-40 bg-gradient-to-r from-blue-300 to-indigo-400 rounded-full opacity-20 blur-3xl animate-float"></div>
            <div className="absolute bottom-20 left-20 w-52 h-52 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full opacity-20 blur-2xl animate-bounce-slow"></div>
          </div>

          {/* Floating images */}
          <Image
            src="./vongQuay.png"
            alt="Skin Liên Quân"
            width={100}
            height={100}
            className="absolute top-24 left-16 animate-float-slow drop-shadow-xl sm:d-none"
          />

          <Image
            src="./lineRight.png"
            alt="Skin"
            width={100}
            height={100}
            className="absolute bottom-28 right-24 animate-bounce-slow drop-shadow-xl"
          />


          <Image
            src="./quanHuy.png"
            alt="Quân Huy"
            width={70}
            height={70}
            className="absolute top-1/2 left-1/4 animate-float drop-shadow-xl"
          />

          {/* Content */}
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex justify-center items-center mb-8">
              <Image
                width={160}
                height={160}
                src="/logoLienQuan.png"
                alt="Liên Quân"
                quality={100}
                className="drop-shadow-xl animate-bounce-slow  hover:scale-110 transition-transform"
              />
            </div>
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 leading-tight">
                Shop Bán Acc <span className="text-blue-600">Liên Quân Mobile</span> Uy Tín
              </h1>
              <p className="text-lg text-gray-600 mb-10">
                Mua bán tài khoản Liên Quân giá rẻ – Nhiều skin hiếm, full tướng, nạp uy tín và giao dịch an toàn 100%.
              </p>

              {/* CTA buttons */}
              <div className="flex justify-center space-x-4">
                <button className="px-8 py-3 sm:px-3 sm:py-2 sm:rounded-sm rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-blue-400/50 hover:scale-105 transition sm:text-base">
                 Danh Sách Acc
                </button>
                <button className="px-8 py-3 sm:px-3 sm:py-2 sm:rounded-sm rounded-2xl border border-blue-500 text-blue-600 font-semibold hover:bg-blue-50 transition  sm:text-base">
                  Liên Hệ Zalo
                </button>
              </div>
            </div>
          </div>
        </section>
      </section>


      {/* Popular Games Section */}


      {/* Flash Sale Section */}



      {/* Flash Sale Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-20 w-24 h-24 bg-gradient-to-r from-orange-300 to-red-300 rounded-full opacity-15 animate-bounce-slow"></div>
          <div className="absolute bottom-10 left-20 w-32 h-32 bg-gradient-to-r from-red-300 to-pink-300 rounded-full opacity-10 animate-float"></div>
          <div className="absolute top-1/3 left-10 w-16 h-16 bg-gradient-to-r from-yellow-300 to-orange-300 transform rotate-45 opacity-20 animate-spin-slow"></div>
        </div>

        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 px-6 py-3 text-lg animate-pulse shadow-xl">
              <Zap className="w-5 h-5 mr-2 animate-bounce" />
              FLASH SALE
            </Badge>

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Giá Sốc <span className="text-red-500">Chỉ Hôm Nay</span>
            </h2>
            <p className="text-gray-600 mb-8">
              Giảm đến 50% các tài khoản VIP - Số lượng có hạn!
            </p>

            <div className="flex items-center justify-center space-x-2 mb-8">
              <span className="text-gray-600">Kết thúc sau:</span>
              <div className="flex space-x-1">
                <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3 rounded-lg font-bold text-xl shadow-lg animate-pulse">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <span className="text-red-500 font-bold text-2xl animate-pulse">:</span>
                <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3 rounded-lg font-bold text-xl shadow-lg animate-pulse">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <span className="text-red-500 font-bold text-2xl animate-pulse">:</span>
                <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3 rounded-lg font-bold text-xl shadow-lg animate-pulse">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 md:px-2 px-[2px]">
  {flashSaleItems.map((item) => (
    <Card
      key={item.id}
      className="group hover:shadow-xl hover:shadow-red-500/20 hover:scale-102 transition-all duration-500 border-0 bg-white hover:bg-gradient-to-br hover:from-white hover:to-red-50"
    >
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <Image
            src={item.image}
            alt={item.name}
            width={400}
            height={200}
            className="w-full h-32 sm:h-40 object-cover group-hover:scale-110 group-hover:-rotate-1 transition-transform duration-700"
          />
          <Badge className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] border-0 animate-pulse shadow-md">
            -{item.discount}%
          </Badge>
          <Badge className="absolute top-2 right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] border-0 animate-bounce shadow-md">
            HOT
          </Badge>
          <div className="absolute bottom-0 left-0">
            <div className="relative bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold text-[10px] px-2 py-0.5 rounded-tr-lg shadow-md">
              Acc Trắng TT
              <div className="absolute -bottom-1 left-0 w-0 h-0 border-l-[6px] border-l-transparent border-t-[6px] border-t-orange-600 opacity-70"></div>
            </div>
          </div>
        </div>

        <div className="p-3 sm:p-4">
          {/* Title */}
          <h3 className="text-sm sm:text-base font-bold mb-1 line-clamp-1">{item.name}</h3>

          {/* Rank */}
          <div className="flex items-center space-x-1 mb-3">
            <Trophy className="w-3 h-3 text-yellow-500" />
            <span className="text-xs sm:text-sm font-medium text-gray-700">
              Rank: {item.category}
            </span>
          </div>

          {/* Extra info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
            <div className="flex items-center space-x-1 bg-blue-50 px-1.5 py-1 rounded-md shadow-sm">
              <Users className="w-3 h-3 text-blue-500" />
              <span className="text-[11px] font-medium text-gray-700">276 Tướng</span>
            </div>
            <div className="flex items-center space-x-1 bg-pink-50 px-1.5 py-1 rounded-md shadow-sm">
              <Star className="w-3 h-3 text-pink-500" />
              <span className="text-[11px] font-medium text-gray-700">326 Skin</span>
            </div>
          </div>

          {/* Price */}
          <div className="mb-3">
            <div className="flex items-center space-x-1 mb-1">
              <span className="md:text-lg text-xs font-bold text-red-500">
                {formatPrice(item.salePrice)}
              </span>
              <span className="text-[11px] sm:text-xs text-gray-400 line-through truncate max-w-[60px] inline-block">
  {formatPrice(item.originalPrice)}
</span>

            </div>
            <p className="text-[11px] sm:text-xs text-green-600 font-medium">
              Tiết kiệm {formatPrice(item.savings)}
            </p>
          </div>

          {/* Bottom row */}
          <div className="flex items-center justify-between">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 hover:shadow-lg hover:scale-105 text-white text-[11px] px-2.5 py-1.5 h-auto transition-all duration-300">
              Mua
              <ChevronRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  ))}
</div>

        </div>
      </section>

      {/* Hot Accounts Section */}
      <section className="py-16 bg-gradient-to-br from-white via-violet-50 to-blue-50 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-28 h-28 bg-gradient-to-r from-violet-200 to-blue-200 rounded-full opacity-10 animate-float-delayed"></div>
          <div className="absolute bottom-32 left-16 w-36 h-36 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full opacity-10 animate-float"></div>
          <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-gradient-to-r from-purple-300 to-pink-300 transform rotate-45 opacity-15 animate-spin-slow"></div>
        </div>

        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tài Khoản <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">Hot Nhất</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Những tài khoản VIP được săn đón nhiều nhất với giá ưu đãi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {hotAccounts.map((account) => (
              <Card key={account.id} className="group hover:shadow-2xl hover:shadow-violet-500/25 hover:-translate-y-4 hover:scale-105 hover:-rotate-1 transition-all duration-500 border-0 bg-white hover:bg-gradient-to-br hover:from-white hover:to-violet-50">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={account.image}
                      alt={account.name}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-125 group-hover:rotate-1 transition-transform duration-700"
                    />
                    <Badge className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 animate-pulse shadow-lg">
                      HOT
                    </Badge>
                    {account.verified && (
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full p-2 animate-bounce shadow-lg">
                        <Award className="w-4 h-4 animate-pulse" />
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-1">{account.name}</h3>
                    <p className="text-sm text-violet-600 font-medium mb-4">{account.category}</p>

                    <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {account.accounts}
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        {account.views}
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-2xl font-bold text-green-600">
                          {formatPrice(account.price)}
                        </span>
                        <span className="text-sm text-gray-400 line-through">
                          {formatPrice(account.originalPrice)}
                        </span>
                      </div>
                      <p className="text-sm text-green-600 font-medium">
                        Tiết kiệm {account.savings}%
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>

                      <Button
                        variant="ghost"
                        className="text-violet-600 hover:text-white hover:bg-gradient-to-r hover:from-violet-600 hover:to-blue-600 hover:shadow-lg hover:scale-110 transition-all duration-300 text-sm px-4 py-2 h-auto"
                      >
                        Chi tiết
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-400 hover:to-blue-400 hover:shadow-2xl hover:scale-110 text-white shadow-lg transition-all duration-300 px-8 py-4 text-lg font-semibold"
            >
              Xem tất cả tài khoản
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-16 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-violet-500/10 to-blue-500/10 rounded-full animate-float"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-violet-500/5 to-blue-500/5 rounded-full animate-pulse"></div>
        </div>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Game Phổ Biến</span>
              </div>
              <p className="text-gray-400 mb-4">
                Nền tảng mua bán tài khoản game uy tín và an toàn hàng đầu Việt Nam.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-700 hover:bg-gradient-to-r hover:from-violet-600 hover:to-blue-600 hover:scale-110 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 shadow-lg">
                  <span className="text-sm font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-gray-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 hover:scale-110 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 shadow-lg">
                  <span className="text-sm font-bold">t</span>
                </div>
                <div className="w-10 h-10 bg-gray-700 hover:bg-gradient-to-r hover:from-pink-500 hover:to-red-500 hover:scale-110 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 shadow-lg">
                  <span className="text-sm font-bold">ig</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Sản Phẩm</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-violet-400 hover:scale-105 transition-all duration-300 inline-block">Liên Quân Mobile</a></li>
                <li><a href="#" className="hover:text-blue-400 hover:scale-105 transition-all duration-300 inline-block">Liên Minh Huyền Thoại</a></li>
                <li><a href="#" className="hover:text-red-400 hover:scale-105 transition-all duration-300 inline-block">Valorant</a></li>
                <li><a href="#" className="hover:text-orange-400 hover:scale-105 transition-all duration-300 inline-block">PUBG Mobile</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Hỗ Trợ</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-green-400 hover:scale-105 transition-all duration-300 inline-block">Trung tâm trợ giúp</a></li>
                <li><a href="#" className="hover:text-blue-400 hover:scale-105 transition-all duration-300 inline-block">Chính sách bảo hành</a></li>
                <li><a href="#" className="hover:text-yellow-400 hover:scale-105 transition-all duration-300 inline-block">Điều khoản sử dụng</a></li>
                <li><a href="#" className="hover:text-purple-400 hover:scale-105 transition-all duration-300 inline-block">Chính sách bảo mật</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Liên Hệ</h3>
              <div className="space-y-2 text-gray-400">
                <p>📧 support@gamephobian.com</p>
                <p>📞 1900 1234 (24/7)</p>
                <p>🕒 Hỗ trợ 24/7</p>
                <p>🏢 Hà Nội, Việt Nam</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © 2024 Game Phổ Biến. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span className="flex items-center">
                <Shield className="w-4 h-4 mr-1 text-green-500 animate-pulse" />
                Bảo mật SSL
              </span>
              <span className="flex items-center">
                <Award className="w-4 h-4 mr-1 text-blue-500 animate-pulse" />
                Uy tín hàng đầu
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}