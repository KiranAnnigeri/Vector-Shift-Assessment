// OutputNode.js

import { BaseNode, fieldLabel, fieldInput, fieldSelect } from './BaseNode';
import { NODE_COLORS } from './nodeColors';
import { useNodeField } from '../hooks/useNodeField';

const inputs = [{ id: 'value', label: 'Value' }];
const outputs = [];

export const OutputNode = ({ id, data }) => {
  const [currName, handleNameChange] = useNodeField(id, 'outputName', data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, handleTypeChange] = useNodeField(id, 'outputType', data?.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Output"
      color={NODE_COLORS.customOutput}
      inputs={inputs}
      outputs={outputs}
    >
      <label style={fieldLabel}>
        Name
        <input style={fieldInput} type="text" value={currName} onChange={handleNameChange} />
      </label>
      <label style={fieldLabel}>
        Type
        <select style={fieldSelect} value={outputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </label>
    </BaseNode>
  );
};
