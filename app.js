// ==================== EVENT HANDLERS ====================
class EventHandlers {
    constructor(visualizer, routingTable, weightEditor) {
        this.visualizer = visualizer;
        this.routingTable = routingTable;
        this.weightEditor = weightEditor;
    }

    setupGenerateBtn() {
        const btn = document.getElementById('generate-btn');
        const nodeCountInput = document.getElementById('node-count');
        const weightTypeSelect = document.getElementById('weight-type');

        btn.addEventListener('click', () => {
            const nodeCount = parseInt(nodeCountInput.value);
            const weightType = weightTypeSelect.value;
            const useRandom = weightType === 'random';

            this.visualizer.generateRandomGraph(nodeCount, useRandom);
            this.routingTable.clear();
            this.visualizer.clearHighlights();
            this.visualizer.clearSelection();
            document.getElementById('results-card').style.display = 'none';

            if (!useRandom) {
                this.weightEditor.show(() => {
                    this.visualizer.redrawGraph();
                });
            }
        });
    }

    setupClearSelectionBtn() {
        const btn = document.getElementById('clear-selection-btn');

        btn.addEventListener('click', () => {
            this.visualizer.clearSelection();
            this.routingTable.clear();
            this.visualizer.clearHighlights();
            document.getElementById('results-card').style.display = 'none';
        });
    }

    setupRunSimulationBtn() {
        const btn = document.getElementById('run-simulation-btn');

        btn.addEventListener('click', () => {
            const sourceId = this.visualizer.sourceNode;
            const destId = this.visualizer.destNode;

            if (sourceId === null || destId === null) {
                alert('Please select both source and destination nodes');
                return;
            }

            if (sourceId === destId) {
                alert('Source and destination must be different');
                return;
            }

            this.runSimulation(sourceId, destId);
        });
    }

    runSimulation(sourceId, destId) {
        const { distances, previous } = DijkstraAlgorithm.findShortestPath(
            this.visualizer.graph,
            sourceId
        );

        this.routingTable.updateTable(distances, previous, sourceId);
        this.visualizer.highlightPath(sourceId, destId, previous);

        const distance = distances[destId];
        const path = DijkstraAlgorithm.getPath(sourceId, destId, previous);

        this.displayResults(distance, path);
    }

    displayResults(distance, path) {
        const resultsCard = document.getElementById('results-card');
        resultsCard.style.display = 'block';

        if (distance === Infinity) {
            document.getElementById('path-display').textContent = 'No path found';
            document.getElementById('distance-display').textContent = '∞';
        } else {
            const pathStr = path.map(n => `Node ${n}`).join(' → ');
            document.getElementById('path-display').textContent = pathStr;
            document.getElementById('distance-display').textContent = distance;
        }
    }
}

// ==================== MANUAL MODE MANAGER ====================
class ManualModeManager {
    constructor(visualizer) {
        this.visualizer = visualizer;
        this.modal = document.getElementById('manual-panel');

        // State
        this.isClickAddNodeMode = false;
        this.isClickAddEdgeMode = false;
        this.edgeFirstNode = null;

        this._boundCanvasClickNode = this._onCanvasClickForNode.bind(this);
        this._boundCanvasClickEdge = this._onCanvasClickForEdge.bind(this);
    }

    // ── Open / close ──────────────────────────────────────────
    open() {
        this.modal.style.display = 'flex';
        this._refreshNodeDropdowns();
    }

    close() {
        this.modal.style.display = 'none';
        this._stopNodeClickMode();
        this._stopEdgeClickMode();
    }



    // ── ADD NODE: click-on-canvas mode ────────────────────────
    startNodeClickMode() {
        this.isClickAddNodeMode = true;
        document.getElementById('click-add-node-btn').style.display = 'none';
        document.getElementById('stop-click-node-btn').style.display = '';

        // Visual cursor cue on SVG
        this.visualizer.svg.style.cursor = 'crosshair';
        this.visualizer.svg.addEventListener('click', this._boundCanvasClickNode);

        this._setStatus('node', '🖱️ Click anywhere on the canvas to place a node');
    }

    _stopNodeClickMode() {
        this.isClickAddNodeMode = false;
        document.getElementById('click-add-node-btn').style.display = '';
        document.getElementById('stop-click-node-btn').style.display = 'none';
        this.visualizer.svg.style.cursor = '';
        this.visualizer.svg.removeEventListener('click', this._boundCanvasClickNode);
    }

    _onCanvasClickForNode(e) {
        // Ignore clicks on existing nodes / edges
        if (e.target.closest('.node') || e.target.classList.contains('edge') || e.target.classList.contains('edge-label')) return;

        const rect = this.visualizer.svg.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newId = this.visualizer.graph.nodes.length;
        this.visualizer.graph.addNode(newId, x, y);
        this.visualizer.redrawGraph();
        this._refreshNodeDropdowns();
        this._setStatus('node', `✅ Node ${newId} added! Click again to add more.`);
    }

 
    // ── ADD EDGE: click-on-nodes mode ─────────────────────────
    startEdgeClickMode() {
        if (this.visualizer.graph.nodes.length < 2) {
            alert('You need at least 2 nodes to add an edge.');
            return;
        }
        this.isClickAddEdgeMode = true;
        this.edgeFirstNode = null;
        document.getElementById('click-add-edge-btn').style.display = 'none';
        document.getElementById('stop-click-edge-btn').style.display = '';
        this.visualizer.svg.style.cursor = 'pointer';
        this.visualizer.svg.addEventListener('click', this._boundCanvasClickEdge);
        this._setStatus('edge', '👆 Click the FIRST node');
    }

