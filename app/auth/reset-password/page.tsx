"use client"

import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Check } from "lucide-react"
import { PasswordInput } from "../signin/components/PasswordInput"

export default function ResetPasswordPage() {
    const sp = useSearchParams()
    const token = sp.get("token") || ""
    const router = useRouter()

    const [password, setPassword] = React.useState("")
    const [confirm, setConfirm] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState("")
    const [success, setSuccess] = React.useState(false)

    const submit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        if (!token) return setError("Invalid or missing token.")
        if (password.length < 8) return setError("Password must be at least 8 characters")
        if (password !== confirm) return setError("Passwords do not match")

        setIsLoading(true)
        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data?.error || "Failed to reset password")
            setSuccess(true)
            // optional: redirect to sign-in after a short delay
            // router.push("/auth/signin")
        } catch (err: any) {
            setError(err?.message || "Something went wrong. Please try again.")
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
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Password updated</h2>
                        <p className="text-gray-600">You can now sign in with your new password.</p>
                        <Button className="mt-6" onClick={() => router.push("/auth/signin")}>
                            Go to Sign In
                        </Button>
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
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Set a new password</h1>
                    <p className="text-gray-600">Enter your new password below.</p>
                </div>

                <Card className="shadow-xl border-0">
                    <CardHeader className="space-y-1 pb-4">
                        <CardTitle className="text-2xl text-center">Reset password</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {error && (
                            <Alert className="border-red-200 bg-red-50" aria-live="polite">
                                <AlertDescription className="text-red-700">{error}</AlertDescription>
                            </Alert>
                        )}

                        <form onSubmit={submit} className="space-y-4" noValidate>
                            <PasswordInput
                                id="password"
                                label="New password"
                                placeholder="Create a password (min. 8 characters)"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="new-password"
                                required
                            />

                            <PasswordInput
                                id="confirm"
                                label="Confirm password"
                                placeholder="Confirm your password"
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                autoComplete="new-password"
                                required
                            />

                            <Button type="submit" disabled={isLoading} className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-base font-medium">
                                {isLoading ? "Saving..." : "Update password"}
                            </Button>

                            <div className="text-center">
                                <Link href="/auth/signin" className="text-sm text-blue-600 hover:underline">Back to sign in</Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
