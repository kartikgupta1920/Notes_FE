import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/reducers/authReducer';
import { setAuthToken } from '../../api';

export default function AppContainer({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state: any) => state.auth.user);

    const handleLogout = () => {
        setAuthToken(null);
        dispatch(logout());
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex-shrink-0 flex items-center gap-2">
                            <span className="text-2xl font-bold text-blue-600">NotesApp</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-slate-600 hidden sm:block">
                                {user?.name}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="text-sm font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg transition"
                            >
                                Log out
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Page Content */}
            <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                {children}
            </main>
        </div>
    );
}