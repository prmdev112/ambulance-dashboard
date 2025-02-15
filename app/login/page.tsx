"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "@/components/ui/use-toast"

const loginSchema = z.object({
  email: z.string().email("Geçersiz e-posta adresi"),
  password: z.string().min(8, "Şifre en az 8 karakter olmalıdır"),
})

export default function Login() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (error) {
      toast({
        title: "Hata",
        description: error.message,
        variant: "destructive",
      })
    } else {
      const { data: profile } = await supabase
        .from("user_profiles")
        .select("role")
        .eq("id", (await supabase.auth.getUser()).data.user?.id)
        .single()

      if (profile?.role === "admin") {
        router.push("/dashboard")
      } else {
        router.push("/dashboard")
      }
    }
    setLoading(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="w-full max-w-md p-8 space-y-8 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-white">Giriş Yap</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </Button>
        </form>
        <div className="text-center text-white">
          <Link href="/register" className="hover:underline">
            Hesabınız yok mu? Kayıt olun
          </Link>
        </div>
      </div>
    </div>
  )
}

