"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Users, MapPin, DollarSign, Send, Calendar as CalendarIcon, Building, Utensils, TreePine, Mountain, Waves, Camera, Heart } from "lucide-react"
import { format } from "date-fns"
import { formatPrice } from "@/lib/utils"

type FormState = {
    name: string
    email: string
    phone: string
    travelers?: string
    budget: string
    destinations: string
    accommodation?: string
    travelStyle?: string
    specialRequests: string
}

const interests = [
    { id: "culture", label: "Culture & History", icon: Building },
    { id: "food", label: "Food & Cuisine", icon: Utensils },
    { id: "nature", label: "Nature & Wildlife", icon: TreePine },
    { id: "adventure", label: "Adventure Sports", icon: Mountain },
    { id: "beach", label: "Beach & Relaxation", icon: Waves },
    { id: "photography", label: "Photography", icon: Camera },
    { id: "wellness", label: "Wellness & Spa", icon: Heart },
    { id: "nightlife", label: "Nightlife & Entertainment", icon: Building },
] as const

export default function ItineraryForm() {
    const [startDate, setStartDate] = useState<Date>()
    const [endDate, setEndDate] = useState<Date>()
    const [selectedInterests, setSelectedInterests] = useState<string[]>([])
    const [submitting, setSubmitting] = useState(false)
    const [statusMsg, setStatusMsg] = useState<string | null>(null)

    const [formData, setFormData] = useState<FormState>({
        name: "",
        email: "",
        phone: "",
        travelers: undefined,
        budget: "",
        destinations: "",
        accommodation: undefined,
        travelStyle: undefined,
        specialRequests: "",
    })

    const handleInterestToggle = (id: string) => {
        setSelectedInterests(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        )
    }

    const handleInputChange = (field: keyof FormState, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        setStatusMsg(null)

        try {
            const payload = {
                ...formData,
                startDate: startDate ? startDate.toISOString() : null,
                endDate: endDate ? endDate.toISOString() : null,
                interests: selectedInterests,
            }

            const res = await fetch("/api/itinerary-request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })
            if (!res.ok) throw new Error("Request failed")

            setStatusMsg("Thanks! We’ve received your request. We’ll get back to you within 24 hours.")
            setFormData({
                name: "",
                email: "",
                phone: "",
                travelers: undefined,
                budget: "",
                destinations: "",
                accommodation: undefined,
                travelStyle: undefined,
                specialRequests: "",
            })
            setSelectedInterests([])
            setStartDate(undefined)
            setEndDate(undefined)
        } catch {
            setStatusMsg("Sorry, something went wrong sending your request. Please try again.")
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Personal Information
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="name">Full Name *</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                                placeholder="Your full name"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="email">Email Address *</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                placeholder="your@email.com"
                                required
                            />
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                value={formData.phone}
                                onChange={(e) => handleInputChange("phone", e.target.value)}
                                placeholder="+1 (555) 123-4567"
                            />
                        </div>
                        <div>
                            <Label htmlFor="travelers">Number of Travelers *</Label>
                            <Select
                                value={formData.travelers}
                                onValueChange={(value) => handleInputChange("travelers", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select number of travelers" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">1 Traveler</SelectItem>
                                    <SelectItem value="2">2 Travelers</SelectItem>
                                    <SelectItem value="3">3 Travelers</SelectItem>
                                    <SelectItem value="4">4 Travelers</SelectItem>
                                    <SelectItem value="5">5 Travelers</SelectItem>
                                    <SelectItem value="6+">6+ Travelers</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Travel Details */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Travel Details
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <Label>Departure Date *</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {startDate ? format(startDate, "PPP") : "Select departure date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div>
                            <Label>Return Date *</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {endDate ? format(endDate, "PPP") : "Select return date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="destinations">Preferred Destinations *</Label>
                        <Input
                            id="destinations"
                            value={formData.destinations}
                            onChange={(e) => handleInputChange("destinations", e.target.value)}
                            placeholder="e.g., Japan, Thailand, Europe, or specific cities"
                            required
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Budget */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5" />
                        Budget
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Label>Budget per person (EUR) *</Label>
                    <RadioGroup
                        value={formData.budget}
                        onValueChange={(value) => handleInputChange("budget", value)}
                        className="mt-2"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="budget" id="budget" />
                            <Label htmlFor="budget">
                                Budget ({formatPrice(1000)} - {formatPrice(2500)})
                            </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="mid-range" id="mid-range" />
                            <Label htmlFor="mid-range">
                                Mid-range ({formatPrice(2500)} - {formatPrice(5000)})
                            </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="luxury" id="luxury" />
                            <Label htmlFor="luxury">Luxury ({formatPrice(5000)}+)</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="custom" id="custom" />
                            <Label htmlFor="custom">Custom budget (please specify in special requests)</Label>
                        </div>
                    </RadioGroup>
                </CardContent>
            </Card>

            {/* Interests */}
            <Card>
                <CardHeader>
                    <CardTitle>Your Interests</CardTitle>
                    <p className="text-sm text-gray-600">Select all that apply to help us personalize your itinerary</p>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {interests.map((interest) => (
                            <div
                                key={interest.id}
                                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                                    selectedInterests.includes(interest.id)
                                        ? "border-blue-500 bg-blue-50"
                                        : "border-gray-200 hover:border-gray-300"
                                }`}
                                onClick={() => handleInterestToggle(interest.id)}
                            >
                                <div className="flex flex-col items-center text-center space-y-2">
                                    <interest.icon
                                        className={`h-6 w-6 ${
                                            selectedInterests.includes(interest.id) ? "text-blue-600" : "text-gray-600"
                                        }`}
                                    />
                                    <span className="text-sm font-medium">{interest.label}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Preferences */}
            <Card>
                <CardHeader>
                    <CardTitle>Travel Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="accommodation">Accommodation Preference</Label>
                        <Select
                            value={formData.accommodation}
                            onValueChange={(value) => handleInputChange("accommodation", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select accommodation type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="budget">Budget (Hostels, Budget Hotels)</SelectItem>
                                <SelectItem value="mid-range">Mid-range (3-4 Star Hotels)</SelectItem>
                                <SelectItem value="luxury">Luxury (5 Star Hotels, Resorts)</SelectItem>
                                <SelectItem value="unique">Unique (Boutique, Local Stays)</SelectItem>
                                <SelectItem value="mixed">Mixed (Variety of options)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="travel-style">Travel Style</Label>
                        <Select
                            value={formData.travelStyle}
                            onValueChange={(value) => handleInputChange("travelStyle", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select your travel style" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="relaxed">Relaxed</SelectItem>
                                <SelectItem value="balanced">Balanced</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="adventure">Adventure</SelectItem>
                                <SelectItem value="cultural">Cultural Immersion</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Special Requests */}
            <Card>
                <CardHeader>
                    <CardTitle>Special Requests</CardTitle>
                    <p className="text-sm text-gray-600">Any specific requirements, dietary restrictions, or special occasions?</p>
                </CardHeader>
                <CardContent>
                    <Textarea
                        value={formData.specialRequests}
                        onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                        placeholder="Tell us about any special requirements, celebrations, dietary restrictions, accessibility needs, or anything else that would help us create the perfect itinerary for you..."
                        rows={4}
                    />
                </CardContent>
            </Card>

            {/* Submit */}
            <div className="text-center">
                <Button type="submit" size="lg" disabled={submitting} className="bg-blue-600 hover:bg-blue-700 px-12">
                    <Send className="mr-2 h-5 w-5" />
                    {submitting ? "Sending..." : "Submit Itinerary Request"}
                </Button>
                {statusMsg && <p className="text-sm mt-4">{statusMsg}</p>}
                <p className="text-sm text-gray-600 mt-4">
                    We'll review your request and get back to you within 24 hours with a personalized itinerary proposal.
                </p>
            </div>
        </form>
    )
}
