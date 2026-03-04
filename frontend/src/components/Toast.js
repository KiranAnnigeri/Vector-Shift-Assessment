// components/Toast.js
// Centered modal alert with blurred backdrop.
// Stays visible until the user explicitly dismisses it.

import { useState, useCallback, useEffect, useRef } from 'react';

let addAlertGlobal = null;

/**
 * Imperative API — call from anywhere after <ToastContainer /> is mounted.
 * @param {{ title?: string, body: string, type?: 'success'|'error'|'warning' }} alert
 */
export const showToast = (alert) => {
    if (addAlertGlobal) addAlertGlobal(alert);
};

const ModalAlert = ({ alert, onClose }) => {
    const closeRef = useRef(null);
    const typeClass = alert.type ? `modal-${alert.type}` : '';

    // Auto-focus the close button so pressing Enter/Escape can dismiss it
    useEffect(() => {
        closeRef.current?.focus();
    }, []);

    // Allow Escape key to close
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className={`modal-dialog ${typeClass}`} onClick={(e) => e.stopPropagation()}>
                {alert.title && <div className="modal-title">{alert.title}</div>}
                <div className="modal-body">{alert.body}</div>
                <button ref={closeRef} className="modal-close-btn" onClick={onClose}>
                    Dismiss
                </button>
            </div>
        </div>
    );
};

export const ToastContainer = () => {
    const [alerts, setAlerts] = useState([]);
    const nextId = useRef(0);

    const removeAlert = useCallback((id) => {
        setAlerts((prev) => prev.filter((a) => a.id !== id));
    }, []);

    const addAlert = useCallback((alert) => {
        const id = ++nextId.current;
        setAlerts((prev) => [...prev, { ...alert, id }]);
    }, []);

    // Expose addAlert globally
    useEffect(() => {
        addAlertGlobal = addAlert;
        return () => { addAlertGlobal = null; };
    }, [addAlert]);

    // Only show the most recent alert (modal pattern — one at a time)
    const current = alerts[alerts.length - 1];
    if (!current) return null;

    return (
        <ModalAlert
            key={current.id}
            alert={current}
            onClose={() => removeAlert(current.id)}
        />
    );
};
