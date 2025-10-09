"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, MapPin, Users, DollarSign, Heart, Camera, Utensils, Mountain, Waves, Building, TreePine, Send } from 'lucide-react'
import { format } from "date-fns"

export default function CustomItineraryPage() {
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    travelers: "",
    budget: "",
    destinations: "",
    accommodation: "",
    travelStyle: "",
    specialRequests: ""
  })

  const interests = [
    { id: "culture", label: "Culture & History", icon: Building },
    { id: "food", label: "Food & Cuisine", icon: Utensils },
    { id: "nature", label: "Nature & Wildlife", icon: TreePine },
    { id: "adventure", label: "Adventure Sports", icon: Mountain },
    { id: "beach", label: "Beach & Relaxation", icon: Waves },
    { id: "photography", label: "Photography", icon: Camera },
    { id: "wellness", label: "Wellness & Spa", icon: Heart },
    { id: "nightlife", label: "Nightlife & Entertainment", icon: Building }
  ]

  const handleInterestToggle = (interestId: string) => {
    setSelectedInterests(prev => 
      prev.includes(interestId) 
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    )
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", { ...formData, startDate, endDate, selectedInterests })
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Custom Itinerary</h1>
            <p className="text-xl mb-8 text-blue-100">
              Tell us about your dream trip and we'll create a personalized itinerary just for you
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
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
                      <Select onValueChange={(value) => handleInputChange("travelers", value)}>
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
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {startDate ? format(startDate, "PPP") : "Select departure date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={setStartDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <Label>Return Date *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {endDate ? format(endDate, "PPP") : "Select return date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={setEndDate}
                            initialFocus
                          />
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
                  <Label>Budget per person (USD) *</Label>
                  <RadioGroup 
                    value={formData.budget} 
                    onValueChange={(value) => handleInputChange("budget", value)}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="budget" id="budget" />
                      <Label htmlFor="budget">Budget ($1,000 - $2,500)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mid-range" id="mid-range" />
                      <Label htmlFor="mid-range">Mid-range ($2,500 - $5,000)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="luxury" id="luxury" />
                      <Label htmlFor="luxury">Luxury ($5,000+)</Label>
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
                          <interest.icon className={`h-6 w-6 ${
                            selectedInterests.includes(interest.id) ? "text-blue-600" : "text-gray-600"
                          }`} />
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
                    <Select onValueChange={(value) => handleInputChange("accommodation", value)}>
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
                    <Select onValueChange={(value) => handleInputChange("travelStyle", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your travel style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="relaxed">Relaxed (Slow pace, lots of free time)</SelectItem>
                        <SelectItem value="balanced">Balanced (Mix of activities and relaxation)</SelectItem>
                        <SelectItem value="active">Active (Packed schedule, lots of activities)</SelectItem>
                        <SelectItem value="adventure">Adventure (Off-the-beaten-path experiences)</SelectItem>
                        <SelectItem value="cultural">Cultural Immersion (Local experiences)</SelectItem>
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

              {/* Submit Button */}
              <div className="text-center">
                <Button type="submit" size="lg" className="bg-blue-600 hover:bg-blue-700 px-12">
                  <Send className="mr-2 h-5 w-5" />
                  Submit Itinerary Request
                </Button>
                <p className="text-sm text-gray-600 mt-4">
                  We'll review your request and get back to you within 24 hours with a personalized itinerary proposal.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
              <p className="text-xl text-gray-600">Our simple 4-step process to create your perfect trip</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Submit Request</h3>
                <p className="text-gray-600 text-sm">Fill out our detailed form with your preferences and requirements</p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Expert Planning</h3>
                <p className="text-gray-600 text-sm">Our travel experts craft a personalized itinerary just for you</p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">3</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Review & Refine</h3>
                <p className="text-gray-600 text-sm">Review your itinerary and request any changes or adjustments</p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">4</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Book & Travel</h3>
                <p className="text-gray-600 text-sm">Confirm your booking and get ready for an amazing adventure</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
