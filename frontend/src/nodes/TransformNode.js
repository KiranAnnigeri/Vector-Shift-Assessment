// TransformNode.js

import { BaseNode, fieldLabel, fieldSelect } from './BaseNode';
import { NODE_COLORS } from './nodeColors';
import { useNodeField } from '../hooks/useNodeField';

const TRANSFORMS = ['Uppercase', 'Lowercase', 'Trim', 'JSON Parse', 'JSON Stringify', 'Reverse'];

const inputs = [{ id: 'input', label: 'Input' }];
const outputs = [{ id: 'output', label: 'Output' }];

export const TransformNode = ({ id, data }) => {
    const [transform, handleChange] = useNodeField(id, 'transform', data?.transform || 'Uppercase');

    return (
        <BaseNode
            id={id}
            title="Transform"
            color={NODE_COLORS.transform}
            inputs={inputs}
            outputs={outputs}
            width={220}
        >
            <label style={fieldLabel}>
                Operation
                <select style={fieldSelect} value={transform} onChange={handleChange}>
                    {TRANSFORMS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
            </label>
            <div style={{ fontSize: '10px', color: NODE_COLORS.transform, marginTop: '4px', fontFamily: 'monospace' }}>
                fn: {transform.toLowerCase().replace(/ /g, '_')}(x)
            </div>
        </BaseNode>
    );
};
