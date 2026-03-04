// FilterNode.js

import { BaseNode, fieldLabel, fieldInput } from './BaseNode';
import { NODE_COLORS } from './nodeColors';
import { useNodeField } from '../hooks/useNodeField';

const inputs = [{ id: 'input', label: 'Input' }];
const outputs = [
    { id: 'true', label: 'True', style: { background: 'var(--success)' } },
    { id: 'false', label: 'False', style: { background: 'var(--danger)' } },
];

export const FilterNode = ({ id, data }) => {
    const [condition, handleChange] = useNodeField(id, 'condition', data?.condition || '');

    return (
        <BaseNode
            id={id}
            title="Filter"
            color={NODE_COLORS.filter}
            inputs={inputs}
            outputs={outputs}
            width={230}
            minHeight={90}
        >
            <label style={fieldLabel}>
                Condition
                <input
                    style={fieldInput}
                    type="text"
                    placeholder="e.g. value > 10"
                    value={condition}
                    onChange={handleChange}
                />
            </label>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginTop: '2px' }}>
                <span style={{ color: 'var(--success)' }}>✓ True</span>
                <span style={{ color: 'var(--danger)' }}>✗ False</span>
            </div>
        </BaseNode>
    );
};
