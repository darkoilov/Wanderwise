"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = React.ComponentProps<typeof Input> & {
    label: string
    hintId?: string
}

export function PasswordInput({ id, label, className, hintId, ...props }: Props) {
    const [show, setShow] = React.useState(false)
    return (
        <div className="space-y-2">
            <Label htmlFor={id}>{label}</Label>
            <div className="relative">
                <Input
                    id={id}
                    type={show ? "text" : "password"}
                    className={cn("pr-10 h-12", className)}
                    aria-describedby={hintId}
                    {...props}
                />
                <button
                    type="button"
                    onClick={() => setShow((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label={show ? "Hide password" : "Show password"}
                >
                    {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
            </div>
        </div>
    )
}
