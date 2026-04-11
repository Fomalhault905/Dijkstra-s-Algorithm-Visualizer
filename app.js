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

// ==================== APP CONTROLLER ====================
class AppController {
    constructor() {
        this.visualizer = new GraphVisualizer('graph-svg');
        this.routingTable = new RoutingTableManager('routing-table');
        this.weightEditor = new WeightEditor(this.visualizer.graph);
        this.eventHandlers = new EventHandlers(this.visualizer, this.routingTable, this.weightEditor);
    }

    initialize() {
        console.log('Initializing Dijkstra Visualizer...');
        
        // Setup event listeners
        this.eventHandlers.setupGenerateBtn();
        this.eventHandlers.setupClearSelectionBtn();
        this.eventHandlers.setupRunSimulationBtn();

        // Load initial graph
        this.visualizer.generateRandomGraph(6, true);
        
        console.log('✅ Visualizer initialized successfully');
    }
}

// ==================== APP INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    const app = new AppController();
    app.initialize();
});
