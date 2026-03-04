// ErrorBoundary.js
// Catches unhandled errors in child components and displays a fallback UI
// instead of crashing the entire application.

import React from 'react';

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('[ErrorBoundary] Caught:', error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-container">
                    <div className="error-icon">⚠️</div>
                    <h2 className="error-title">Something went wrong</h2>
                    <p className="error-message">
                        An unexpected error occurred. Try resetting or refreshing the page.
                    </p>
                    <pre className="error-details">
                        {this.state.error?.message || 'Unknown error'}
                    </pre>
                    <button className="error-reset-btn" onClick={this.handleReset}>
                        Try Again
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
