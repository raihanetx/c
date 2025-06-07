
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingActionButton } from './components/FloatingActionButton';
import { MobileBottomNav } from './components/MobileBottomNav';

import { HomePage } from './pages/HomePage';
import { AllProductsPage } from './pages/AllProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderHistoryPage } from './pages/OrderHistoryPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { AboutUsPage, TermsPage, PrivacyPolicyPage, RefundPolicyPage } from './pages/InfoPages';

const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow bg-gray-100"> {/* Default background for pages updated */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<AllProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/orders" element={<OrderHistoryPage />} />
              <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
              
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/refund" element={<RefundPolicyPage />} />

              {/* Catch-all for 404 - simple redirect to home or a dedicated 404 page */}
              <Route path="*" element={<Navigate to="/" replace />} /> 
            </Routes>
          </main>
          <Footer />
          <FloatingActionButton />
          <MobileBottomNav />
        </div>
      </HashRouter>
    </AppProvider>
  );
};

export default App;