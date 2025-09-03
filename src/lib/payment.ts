// Payment Provider Configuration
// This file centralizes payment provider management for easy switching

import { PaymentProvider } from '@/types';

// Available Payment Providers
export const PAYMENT_PROVIDERS: PaymentProvider[] = [
  {
    id: 'paypal',
    name: 'PayPal',
    enabled: false, // Disabled by default - set to true when API keys are available
    config: {
      clientId: typeof window !== 'undefined' ? '' : process.env?.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
      clientSecret: typeof window !== 'undefined' ? '' : process.env?.PAYPAL_CLIENT_SECRET || '',
      sandbox: typeof window !== 'undefined' ? true : process.env?.NODE_ENV === 'development'
    }
  },
  {
    id: 'stripe',
    name: 'Stripe',
    enabled: false, // Disabled by default - set to true when API keys are available
    config: {
      publishableKey: typeof window !== 'undefined' ? '' : process.env?.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
      secretKey: typeof window !== 'undefined' ? '' : process.env?.STRIPE_SECRET_KEY || ''
    }
  },
  {
    id: 'square',
    name: 'Square',
    enabled: false, // Disabled by default
    config: {
      applicationId: typeof window !== 'undefined' ? '' : process.env?.NEXT_PUBLIC_SQUARE_APPLICATION_ID || '',
      accessToken: typeof window !== 'undefined' ? '' : process.env?.SQUARE_ACCESS_TOKEN || ''
    }
  },
  {
    id: 'mock',
    name: 'Mock Payment (Development)',
    enabled: true, // Enabled by default for development/testing
    config: {}
  }
];

// Get Active Payment Provider
export const getActivePaymentProvider = (): PaymentProvider => {
  // Return the first enabled provider, or mock as fallback
  const activeProvider = PAYMENT_PROVIDERS.find(provider => provider.enabled);
  return activeProvider || PAYMENT_PROVIDERS.find(p => p.id === 'mock')!;
};

// Check if payment provider is configured
export const isPaymentProviderConfigured = (providerId: string): boolean => {
  const provider = PAYMENT_PROVIDERS.find(p => p.id === providerId);
  if (!provider) return false;

  switch (providerId) {
    case 'paypal':
      return !!(provider.config?.clientId && provider.config?.clientSecret);
    case 'stripe':
      return !!(provider.config?.publishableKey && provider.config?.secretKey);
    case 'square':
      return !!(provider.config?.applicationId && provider.config?.accessToken);
    case 'mock':
      return true; // Mock is always configured
    default:
      return false;
  }
};

// Payment Configuration Instructions
export const PAYMENT_SETUP_INSTRUCTIONS = {
  paypal: {
    title: 'PayPal Setup',
    steps: [
      '1. Visit https://developer.paypal.com/',
      '2. Create a new app in your PayPal Developer Dashboard',
      '3. Get your Client ID and Client Secret',
      '4. Add to .env.local:',
      '   NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_client_id',
      '   PAYPAL_CLIENT_SECRET=your_client_secret',
      '5. Set enabled: true in src/lib/payment.ts'
    ],
    docs: 'https://developer.paypal.com/docs/'
  },
  stripe: {
    title: 'Stripe Setup',
    steps: [
      '1. Visit https://dashboard.stripe.com/',
      '2. Go to Developers > API keys',
      '3. Copy your Publishable key and Secret key',
      '4. Add to .env.local:',
      '   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...',
      '   STRIPE_SECRET_KEY=sk_test_...',
      '5. Set enabled: true in src/lib/payment.ts'
    ],
    docs: 'https://stripe.com/docs'
  },
  square: {
    title: 'Square Setup',
    steps: [
      '1. Visit https://developer.squareup.com/',
      '2. Create a new application',
      '3. Get your Application ID and Access Token',
      '4. Add to .env.local:',
      '   NEXT_PUBLIC_SQUARE_APPLICATION_ID=your_app_id',
      '   SQUARE_ACCESS_TOKEN=your_access_token',
      '5. Set enabled: true in src/lib/payment.ts'
    ],
    docs: 'https://developer.squareup.com/docs'
  }
};

// Mock Payment Processing (for development)
export const processMockPayment = async (amount: number) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simulate random success/failure for testing
  const success = Math.random() > 0.1; // 90% success rate
  
  if (success) {
    return {
      success: true,
      transactionId: `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      amount,
      currency: 'USD',
      status: 'completed',
      message: 'Payment processed successfully!'
    };
  } else {
    throw new Error('Mock payment failed - please try again');
  }
};

// Validate payment configuration
export const validatePaymentSetup = () => {
  const activeProvider = getActivePaymentProvider();
  const configured = isPaymentProviderConfigured(activeProvider.id);
  
  return {
    provider: activeProvider,
    configured,
    instructions: activeProvider.id !== 'mock' ? PAYMENT_SETUP_INSTRUCTIONS[activeProvider.id as keyof typeof PAYMENT_SETUP_INSTRUCTIONS] : null
  };
};

// Format currency
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

// Calculate tax (customize based on your needs)
export const calculateTax = (subtotal: number, taxRate: number = 0.08): number => {
  return subtotal * taxRate;
};

// Calculate shipping (customize based on your needs)
export const calculateShipping = (subtotal: number, items: number): number => {
  if (subtotal >= 50) return 0; // Free shipping over $50
  if (items <= 2) return 5;
  return 10;
};