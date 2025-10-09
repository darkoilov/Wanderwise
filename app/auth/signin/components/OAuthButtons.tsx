"use client"

import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"

export function OAuthButtons({
                                 disabled,
                                 callbackUrl = "/",
                                 label = "Continue with Google",
                             }: {
    disabled?: boolean
    callbackUrl?: string
    label?: string
}) {
    const onGoogle = async () => {
        await signIn("google", { callbackUrl })
    }

    return (
        <Button
            onClick={onGoogle}
            disabled={disabled}
            variant="outline"
            className="w-full h-12 text-base font-medium border-gray-300 hover:bg-gray-50 bg-transparent"
        >
            {/* Clean Google icon (single-color) */}
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" aria-hidden="true">
                <path
                    fill="currentColor"
                    d="M21.35 11.1H12v2.9h5.32c-.23 1.48-1.6 4.33-5.32 4.33-3.21 0-5.83-2.65-5.83-5.93 0-3.29 2.62-5.93 5.83-5.93 1.83 0 3.06.78 3.76 1.45l2.05-1.98C16.59 4.3 14.5 3.5 12 3.5 6.99 3.5 2.93 7.53 2.93 12.4c0 4.86 4.06 8.9 9.07 8.9 5.25 0 8.7-3.69 8.7-8.9 0-.6-.06-1.04-.15-1.3z"
                />
            </svg>
            {label}
        </Button>
    )
}
