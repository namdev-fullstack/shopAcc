"use client"

import { useState, useEffect, useRef } from "react"
import { createClient } from "@/utils/supabase/client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

// Hàm random code 5 ký tự
function generateCode(length = 5) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let result = ""
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export default function AddProductPage() {

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const supabase = createClient()

  const [categories, setCategories] = useState<{ id: string; name: string }[]>([])
  const [form, setForm] = useState({
    code: generateCode(),
    rank: "Cao Thủ",
        price: "1390000",
        fake_price: "3990000",
        heroes_count: "",
        skins_count: "",
        imageUrl: "",
        category_id: "32972a69-bb12-4643-ba69-fe68e57116c4",
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from("categories").select("id, name")
      if (!error && data) setCategories(data)
    }
    fetchCategories()
  }, [supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    const { code, rank, price, fake_price, heroes_count, skins_count, imageUrl, category_id } = form

    const { error } = await supabase.from("accounts").insert([
      {
        code,
        rank,
        price: Number(price),
        fake_price: Number(fake_price),
        heroes_count: Number(heroes_count),
        skins_count: Number(skins_count),
        images: [imageUrl], // array
        category_id,
        is_sale: false, // mặc định
        highlight: "",
      },
    ])

    if (error) {
      toast.error("❌ Lỗi: " + error.message)
    } else {
        toast.success("🎉 Thêm tài khoản thành công!")
        window.location.reload()
      setForm({
        code: generateCode(),
        rank: "Đồng",
        price: "",
        fake_price: "",
        heroes_count: "",
        skins_count: "",
        imageUrl: "",
        category_id: "",
      })
    }

    setLoading(false)
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Thêm tài khoản mới</h1>
      {message && <p className="text-sm">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Mã code</Label>
          <Input value={form.code} readOnly />
        </div>

        <div>
          <Label>Rank</Label>
          <Select
            value={form.rank}
            onValueChange={(v) => setForm((f) => ({ ...f, rank: v }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Chọn rank" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Đồng">Đồng</SelectItem>
              <SelectItem value="Kim Cương">Kim Cương</SelectItem>
              <SelectItem value="Tinh Anh">Tinh Anh</SelectItem>
              <SelectItem value="Cao Thủ">Cao Thủ</SelectItem>
              <SelectItem value="Chiến Tướng">Chiến Tướng</SelectItem>
              <SelectItem value="Chiến Thần">Chiến Thần</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Giá thật</Label>
            <Input
              type="number"
              value={form.price}
              onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
            />
          </div>
          <div>
            <Label>Giá ảo</Label>
            <Input
              type="number"
              value={form.fake_price}
              onChange={(e) => setForm((f) => ({ ...f, fake_price: e.target.value }))}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Tướng</Label>
            <Input
              type="number"
              value={form.heroes_count}
              onChange={(e) => setForm((f) => ({ ...f, heroes_count: e.target.value }))}
            />
          </div>
          <div>
            <Label>Skin</Label>
            <Input
              type="number"
              value={form.skins_count}
              onChange={(e) => setForm((f) => ({ ...f, skins_count: e.target.value }))}
            />
          </div>
        </div>

        <div>
          <Label>Ảnh (URL)</Label>
          <Input
            type="text"
            ref={inputRef}
            value={form.imageUrl}
            onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
            placeholder="https://..."
          />
        </div>

        <div>
          <Label>Thể loại</Label>
          <Select
            value={form.category_id}
            onValueChange={(v) => setForm((f) => ({ ...f, category_id: v }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Chọn thể loại" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Đang thêm..." : "Thêm sản phẩm"}
        </Button>
      </form>
    </div>
  )
}
