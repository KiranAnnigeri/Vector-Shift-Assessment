// PipelineToolbar.js

import { DraggableNode } from './DraggableNode';
import { useStore } from '../store';
import { NODE_COLORS } from '../nodes';
import { useHover } from '../hooks/useHover';

// Each node type gets a unique accent color dot
const NODE_CONFIGS = [
    { type: 'customInput', label: 'Input', color: NODE_COLORS.customInput, icon: '→' },
    { type: 'llm', label: 'LLM', color: NODE_COLORS.llm, icon: '✦' },
    { type: 'customOutput', label: 'Output', color: NODE_COLORS.customOutput, icon: '←' },
    { type: 'text', label: 'Text', color: NODE_COLORS.text, icon: 'T' },
    { type: 'filter', label: 'Filter', color: NODE_COLORS.filter, icon: '⊕' },
    { type: 'api', label: 'API Call', color: NODE_COLORS.api, icon: '⇌' },
    { type: 'transform', label: 'Transform', color: NODE_COLORS.transform, icon: '⟳' },
    { type: 'merge', label: 'Merge', color: NODE_COLORS.merge, icon: '⊗' },
    { type: 'note', label: 'Note', color: NODE_COLORS.note, icon: '✎' },
];

export const PipelineToolbar = () => {
    const [hovered, hoverProps] = useHover();
    const clearAll = useStore((state) => state.clearAll);

    return (
        <div style={{
            background: 'var(--bg-panel)',
            borderBottom: '1px solid var(--border)',
            padding: '10px 20px',
            flexShrink: 0,
        }}>
            {/* Header row: label + divider + clear button */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px',
            }}>
                <span style={{
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                }}>
                    Node Palette
                </span>
                <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />

                {/* Clear All button */}
                <button
                    onClick={clearAll}
                    {...hoverProps}
                    title="Remove all nodes and edges from the canvas"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        border: `1px solid ${hovered ? '#f87171' : 'var(--border)'}`,
                        background: hovered ? 'rgba(248,113,113,0.12)' : 'transparent',
                        color: hovered ? '#f87171' : 'var(--text-muted)',
                        fontSize: '11px',
                        fontWeight: 500,
                        fontFamily: "'Inter', sans-serif",
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        whiteSpace: 'nowrap',
                    }}
                >
                    <span style={{ fontSize: '12px' }}>✕</span>
                    Clear All
                </button>
            </div>

            {/* Node chips */}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
            }}>
                {NODE_CONFIGS.map(({ type, label, color, icon }) => (
                    <DraggableNode key={type} type={type} label={label} color={color} icon={icon} />
                ))}
            </div>
        </div>
    );
};
