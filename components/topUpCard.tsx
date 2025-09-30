"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { createClient } from "@/utils/supabase/client"

const supabase = createClient()

export default function TopUpCard() {
  const [network, setNetwork] = useState("")
  const [denomination, setDenomination] = useState("")
  const [serial, setSerial] = useState("")
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)

  // Validation theo nhà mạng
  const validateCard = () => {
    if (!network || !denomination || !serial || !code) {
      toast.error("Vui lòng điền đầy đủ thông tin")
      return false
    }

    const rules: Record<string, { serial: number[]; code: number[] }> = {
      Viettel: { serial: [11, 14], code: [13, 15] },
      Mobifone: { serial: [12], code: [12, 15] },
      Vinaphone: { serial: [14], code: [14, 15] },
    }

    const rule = rules[network]
    if (!rule) return true

    if (!rule.serial.includes(serial.length)) {
      toast.error(`${network}: Số serial phải có ${rule.serial.join(" hoặc ")} chữ số`)
      return false
    }
    if (!rule.code.includes(code.length)) {
      toast.error(`${network}: Mã thẻ phải có ${rule.code.join(" hoặc ")} chữ số`)
      return false
    }

    if (!/^\d+$/.test(serial) || !/^\d+$/.test(code)) {
      toast.error("Serial và Mã thẻ chỉ được chứa số")
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateCard()) return

    setLoading(true)
    toast.loading("Đang xử lý...")

    const { error } = await supabase.from("cards").insert([
      { network, denomination, serial, code },
    ])

    setLoading(false)
    toast.dismiss()

    if (error) {
      toast.error("Có lỗi xảy ra: " + error.message)
    } else {
      toast.success("Nạp thẻ thành công!")
      setNetwork("")
      setDenomination("")
      setSerial("")
      setCode("")
    }
  }

  return (
    <Card className="border">
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Select value={network} onValueChange={setNetwork} disabled={loading}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn nhà mạng" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Viettel">Viettel</SelectItem>
              <SelectItem value="Mobifone">Mobifone</SelectItem>
              <SelectItem value="Vinaphone">Vinaphone</SelectItem>
            </SelectContent>
          </Select>

          <Select value={denomination} onValueChange={setDenomination} disabled={loading}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn mệnh giá" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10000">10.000₫</SelectItem>
              <SelectItem value="20000">20.000₫</SelectItem>
              <SelectItem value="50000">50.000₫</SelectItem>
              <SelectItem value="100000">100.000₫</SelectItem>
              <SelectItem value="500000">500.000₫</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Số serial"
            value={serial}
            onChange={(e) => setSerial(e.target.value)}
            disabled={loading}
          />
          <Input
            placeholder="Mã thẻ"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={loading}
          />

          <Button type="submit" disabled={loading} className="bg-purple-500 hover:bg-purple-600 text-white">
            {loading ? "Đang xử lý..." : "Nạp thẻ"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
