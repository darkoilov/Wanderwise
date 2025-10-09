"use client"

import type React from "react"

import { useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Lock, Check } from "lucide-react"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface CheckoutFormProps {
  bookingId: string
  amount: number
  currency: string
  onSuccess: () => void
}

function CheckoutForm({ bookingId, amount, currency, onSuccess }: CheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Create payment intent
      const response = await fetch("/api/stripe/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookingId }),
      })

      const { clientSecret, error: apiError } = await response.json()

      if (apiError) {
        throw new Error(apiError)
      }

      // Confirm payment
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      })

      if (stripeError) {
        throw new Error(stripeError.message)
      }

      if (paymentIntent.status === "succeeded") {
        setSuccess(true)
        setTimeout(() => {
          onSuccess()
        }, 2000)
      }
    } catch (err: any) {
      setError(err.message || "Payment failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-8 text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Payment Successful!</h3>
          <p className="text-gray-600 mb-4">
            Your booking has been confirmed. You'll receive a confirmation email shortly.
          </p>
          <div className="animate-pulse text-blue-600">Redirecting...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Payment Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Order Summary */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Total Amount</span>
            <span className="text-2xl font-bold text-gray-900">
              {currency.toUpperCase()} {amount.toLocaleString()}
            </span>
          </div>
          <p className="text-sm text-gray-500">Includes all taxes and fees</p>
        </div>

        {error && (
          <Alert className="border-red-200 bg-red-50">
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Card Element */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Card Information</label>
            <div className="p-4 border border-gray-300 rounded-lg bg-white">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                  },
                }}
              />
            </div>
          </div>

          <Separator />

          {/* Security Notice */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Lock className="h-4 w-4" />
            <span>Your payment information is secure and encrypted</span>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!stripe || isLoading}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-base font-medium"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Processing...
              </div>
            ) : (
              `Pay ${currency.toUpperCase()} ${amount.toLocaleString()}`
            )}
          </Button>
        </form>

        {/* Trust Badges */}
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-2">Secured by Stripe</p>
          <div className="flex justify-center gap-4 opacity-60">
            <div className="text-xs">🔒 SSL</div>
            <div className="text-xs">💳 PCI DSS</div>
            <div className="text-xs">🛡️ 256-bit</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface StripeCheckoutProps {
  bookingId: string
  amount: number
  currency: string
  onSuccess: () => void
}

export default function StripeCheckout({ bookingId, amount, currency, onSuccess }: StripeCheckoutProps) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm bookingId={bookingId} amount={amount} currency={currency} onSuccess={onSuccess} />
    </Elements>
  )
}
