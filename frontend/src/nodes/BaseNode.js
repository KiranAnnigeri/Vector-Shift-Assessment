// BaseNode.js
// Reusable base component for all pipeline nodes.
// Handles consistent layout, title bar, and Handle placement.

import { useCallback } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import { useHover } from '../hooks/useHover';

/**
 * BaseNode - the shared abstraction for every node type.
 *
 * Props:
 *  id         {string}   - ReactFlow node id
 *  title      {string}   - Label shown in the node header
 *  color      {string}   - Accent color for the title bar (default: var(--accent))
 *  inputs     {Array}    - Array of { id, label?, style? } for target (left) handles
 *  outputs    {Array}    - Array of { id, label?, style? } for source (right) handles
 *  width      {number}   - Optional fixed width (default 220)
 *  minHeight  {number}   - Optional min height (default 80)
 *  style      {object}   - Optional extra styles for the outer wrapper
 *  children   {node}     - Body content (fields, selects, etc.)
 */
const EMPTY_ARRAY = [];
const EMPTY_STYLE = {};

export const BaseNode = ({
    id,
    title,
    color = 'var(--accent)',
    inputs = EMPTY_ARRAY,
    outputs = EMPTY_ARRAY,
    width = 220,
    minHeight = 80,
    style = EMPTY_STYLE,
    children,
}) => {
    const { deleteElements } = useReactFlow();
    const [hovered, hoverProps] = useHover();

    const onDelete = useCallback(() => {
        deleteElements({ nodes: [{ id }] });
    }, [id, deleteElements]);

    return (
        <div
            {...hoverProps}
            style={{
                width,
                minHeight,
                border: `1px solid ${hovered ? color : 'var(--border)'}`,
                borderRadius: '10px',
                backgroundColor: 'var(--bg-node)',
                color: 'var(--text-primary)',
                fontFamily: "'Inter', sans-serif",
                fontSize: '12px',
                boxShadow: hovered
                    ? `0 0 0 1px ${color}44, 0 8px 32px rgba(0,0,0,0.5)`
                    : '0 4px 16px rgba(0,0,0,0.4)',
                overflow: 'visible',
                position: 'relative',
                transition: 'border-color 0.2s, box-shadow 0.2s',
                ...style,
            }}
        >
            {/* Title bar */}
            <div
                style={{
                    background: `linear-gradient(135deg, ${color}33 0%, ${color}18 100%)`,
                    borderBottom: `1px solid ${color}44`,
                    borderRadius: '9px 9px 0 0',
                    padding: '7px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    userSelect: 'none',
                }}
            >
                {/* Color dot + title */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                    <div style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: color,
                        boxShadow: `0 0 6px ${color}`,
                        flexShrink: 0,
                    }} />
                    <span style={{
                        fontWeight: 600,
                        fontSize: '12px',
                        color: 'var(--text-primary)',
                        letterSpacing: '0.01em',
                    }}>
                        {title}
                    </span>
                </div>

                {/* Delete button */}
                <button
                    onClick={onDelete}
                    title="Delete node"
                    aria-label="Delete node"
                    className="node-delete-btn"
                >
                    ✕
                </button>
            </div>

            {/* Body */}
            <div style={{ padding: '10px 12px' }}>
                {children}
            </div>

            {/* Target (input) handles — left side */}
            {inputs.map((handle, i) => {
                const top = inputs.length === 1
                    ? '50%'
                    : `${(100 / (inputs.length + 1)) * (i + 1)}%`;
                return (
                    <Handle
                        key={handle.id}
                        type="target"
                        position={Position.Left}
                        id={`${id}-${handle.id}`}
                        style={{
                            top,
                            background: 'var(--handle-in)',
                            width: 11,
                            height: 11,
                            border: '2px solid var(--bg-node)',
                            boxShadow: '0 0 4px rgba(129,140,248,0.6)',
                            ...handle.style,
                        }}
                        title={handle.label || handle.id}
                    />
                );
            })}

            {/* Source (output) handles — right side */}
            {outputs.map((handle, i) => {
                const top = outputs.length === 1
                    ? '50%'
                    : `${(100 / (outputs.length + 1)) * (i + 1)}%`;
                return (
                    <Handle
                        key={handle.id}
                        type="source"
                        position={Position.Right}
                        id={`${id}-${handle.id}`}
                        style={{
                            top,
                            background: 'var(--handle-out)',
                            width: 11,
                            height: 11,
                            border: '2px solid var(--bg-node)',
                            boxShadow: '0 0 4px rgba(244,114,182,0.6)',
                            ...handle.style,
                        }}
                        title={handle.label || handle.id}
                    />
                );
            })}
        </div>
    );
};

/* ── Shared field styles (exported for node files to use) ── */
export const fieldLabel = {
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
    marginBottom: '8px',
    color: 'var(--text-muted)',
    fontSize: '10px',
    fontWeight: 500,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
};

export const fieldInput = {
    background: 'rgba(0,0,0,0.3)',
    border: '1px solid var(--border)',
    borderRadius: '5px',
    color: 'var(--text-primary)',
    padding: '5px 8px',
    fontSize: '12px',
    width: '100%',
    boxSizing: 'border-box',
    outline: 'none',
    fontFamily: "'Inter', sans-serif",
    transition: 'border-color 0.15s',
};

export const fieldSelect = {
    background: 'rgba(0,0,0,0.35)',
    border: '1px solid var(--border)',
    borderRadius: '5px',
    color: 'var(--text-primary)',
    padding: '5px 28px 5px 8px',
    fontSize: '12px',
    width: '100%',
    boxSizing: 'border-box',
    outline: 'none',
    fontFamily: "'Inter', sans-serif",
    transition: 'border-color 0.15s, box-shadow 0.15s',
    cursor: 'pointer',
    // Hide native arrow, replace with SVG chevron
    appearance: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%2394a3b8'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 8px center',
    backgroundSize: '8px 5px',
};

