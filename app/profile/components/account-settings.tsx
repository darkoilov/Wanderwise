"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Camera, Save } from "lucide-react"
import { updateProfileAction } from "@/app/actions/user/updateProfile"
import { updatePreferencesAction } from "@/app/actions/user/updatePreferences"
import { changePasswordAction } from "@/app/actions/user/changePassword"
import { toast } from "sonner"

export default function AccountSettings({ profile }: { profile: any }) {
    const [isEditing, setIsEditing] = useState(false)
    const [form, setForm] = useState({
        firstName: profile?.firstName ?? "",
        lastName: profile?.lastName ?? "",
        email: profile?.email ?? "",
        phone: profile?.phone ?? "",
        bio: profile?.bio ?? "",
    })

    const [prefs, setPrefs] = useState({
        currency: profile?.preferences?.currency ?? "eur",
        language: profile?.preferences?.language ?? "en",
        emailNotifications: profile?.preferences?.emailNotifications ?? true,
        smsNotifications: profile?.preferences?.smsNotifications ?? false,
        marketingEmails: profile?.preferences?.marketingEmails ?? false,
    })

    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    })

    const handleProfileSave = async () => {
        const res = await updateProfileAction(form)
        if (res.success) {
            toast.success("Profile updated")
            setIsEditing(false)
        } else {
            toast.error(res.message || "Failed to update profile")
        }
    }

    const handlePreferencesSave = async () => {
        const res = await updatePreferencesAction(prefs as any)
        if (res.success) toast.success("Preferences updated")
        else toast.error(res.message || "Failed to update preferences")
    }

    const handlePasswordChange = async () => {
        if (passwords.newPassword !== passwords.confirmPassword) {
            toast.error("Passwords do not match")
            return
        }
        const res = await changePasswordAction(passwords)
        if (res.success) {
            toast.success("Password updated")
            setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" })
        } else {
            toast.error(res.message || "Failed to change password")
        }
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Account Settings</h2>
                <p className="text-gray-600">Manage your profile and preferences</p>
            </div>

            {/* Profile Information */}
            <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Profile Information</h3>

                <div className="flex items-center gap-6">
                    <div className="relative">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={profile?.image || "/placeholder.svg"} alt="Profile" />
                            <AvatarFallback>{profile?.name?.[0] ?? "?"}</AvatarFallback>
                        </Avatar>
                        <button className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors">
                            <Camera className="h-4 w-4" />
                        </button>
                    </div>
                    <div>
                        <h4 className="font-medium text-gray-900">Profile Photo</h4>
                        <p className="text-sm text-gray-600 mt-1">Upload a new profile picture</p>
                        <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                            Change Photo
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                            id="firstName"
                            value={form.firstName}
                            disabled={!isEditing}
                            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                            id="lastName"
                            value={form.lastName}
                            disabled={!isEditing}
                            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={form.email} disabled />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                            id="phone"
                            type="tel"
                            value={form.phone}
                            disabled={!isEditing}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                        id="bio"
                        rows={3}
                        value={form.bio}
                        disabled={!isEditing}
                        onChange={(e) => setForm({ ...form, bio: e.target.value })}
                    />
                </div>

                <div className="flex gap-2">
                    {isEditing ? (
                        <>
                            <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleProfileSave}>
                                <Save className="h-4 w-4 mr-2" />
                                Save Changes
                            </Button>
                            <Button variant="outline" onClick={() => setIsEditing(false)}>
                                Cancel
                            </Button>
                        </>
                    ) : (
                        <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                    )}
                </div>
            </div>

            {/* Security */}
            <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Security</h3>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input
                            id="currentPassword"
                            type="password"
                            value={passwords.currentPassword}
                            onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                            id="newPassword"
                            type="password"
                            value={passwords.newPassword}
                            onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            value={passwords.confirmPassword}
                            onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                        />
                    </div>
                    <Button variant="outline" onClick={handlePasswordChange}>
                        Change Password
                    </Button>
                </div>
            </div>

            {/* Preferences */}
            <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Preferences</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="currency">Currency</Label>
                        <Select
                            value={prefs.currency}
                            onValueChange={(val) => setPrefs({ ...prefs, currency: val })}
                        >
                            <SelectTrigger id="currency">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="usd">USD ($)</SelectItem>
                                <SelectItem value="eur">EUR (€)</SelectItem>
                                <SelectItem value="gbp">GBP (£)</SelectItem>
                                <SelectItem value="jpy">JPY (¥)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Select
                            value={prefs.language}
                            onValueChange={(val) => setPrefs({ ...prefs, language: val })}
                        >
                            <SelectTrigger id="language">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="en">English</SelectItem>
                                <SelectItem value="es">Español</SelectItem>
                                <SelectItem value="fr">Français</SelectItem>
                                <SelectItem value="de">Deutsch</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-900">Email Notifications</p>
                            <p className="text-sm text-gray-600">Receive booking confirmations and updates</p>
                        </div>
                        <Switch
                            checked={prefs.emailNotifications}
                            onCheckedChange={(val) => setPrefs({ ...prefs, emailNotifications: val })}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-900">SMS Notifications</p>
                            <p className="text-sm text-gray-600">Get text alerts for important updates</p>
                        </div>
                        <Switch
                            checked={prefs.smsNotifications}
                            onCheckedChange={(val) => setPrefs({ ...prefs, smsNotifications: val })}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-900">Marketing Emails</p>
                            <p className="text-sm text-gray-600">Special offers and travel inspiration</p>
                        </div>
                        <Switch
                            checked={prefs.marketingEmails}
                            onCheckedChange={(val) => setPrefs({ ...prefs, marketingEmails: val })}
                        />
                    </div>
                </div>

                <Button className="bg-blue-600 hover:bg-blue-700" onClick={handlePreferencesSave}>
                    Save Preferences
                </Button>
            </div>
        </div>
    )
}