    _stopEdgeClickMode() {
        this.isClickAddEdgeMode = false;
        this.edgeFirstNode = null;
        document.getElementById('click-add-edge-btn').style.display = '';
        document.getElementById('stop-click-edge-btn').style.display = 'none';
        this.visualizer.svg.style.cursor = '';
        this.visualizer.svg.removeEventListener('click', this._boundCanvasClickEdge);
        // Clear any selection highlight
        this.visualizer.svg.querySelectorAll('.node.manual-selecting').forEach(n => n.classList.remove('manual-selecting'));
        this._setStatus('edge', '');
    }

    _onCanvasClickForEdge(e) {
        const nodeEl = e.target.closest('.node');
        if (!nodeEl) return;

        const nodeId = parseInt(nodeEl.getAttribute('data-node-id'));

        if (this.edgeFirstNode === null) {
            this.edgeFirstNode = nodeId;
            // Highlight the selected first node
            nodeEl.classList.add('manual-selecting');
            this._setStatus('edge', `✅ Node ${nodeId} selected. Now click the SECOND node.`);
        } else {
            const secondNodeId = nodeId;
            // Clear highlight
            this.visualizer.svg.querySelectorAll('.node.manual-selecting').forEach(n => n.classList.remove('manual-selecting'));

            if (secondNodeId === this.edgeFirstNode) {
                this._setStatus('edge', '⚠️ Cannot connect a node to itself. Click a different node.');
                return;
            }
            if (this.visualizer.graph.getEdge(this.edgeFirstNode, secondNodeId)) {
                this._setStatus('edge', `⚠️ Edge already exists between Node ${this.edgeFirstNode} and Node ${secondNodeId}.`);
                this.edgeFirstNode = null;
                return;
            }

            const weight = parseInt(prompt(`Enter weight for edge (Node ${this.edgeFirstNode} ↔ Node ${secondNodeId}):`, '1')) || 1;
            this.visualizer.graph.addEdge(this.edgeFirstNode, secondNodeId, weight);
            this.visualizer.redrawGraph();
            this._setStatus('edge', `✅ Edge added: Node ${this.edgeFirstNode} ↔ Node ${secondNodeId} (w=${weight}). Click first node for next edge.`);
            this.edgeFirstNode = null;
        }
    }



    // ── CLEAR GRAPH ───────────────────────────────────────────
    clearGraph() {
        if (!confirm('Are you sure you want to clear the entire graph?')) return;
        this._stopNodeClickMode();
        this._stopEdgeClickMode();
        this.visualizer.graph.clear();
        this.visualizer.svg.innerHTML = '';
        this.visualizer.sourceNode = null;
        this.visualizer.destNode = null;
        this.visualizer.activeEdges.clear();
        this.visualizer.activeNodes.clear();
        document.getElementById('selected-source').textContent = 'None';
        document.getElementById('selected-dest').textContent = 'None';
        this._refreshNodeDropdowns();
        this._setStatus('edge', '');
        this._setStatus('node', '');
    }

    // ── Utility ───────────────────────────────────────────────
    _setStatus(type, msg) {
        const id = type === 'edge' ? 'edge-click-status' : 'node-click-status';
        const el = document.getElementById(id);
        if (el) el.textContent = msg;
    }

    // ── Wire all buttons ──────────────────────────────────────
    bindButtons() {
        // Open modal
        document.getElementById('manual-nodes-edges-btn').addEventListener('click', () => this.open());

        // Close modal
        document.getElementById('manual-close-btn').addEventListener('click', () => this.close());
        document.getElementById('manual-done-btn').addEventListener('click', () => this.close());

        // Add node – click mode
        document.getElementById('click-add-node-btn').addEventListener('click', () => this.startNodeClickMode());
        document.getElementById('stop-click-node-btn').addEventListener('click', () => this._stopNodeClickMode());

        // Add node – coords
      

        // Add edge – click mode
        document.getElementById('click-add-edge-btn').addEventListener('click', () => this.startEdgeClickMode());
        document.getElementById('stop-click-edge-btn').addEventListener('click', () => this._stopEdgeClickMode());

        // Add edge – dropdown
   

        // Clear graph
        document.getElementById('clear-graph-btn').addEventListener('click', () => this.clearGraph());
    }
}

// ==================== APP CONTROLLER ====================
class AppController {
    constructor() {
        this.visualizer = new GraphVisualizer('graph-svg');
        this.routingTable = new RoutingTableManager('routing-table');
        this.weightEditor = new WeightEditor(this.visualizer.graph);
        this.eventHandlers = new EventHandlers(this.visualizer, this.routingTable, this.weightEditor);
        this.manualManager = new ManualModeManager(this.visualizer);
    }

    initialize() {
        console.log('Initializing Dijkstra Visualizer...');

        this.eventHandlers.setupGenerateBtn();
        this.eventHandlers.setupClearSelectionBtn();
        this.eventHandlers.setupRunSimulationBtn();
        this.manualManager.bindButtons();

        // Load initial graph
        this.visualizer.generateRandomGraph(6, true);

        console.log('✅ Visualizer initialized successfully');
    }
}

// ==================== APP INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    const app = new AppController();
    app.initialize();
    window.app = app;
});