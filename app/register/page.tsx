"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "@/components/ui/use-toast"

const registerSchema = z.object({
  email: z.string().email("Geçersiz e-posta adresi"),
  password: z
    .string()
    .min(8, "Şifre en az 8 karakter olmalıdır")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Şifre en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir",
    ),
  fullName: z.string().min(2, "Ad Soyad en az 2 karakter olmalıdır"),
})

export default function Register() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
        },
      },
    })

    if (error) {
      toast({
        title: "Hata",
        description: error.message,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Başarılı",
        description: "Kayıt işleminiz tamamlandı. Lütfen e-postanızı kontrol edin.",
      })
      router.push("/login")
    }
    setLoading(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="w-full max-w-md p-8 space-y-8 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-white">Kayıt Ol</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-white">
              Ad Soyad
            </Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Ad Soyad"
              {...register("fullName")}
              className="w-full px-3 py-2 text-gray-700 bg-white bg-opacity-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              E-posta
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="ornek@email.com"
              {...register("email")}
              className="w-full px-3 py-2 text-gray-700 bg-white bg-opacity-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">
              Şifre
            </Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              className="w-full px-3 py-2 text-gray-700 bg-white bg-opacity-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Kaydediliyor..." : "Kayıt Ol"}
          </Button>
        </form>
      </div>
    </div>
  )
}

