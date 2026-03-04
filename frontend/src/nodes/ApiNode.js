// ApiNode.js

import { BaseNode, fieldLabel, fieldInput, fieldSelect } from './BaseNode';
import { NODE_COLORS } from './nodeColors';
import { useNodeField } from '../hooks/useNodeField';

const METHOD_COLORS = {
    GET: 'var(--success)',
    POST: 'var(--info)',
    PUT: 'var(--warning)',
    DELETE: 'var(--danger)',
};

const inputs = [{ id: 'body', label: 'Request Body' }];
const outputs = [{ id: 'response', label: 'Response' }];

export const ApiNode = ({ id, data }) => {
    const [url, handleUrlChange] = useNodeField(id, 'url', data?.url || '');
    const [method, handleMethodChange] = useNodeField(id, 'method', data?.method || 'GET');

    return (
        <BaseNode
            id={id}
            title="API Call"
            color={NODE_COLORS.api}
            inputs={inputs}
            outputs={outputs}
            width={230}
            minHeight={100}
        >
            <label style={fieldLabel}>
                Method
                <select
                    style={{ ...fieldSelect, color: METHOD_COLORS[method] }}
                    value={method}
                    onChange={handleMethodChange}
                >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                </select>
            </label>
            <label style={fieldLabel}>
                URL
                <input
                    style={fieldInput}
                    type="text"
                    placeholder="https://api.example.com/..."
                    value={url}
                    onChange={handleUrlChange}
                />
            </label>
        </BaseNode>
    );
};
