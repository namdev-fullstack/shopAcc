'use client'

import Image from "next/image"
import { use, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/acc1.jpg",
  "/acc.jpg",
  "/acc1.jpg",
]

export default function DetailPage({
  id,
}: { id: string|number }) {
  

 
  const [selected, setSelected] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
  
      {/* Ảnh chính */}
      <div className="flex flex-col gap-4">
        <motion.div
          key={selected}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl overflow-hidden shadow-lg"
        >
          <Image
            src={images[selected]}
            alt="Ảnh sản phẩm"
            width={600}
            height={400}
            onClick={() => setIsOpen(true)}
            className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
          />
        </motion.div>

        {/* Thumbnails */}
        <div className="flex gap-3">
          {images.map((img, i) => (
            <div
              key={i}
              onClick={() => setSelected(i)}
              className={`rounded-xl overflow-hidden cursor-pointer border-2 transition 
              ${selected === i ? "border-pink-500" : "border-transparent"}`}
            >
              <Image
                src={img}
                alt={`Ảnh ${i}`}
                width={100}
                height={80}
                className="object-cover w-24 h-20 hover:opacity-80"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal phóng to ảnh */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()} // tránh tắt khi click vào ảnh
            >
              <Image
                src={images[selected]}
                alt="Ảnh phóng to"
                width={1200}
                height={800}
                className="w-full h-auto rounded-xl object-contain"
              />
              <button
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-200"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Thông tin acc */}
           {/* Thông tin acc */}
           <div className="flex flex-col gap-5">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold">
          Acc Liên Quân Tự Chọn FlashSale
        </h1>
        <p>Mã: <span className="font-semibold">#djdg36</span></p>
       
        <p className="text-gray-500 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-yellow-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16" />
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
          </svg>
          Rank: <span className="font-semibold">Cao Thủ</span> |{" "}
          <span className="text-pink-500">Đổi được thông tin</span>
        </p>

        {/* Giá */}
        <div className="flex items-center gap-4">
          <span className="text-gray-400 line-through text-lg">750.000đ</span>
          <span className="text-base text-blue-600">ATM-MOMO</span>
          <span className="text-3xl font-bold text-pink-600">320.000đ</span>
          <span className="text-sm text-white bg-pink-500 px-2 py-1 rounded-lg">
            -57%
          </span>
        </div>

        {/* Block chi tiết */}
        <Card className="p-4">
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex items-center gap-2 bg-blue-50 px-2 py-1 rounded-md shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span className="text-sm font-bold text-gray-700">18 Tướng</span>
            </div>
            <div className="flex items-center gap-2 bg-pink-50 px-2 py-1 rounded-md shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3 text-pink-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span className="text-sm font-bold text-gray-700">9 Trang phục</span>
            </div>
            <div className="flex items-center gap-2 bg-green-50 px-2 py-1 rounded-md shadow-sm">
              <span className="text-green-600 text-sm font-bold">Tỷ lệ thắng 100%</span>
            </div>
            <div className="flex items-center gap-2 bg-yellow-50 px-2 py-1 rounded-md shadow-sm">
              <span className="text-yellow-600 text-sm font-bold">Murad chí tôn</span>
            </div>
          </CardContent>
        </Card>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <Button className="bg-blue-600 hover:bg-blue-700 w-full">
            Mua Ngay (chỉ cần trả trước 20%)
          </Button>
          <Button className="bg-gradient-to-r from-pink-500 to-red-500 hover:opacity-90 w-full">
            Mua bằng THẺ CÀO (CARD) (488.000đ)
          </Button>
        </div>
      </div>

    </div>
  )
}
