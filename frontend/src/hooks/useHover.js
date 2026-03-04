// hooks/useHover.js
// Custom hook to track hover state — replaces repeated useState + onMouseEnter/Leave pattern.

import { useState, useMemo } from 'react';

export const useHover = () => {
    const [hovered, setHovered] = useState(false);

    const hoverProps = useMemo(() => ({
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => setHovered(false),
    }), []);

    return [hovered, hoverProps];
};
