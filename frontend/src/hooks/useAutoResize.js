// hooks/useAutoResize.js
// Custom hook for textarea auto-height resizing.
// Used by TextNode and NoteNode.

import { useEffect } from 'react';

/**
 * Auto-grows a textarea's height to fit its content.
 *
 * @param {React.RefObject} ref  - ref attached to the <textarea>
 * @param {*} dep                - value to watch (triggers resize on change)
 * @param {number} minHeight     - minimum height in px (default 60)
 */
export const useAutoResize = (ref, dep, minHeight = 60) => {
    useEffect(() => {
        const ta = ref.current;
        if (!ta) return;
        ta.style.height = '0px';
        ta.style.height = `${Math.max(minHeight, ta.scrollHeight)}px`;
    }, [ref, dep, minHeight]);
};
