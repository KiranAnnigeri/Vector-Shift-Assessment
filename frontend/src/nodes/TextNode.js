// TextNode.js
// Part 3:
//   1. Auto-resize: width grows first (up to max), then height grows as text wraps
//   2. Variable handles: {{varName}} in text creates a left-side Handle

import { useState, useEffect, useRef, useMemo } from 'react';
import { BaseNode, fieldLabel } from './BaseNode';
import { NODE_COLORS } from './nodeColors';
import { useStore } from '../store';

// Regex: matches {{ validJSIdentifier }} with optional whitespace
const VAR_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

const extractVariables = (text) => {
  const vars = [];
  const seen = new Set();
  let match;
  VAR_REGEX.lastIndex = 0;
  while ((match = VAR_REGEX.exec(text)) !== null) {
    const name = match[1];
    if (!seen.has(name)) {
      seen.add(name);
      vars.push(name);
    }
  }
  return vars;
};

const MIN_WIDTH = 240;
const MAX_WIDTH = 480;
const PADDING_H = 48; // horizontal padding inside node

const outputs = [{ id: 'output', label: 'Output' }];
const baseNodeStyle = { transition: 'width 0.12s ease' };

export const TextNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [currText, setCurrText] = useState(data?.text || '');
  const [variables, setVariables] = useState(() => extractVariables(data?.text || ''));
  const [nodeWidth, setNodeWidth] = useState(MIN_WIDTH);

  const textareaRef = useRef(null);
  const mirrorRef = useRef(null);

  // Measure text to determine required width, then let textarea handle height
  useEffect(() => {
    const mirror = mirrorRef.current;
    const ta = textareaRef.current;
    if (!mirror || !ta) return;

    // Measure single-line width of the text content
    mirror.style.whiteSpace = 'nowrap';
    mirror.textContent = currText || '';
    const textWidth = mirror.scrollWidth + PADDING_H;

    // Clamp width between min and max
    const newWidth = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, textWidth));
    setNodeWidth(newWidth);

    // Now auto-grow textarea height at the current width
    ta.style.height = '0px';
    ta.style.height = `${Math.max(60, ta.scrollHeight)}px`;
  }, [currText]);

  const handleChange = (e) => {
    const text = e.target.value;
    setCurrText(text);
    setVariables(extractVariables(text));
    updateNodeField(id, 'text', text);
  };

  // Build dynamic inputs from detected variables
  const dynamicInputs = useMemo(() => variables.map((v) => ({ id: v, label: v })), [variables]);

  return (
    <>
      {/* Hidden mirror for measuring text width */}
      <div
        ref={mirrorRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: -9999,
          left: -9999,
          visibility: 'hidden',
          fontSize: '12px',
          lineHeight: '1.5',
          padding: '5px 8px',
          pointerEvents: 'none',
        }}
      />

      <BaseNode
        id={id}
        title="Text"
        color={NODE_COLORS.text}
        inputs={dynamicInputs}
        outputs={outputs}
        width={nodeWidth}
        style={baseNodeStyle}
      >
        <label style={fieldLabel}>
          Text
          <textarea
            ref={textareaRef}
            value={currText}
            onChange={handleChange}
            placeholder="Enter text or {{variable}}"
            style={{
              background: 'rgba(0,0,0,0.3)',
              border: '1px solid var(--border)',
              borderRadius: '5px',
              color: 'var(--text-primary)',
              padding: '5px 8px',
              fontSize: '12px',
              lineHeight: '1.5',
              width: '100%',
              boxSizing: 'border-box',
              outline: 'none',
              resize: 'none',
              overflow: 'hidden',
              minHeight: '60px',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          />
        </label>

        {/* Variable chips */}
        {variables.length > 0 && (
          <div style={{
            marginTop: '8px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '4px',
          }}>
            {variables.map((v) => (
              <span key={v} style={{
                fontSize: '10px',
                background: `${NODE_COLORS.text}26`,
                border: `1px solid ${NODE_COLORS.text}66`,
                borderRadius: '4px',
                padding: '1px 6px',
                color: NODE_COLORS.text,
                fontFamily: 'monospace',
              }}>
                {`{{${v}}}`}
              </span>
            ))}
          </div>
        )}
      </BaseNode>
    </>
  );
};
