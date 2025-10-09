"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Plane, Mail, ArrowLeft, User, Check } from "lucide-react"
import { OAuthButtons } from "../signin/components/OAuthButtons"
import { PasswordInput } from "../signin/components/PasswordInput"

export default function SignUpPage() {
  const [form, setForm] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [acceptTerms, setAcceptTerms] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState("")
  const [success, setSuccess] = React.useState(false)

  const router = useRouter()

  const onChange = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }))

  const validate = () => {
    if (!form.firstName.trim()) return "First name is required"
    if (!form.lastName.trim()) return "Last name is required"
    if (!form.email.trim()) return "Email is required"
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Invalid email address"
    if (form.password.length < 8) return "Password must be at least 8 characters"
    if (form.password !== form.confirmPassword) return "Passwords do not match"
    if (!acceptTerms) return "Please accept the terms and conditions"
    return ""
  }

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const v = validate()
    if (v) {
      setError(v)
      return
    }

    setIsLoading(true)
    try {
      // Your API route will create the user
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          password: form.password,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Failed to create account")

      setSuccess(true)

      // Auto sign-in
      const result = await signIn("credentials", {
        email: form.email,
        password: form.password,
        callbackUrl: "/",
        redirect: true,
      })
      if (result?.ok && !result.error) router.push("/")
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.")
      setSuccess(false)
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
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Created!</h2>
              <p className="text-gray-600 mb-4">Welcome to WanderWise! You&apos;re being signed in automatically…</p>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto" />
            </CardContent>
          </Card>
        </div>
    )
  }

  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header */}
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Join WanderWise</h1>
            <p className="text-gray-600">Create your account and start exploring</p>
          </div>

          <Card className="shadow-xl border-0">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertDescription className="text-red-700">{error}</AlertDescription>
                  </Alert>
              )}

              <OAuthButtons disabled={isLoading} />

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or continue with email</span>
                </div>
              </div>

              <form onSubmit={handleEmailSignUp} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                        id="firstName"
                        type="text"
                        autoComplete="given-name"
                        placeholder="John"
                        value={form.firstName}
                        onChange={onChange("firstName")}
                        required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                        id="lastName"
                        type="text"
                        autoComplete="family-name"
                        placeholder="Doe"
                        value={form.lastName}
                        onChange={onChange("lastName")}
                        required
                    />
                  </div>
                </div>


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
                        value={form.email}
                        onChange={onChange("email")}
                        className="pl-10 h-12"
                        required
                    />
                  </div>
                </div>

                <PasswordInput
                    id="password"
                    label="Password"
                    placeholder="Create a password (min. 8 characters)"
                    value={form.password}
                    onChange={onChange("password")}
                    autoComplete="new-password"
                    required
                />

                <PasswordInput
                    id="confirmPassword"
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    value={form.confirmPassword}
                    onChange={onChange("confirmPassword")}
                    autoComplete="new-password"
                    required
                />

                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" checked={acceptTerms} onCheckedChange={(v) => setAcceptTerms(Boolean(v))} />
                  <Label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the{" "}
                    <Link href="/legal/terms" className="text-blue-600 hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/legal/privacy" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <Button type="submit" disabled={isLoading} className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-base font-medium">
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>

              <div className="text-center pt-4 border-t">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link href="/auth/signin" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  )
}
