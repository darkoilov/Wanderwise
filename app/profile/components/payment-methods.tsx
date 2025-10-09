import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Plus, Trash2, CheckCircle } from "lucide-react"

export default function PaymentMethods() {
    const paymentMethods = [
        {
            id: 1,
            type: "card",
            brand: "Visa",
            last4: "4242",
            expiryMonth: 12,
            expiryYear: 2025,
            isDefault: true,
        },
        {
            id: 2,
            type: "card",
            brand: "Mastercard",
            last4: "8888",
            expiryMonth: 6,
            expiryYear: 2026,
            isDefault: false,
        },
        {
            id: 3,
            type: "paypal",
            email: "john.doe@example.com",
            isDefault: false,
        },
    ]

    const getCardIcon = (brand: string) => {
        return (
            <div className="w-12 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded flex items-center justify-center text-white font-bold text-xs">
                {brand}
            </div>
        )
    }

    const getPayPalIcon = () => {
        return (
            <div className="w-12 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold text-xs">
                PP
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Payment Methods</h2>
                    <p className="text-gray-600 mt-1">Manage your saved payment methods securely</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Payment Method
                </Button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                    <p className="font-medium text-blue-900">Secure Payment Storage</p>
                    <p className="text-blue-700 mt-1">
                        Your payment information is encrypted and stored securely using industry-standard security protocols. We
                        never store your full card details.
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                {paymentMethods.map((method) => (
                    <div key={method.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                {method.type === "card" ? getCardIcon(method.brand) : getPayPalIcon()}
                                <div>
                                    {method.type === "card" ? (
                                        <>
                                            <p className="font-medium text-gray-900">
                                                {method.brand} •••• {method.last4}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Expires {method.expiryMonth}/{method.expiryYear}
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <p className="font-medium text-gray-900">PayPal</p>
                                            <p className="text-sm text-gray-600">{method.email}</p>
                                        </>
                                    )}
                                </div>
                                {method.isDefault && <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Default</Badge>}
                            </div>
                            <div className="flex gap-2">
                                {!method.isDefault && (
                                    <Button size="sm" variant="outline">
                                        Set as Default
                                    </Button>
                                )}
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {paymentMethods.length === 0 && (
                <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
                    <CreditCard className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No payment methods saved</h3>
                    <p className="text-gray-600 mb-6">Add a payment method to make booking faster and easier</p>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Payment Method
                    </Button>
                </div>
            )}
        </div>
    )
}
