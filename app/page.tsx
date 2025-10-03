
import { ChevronRight, Star, Users, Zap, Flame, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import AccStore from '@/components/accStore';
import StatsSection from '@/components/StatsSection';
import Link from 'next/link';
import Timer from '@/components/timer';
import { createClient } from '@/utils/supabase/server';
import { formatPrice } from '@/lib/utils';



export default async function Home() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("accounts")
    .select(`
   id,
    code,
    rank,
    heroes_count,
    skins_count,
    price,
    fake_price,
    highlight,
    is_sale,
    images,
    created_at,
    category_id,
    categories (
      id,
      name
    )
  `);





  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">


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
            className="absolute md:top-24 md:left-16 top-4 left-2 animate-float-slow drop-shadow-xl sm:d-none"
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
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button className="px-3 py-2 rounded-md sm:px-8 sm:py-3 sm:rounded-2xl 
                     bg-gradient-to-r from-blue-600 to-indigo-600 
                     text-white font-semibold shadow-lg 
                     hover:shadow-blue-400/50 hover:scale-105 transition 
                     text-sm sm:text-base">
                  <Link href='/products'>
                  Danh Sách Acc
                  </Link>
                </button>

                <button className="px-3 py-2 rounded-md sm:px-8 sm:py-3 sm:rounded-2xl 
                     border border-blue-500 text-blue-600 font-semibold 
                     hover:bg-blue-50 transition 
                     text-sm sm:text-base">
                 <Link href="https://zalo.me/0563275607" target="_blank" className='flex items-center justify-center'>
                 Liên Hệ
                 </Link>
                </button>
              </div>

            </div>
          </div>
        </section>
      </section>

      {/* Flash Sale Section */}
      <section className="md:py-12 py-4 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 relative overflow-hidden">
        <div className="container mx-auto md:px-4 px-[2px]">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 px-6 py-3 text-lg animate-pulse shadow-xl">
              <Zap className="w-5 h-5 mr-2 animate-bounce" /> FLASH SALE
            </Badge>

            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              Giá Sốc <span className="text-red-500">Chỉ Hôm Nay</span>
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8">
              Giảm đến 50% các tài khoản VIP - Số lượng có hạn!
            </p>

            <Timer />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-[6px] gap-y-3 md:gap-6 md:px-2 px-[2px]">
            {data
              ?.filter((acc) => acc.is_sale) // chỉ lấy acc có sale
              .slice(0, 4)
              .map((acc) => (
                <Link key={acc.id} href={`/products/${acc.id}`}>
                  <Card className="group hover:shadow-xl hover:shadow-red-500/20 hover:scale-102 transition-all duration-500 border-0 bg-white hover:bg-gradient-to-br hover:from-white hover:to-red-50">
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <Image
                          src={acc.images?.[0] || "/acc.jpg"}
                          alt={acc.code}
                          width={400}
                          height={200}
                          className="w-full h-32 sm:h-40 object-cover group-hover:scale-110 group-hover:-rotate-1 transition-transform duration-700"
                        />
                        <Badge className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] border-0 animate-pulse shadow-md">
                          Sale
                        </Badge>
                        <div className="absolute bottom-0 left-0">
                          <div className="relative bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold text-[10px] px-2 py-0.5 rounded-tr-lg shadow-md">
                            {acc.categories?.[0]?.name}
                            <div className="absolute -bottom-1 left-0 w-0 h-0 border-l-[6px] border-l-transparent border-t-[6px] border-t-orange-600 opacity-70"></div>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 sm:p-4">
                        {/* Title */}
                        <h3 className="text-sm sm:text-base font-bold mb-1 line-clamp-1 flex items-center justify-between selection: gap-2">
                          Mã:{acc.code}

                          {acc.highlight && (
                            <span className="flex items-center gap-1 text-red-500 font-semibold ">
                              <Flame className="w-4 h-4 text-orange-500 animate-bounce" />
                              {acc.highlight}
                            </span>
                          )}
                        </h3>

                        {/* Rank */}
                        <div className="flex items-center space-x-1 mb-3">
                          <Trophy className="w-3 h-3 text-yellow-500" />
                          <span className="text-xs sm:text-sm font-medium text-gray-700">
                            Rank: {acc.rank}
                          </span>
                        </div>

                        {/* Extra info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                          <div className="flex items-center space-x-2 bg-blue-50 px-1.5 py-1 rounded-md shadow-sm">
                            <Users className="w-3 h-3 text-blue-500 font-bold" />
                            <span className="text-[11px] text-gray-700 font-bold">
                              {acc.heroes_count} Tướng
                            </span>
                          </div>
                          <div className="flex items-center space-x-1 bg-pink-50 px-1.5 py-1 rounded-md shadow-sm">
                            <Star className="w-3 h-3 text-pink-500" />
                            <span className="text-[11px] text-gray-700 font-bold">
                              {acc.skins_count} Skin
                            </span>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="mb-3">
                          <div className="flex items-center space-x-1 mb-1">
                            <span className="md:text-lg text-xs font-bold text-red-500">
                              {formatPrice(Number(acc.price))}
                            </span>
                            {acc.fake_price && (
                              <span className="text-[11px] sm:text-xs text-gray-400 line-through truncate max-w-[60px] inline-block">
                                {formatPrice(Number(acc.fake_price))}
                              </span>
                            )}

                          </div>
                          <p className="text-[11px] sm:text-xs text-green-600 font-medium">
                            Tiết kiệm {formatPrice(Number(acc.fake_price) - Number(acc.price))}
                          </p>
                        </div>

                        {/* Bottom row */}
                        <div className="md:flex items-center justify-between hidden">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-3 h-3 fill-yellow-400 text-yellow-400"
                              />
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
                </Link>
              ))}
          </div>
        </div>
      </section>

      <AccStore />
      {/* Acc Vip  */}
      <section className="md:py-12 py-4 my-10 bg-gradient-to-b from-white via-blue-50 to-red-50 relative overflow-hidden">

        <div className="container mx-auto px-3 md:px-6 relative">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-extrabold mb-3">
              Nick Liên Quân
              <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent animate-text-shine">
                -VIP
              </span>
            </h2>

            <p className="text-gray-600 text-sm md:text-lg">
              Acc hiếm với nhiều tướng, skin độc quyền. Dành cho game thủ muốn khẳng định đẳng cấp ngay khi bắt đầu.

            </p>
          </div>

          {/* Grid list */}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {data
              ?.filter((acc) => acc.category_id === "5a5130a7-dfaa-473f-9259-fbb00b500774")
              .slice(0, 4)
              .map((item) => (
                <Link key={item.id} href={`/products/${item.id}`}>

                  <Card
                    key={item.id}
                    className="group hover:shadow-xl hover:shadow-blue-500/20 hover:scale-105 transition-all duration-500 border-0 bg-white rounded-xl"
                  >
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <Image
                          src={item.images?.[0]}
                          alt={item.code}
                          width={400}
                          height={200}
                          className="w-full h-32 sm:h-40 object-cover group-hover:scale-110 group-hover:-rotate-1 transition-transform duration-700"
                        />
                        {/* Giảm giá % */}
                        <Badge className="absolute top-2 left-2 bg-gradient-to-r from-indigo-500 to-blue-600 text-white text-[10px] border-0 shadow-md">
                          -
                          {Math.round(
                            ((Number(item.fake_price) - Number(item.price)) /
                              Number(item.fake_price)) *
                            100
                          )}
                          %
                        </Badge>

                        {/* Sale hot */}
                        <Badge className="absolute top-2 right-2 flex items-center space-x-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-lg px-3 py-1 rounded-md">
                          <Star className="w-4 h-4 text-yellow-300 animate-pulse" />
                          <span className="font-bold text-xs">Hot</span>
                        </Badge>

                        {/* Tag dưới ảnh */}
                        <div className="absolute bottom-0 left-0">
                          <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-[10px] px-2 py-0.5 rounded-tr-lg shadow-md">
                            Acc Vip
                          </div>
                        </div>
                      </div>

                      <div className="p-3 sm:p-4">
                        {/* Title */}
                        <h3 className="text-sm sm:text-base font-bold mb-1 line-clamp-1">
                          Mã:{item.code}
                        </h3>

                        {/* Rank */}
                        <div className="flex items-center space-x-1 mb-3">
                          <Trophy className="w-3 h-3 text-yellow-500" />
                          <span className="text-xs sm:text-sm font-medium text-gray-700">
                            Rank: {item.rank}
                          </span>
                        </div>

                        {/* Extra info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                          <div className="flex items-center space-x-2 bg-blue-50 px-1.5 py-1 rounded-md shadow-sm">
                            <Users className="w-3 h-3 text-blue-500 font-bold" />
                            <span className="text-[11px] text-gray-700 font-bold">
                              {item.heroes_count} Tướng
                            </span>
                          </div>
                          <div className="flex items-center space-x-1 bg-pink-50 px-1.5 py-1 rounded-md shadow-sm">
                            <Star className="w-3 h-3 text-pink-500" />
                            <span className="text-[11px] text-gray-700 font-bold">
                              {item.skins_count} Skin
                            </span>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="mb-3">
                          <div className="flex items-center space-x-1 mb-1">
                            <span className="md:text-lg text-xs font-bold text-red-500">
                              {formatPrice(item.price)}
                            </span>
                            <span className="text-[11px] sm:text-xs text-gray-400 line-through truncate max-w-[60px] inline-block">
                              {formatPrice(item.fake_price)}
                            </span>
                          </div>
                          <p className="text-[11px] sm:text-xs text-green-600 font-medium">
                            Tiết kiệm {formatPrice(item.fake_price - item.price)}
                          </p>
                        </div>

                        {/* Bottom row */}
                        <div className="md:flex items-center justify-between hidden">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-3 h-3 fill-yellow-400 text-yellow-400"
                              />
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
                </Link>
              ))}
          </div>


        </div>

        <div className="text-center mt-10">
          <Button
            size="lg"
            className="bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-400 hover:to-blue-400 hover:shadow-2xl hover:scale-110 text-white shadow-lg transition-all duration-300 px-8 py-4 text-lg font-semibold"
          >
            <Link href="/products">
              Xem tất cả tài khoản
            </Link>
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>


      {/* acc reg  */}
      <section className="md:py-12 py-6 my-10 bg-gradient-to-b from-white via-blue-50 to-red-50 relative overflow-hidden">

        <div className="container mx-auto px-3 md:px-6 relative">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-extrabold mb-3">
              Nick Liên Quân
              <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent animate-text-shine">
                -Reg
              </span>
            </h2>

            <p className="text-gray-600 text-sm md:text-lg">
              Acc được đăng ký sẵn, chưa tham gia trận đấu nào. Có ít nhất 1 skin VIP.


            </p>
          </div>

          {/* Grid list */}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {data
              ?.filter((acc) => acc.category_id === "e8f69f79-cebf-429e-a7fa-8ab7c55a9da9")
              .slice(0, 4)
              .map((item) => (
                <Link key={item.id} href={`/products/${item.id}`}>

                <Card
                  key={item.id}
                  className="group hover:shadow-xl hover:shadow-blue-500/20 hover:scale-105 transition-all duration-500 border-0 bg-white rounded-xl"
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <Image
                        src={item.images?.[0]}
                        alt={item.code}
                        width={400}
                        height={200}
                        className="w-full h-32 sm:h-40 object-cover group-hover:scale-110 group-hover:-rotate-1 transition-transform duration-700"
                      />
                      {/* Giảm giá % */}
                      <Badge className="absolute top-2 left-2 bg-gradient-to-r from-indigo-500 to-blue-600 text-white text-[10px] border-0 shadow-md">
                        -
                        {Math.round(
                          ((Number(item.fake_price) - Number(item.price)) /
                            Number(item.fake_price)) *
                          100
                        )}
                        %
                      </Badge>

                      {/* Sale hot */}
                      <Badge className="absolute top-2 right-2 flex items-center space-x-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-lg px-3 py-1 rounded-md">
                        <Star className="w-4 h-4 text-yellow-300 animate-pulse" />
                        <span className="font-bold text-xs">Hot</span>
                      </Badge>

                      {/* Tag dưới ảnh */}
                      <div className="absolute bottom-0 left-0">
                        <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-[10px] px-2 py-0.5 rounded-tr-lg shadow-md">
                          Acc Reg
                        </div>
                      </div>
                    </div>

                    <div className="p-3 sm:p-4">
                      {/* Title */}
                      <h3 className="text-sm sm:text-base font-bold mb-1 line-clamp-1">
                        Mã:{item.code}
                      </h3>

                      {/* Rank */}
                      <div className="flex items-center space-x-1 mb-3">
                        <Trophy className="w-3 h-3 text-yellow-500" />
                        <span className="text-xs sm:text-sm font-medium text-gray-700">
                          Rank: {item.rank}
                        </span>
                      </div>

                      {/* Extra info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                        <div className="flex items-center space-x-2 bg-blue-50 px-1.5 py-1 rounded-md shadow-sm">
                          <Users className="w-3 h-3 text-blue-500 font-bold" />
                          <span className="text-[11px] text-gray-700 font-bold">
                            {item.heroes_count} Tướng
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 bg-pink-50 px-1.5 py-1 rounded-md shadow-sm">
                          <Star className="w-3 h-3 text-pink-500" />
                          <span className="text-[11px] text-gray-700 font-bold">
                            {item.skins_count} Skin
                          </span>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="mb-3">
                        <div className="flex items-center space-x-1 mb-1">
                          <span className="md:text-lg text-xs font-bold text-red-500">
                            {formatPrice(item.price)}
                          </span>
                          <span className="text-[11px] sm:text-xs text-gray-400 line-through truncate max-w-[60px] inline-block">
                            {formatPrice(item.fake_price)}
                          </span>
                        </div>
                        <p className="text-[11px] sm:text-xs text-green-600 font-medium">
                          Tiết kiệm {formatPrice(item.fake_price - item.price)}
                        </p>
                      </div>

                      {/* Bottom row */}
                      <div className="md:flex items-center justify-between hidden">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3 h-3 fill-yellow-400 text-yellow-400"
                            />
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
                </Link>

              ))}
          </div>


        </div>

        <div className="text-center mt-10">
          <Button
            size="lg"
            className="bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-400 hover:to-blue-400 hover:shadow-2xl hover:scale-110 text-white shadow-lg transition-all duration-300 px-8 py-4 text-lg font-semibold"
          >
           <Link href="/products">
              Xem tất cả tài khoản
            </Link>
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>


      {/* Acc Trắng Thông Tin  */}
      <section className="md:py-12 py-6 my-10 bg-gradient-to-b from-white via-blue-50 to-red-50 relative overflow-hidden">

        <div className="container mx-auto px-3 md:px-6 relative">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-extrabold mb-3">
              Nick Liên Quân
              <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent animate-text-shine">
                -Trắng Thông Tin
              </span>
            </h2>

            <p className="text-gray-600 text-sm md:text-lg">
              Acc sạch 100%, chưa gắn bất kỳ thông tin nào. Bạn có thể đổi theo ý mình và sử dụng lâu dài, an toàn tuyệt đối.
            </p>
          </div>

          {/* Grid list */}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {data
              ?.filter((acc) => acc.category_id === "f03fa5a8-7609-4c71-a8d8-af2f4ece3d89")
              .slice(0, 4)
              .map((item) => (
                <Link key={item.id} href={`/products/${item.id}`}>

                  <Card
                    key={item.id}
                    className="group hover:shadow-xl hover:shadow-blue-500/20 hover:scale-105 transition-all duration-500 border-0 bg-white rounded-xl"
                  >
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <Image
                          src={item.images?.[0]}
                          alt={item.code}
                          width={400}
                          height={200}
                          className="w-full h-32 sm:h-40 object-cover group-hover:scale-110 group-hover:-rotate-1 transition-transform duration-700"
                        />
                        {/* Giảm giá % */}
                        <Badge className="absolute top-2 left-2 bg-gradient-to-r from-indigo-500 to-blue-600 text-white text-[10px] border-0 shadow-md">
                          -
                          {Math.round(
                            ((Number(item.fake_price) - Number(item.price)) /
                              Number(item.fake_price)) *
                            100
                          )}
                          %
                        </Badge>

                        {/* Sale hot */}
                        <Badge className="absolute top-2 right-2 flex items-center space-x-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-lg px-3 py-1 rounded-md">
                          <Star className="w-4 h-4 text-yellow-300 animate-pulse" />
                          <span className="font-bold text-xs">Hot</span>
                        </Badge>

                        {/* Tag dưới ảnh */}
                        <div className="absolute bottom-0 left-0">
                          <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-[10px] px-2 py-0.5 rounded-tr-lg shadow-md">
                            Acc Trắng TT
                          </div>
                        </div>
                      </div>

                      <div className="p-3 sm:p-4">
                        {/* Title */}
                        <h3 className="text-sm sm:text-base font-bold mb-1 line-clamp-1">
                          Mã:{item.code}
                        </h3>

                        {/* Rank */}
                        <div className="flex items-center space-x-1 mb-3">
                          <Trophy className="w-3 h-3 text-yellow-500" />
                          <span className="text-xs sm:text-sm font-medium text-gray-700">
                            Rank: {item.rank}
                          </span>
                        </div>

                        {/* Extra info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                          <div className="flex items-center space-x-2 bg-blue-50 px-1.5 py-1 rounded-md shadow-sm">
                            <Users className="w-3 h-3 text-blue-500 font-bold" />
                            <span className="text-[11px] text-gray-700 font-bold">
                              {item.heroes_count} Tướng
                            </span>
                          </div>
                          <div className="flex items-center space-x-1 bg-pink-50 px-1.5 py-1 rounded-md shadow-sm">
                            <Star className="w-3 h-3 text-pink-500" />
                            <span className="text-[11px] text-gray-700 font-bold">
                              {item.skins_count} Skin
                            </span>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="mb-3">
                          <div className="flex items-center space-x-1 mb-1">
                            <span className="md:text-lg text-xs font-bold text-red-500">
                              {formatPrice(item.price)}
                            </span>
                            <span className="text-[11px] sm:text-xs text-gray-400 line-through truncate max-w-[60px] inline-block">
                              {formatPrice(item.fake_price)}
                            </span>
                          </div>
                          <p className="text-[11px] sm:text-xs text-green-600 font-medium">
                            Tiết kiệm {formatPrice(item.fake_price - item.price)}
                          </p>
                        </div>

                        {/* Bottom row */}
                        <div className="md:flex items-center justify-between hidden">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-3 h-3 fill-yellow-400 text-yellow-400"
                              />
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
                </Link>
              ))}
          </div>


        </div>

        <div className="text-center mt-10">
          <Button
            size="lg"
            className="bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-400 hover:to-blue-400 hover:shadow-2xl hover:scale-110 text-white shadow-lg transition-all duration-300 px-8 py-4 text-lg font-semibold"
          >
          <Link href="/products">
              Xem tất cả tài khoản
            </Link>
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>


      {/* Acc Trắng Thông Tin  */}
      <section className="md:py-12 py-4 my-10 bg-gradient-to-b from-white via-blue-50 to-red-50 relative overflow-hidden">

        <div className="container mx-auto px-3 md:px-6 relative">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-extrabold mb-3">
              Nick Liên Quân
              <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent animate-text-shine">
                -Có Thông Tin
              </span>
            </h2>

            <p className="text-gray-600 text-sm md:text-lg">
              Acc có sẵn thông tin cơ bản, giá rẻ hơn.</p>
          </div>

          {/* Grid list */}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {data
              ?.filter((acc) => acc.category_id === "32972a69-bb12-4643-ba69-fe68e57116c4")
              .slice(0, 4)
              .map((item) => (
                <Link key={item.id} href={`/products/${item.id}`}>

                  <Card
                    key={item.id}
                    className="group hover:shadow-xl hover:shadow-blue-500/20 hover:scale-105 transition-all duration-500 border-0 bg-white rounded-xl"
                  >
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <Image
                          src={item.images?.[0]}
                          alt={item.code}
                          width={400}
                          height={200}
                          className="w-full h-32 sm:h-40 object-cover group-hover:scale-110 group-hover:-rotate-1 transition-transform duration-700"
                        />
                        {/* Giảm giá % */}
                        <Badge className="absolute top-2 left-2 bg-gradient-to-r from-indigo-500 to-blue-600 text-white text-[10px] border-0 shadow-md">
                          -
                          {Math.round(
                            ((Number(item.fake_price) - Number(item.price)) /
                              Number(item.fake_price)) *
                            100
                          )}
                          %
                        </Badge>

                        {/* Sale hot */}
                        <Badge className="absolute top-2 right-2 flex items-center space-x-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-lg px-3 py-1 rounded-md">
                          <Star className="w-4 h-4 text-yellow-300 animate-pulse" />
                          <span className="font-bold text-xs">Hot</span>
                        </Badge>

                        {/* Tag dưới ảnh */}
                        <div className="absolute bottom-0 left-0">
                          <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-[10px] px-2 py-0.5 rounded-tr-lg shadow-md">
                            Acc Có TT
                          </div>
                        </div>
                      </div>

                      <div className="p-3 sm:p-4">
                        {/* Title */}
                        <h3 className="text-sm sm:text-base font-bold mb-1 line-clamp-1">
                          Mã:{item.code}
                        </h3>

                        {/* Rank */}
                        <div className="flex items-center space-x-1 mb-3">
                          <Trophy className="w-3 h-3 text-yellow-500" />
                          <span className="text-xs sm:text-sm font-medium text-gray-700">
                            Rank: {item.rank}
                          </span>
                        </div>

                        {/* Extra info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                          <div className="flex items-center space-x-2 bg-blue-50 px-1.5 py-1 rounded-md shadow-sm">
                            <Users className="w-3 h-3 text-blue-500 font-bold" />
                            <span className="text-[11px] text-gray-700 font-bold">
                              {item.heroes_count} Tướng
                            </span>
                          </div>
                          <div className="flex items-center space-x-1 bg-pink-50 px-1.5 py-1 rounded-md shadow-sm">
                            <Star className="w-3 h-3 text-pink-500" />
                            <span className="text-[11px] text-gray-700 font-bold">
                              {item.skins_count} Skin
                            </span>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="mb-3">
                          <div className="flex items-center space-x-1 mb-1">
                            <span className="md:text-lg text-xs font-bold text-red-500">
                              {formatPrice(item.price)}
                            </span>
                            <span className="text-[11px] sm:text-xs text-gray-400 line-through truncate max-w-[60px] inline-block">
                              {formatPrice(item.fake_price)}
                            </span>
                          </div>
                          <p className="text-[11px] sm:text-xs text-green-600 font-medium">
                            Tiết kiệm {formatPrice(item.fake_price - item.price)}
                          </p>
                        </div>

                        {/* Bottom row */}
                        <div className="md:flex items-center justify-between hidden">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-3 h-3 fill-yellow-400 text-yellow-400"
                              />
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
                </Link>
              ))}
          </div>


        </div>

        <div className="text-center mt-10">
          <Button
            size="lg"
            className="bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-400 hover:to-blue-400 hover:shadow-2xl hover:scale-110 text-white shadow-lg transition-all duration-300 px-8 py-4 text-lg font-semibold"
          >
           <Link href="/products">
              Xem tất cả tài khoản
            </Link>
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>






      <StatsSection />
      {/* Footer */}

    </div>
  );
}