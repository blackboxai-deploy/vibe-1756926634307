'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  getActivePaymentProvider, 
  processMockPayment, 
  validatePaymentSetup,
  formatCurrency
} from '@/lib/payment';
import { useCart } from '@/contexts/CartContext';

interface PaymentProviderProps {
  onPaymentSuccess?: (result: any) => void;
  onPaymentError?: (error: string) => void;
}

export const PaymentProvider: React.FC<PaymentProviderProps> = ({
  onPaymentSuccess,
  onPaymentError
}) => {
  const { cart, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentResult, setPaymentResult] = useState<any>(null);

  const paymentSetup = validatePaymentSetup();
  const activeProvider = getActivePaymentProvider();

  const handleMockPayment = async () => {
    setIsProcessing(true);
    setPaymentResult(null);

    try {
      const result = await processMockPayment(cart.total);
      setPaymentResult(result);
      
      if (result.success) {
        onPaymentSuccess?.(result);
        // Clear cart on successful payment
        setTimeout(() => {
          clearCart();
        }, 2000);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Payment failed';
      setPaymentResult({ success: false, message: errorMessage });
      onPaymentError?.(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const renderPaymentForm = () => {
    switch (activeProvider.id) {
      case 'paypal':
        return (
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                PayPal Payment
                <Badge variant="secondary">Coming Soon</Badge>
              </CardTitle>
              <CardDescription>
                PayPal integration is ready but requires API credentials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert>
                <AlertDescription>
                  To enable PayPal payments, please add your PayPal credentials to the environment variables.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        );

      case 'stripe':
        return (
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                Stripe Payment
                <Badge variant="secondary">Coming Soon</Badge>
              </CardTitle>
              <CardDescription>
                Stripe integration is ready but requires API credentials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert>
                <AlertDescription>
                  To enable Stripe payments, please add your Stripe credentials to the environment variables.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        );

      case 'mock':
      default:
        return (
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                Demo Payment System
                <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                  Development Mode
                </Badge>
              </CardTitle>
              <CardDescription>
                This is a demonstration payment system for testing purposes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="text-white font-medium mb-2">Order Summary</h4>
                <div className="space-y-2 text-sm">
                  {cart.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-gray-300">
                      <span>{item.product.name} × {item.quantity}</span>
                      <span>{formatCurrency(item.product.price * item.quantity)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-white font-medium pt-2 border-t border-gray-600">
                    <span>Total</span>
                    <span>{formatCurrency(cart.total)}</span>
                  </div>
                </div>
              </div>

              {paymentResult && (
                <Alert className={`border ${
                  paymentResult.success 
                    ? 'border-green-600 bg-green-900/20' 
                    : 'border-red-600 bg-red-900/20'
                }`}>
                  <AlertDescription className={
                    paymentResult.success ? 'text-green-400' : 'text-red-400'
                  }>
                    {paymentResult.message}
                    {paymentResult.success && paymentResult.transactionId && (
                      <div className="mt-1 text-xs">
                        Transaction ID: {paymentResult.transactionId}
                      </div>
                    )}
                  </AlertDescription>
                </Alert>
              )}

              <div className="bg-blue-900/20 border border-blue-600 p-3 rounded-lg">
                <p className="text-blue-400 text-sm">
                  <strong>Note:</strong> This is a demo payment system. No actual payment will be processed. 
                  To accept real payments, configure a payment provider like PayPal or Stripe.
                </p>
              </div>

              <Button
                onClick={handleMockPayment}
                disabled={isProcessing || cart.total === 0 || (paymentResult?.success)}
                className="w-full bg-white text-black hover:bg-gray-200 disabled:bg-gray-600"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Processing Payment...
                  </div>
                ) : paymentResult?.success ? (
                  'Payment Successful!'
                ) : (
                  `Pay ${formatCurrency(cart.total)} (Demo)`
                )}
              </Button>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Secure Checkout</h2>
        <p className="text-gray-400">
          Complete your order with our secure payment system
        </p>
      </div>

      {renderPaymentForm()}

      {/* Payment Provider Setup Instructions */}
      {paymentSetup.instructions && (
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">{paymentSetup.instructions.title}</CardTitle>
            <CardDescription>
              Follow these steps to enable real payment processing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {paymentSetup.instructions.steps.map((step, index) => (
                <div key={index} className="text-gray-300 text-sm font-mono">
                  {step}
                </div>
              ))}
              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-gray-400 text-sm">
                  Documentation: {' '}
                  <a 
                    href={paymentSetup.instructions.docs} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    {paymentSetup.instructions.docs}
                  </a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};