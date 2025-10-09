import { Sparkles, X } from "lucide-react"

export function DiscountModal({setShowDiscountModal, email, setEmail}:any) {
     
    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Email submitted:", email)
    setShowDiscountModal(false)
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300">
            {/* Close button */}
            <button
              onClick={() => setShowDiscountModal(false)}
              className="absolute top-4 right-4 z-10 text-white hover:text-gray-200 transition-colors bg-black/20 rounded-full p-1.5 hover:bg-black/30"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header with gradient background */}
            <div className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 text-white p-8 pb-12">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />

              <div className="relative">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium mb-4">
                  <Sparkles className="w-4 h-4" />
                  <span>Limited Time Offer</span>
                </div>
                <h2 className="text-3xl font-bold mb-2">Save €200</h2>
                <p className="text-blue-100 text-lg">On Your First Adventure</p>
              </div>
            </div>

            {/* Form section */}
            <div className="p-8 -mt-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <p className="text-gray-600 text-center mb-6">Join thousands of travelers and unlock exclusive deals</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-gray-900 placeholder:text-gray-400"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Get My Discount Code
                  </button>

                  <p className="text-xs text-gray-500 text-center">No spam, unsubscribe anytime</p>
                </form>
              </div>

              <button
                type="button"
                onClick={() => setShowDiscountModal(false)}
                className="w-full text-gray-400 hover:text-gray-600 text-sm font-medium mt-4 transition-colors"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
  )
}
