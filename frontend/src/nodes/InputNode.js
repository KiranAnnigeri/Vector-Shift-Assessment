// InputNode.js

import { BaseNode, fieldLabel, fieldInput, fieldSelect } from './BaseNode';
import { NODE_COLORS } from './nodeColors';
import { useNodeField } from '../hooks/useNodeField';

const inputs = [];
const outputs = [{ id: 'value', label: 'Value' }];

export const InputNode = ({ id, data }) => {
  const [currName, handleNameChange] = useNodeField(id, 'inputName', data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, handleTypeChange] = useNodeField(id, 'inputType', data?.inputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Input"
      color={NODE_COLORS.customInput}
      inputs={inputs}
      outputs={outputs}
    >
      <label style={fieldLabel}>
        Name
        <input style={fieldInput} type="text" value={currName} onChange={handleNameChange} />
      </label>
      <label style={fieldLabel}>
        Type
        <select style={fieldSelect} value={inputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
};
