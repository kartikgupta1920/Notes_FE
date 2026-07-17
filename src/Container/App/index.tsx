import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/reducers/authReducer';
import { setAuthToken } from '../../api';
import { NotebookIcon, LogOutIcon } from '../../components/Icons';
import ThemeToggle from '../../components/ThemeToggle';
import { useToast } from '../../components/Toast';

export default function AppContainer({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state: any) => state.auth.user);
    const { showToast } = useToast();

    const handleLogout = () => {
        setAuthToken(null);
        dispatch(logout());
        showToast('Signed out', 'info');
    };

    const initial = user?.name?.trim()?.[0]?.toUpperCase() || 'U';

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <nav className="navbar">
                <div className="container navbar-inner">
                    <div className="brand">
                        <span className="brand-mark"><NotebookIcon width={18} height={18} /></span>
                        <span className="brand-text">NotesApp</span>
                    </div>

                    <div className="row" style={{ gap: 10 }}>
                        <ThemeToggle />
                        <div className="row" style={{ gap: 10, paddingLeft: 10, borderLeft: '1px solid var(--border)' }}>
                            <span className="avatar" aria-hidden="true">{initial}</span>
                            <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-muted)' }} className="hide-sm">
                                {user?.name}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="icon-btn"
                                aria-label="Log out"
                                title="Log out"
                            >
                                <LogOutIcon width={16} height={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="container" style={{ flex: 1, width: '100%', paddingTop: 32, paddingBottom: 48 }}>
                {children}
            </main>
        </div>
    );
}
