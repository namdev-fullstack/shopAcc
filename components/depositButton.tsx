"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogTrigger,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCode, CreditCard, Wallet, Copy, Loader2 } from "lucide-react";

import TopUpCard from "./topUpCard";
import { useAuth } from "@/context/AuthContext";

export default function DepositButton() {
    const { user } = useAuth();
    const accountNumber = "0711000316522";
    const [copied, setCopied] = useState(false);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            })
            .catch(() => setCopied(false));
    };

    // Lấy email trước @ nếu có user
    const displayEmail = user?.email || "";

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:scale-105 hover:shadow-lg transition-all text-white">
                    <Wallet className="w-4 h-4" />
                    Nạp tiền
                </Button>
            </AlertDialogTrigger>
{user && user ?(
            <AlertDialogContent className="max-w-lg">
                <AlertDialogHeader>
                    <AlertDialogTitle>Nạp tiền</AlertDialogTitle>
                    <AlertDialogDescription>Chọn phương thức nạp tiền</AlertDialogDescription>
                </AlertDialogHeader>

                <Tabs defaultValue="qr" className="mt-4">
                    <TabsList>
                        <TabsTrigger value="qr" className="flex items-center gap-2">
                            <QrCode className="h-4 w-4 text-green-400" /> QR chuyển khoản
                        </TabsTrigger>
                        <TabsTrigger value="card" className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4 text-blue-400" /> Thẻ cào
                        </TabsTrigger>
                    </TabsList>

                    {/* QR chuyển khoản */}
                    <TabsContent value="qr" className="mt-4">
                        <Card className="border">
                            <CardContent className="flex flex-col items-center gap-4">
                                <div className="w-40 h-50 bg-gray-200 flex items-center justify-center text-gray-500">
                                    <Image
                                        src="/qr.jpg" // đặt qr.jpg trong thư mục public
                                        width={250}
                                        height={250}
                                        quality={100}
                                        alt="QR code"
                                    />
                                </div>
                                <div className="w-full space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span>Ngân Hàng:</span>
                                        <span className="font-semibold">Vietcombank</span>
                                    </div>
                                </div>
                                <div className="w-full space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span>Chủ Tk:</span>
                                        <span className="font-semibold">Nguyễn Văn Nam</span>
                                    </div>
                                </div>
                                <div className="w-full space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span>Tài khoản:</span>
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold">{accountNumber}</span>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="flex items-center gap-1"
                                                onClick={() => handleCopy(accountNumber)}
                                            >
                                                <Copy className="w-4 h-4" /> {copied ? "Đã copy" : "Copy"}
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span>Nội dung chuyển khoản:</span>
                                        <span className="font-semibold">{displayEmail}</span>
                                    </div>
                                </div>
                                <div className="w-full bg-green-500 text-white text-center py-2 rounded-lg flex items-center justify-center gap-2">
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>Đợi thanh toán</span>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Nạp thẻ cào */}
                    <TabsContent value="card" className="mt-4">
                        <TopUpCard />
                    </TabsContent>
                </Tabs>

                <AlertDialogFooter className="mt-4">
                    <AlertDialogCancel asChild>
                        <Button variant="outline" className="w-full">
                            Đóng
                        </Button>
                    </AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
) : (
    <AlertDialogContent className="max-w-lg">
        <AlertDialogHeader>
            <AlertDialogTitle>Nạp tiền</AlertDialogTitle>
            <AlertDialogDescription className="text-green-500 font-bold text-lg">Đăng nhập hoặc Đăng ký để nạp tiền</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4">
            <AlertDialogCancel asChild>
                <Button variant="outline" className="w-full">
                    Đóng
                </Button>
            </AlertDialogCancel>
        </AlertDialogFooter>
    </AlertDialogContent>
)}
        </AlertDialog>
    );
}
