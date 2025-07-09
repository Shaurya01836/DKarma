"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, CreditCard, Building, Wallet, Bitcoin, Shield, Star, Trash2, Edit } from "lucide-react"
import type { PaymentMethod } from "@/types"
import { formatDate } from "@/utils"

interface PaymentMethodsTabProps {
  paymentMethods: PaymentMethod[]
}

export default function PaymentMethodsTab({ paymentMethods }: PaymentMethodsTabProps) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)

  const getPaymentMethodIconComponent = (type: string) => {
    switch (type) {
      case "CREDIT_CARD":
        return <CreditCard className="w-6 h-6" />
      case "BANK_ACCOUNT":
        return <Building className="w-6 h-6" />
      case "PAYPAL":
        return <Wallet className="w-6 h-6" />
      case "CRYPTO":
        return <Bitcoin className="w-6 h-6" />
      default:
        return <CreditCard className="w-6 h-6" />
    }
  }

  const getPaymentMethodColor = (type: string) => {
    switch (type) {
      case "CREDIT_CARD":
        return "from-blue-600/20 to-blue-500/10 border-blue-500/30 text-blue-300"
      case "BANK_ACCOUNT":
        return "from-emerald-600/20 to-emerald-500/10 border-emerald-500/30 text-emerald-300"
      case "PAYPAL":
        return "from-amber-600/20 to-amber-500/10 border-amber-500/30 text-amber-300"
      case "CRYPTO":
        return "from-violet-600/20 to-violet-500/10 border-violet-500/30 text-violet-300"
      default:
        return "from-gray-600/20 to-gray-500/10 border-gray-500/30 text-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      {/* Add Payment Method */}
      <Card className="bg-gray-900/40 border-gray-700/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Payment Methods</h3>
              <p className="text-gray-300">Manage your payment methods for deposits and withdrawals</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 font-semibold">
              <Plus className="w-4 h-4 mr-2" />
              Add Payment Method
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card className="bg-blue-900/20 border-blue-700/40 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-blue-400" />
            <div>
              <p className="text-blue-300 font-medium">Secure Payment Processing</p>
              <p className="text-blue-200/70 text-sm">
                All payment methods are encrypted and secured with industry-standard protocols
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {paymentMethods.map((method) => (
          <Card
            key={method.id}
            className={`bg-gradient-to-br ${getPaymentMethodColor(method.type)} border backdrop-blur-sm hover:shadow-xl transition-all duration-300 cursor-pointer ${
              selectedMethod === method.id ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => setSelectedMethod(selectedMethod === method.id ? null : method.id)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/10 rounded-lg">{getPaymentMethodIconComponent(method.type)}</div>
                  <div>
                    <h3 className="font-semibold text-white text-lg">{method.name}</h3>
                    <p className="text-sm opacity-80">{method.details}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {method.isDefault && (
                    <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/40">
                      <Star className="w-3 h-3 mr-1" />
                      Default
                    </Badge>
                  )}
                  {method.isVerified ? (
                    <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40">
                      <Shield className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  ) : (
                    <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/40">Pending</Badge>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="opacity-70">Added:</span>
                  <div className="font-semibold text-white">{formatDate(method.addedDate)}</div>
                </div>
                {method.lastUsed && (
                  <div>
                    <span className="opacity-70">Last Used:</span>
                    <div className="font-semibold text-white">{formatDate(method.lastUsed)}</div>
                  </div>
                )}
                {method.expiryDate && (
                  <div className="col-span-2">
                    <span className="opacity-70">Expires:</span>
                    <div className="font-semibold text-white">{formatDate(method.expiryDate)}</div>
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-white/20 hover:border-white/40 hover:bg-white/10 bg-transparent text-white hover:text-white font-medium"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                {!method.isDefault && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-500/40 text-red-300 hover:bg-red-500/10 bg-transparent hover:text-red-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add New Payment Method Options */}
      <Card className="bg-gray-900/40 border-gray-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl text-white">Add New Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 border-blue-500/30 hover:border-blue-500 hover:bg-blue-500/10 bg-transparent text-blue-300 hover:text-blue-200"
            >
              <CreditCard className="w-6 h-6" />
              <span>Credit Card</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 border-emerald-500/30 hover:border-emerald-500 hover:bg-emerald-500/10 bg-transparent text-emerald-300 hover:text-emerald-200"
            >
              <Building className="w-6 h-6" />
              <span>Bank Account</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 border-amber-500/30 hover:border-amber-500 hover:bg-amber-500/10 bg-transparent text-amber-300 hover:text-amber-200"
            >
              <Wallet className="w-6 h-6" />
              <span>PayPal</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 border-violet-500/30 hover:border-violet-500 hover:bg-violet-500/10 bg-transparent text-violet-300 hover:text-violet-200"
            >
              <Bitcoin className="w-6 h-6" />
              <span>Crypto Wallet</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
