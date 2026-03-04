// LLMNode.js

import { BaseNode } from './BaseNode';
import { NODE_COLORS } from './nodeColors';

const inputs = [
  { id: 'system', label: 'System Prompt' },
  { id: 'prompt', label: 'User Prompt' },
];
const outputs = [{ id: 'response', label: 'Response' }];

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      color={NODE_COLORS.llm}
      inputs={inputs}
      outputs={outputs}
      minHeight={100}
    >
      <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '11px', fontStyle: 'italic' }}>
        Large Language Model
      </p>
      <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--handle-in)', display: 'inline-block' }} />
          System Prompt
        </div>
        <div style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--handle-in)', display: 'inline-block' }} />
          User Prompt
        </div>
      </div>
    </BaseNode>
  );
};
