// hooks/useNodeField.js
// Custom hook that synchronizes local component state with the Zustand store.
// Eliminates the repeated useState + updateNodeField + handleChange pattern
// found across 7 node components.

import { useState, useCallback } from 'react';
import { useStore } from '../store';

/**
 * Manages a single node field: local state + store sync.
 *
 * @param {string} nodeId    — ReactFlow node id
 * @param {string} fieldName — key in node.data (e.g. 'inputName', 'url')
 * @param {*}      initial   — initial value (from data prop or fallback)
 * @returns {[*, Function]}  — [currentValue, handleChange]
 *   handleChange accepts either an event (e.target.value) or a raw value.
 */
export const useNodeField = (nodeId, fieldName, initial) => {
    const updateNodeField = useStore((state) => state.updateNodeField);
    const [value, setValue] = useState(initial);

    const handleChange = useCallback((eventOrValue) => {
        const newValue = eventOrValue?.target !== undefined
            ? eventOrValue.target.value
            : eventOrValue;
        setValue(newValue);
        updateNodeField(nodeId, fieldName, newValue);
    }, [nodeId, fieldName, updateNodeField]);

    return [value, handleChange];
};
