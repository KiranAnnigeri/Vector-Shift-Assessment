// NoteNode.js
// Auto-resizes height via scrollHeight using useAutoResize hook.

import { useRef } from 'react';
import { BaseNode } from './BaseNode';
import { NODE_COLORS } from './nodeColors';
import { useAutoResize } from '../hooks/useAutoResize';
import { useNodeField } from '../hooks/useNodeField';

const inputs = [];
const outputs = [];

const noteStyle = {
    backgroundColor: 'var(--bg-note)',
    borderColor: 'var(--border-note)',
};

const textareaStyle = {
    background: 'transparent',
    border: 'none',
    color: NODE_COLORS.note,
    fontSize: '12px',
    width: '100%',
    minHeight: '80px',
    resize: 'none',
    overflow: 'hidden',
    outline: 'none',
    lineHeight: '1.5',
    boxSizing: 'border-box',
    padding: 0,
    display: 'block',
};

export const NoteNode = ({ id, data }) => {
    const [note, handleChange] = useNodeField(id, 'note', data?.note || '');
    const textareaRef = useRef(null);

    // Auto-grow height when note text changes
    useAutoResize(textareaRef, note, 80);

    return (
        <BaseNode
            id={id}
            title="📝 Note"
            color={NODE_COLORS.note}
            inputs={inputs}
            outputs={outputs}
            width={210}
            style={noteStyle}
        >
            <textarea
                ref={textareaRef}
                style={textareaStyle}
                placeholder="Add a note or comment..."
                value={note}
                onChange={handleChange}
            />
        </BaseNode>
    );
};
