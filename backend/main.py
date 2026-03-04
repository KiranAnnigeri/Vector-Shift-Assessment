# main.py
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional

app = FastAPI()

# Allow requests from the React dev server (configurable via env)
FRONTEND_URL = os.environ.get("FRONTEND_URL", "http://localhost:3001")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


# ── Request Models ──────────────────────────────────────

class NodeData(BaseModel):
    """Represents a single node in the pipeline."""
    id: str
    type: Optional[str] = None
    position: Optional[dict] = None
    data: Optional[dict] = None

class EdgeData(BaseModel):
    """Represents a single edge (connection) in the pipeline."""
    id: Optional[str] = None
    source: str
    target: str
    sourceHandle: Optional[str] = None
    targetHandle: Optional[str] = None

class PipelineRequest(BaseModel):
    """The pipeline payload sent from the frontend."""
    nodes: List[NodeData] = Field(default_factory=list)
    edges: List[EdgeData] = Field(default_factory=list)


# ── DAG Detection ──────────────────────────────────────

def is_dag(nodes: List[NodeData], edges: List[EdgeData]) -> bool:
    """
    Check whether the directed graph formed by edges is a DAG (no cycles).
    Uses DFS-based cycle detection (white/gray/black colouring).
    """
    # Build adjacency list using node ids
    node_ids = {n.id for n in nodes}
    adj = {nid: [] for nid in node_ids}

    for edge in edges:
        if edge.source in adj:
            adj[edge.source].append(edge.target)

    # 0 = unvisited, 1 = in current DFS stack, 2 = fully visited
    state = {nid: 0 for nid in node_ids}

    def dfs(node) -> bool:
        """Returns True if a cycle is found."""
        state[node] = 1
        for neighbour in adj.get(node, []):
            if neighbour not in state:
                continue
            if state[neighbour] == 1:   # back-edge → cycle
                return True
            if state[neighbour] == 0 and dfs(neighbour):
                return True
        state[node] = 2
        return False

    for nid in node_ids:
        if state[nid] == 0:
            if dfs(nid):
                return False   # cycle found → NOT a DAG

    return True   # no cycles found → IS a DAG


# ── Pipeline Endpoint ──────────────────────────────────

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineRequest):
    nodes = pipeline.nodes
    edges = pipeline.edges

    num_nodes = len(nodes)
    num_edges = len(edges)
    dag = is_dag(nodes, edges)

    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': dag,
    }
