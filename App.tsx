import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'sonner';
import { FloatingRegisterButton } from './components/FloatingRegisterButton';
import { FloatingAccommodationButton } from './components/FloatingAccommodationButton';

// Lazy load pages
const Home = lazy(() => import('./src/pages/Home').then(module => ({ default: module.Home })));
const Events = lazy(() => import('./src/pages/Events').then(module => ({ default: module.Events })));
const SpeakersPage = lazy(() => import('./src/pages/SpeakersPage').then(module => ({ default: module.SpeakersPage })));
const SponsorsPage = lazy(() => import('./src/pages/SponsorsPage').then(module => ({ default: module.SponsorsPage })));
const Schedule = lazy(() => import('./src/pages/Schedule').then(module => ({ default: module.Schedule })));
const Contact = lazy(() => import('./src/pages/Contact').then(module => ({ default: module.Contact })));
// const TicketsPage = lazy(() => import('./src/pages/TicketsPage').then(module => ({ default: module.TicketsPage })));
const TeamPage = lazy(() => import('./src/pages/TeamPage').then(module => ({ default: module.TeamPage })));
const TermsPage = lazy(() => import('./src/pages/TermsPage').then(module => ({ default: module.TermsPage })));
const LoginPage = lazy(() => import('./src/pages/LoginPage').then(module => ({ default: module.LoginPage })));
const SignupPage = lazy(() => import('./src/pages/SignupPage').then(module => ({ default: module.SignupPage })));
const PronoteSignupPage = lazy(() => import('./src/pages/PronoteSignupPage').then(module => ({ default: module.PronoteSignupPage })));
const DashboardPage = lazy(() => import('./src/pages/DashboardPage').then(module => ({ default: module.DashboardPage })));
const CheckoutPage = lazy(() => import('./src/pages/CheckoutPage').then(module => ({ default: module.CheckoutPage })));
const PrivacyPolicyPage = lazy(() => import('./src/pages/PrivacyPolicyPage').then(module => ({ default: module.PrivacyPolicyPage })));
const RefundPolicyPage = lazy(() => import('./src/pages/RefundPolicyPage').then(module => ({ default: module.RefundPolicyPage })));
const PaymentSuccessPage = lazy(() => import('./src/pages/PaymentSuccessPage').then(module => ({ default: module.PaymentSuccessPage })));

// Default exports
const AdminLogin = lazy(() => import('./src/pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./src/pages/AdminDashboard'));
const AdminFormsPage = lazy(() => import('./src/pages/AdminFormsPage'));
const AdminFormEditorPage = lazy(() => import('./src/pages/AdminFormEditorPage'));
const PublicFormPage = lazy(() => import('./src/pages/PublicFormPage'));
const InviteAdminPage = lazy(() => import('./src/pages/InviteAdminPage'));
const ScannerPage = lazy(() => import('./src/pages/ScannerPage'));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen bg-[#05020a] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-[#7c3aed] border-t-transparent rounded-full animate-spin" />
  </div>
);

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, filter: "blur(10px)" }}
        transition={{ duration: 0.3 }}
      >
        <Suspense fallback={<PageLoader />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/speakers" element={<SpeakersPage />} />
            <Route path="/sponsors" element={<SponsorsPage />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/tickets" element={<DashboardPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/pronote/register" element={<PronoteSignupPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/refund-policy" element={<RefundPolicyPage />} />
            <Route path="/payment-success" element={<PaymentSuccessPage />} />
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/forms" element={<AdminFormsPage />} />
            <Route path="/admin/forms/:id" element={<AdminFormEditorPage />} />
            <Route path="/admin/invites" element={<InviteAdminPage />} />
            <Route path="/admin/scan" element={<ScannerPage />} />
            {/* Public Form Routes */}
            <Route path="/forms/:id" element={<PublicFormPage />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  const isFormPage = location.pathname.startsWith('/forms');

  return (
    <div className="bg-[#05020a] text-white min-h-screen font-sans selection:bg-purple-500 selection:text-white">
      {!isAdminPage && !isFormPage && <Navbar />}

      <main className="relative z-0">
        <AnimatedRoutes />
      </main>

      <Toaster
        position="bottom-right"
        theme="dark"
        toastOptions={{
          style: {
            background: 'rgba(20, 10, 30, 0.9)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'white',
          },
        }}
      />
      <FloatingRegisterButton />
      <FloatingAccommodationButton />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;