// MergeNode.js

import { BaseNode, fieldLabel, fieldInput } from './BaseNode';
import { NODE_COLORS } from './nodeColors';
import { useNodeField } from '../hooks/useNodeField';

const inputs = [
    { id: 'a', label: 'Input A' },
    { id: 'b', label: 'Input B' },
];
const outputs = [{ id: 'output', label: 'Merged Output' }];

export const MergeNode = ({ id, data }) => {
    const [separator, handleChange] = useNodeField(id, 'separator', data?.separator || ' ');

    return (
        <BaseNode
            id={id}
            title="Merge"
            color={NODE_COLORS.merge}
            inputs={inputs}
            outputs={outputs}
            width={220}
            minHeight={90}
        >
            <label style={fieldLabel}>
                Separator
                <input
                    style={fieldInput}
                    type="text"
                    placeholder='e.g. ", " or "\n"'
                    value={separator}
                    onChange={handleChange}
                />
            </label>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>
                A + sep + B → Output
            </div>
        </BaseNode>
    );
};
