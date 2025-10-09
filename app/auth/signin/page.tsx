// "use client"
//
// import type React from "react"
//
// import { useState } from "react"
// import { signIn } from "next-auth/react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Separator } from "@/components/ui/separator"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { Plane, Mail, Eye, EyeOff, ArrowLeft } from "lucide-react"
// import Link from "next/link"
// import { useRouter, useSearchParams } from "next/navigation"
//
// export default function SignInPage() {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [showPassword, setShowPassword] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState("")
//
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const callbackUrl = searchParams.get("callbackUrl") || "/"
//
//   const handleEmailSignIn = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)
//     setError("")
//
//     try {
//       const result = await signIn("credentials", {
//         email,
//         password,
//         redirect: false,
//         callbackUrl,
//       })
//
//       if (!result) {
//         setError("Unexpected error. Please try again.")
//       } else if (result.error) {
//         // NextAuth за погрешни креденцијали најчесто враќа "CredentialsSignin"
//         setError(result.error === "CredentialsSignin" ? "Invalid email or password" : result.error)
//       } else {
//         // ако NextAuth врати url – користи го, инаку падни на callbackUrl
//         router.push(result.url ?? callbackUrl)
//       }
//     } catch {
//       setError("Something went wrong. Please try again.")
//     } finally {
//       setIsLoading(false)
//     }
//   }
//
//   const handleGoogleSignIn = async () => {
//     setIsLoading(true)
//     try {
//       await signIn("google", { callbackUrl })
//     } catch {
//       setError("Failed to sign in with Google")
//       setIsLoading(false)
//     }
//   }
//
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
//             <ArrowLeft className="h-4 w-4 mr-2" />
//             Back to Home
//           </Link>
//
//           <div className="flex items-center justify-center mb-4">
//             <div className="bg-blue-600 p-3 rounded-full">
//               <Plane className="h-8 w-8 text-white" />
//             </div>
//           </div>
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
//           <p className="text-gray-600">Sign in to your WanderWise account</p>
//         </div>
//
//         <Card className="shadow-xl border-0">
//           <CardHeader className="space-y-1 pb-4">
//             <CardTitle className="text-2xl text-center">Sign In</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             {/* Error Alert */}
//             {error && (
//               <Alert className="border-red-2 00 bg-red-50" aria-live="polite">
//                 <AlertDescription className="text-red-700">{error}</AlertDescription>
//               </Alert>
//             )}
//
//             {/* Google Sign In */}
//             <Button
//               onClick={handleGoogleSignIn}
//               disabled={isLoading}
//               variant="outline"
//               className="w-full h-12 text-base font-medium border-gray-300 hover:bg-gray-50 bg-transparent"
//             >
//               <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
//                 <path
//                   fill="currentColor"
//                   d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                 />
//                 <path
//                   fill="currentColor"
//                   d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                 />
//                 <path
//                   fill="currentColor"
//                   d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93л2.85-2.22.81-.62z"
//                 />
//                 <path
//                   fill="currentColor"
//                   d="M12 5.38c1.62 0 3.06.56 4.21 1.64л3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07л3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                 />
//               </svg>
//               Continue with Google
//             </Button>
//
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <Separator className="w-full" />
//               </div>
//               <div className="relative flex justify-center text-xs uppercase">
//                 <span className="bg-white px-2 text-gray-500">Or continue with email</span>
//               </div>
//             </div>
//
//             {/* Email Sign In Form */}
//             <form onSubmit={handleEmailSignIn} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email</Label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                   <Input
//                     id="email"
//                     type="email"
//                     placeholder="your@email.com"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="pl-10 h-12"
//                     required
//                   />
//                 </div>
//               </div>
//
//               <div className="space-y-2">
//                 <Label htmlFor="password">Password</Label>
//                 <div className="relative">
//                   <Input
//                     id="password"
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Enter your password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="pr-10 h-12"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                   >
//                     {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                   </button>
//                 </div>
//               </div>
//
//               <div className="flex items-center justify-between">
//                 <Link
//                   href="/auth/forgot-password"
//                   className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
//                 >
//                   Forgot password?
//                 </Link>
//               </div>
//
//               <Button
//                 type="submit"
//                 disabled={isLoading || !email || !password}
//                 className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-base font-medium"
//               >
//                 {isLoading ? "Signing in..." : "Sign In"}
//               </Button>
//             </form>
//
//             {/* Sign Up Link */}
//             <div className="text-center pt-4 border-t">
//               <p className="text-sm text-gray-600">
//                 Don't have an account?{" "}
//                 <Link href="/auth/signup" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
//                   Sign up
//                 </Link>
//               </p>
//             </div>
//           </CardContent>
//         </Card>
//
//         {/* Footer */}
//         <div className="text-center mt-8">
//           <p className="text-xs text-gray-500">
//             By signing in, you agree to our{" "}
//             <Link href="/legal/terms" className="hover:underline">
//               Terms of Service
//             </Link>{" "}
//             and{" "}
//             <Link href="/legal/privacy" className="hover:underline">
//               Privacy Policy
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }


"use client"

import * as React from "react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plane, Mail, ArrowLeft } from "lucide-react"
import { OAuthButtons } from "./components/OAuthButtons"
import { PasswordInput } from "./components/PasswordInput"
import {useEffect} from "react";

function getCallbackUrl(sp: ReturnType<typeof useSearchParams>) {
  const fromParam = sp.get("callbackUrl")
  if (fromParam && fromParam.startsWith("/")) return fromParam
  return "/"
}

export default function SignInPage() {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState("")

  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = getCallbackUrl(searchParams)

  useEffect(() => {
    const err = searchParams.get("error")
    if (!err) return
    if (err === "CredentialsSignin") setError("Invalid email or password")
    else if (err === "OAuthAccountNotLinked") setError("Email already used with different provider")
    else setError(err)
  }, [searchParams])

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!email || !password) return

    setIsLoading(true)
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/",
      })
      if (!res) {
        setError("Unexpected error. Please try again.")
      } else if (res.error) {
        setError(res.error === "CredentialsSignin" ? "Invalid email or password" : res.error)
      } else {
        router.push(res.url ?? callbackUrl)
      }
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your WanderWise account</p>
          </div>

          <Card className="shadow-xl border-0">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl text-center">Sign In</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {error && (
                  <Alert className="border-red-200 bg-red-50" aria-live="polite">
                    <AlertDescription className="text-red-700">{error}</AlertDescription>
                  </Alert>
              )}

              <OAuthButtons disabled={isLoading} callbackUrl={callbackUrl} />

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or continue with email</span>
                </div>
              </div>

              <form onSubmit={handleEmailSignIn} className="space-y-4" noValidate>
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

                <PasswordInput
                    id="password"
                    label="Password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                />

                <div className="flex items-center justify-between">
                  <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 hover:underline">
                    Forgot password?
                  </Link>
                </div>

                <Button
                    type="submit"
                    disabled={isLoading || !email || !password}
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-base font-medium"
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              <div className="text-center pt-4 border-t">
                <p className="text-sm text-gray-600">
                  Don&apos;t have an account?{" "}
                  <Link href="/auth/signup" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
                    Sign up
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <p className="text-xs text-gray-500">
              By signing in, you agree to our{" "}
              <Link href="/legal/terms" className="hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/legal/privacy" className="hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
  )
}


