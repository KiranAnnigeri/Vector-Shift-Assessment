// PipelineCanvas.js
// Displays the drag-and-drop ReactFlow canvas
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from '../store';
import { useShallow } from 'zustand/react/shallow';
import {
    InputNode,
    LLMNode,
    OutputNode,
    TextNode,
    FilterNode,
    ApiNode,
    TransformNode,
    MergeNode,
    NoteNode,
    NODE_COLORS,
} from '../nodes';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const minimapNodeColor = (node) => NODE_COLORS[node.type] || 'var(--accent)';
const minimapStyle = { background: 'var(--bg-panel)' };
const nodeTypes = {
    customInput: InputNode,
    llm: LLMNode,
    customOutput: OutputNode,
    text: TextNode,
    filter: FilterNode,
    api: ApiNode,
    transform: TransformNode,
    merge: MergeNode,
    note: NoteNode,
};

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
    getNodeID: state.getNodeID,
    addNode: state.addNode,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
});

export const PipelineCanvas = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
        nodes,
        edges,
        getNodeID,
        addNode,
        onNodesChange,
        onEdgesChange,
        onConnect,
    } = useStore(useShallow(selector));

    const getInitNodeData = (nodeID, type) => {
        return { id: nodeID, nodeType: type };
    };

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();
            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            if (event?.dataTransfer?.getData('application/reactflow')) {
                const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
                const type = appData?.nodeType;
                if (typeof type === 'undefined' || !type) return;

                const position = reactFlowInstance.project({
                    x: event.clientX - reactFlowBounds.left,
                    y: event.clientY - reactFlowBounds.top,
                });

                const nodeID = getNodeID(type);
                const newNode = {
                    id: nodeID,
                    type,
                    position,
                    data: getInitNodeData(nodeID, type),
                };
                addNode(newNode);
            }
        },
        [reactFlowInstance, getNodeID, addNode]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <div ref={reactFlowWrapper} style={{ width: '100%', height: '100%' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType="smoothstep"
            >
                <Background
                    variant="dots"
                    color="var(--border)"
                    gap={gridSize}
                    size={1.5}
                />
                <Controls />
                <MiniMap
                    nodeColor={minimapNodeColor}
                    maskColor="rgba(13,15,26,0.7)"
                    style={minimapStyle}
                />
            </ReactFlow>
        </div>
    );
};
