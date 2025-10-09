"use server"

import { auth } from "@/lib/auth"
import { UserService } from "@/lib/services/userService"

export async function getUserProfileAction() {
    const session = await auth()
    if (!session?.user?.id) return { success: false, message: "Unauthorized" }

    const user = await UserService.getUserById(session.user.id)
    if (!user) return { success: false, message: "User not found" }

    return { success: true, user }
}
