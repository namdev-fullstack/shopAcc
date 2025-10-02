"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronRight, Star, Trophy, Users, Search, ChevronLeft } from "lucide-react"
import Link from "next/link"

function formatPrice(num: number) {
  return num.toLocaleString("vi-VN") + "₫"
}

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
  categories: { id: string; name: string }[] | null
}

export default function ProductsPage() {
  const [data, setData] = useState<Account[]>([])
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([])
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [page, setPage] = useState(1)
  const [pageSize] = useState(8)

  useEffect(() => {
    const fetchData = async () => {
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

      if (error) {
        console.error(error)
        return
      }
      setData(data as Account[])
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
  }, [selectedCategory, search])

  // filter & search
  const filteredData = data.filter((acc) => {
    const matchSearch = acc.code.toLowerCase().includes(search.toLowerCase())
    const matchCategory = selectedCategory === "all" || acc.category_id === selectedCategory
    return matchSearch && matchCategory
  })

  // phân trang
  const start = (page - 1) * pageSize
  const paginatedData = filteredData.slice(start, start + pageSize)
  const totalPages = Math.ceil(filteredData.length / pageSize)
  // Mỗi lần đổi page -> scroll lên đầu
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [page])
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold">Danh sách sản phẩm</h1>

      {/* search + filter */}
      <div className="flex flex-col md:flex-row gap-3 md:items-center">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Tìm theo mã acc..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>

        <Select onValueChange={(v) => setSelectedCategory(v)} defaultValue="all">
          <SelectTrigger className="w-full md:w-56">
            <SelectValue placeholder="Chọn loại" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* grid products */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
        {paginatedData.map((item) => (
          <Link href={`/products/${item.id}`} key={item.id}>
            <Card
              key={item.id}
              className="group hover:shadow-xl hover:shadow-blue-500/20 hover:scale-105 transition-all duration-500 border-[1px] border-gray-200 bg-white rounded-xl shadow-md"
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
                      ((Number(item.fake_price) - Number(item.price)) / Number(item.fake_price)) * 100
                    )}
                    %
                  </Badge>

                  {/* Hot */}
                  {item.is_sale && (
                    <Badge className="absolute top-2 right-2 flex items-center space-x-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-lg px-3 py-1 rounded-md">
                      <Star className="w-4 h-4 text-yellow-300 animate-pulse" />
                      <span className="font-bold text-xs">Hot</span>
                    </Badge>
                  )}
                </div>

                <div className="p-3 sm:p-4">
                  <h3 className="text-sm sm:text-base font-bold mb-1 line-clamp-1">Mã:{item.code}</h3>

                  <div className="flex items-center space-x-1 mb-3">
                    <Trophy className="w-3 h-3 text-yellow-500" />
                    <span className="text-xs sm:text-sm font-medium text-gray-700">
                      Rank: {item.rank}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 grid-cols-1 gap-2 mb-3">
                    <div className="flex items-center space-x-1 bg-blue-50 px-1.5 py-1 rounded-md shadow-sm">
                      <Users className="w-3 h-3 text-blue-500 font-bold" />
                      <span className="text-[11px] text-gray-700 font-bold">{item.heroes_count} Tướng</span>
                    </div>
                    <div className="flex items-center space-x-1 bg-pink-50 px-1.5 py-1 rounded-md shadow-sm">
                      <Star className="w-3 h-3 text-pink-500" />
                      <span className="text-[11px] text-gray-700 font-bold">{item.skins_count} Skin</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex items-center space-x-1 mb-1">
                      <span className="md:text-lg text-xs font-bold text-red-500">{formatPrice(item.price)}</span>
                      <span className="text-[11px] sm:text-xs text-gray-400 line-through truncate max-w-[60px] inline-block">
                        {formatPrice(item.fake_price)}
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-green-600 font-medium">
                      Tiết kiệm {formatPrice(item.fake_price - item.price)}
                    </p>
                  </div>

                  <div className="md:flex items-center justify-between hidden">
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
          </Link>
        ))}
      </div>

      {/* pagination */}
     
<div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
  {/* Nút trước */}
  <Button
    variant="outline"
    size="icon"
    disabled={page === 1}
    onClick={() => setPage((p) => p - 1)}
    className="rounded-full hover:bg-indigo-50 hover:border-indigo-300 transition-colors"
  >
    <ChevronLeft className="w-4 h-4" />
  </Button>

  {/* Các số trang */}
  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
    <Button
      key={p}
      variant={p === page ? "default" : "outline"}
      onClick={() => setPage(p)}
      className={`w-9 h-9 rounded-full text-sm font-medium transition-all
        ${p === page
          ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md"
          : "hover:bg-indigo-50 hover:border-indigo-300"
        }`}
    >
      {p}
    </Button>
  ))}

  {/* Nút sau */}
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
    </div>
  )
}
