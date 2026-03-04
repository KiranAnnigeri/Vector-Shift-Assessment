// DraggableNode.js

import { useState } from 'react';
import { useHover } from '../hooks/useHover';

export const DraggableNode = ({ type, label, color = 'var(--accent)', icon = '◆' }) => {
    const [hovered, hoverProps] = useHover();
    const [dragging, setDragging] = useState(false);

    const onDragStart = (event, nodeType) => {
        const appData = { nodeType };
        event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
        event.dataTransfer.effectAllowed = 'move';
        setDragging(true);
    };

    return (
        <div
            className={type}
            role="button"
            tabIndex={0}
            aria-label={`Drag ${label} node to canvas`}
            onDragStart={(event) => onDragStart(event, type)}
            onDragEnd={() => setDragging(false)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') e.preventDefault(); }}
            {...hoverProps}
            draggable
            style={{
                cursor: dragging ? 'grabbing' : 'grab',
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                padding: '6px 12px 6px 8px',
                borderRadius: '8px',
                background: hovered
                    ? 'rgba(99,102,241,0.12)'
                    : 'rgba(255,255,255,0.04)',
                border: `1px solid ${hovered ? color : 'var(--border)'}`,
                boxShadow: hovered
                    ? `0 0 0 1px ${color}33, 0 2px 8px rgba(0,0,0,0.3)`
                    : '0 1px 3px rgba(0,0,0,0.2)',
                transform: dragging ? 'scale(0.96)' : hovered ? 'translateY(-1px)' : 'none',
                transition: 'all 0.15s ease',
                userSelect: 'none',
                whiteSpace: 'nowrap',
            }}
        >
            {/* Color dot / icon */}
            <div style={{
                width: 26,
                height: 26,
                borderRadius: '6px',
                background: `${color}22`,
                border: `1px solid ${color}55`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                color: color,
                fontWeight: 700,
                flexShrink: 0,
            }}>
                {icon}
            </div>
            <span style={{
                fontSize: '12px',
                fontWeight: 500,
                color: hovered ? 'var(--text-primary)' : 'var(--text-muted)',
                transition: 'color 0.15s',
            }}>
                {label}
            </span>
        </div>
    );
};
