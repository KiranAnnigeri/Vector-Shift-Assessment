// SubmitButton.js

import { useState } from 'react';
import { useStore } from '../store';
import { useShallow } from 'zustand/react/shallow';
import { useHover } from '../hooks/useHover';
import { showToast } from './Toast';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
});

export const SubmitButton = () => {
    const [hovered, hoverProps] = useHover();
    const [active, setActive] = useState(false);
    const [loading, setLoading] = useState(false);

    const { nodes, edges } = useStore(useShallow(selector));

    const handleSubmit = async () => {
        if (nodes.length === 0) {
            showToast({
                title: '⚠️  Empty Pipeline',
                body: 'Add some nodes to the canvas before submitting.',
                type: 'warning',
            });
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${BACKEND_URL}/pipelines/parse`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const result = await response.json();
            const { num_nodes, num_edges, is_dag } = result;

            const dagLine = is_dag
                ? '✅  Valid DAG — no cycles detected.'
                : '❌  Not a DAG — the pipeline contains a cycle!';

            showToast({
                title: '📊  Pipeline Analysis',
                body: `🔷  Nodes : ${num_nodes}\n🔗  Edges : ${num_edges}\n${dagLine}`,
                type: is_dag ? 'success' : 'error',
            });
        } catch (err) {
            showToast({
                title: '❌  Connection Failed',
                body: `${err.message}\n\nMake sure the backend server is running on ${BACKEND_URL}`,
                type: 'error',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '14px 24px',
            background: 'var(--bg-panel)',
            borderTop: '1px solid var(--border)',
            flexShrink: 0,
        }}>
            <button
                onClick={handleSubmit}
                disabled={loading}
                {...hoverProps}
                onMouseLeave={() => { hoverProps.onMouseLeave(); setActive(false); }}
                onMouseDown={() => setActive(true)}
                onMouseUp={() => setActive(false)}
                style={{
                    padding: '10px 40px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: loading ? 'wait' : 'pointer',
                    fontSize: '14px',
                    fontWeight: 600,
                    fontFamily: 'Inter, sans-serif',
                    letterSpacing: '0.02em',
                    color: 'var(--white)',
                    background: loading
                        ? `linear-gradient(135deg, var(--loading-start) 0%, var(--loading-end) 100%)`
                        : 'linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%)',
                    boxShadow: hovered && !loading
                        ? '0 0 0 3px rgba(99,102,241,0.35), 0 4px 20px rgba(99,102,241,0.4)'
                        : '0 2px 8px rgba(99,102,241,0.25)',
                    transform: active ? 'scale(0.97)' : hovered && !loading ? 'translateY(-1px)' : 'none',
                    transition: 'all 0.15s ease',
                    minWidth: '160px',
                    opacity: loading ? 0.7 : 1,
                }}
            >
                {loading ? '⏳  Analyzing...' : '▶ \u00a0 Run Pipeline'}
            </button>
        </div>
    );
};
