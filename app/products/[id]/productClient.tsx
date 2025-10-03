"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronRight, Star, Trophy, Users, Search, ChevronLeft, DollarSign, SearchX, TriangleAlert, Layers, CircleArrowOutDownRight, WalletMinimal } from "lucide-react"
import Link from "next/link"
import { getDeposit } from "@/lib/utils"

function formatPrice(num: number) {
  return num.toLocaleString("vi-VN") + "₫"
}

type Category = {
  id: string;
  name: string;
};

type Account = {
  id: string
  code: string
  rank: string
  heroes_count: number
  skins_count: number
  price: number
  fake_price: number
  highlight: string
  is_sale: boolean
  images: string[]
  created_at: string
  category_id: string
  categories: Category | null   // 🔑 chỉ 1 category
}

export default function ProductsPage() {
  const [data, setData] = useState<Account[]>([])
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([])
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [priceRange, setPriceRange] = useState<string>("all")
  const [page, setPage] = useState(1)
  const [pageSize] = useState(8)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const supabase = createClient()
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
        `)

        if (!error && data) {
          const formatted = data.map((item) => ({
            ...item,
            categories: item.categories?.[0] || null, // lấy 1 category duy nhất
          })) as Account[];
        
          setData(formatted);
        }
      setLoading(false)
    }

    const fetchCategories = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.from("categories").select("id,name")
      if (!error && data) setCategories(data)
    }

    fetchData()
    fetchCategories()
  }, [])

  // reset page khi filter/search thay đổi
  useEffect(() => {
    setPage(1)
  }, [selectedCategory, search, priceRange])

  // filter & search
  const filteredData = data.filter((acc) => {
    const matchSearch = acc.code.toLowerCase().includes(search.toLowerCase())
    const matchCategory = selectedCategory === "all" || acc.category_id === selectedCategory

    let matchPrice = true
    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map(Number)
      if (max) matchPrice = acc.price >= min && acc.price <= max
      else matchPrice = acc.price >= min
    }

    return matchSearch && matchCategory && matchPrice
  })

  // phân trang
  const start = (page - 1) * pageSize
  const paginatedData = filteredData.slice(start, start + pageSize)
  const totalPages = Math.ceil(filteredData.length / pageSize)

  // helper render số trang gọn gàng
  const renderPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages)
      } else if (page >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages)
      }
    }
    return pages
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [page])

  return (
    <div className="container mx-auto md:px-4 px-2 py-6 space-y-6">
      <h1 className="text-2xl font-bold">Danh sách sản phẩm</h1>

      {/* search + filter */}
      <div className="flex flex-col md:flex-row gap-3 md:items-center">
        {/* input search */}
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Nhập mã acc..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 rounded-lg border-indigo-500 focus:border-indigo-700 focus:ring-indigo-700 outline-none shadow-sm"
          />
        </div>

        {/* category select */}
        <Select onValueChange={(v) => setSelectedCategory(v)} defaultValue="all">
          <SelectTrigger className="w-full md:w-56 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-300">
            <SelectValue placeholder="Chọn loại" />
          </SelectTrigger>
          <SelectContent className="rounded-lg border shadow-lg">
            <SelectItem value="all" className="hover:bg-indigo-50 cursor-pointer">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-500" />
                Tất Cả Thể Loại
              </div>
            </SelectItem>
            {categories.map((c) => (
              <SelectItem
                key={c.id}
                value={c.id}
                className="hover:bg-indigo-50 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-500" />
                  {c.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* price range select */}
        <Select onValueChange={(v) => setPriceRange(v)} defaultValue="all">
          <SelectTrigger className="w-full md:w-56 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-300">
            <SelectValue placeholder="Chọn khoảng giá" />
          </SelectTrigger>
          <SelectContent className="rounded-lg border shadow-lg">
            <SelectItem value="all">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-indigo-500" />
                Tất cả giá
              </div>
            </SelectItem>
            <SelectItem value="0-50000">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-indigo-500" />
                Dưới 50K
              </div>
            </SelectItem>
            <SelectItem value="50000-200000">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-indigo-500" />
                50K - 200K
              </div>
            </SelectItem>
            <SelectItem value="200000-500000">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-indigo-500" />
                200K - 500K
              </div>
            </SelectItem>
            <SelectItem value="500000-1000000">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-indigo-500" />
                500K - 1 Triệu
              </div>
            </SelectItem>
            <SelectItem value="1000000">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-indigo-500" />
                Trên 1 Triệu
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* grid products */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4 md:gap-6">
        {loading
          ? Array.from({ length: pageSize }).map((_, i) => (
            <Card key={i} className="rounded-xl shadow-md border">
              <CardContent className="p-0">
                <Skeleton className="w-full h-32 sm:h-40 rounded-t-lg" />
                <div className="p-3 sm:p-4 space-y-3">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-8 w-20 rounded-md" />
                </div>
              </CardContent>
            </Card>
          ))
          : paginatedData.length > 0
            ? paginatedData.map((item) => (
              <Link href={`/products/${item.id}`} key={item.id}>
                <Card className="group hover:shadow-xl hover:shadow-blue-500/20 hover:scale-105 transition-all duration-500 border-[1px] border-gray-200 bg-white rounded-xl shadow-md">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <Image
                        src={item.images?.[0]}
                        alt={item.code}
                        width={400}
                        height={200}
                        className="w-full h-32 sm:h-40 object-cover group-hover:scale-110 group-hover:-rotate-1 transition-transform duration-700"
                      />
                      <Badge className="absolute top-2 left-2 bg-gradient-to-r from-indigo-500 to-blue-600 text-white text-[10px] border-0 shadow-md">
                        -
                        {Math.round(
                          ((Number(item.fake_price) - Number(item.price)) / Number(item.fake_price)) * 100
                        )}
                        %
                      </Badge>
                      {item.is_sale && (
                        <Badge className="absolute top-2 right-2 flex items-center space-x-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-lg px-3 py-1 rounded-md">
                          <Star className="w-4 h-4 text-yellow-300 animate-pulse" />
                          <span className="font-bold text-xs">Hot</span>
                        </Badge>
                      )}
                    </div>

                    <div className="p-3 sm:p-4">
                      <h3 className="text-sm sm:text-base font-bold mb-1 line-clamp-1">
                        Mã:{item.code}
                      </h3>

                      <div className="flex items-center space-x-1 mb-3">
                        <Trophy className="w-3 h-3 text-yellow-500" />
                        <span className="text-xs sm:text-sm font-medium text-gray-700">
                          Rank: {item.rank}
                        </span>
                      </div>
                      {/* <div className="flex items-center space-x-1 mb-3 text-xs md:text-sm">
                        <div className="flex items-center gap-1">
                          <CircleArrowOutDownRight className="w-3 h-3 text-yellow-500" />
                          Loại:
                        </div>
                        <span className="text-xs md:text-sm font-bold text-indigo-500">
                          {item.categories ? item.categories.name : ""}
                        </span>
                      </div> */}
                      <div className="grid md:grid-cols-2 grid-cols-1 gap-2 mb-3">
                        <div className="flex items-center space-x-1 bg-blue-50 px-1.5 py-1 rounded-md shadow-sm">
                          <Users className="w-3 h-3 text-blue-500 font-bold" />
                          <span className="text-[11px] text-gray-700 font-bold">
                            {!item.heroes_count  ? "Tướng trong ảnh" : item.heroes_count + " Tướng"}
                          
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 bg-pink-50 px-1.5 py-1 rounded-md shadow-sm">
                          <Star className="w-3 h-3 text-pink-500" />
                          <span className="text-[11px] text-gray-700 font-bold">
                            {!item.skins_count  ? "Skin trong ảnh" : item.skins_count + " Skin"}
                            
                          </span>
                        </div>
                      </div>

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
                        <div className="flex items-center gap-1.5 sm:gap-2 text-red-600 font-semibold 
                text-[10px] sm:text-xs md:text-sm 
                bg-red-50 px-2 sm:px-3 py-1 rounded-md shadow-sm w-fit mt-2">
  <WalletMinimal className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-red-500 animate-heartbeat" />
  <span className="whitespace-nowrap">
    Chỉ cần cọc: {formatPrice(getDeposit(Number(item.price)))}
  </span>
</div>

                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
            : (
              <div className="col-span-full flex flex-col items-center py-16 text-center space-y-4 md:pb-40">
                <div className="relative">
                  <TriangleAlert className="w-16 h-16 text-red-400 animate-pulse" />
                  <div className="absolute inset-0 w-16 h-16 rounded-full border-2 border-red-300 animate-ping opacity-20" />
                </div>
                <p className="font-bold text-xl md:text-2xl bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent animate-fade-in">
                  Rất tiếc, không tìm thấy acc bạn mong muốn 😢
                </p>
                <p className="text-sm md:text-lg text-gray-500 animate-fade-in-up">
                  Hãy thử đổi bộ lọc khác hoặc tìm kiếm lại nhé 💡
                </p>
                <Button
                  variant="outline"
                  className="mt-3 rounded-full px-5 py-2 hover:bg-indigo-50 transition-all"
                  onClick={() => window.location.reload()}
                >
                  Thử lại
                </Button>
              </div>
            )}
      </div>

      {/* pagination */}
      {totalPages > 1 && !loading && filteredData.length > 0 && (
        <div className="flex justify-center items-center gap-2 pt-8 flex-wrap">
          <Button
            variant="outline"
            size="icon"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="rounded-full hover:bg-indigo-50 hover:border-indigo-300 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          {renderPageNumbers().map((p, i) =>
            p === "..." ? (
              <span key={i} className="px-2 text-gray-400">…</span>
            ) : (
              <Button
                key={p}
                variant={p === page ? "default" : "outline"}
                onClick={() => setPage(p as number)}
                className={`w-9 h-9 rounded-full text-sm font-medium transition-all
                  ${p === page
                    ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md"
                    : "hover:bg-indigo-50 hover:border-indigo-300"
                  }`}
              >
                {p}
              </Button>
            )
          )}

          <Button
            variant="outline"
            size="icon"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-full hover:bg-indigo-50 hover:border-indigo-300 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
