"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plane, Mail, ArrowLeft, Check } from "lucide-react"

export default function ForgotPasswordPage() {
    const [email, setEmail] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState("")
    const [success, setSuccess] = React.useState(false)
    const router = useRouter()

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        if (!email.trim()) return setError("Email is required")
        if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Invalid email address")

        setIsLoading(true)
        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            })
            // We always show success even if the email isn't registered (do not leak)
            if (!res.ok) {
                const data = await res.json().catch(() => ({}))
                if (data?.error) console.error(data.error)
            }
            setSuccess(true)
        } catch {
            // Still show success to avoid enumeration; only log locally
            setSuccess(true)
        } finally {
            setIsLoading(false)
        }
    }

    if (success) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
                <Card className="w-full max-w-md shadow-xl border-0">
                    <CardContent className="p-8 text-center">
                        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Check className="h-8 w-8 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Check your email</h2>
                        <p className="text-gray-600">
                            If an account exists for <span className="font-medium">{email}</span>, we sent a reset link.
                            It expires in 60 minutes.
                        </p>
                        <Button onClick={() => router.push("/auth/signin")} className="mt-6">Back to Sign In</Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Home
                    </Link>

                    <div className="flex items-center justify-center mb-4">
                        <div className="bg-blue-600 p-3 rounded-full">
                            <Plane className="h-8 w-8 text-white" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Forgot password</h1>
                    <p className="text-gray-600">We’ll email you a link to reset it.</p>
                </div>

                <Card className="shadow-xl border-0">
                    <CardHeader className="space-y-1 pb-4">
                        <CardTitle className="text-2xl text-center">Reset your password</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {error && (
                            <Alert className="border-red-200 bg-red-50" aria-live="polite">
                                <AlertDescription className="text-red-700">{error}</AlertDescription>
                            </Alert>
                        )}

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <Separator className="w-full" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-gray-500">Send reset link</span>
                            </div>
                        </div>

                        <form onSubmit={onSubmit} className="space-y-4" noValidate>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="email"
                                        type="email"
                                        inputMode="email"
                                        autoComplete="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10 h-12"
                                        required
                                    />
                                </div>
                            </div>

                            <Button type="submit" disabled={isLoading || !email} className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-base font-medium">
                                {isLoading ? "Sending..." : "Email me a reset link"}
                            </Button>

                            <div className="text-center">
                                <Link href="/auth/signin" className="text-sm text-blue-600 hover:underline">
                                    Back to sign in
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
