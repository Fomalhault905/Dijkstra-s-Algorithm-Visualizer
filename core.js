// ==================== GRAPH DATA STRUCTURE ====================
class Graph {
    constructor() {
        this.nodes = [];
        this.edges = [];
    }

    addNode(id, x, y) {
        this.nodes.push({ id, x, y });
    }

    addEdge(source, target, weight) {
        this.edges.push({ source, target, weight });
    }

    getAdjacencyList() {
        const adj = {};
        this.nodes.forEach(node => (adj[node.id] = []));
        this.edges.forEach(edge => {
            adj[edge.source].push({ node: edge.target, weight: edge.weight });
            adj[edge.target].push({ node: edge.source, weight: edge.weight });
        });
        return adj;
    }

    clear() {
        this.nodes = [];
        this.edges = [];
    }

    updateEdgeWeight(source, target, newWeight) {
        const edge = this.edges.find(
            e => (e.source === source && e.target === target) ||
                 (e.source === target && e.target === source)
        );
        if (edge) {
            edge.weight = newWeight;
        }
    }

    getEdge(source, target) {
        return this.edges.find(
            e => (e.source === source && e.target === target) ||
                 (e.source === target && e.target === source)
        );
    }
}

// ==================== DIJKSTRA'S ALGORITHM ====================
class DijkstraAlgorithm {
    static findShortestPath(graph, source) {
        const adj = graph.getAdjacencyList();
        const distances = {};
        const previous = {};
        const unvisited = new Set();

        // Initialize
        graph.nodes.forEach(node => {
            distances[node.id] = Infinity;
            previous[node.id] = null;
            unvisited.add(node.id);
        });
        distances[source] = 0;

        // Main algorithm
        while (unvisited.size > 0) {
            let current = null;
            let minDist = Infinity;

            // Find unvisited node with minimum distance
            unvisited.forEach(node => {
                if (distances[node] < minDist) {
                    minDist = distances[node];
                    current = node;
                }
            });

            if (current === null || distances[current] === Infinity) break;

            unvisited.delete(current);

            // Update distances to neighbors
            adj[current].forEach(({ node: neighbor, weight }) => {
                if (unvisited.has(neighbor)) {
                    const newDistance = distances[current] + weight;
                    if (newDistance < distances[neighbor]) {
                        distances[neighbor] = newDistance;
                        previous[neighbor] = current;
                    }
                }
            });
        }

        return { distances, previous };
    }

    static getPath(source, destination, previous) {
        const path = [];
        let current = destination;

        while (current !== null) {
            path.unshift(current);
            current = previous[current];
        }

        return path.length > 0 && path[0] === source ? path : [];
    }
}

// ==================== ROUTING TABLE MANAGER ====================
class RoutingTableManager {
    constructor(tableId) {
        this.table = document.getElementById(tableId);
        this.tbody = this.table?.querySelector('tbody');
    }

    updateTable(distances, previous, sourceId) {
        if (!this.tbody) return;

        this.tbody.innerHTML = '';

        Object.keys(distances).forEach(destId => {
            if (destId !== sourceId.toString()) {
                const row = this.tbody.insertRow();
                const dist = distances[destId];
                const prevNode = previous[destId];

                row.insertCell(0).textContent = `Node ${destId}`;
                row.insertCell(1).textContent = prevNode !== null ? `Node ${prevNode}` : '-';
                row.insertCell(2).textContent = dist === Infinity ? '∞' : dist;
            }
        });
    }

    clear() {
        if (this.tbody) {
            this.tbody.innerHTML = '';
        }
    }
}

// ==================== WEIGHT EDITOR ====================
class WeightEditor {
    constructor(graph) {
        this.graph = graph;
        this.modal = document.getElementById('weight-modal');
        this.container = document.getElementById('modal-weight-inputs');
    }

    show(onConfirm) {
        if (!this.modal) {
            console.warn('Weight modal not found in DOM');
            return;
        }

        this.container.innerHTML = '';

        this.graph.edges.forEach((edge, index) => {
            const div = document.createElement('div');
            div.className = 'weight-input-row';
            
            const label = document.createElement('label');
            label.textContent = `Edge (Node ${edge.source} ↔ Node ${edge.target})`;
            
            const input = document.createElement('input');
            input.type = 'number';
            input.className = 'weight-input';
            input.dataset.edgeIndex = index;
            input.value = edge.weight;
            input.min = '1';
            input.max = '100';

            div.appendChild(label);
            div.appendChild(input);
            this.container.appendChild(div);
        });

        this.modal.style.display = 'flex';

        const confirmBtn = document.getElementById('modal-confirm-btn');
        const cancelBtn = document.getElementById('modal-cancel-btn');
        const closeBtn = document.getElementById('modal-close');

        const handleConfirm = () => {
            if (this.validateWeights()) {
                this.applyWeights();
                this.modal.style.display = 'none';
                confirmBtn.removeEventListener('click', handleConfirm);
                cancelBtn.removeEventListener('click', handleCancel);
                closeBtn.removeEventListener('click', handleCancel);
                onConfirm();
            }
        };

        const handleCancel = () => {
            this.modal.style.display = 'none';
            confirmBtn.removeEventListener('click', handleConfirm);
            cancelBtn.removeEventListener('click', handleCancel);
            closeBtn.removeEventListener('click', handleCancel);
        };

        confirmBtn.addEventListener('click', handleConfirm);
        cancelBtn.addEventListener('click', handleCancel);
        closeBtn.addEventListener('click', handleCancel);
    }

    validateWeights() {
        const inputs = this.container.querySelectorAll('.weight-input');
        let isValid = true;

        inputs.forEach(input => {
            const value = parseInt(input.value);
            if (isNaN(value) || value <= 0) {
                isValid = false;
            }
        });

        if (!isValid) {
            alert('All weights must be positive numbers');
        }

        return isValid;
    }

    applyWeights() {
        const inputs = this.container.querySelectorAll('.weight-input');
        inputs.forEach(input => {
            const index = parseInt(input.dataset.edgeIndex);
            const newWeight = parseInt(input.value);
            const edge = this.graph.edges[index];
            this.graph.updateEdgeWeight(edge.source, edge.target, newWeight);
        });
    }
}