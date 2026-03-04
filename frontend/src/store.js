// store.js

import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from 'reactflow';

const EDGE_DEFAULTS = {
  type: 'smoothstep',
  animated: true,
  markerEnd: { type: MarkerType.Arrow, height: '20px', width: '20px' },
};

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  nodeIDs: {},
  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },
  addNode: (node) => {
    set({
      nodes: [...get().nodes, node]
    });
  },
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    set({
      edges: addEdge({ ...connection, ...EDGE_DEFAULTS }, get().edges),
    });
  },
  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          return { ...node, data: { ...node.data, [fieldName]: fieldValue } };
        }
        return node;
      }),
    });
  },
  clearAll: () => {
    set({ nodes: [], edges: [], nodeIDs: {} });
  },
}));
