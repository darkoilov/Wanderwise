import ItineraryForm from "./components/ItineraryForm"

export default async function CustomItineraryPage() {
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

        {/* Form Section (client component) */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <ItineraryForm />
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
