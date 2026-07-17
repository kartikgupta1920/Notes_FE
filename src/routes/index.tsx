// src/routes/index.tsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import LoadingOverlay from '../components/LoadingOverlay'; // From starter kit

// Lazy load pages for code-splitting (Crucial for performance at scale)
const SignIn = lazy(() => import('../pages/SignIn'));
const SignUp = lazy(() => import('../pages/SignUp'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Suspense fallback={<LoadingOverlay />}>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />

                    {/* Protected Routes */}
                    <Route
                        path="/notes"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />

                    {/* Redirects & Fallbacks */}
                    <Route path="/" element={<Navigate to="/notes" replace />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}