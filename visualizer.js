// ==================== SVG ICON GENERATOR ====================
class IconGenerator {
    static createRouterIcon(x, y, isSource = false, isDest = false) {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('transform', `translate(${x - 25}, ${y - 25})`);

        const bgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        bgCircle.setAttribute('cx', '25');
        bgCircle.setAttribute('cy', '25');
        bgCircle.setAttribute('r', '25');
        bgCircle.setAttribute('class', 'node-background');

        if (isSource) {
            bgCircle.setAttribute('fill', '#DBEAFE');
            bgCircle.setAttribute('stroke', '#3B82F6');
        } else if (isDest) {
            bgCircle.setAttribute('fill', '#FEE2E2');
            bgCircle.setAttribute('stroke', '#EF4444');
        } else {
            bgCircle.setAttribute('fill', 'var(--node-bg)');
            bgCircle.setAttribute('stroke', 'var(--node-border)');
        }

        bgCircle.setAttribute('stroke-width', isSource || isDest ? '3' : '2');
        g.appendChild(bgCircle);

        // Router box
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', '10');
        rect.setAttribute('y', '12');
        rect.setAttribute('width', '30');
        rect.setAttribute('height', '18');
        rect.setAttribute('fill', 'none');

        let iconColor = isSource ? '#3B82F6' : isDest ? '#EF4444' : 'var(--node-icon)';
        rect.setAttribute('stroke', iconColor);
        rect.setAttribute('stroke-width', '1.5');
        rect.setAttribute('rx', '2');
        g.appendChild(rect);

        // Antenna 1
        const antenna1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        antenna1.setAttribute('x1', '16');
        antenna1.setAttribute('y1', '10');
        antenna1.setAttribute('x2', '12');
        antenna1.setAttribute('y2', '4');
        antenna1.setAttribute('stroke', iconColor);
        antenna1.setAttribute('stroke-width', '1.5');
        antenna1.setAttribute('stroke-linecap', 'round');
        g.appendChild(antenna1);

        // Antenna 2
        const antenna2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        antenna2.setAttribute('x1', '34');
        antenna2.setAttribute('y1', '10');
        antenna2.setAttribute('x2', '38');
        antenna2.setAttribute('y2', '4');
        antenna2.setAttribute('stroke', iconColor);
        antenna2.setAttribute('stroke-width', '1.5');
        antenna2.setAttribute('stroke-linecap', 'round');
        g.appendChild(antenna2);

        // LEDs
        const led1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        led1.setAttribute('cx', '15');
        led1.setAttribute('cy', '19');
        led1.setAttribute('r', '1.5');
        led1.setAttribute('fill', '#10B981');
        g.appendChild(led1);

        const led2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        led2.setAttribute('cx', '25');
        led2.setAttribute('cy', '19');
        led2.setAttribute('r', '1.5');
        led2.setAttribute('fill', '#3B82F6');
        g.appendChild(led2);

        const led3 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        led3.setAttribute('cx', '35');
        led3.setAttribute('cy', '19');
        led3.setAttribute('r', '1.5');
        led3.setAttribute('fill', '#F59E0B');
        g.appendChild(led3);

        return g;
    }

    static createComputerIcon(x, y, isSource = false, isDest = false) {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('transform', `translate(${x - 25}, ${y - 25})`);

        const bgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        bgCircle.setAttribute('cx', '25');
        bgCircle.setAttribute('cy', '25');
        bgCircle.setAttribute('r', '25');
        bgCircle.setAttribute('class', 'node-background');

        if (isSource) {
            bgCircle.setAttribute('fill', '#DBEAFE');
            bgCircle.setAttribute('stroke', '#3B82F6');
        } else if (isDest) {
            bgCircle.setAttribute('fill', '#FEE2E2');
            bgCircle.setAttribute('stroke', '#EF4444');
        } else {
            bgCircle.setAttribute('fill', 'var(--node-bg)');
            bgCircle.setAttribute('stroke', 'var(--node-border)');
        }

        bgCircle.setAttribute('stroke-width', isSource || isDest ? '3' : '2');
        g.appendChild(bgCircle);

        let iconColor = isSource ? '#3B82F6' : isDest ? '#EF4444' : 'var(--node-icon)';

        // Monitor
        const monitor = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        monitor.setAttribute('x', '10');
        monitor.setAttribute('y', '10');
        monitor.setAttribute('width', '30');
        monitor.setAttribute('height', '18');
        monitor.setAttribute('fill', 'none');
        monitor.setAttribute('stroke', iconColor);
        monitor.setAttribute('stroke-width', '1.5');
        monitor.setAttribute('rx', '1');
        g.appendChild(monitor);

        // Screen
        const screen = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        screen.setAttribute('x', '12');
        screen.setAttribute('y', '12');
        screen.setAttribute('width', '26');
        screen.setAttribute('height', '12');
        screen.setAttribute('fill', isSource ? '#DBEAFE' : isDest ? '#FEE2E2' : '#F8FAFC');
        screen.setAttribute('stroke', iconColor);
        screen.setAttribute('stroke-width', '0.5');
        g.appendChild(screen);

        // Stand
        const stand = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        stand.setAttribute('x', '22');
        stand.setAttribute('y', '29');
        stand.setAttribute('width', '6');
        stand.setAttribute('height', '3');
        stand.setAttribute('fill', iconColor);
        stand.setAttribute('rx', '0.5');
        g.appendChild(stand);

        // Base
        const base = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        base.setAttribute('x', '18');
        base.setAttribute('y', '32');
        base.setAttribute('width', '14');
        base.setAttribute('height', '2');
        base.setAttribute('fill', iconColor);
        base.setAttribute('rx', '0.5');
        g.appendChild(base);

        return g;
    }

    static createNodeIcon(nodeId, x, y, isSource = false, isDest = false) {
        const isRouter = nodeId % 2 === 0;
        return isRouter
            ? this.createRouterIcon(x, y, isSource, isDest)
            : this.createComputerIcon(x, y, isSource, isDest);
    }
}

// ==================== LABEL POSITION CALCULATOR ====================
class LabelPositioner {
    static calculateEdgeLabelPosition(x1, y1, x2, y2) {
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;

        const angle = Math.atan2(y2 - y1, x2 - x1);
        const offsetDistance = 35;

        const offsetX = -Math.sin(angle) * offsetDistance;
        const offsetY = Math.cos(angle) * offsetDistance;

        return {
            x: midX + offsetX,
            y: midY + offsetY,
            angle: angle
        };
    }
}

// ==================== GRAPH VISUALIZER ====================
class GraphVisualizer {
    constructor(svgId) {
        this.svg = document.getElementById(svgId);
        this.graph = new Graph();
        this.activeEdges = new Set();
        this.activeNodes = new Set();
        this.sourceNode = null;
        this.destNode = null;
    }

    generateRandomGraph(nodeCount, randomWeights = true) {
        this.graph.clear();
        this.svg.innerHTML = '';
        this.activeEdges.clear();
        this.activeNodes.clear();
        this.sourceNode = null;
        this.destNode = null;

        const width = this.svg.clientWidth || 800;
        const height = this.svg.clientHeight || 500;
        const padding = 80;

        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 2 - padding;

        // Generate nodes on circle
        for (let i = 0; i < nodeCount; i++) {
            const angle = (i / nodeCount) * 2 * Math.PI;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            this.graph.addNode(i, x, y);
        }

        // Generate edges
        const edgeSet = new Set();
        const minEdges = nodeCount;
        const maxEdges = (nodeCount * (nodeCount - 1)) / 2;
        const targetEdges = Math.min(minEdges + Math.floor(nodeCount / 2), maxEdges);

        while (edgeSet.size < targetEdges) {
            const source = Math.floor(Math.random() * nodeCount);
            const target = Math.floor(Math.random() * nodeCount);
            const weight = randomWeights ? Math.floor(Math.random() * 9) + 1 : 1;

            if (source !== target) {
                const edgeKey = `${Math.min(source, target)}-${Math.max(source, target)}`;
                const edgeExists = Array.from(edgeSet).some(
                    e => `${Math.min(e[0], e[1])}-${Math.max(e[0], e[1])}` === edgeKey
                );

                if (!edgeExists) {
                    edgeSet.add([source, target, weight]);
                }
            }
        }

        edgeSet.forEach(([source, target, weight]) => {
            this.graph.addEdge(source, target, weight);
        });

        this.drawGraph();
        return !randomWeights;
    }

    drawGraph() {
        // Draw edges
        this.graph.edges.forEach(edge => {
            const sourceNode = this.graph.nodes[edge.source];
            const targetNode = this.graph.nodes[edge.target];

            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', sourceNode.x);
            line.setAttribute('y1', sourceNode.y);
            line.setAttribute('x2', targetNode.x);
            line.setAttribute('y2', targetNode.y);
            line.setAttribute('class', 'edge');
            line.setAttribute('data-testid', `edge-${edge.source}-${edge.target}`);
            this.svg.appendChild(line);

            // Edge label
            const labelPos = LabelPositioner.calculateEdgeLabelPosition(
                sourceNode.x, sourceNode.y,
                targetNode.x, targetNode.y
            );

            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', labelPos.x);
            text.setAttribute('y', labelPos.y);
            text.setAttribute('class', 'edge-label');
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('dominant-baseline', 'middle');
            text.setAttribute('data-edge-id', `${edge.source}-${edge.target}`);
            text.textContent = edge.weight;

            text.addEventListener('click', (e) => {
                e.stopPropagation();
                this.editEdgeWeight(edge.source, edge.target, text);
            });

            this.svg.appendChild(text);
        });

        // Draw nodes
        this.graph.nodes.forEach(node => {
            const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            g.setAttribute('class', 'node');
            g.setAttribute('data-testid', `node-${node.id}`);
            g.setAttribute('data-node-id', node.id);

            const isSource = this.sourceNode === node.id;
            const isDest = this.destNode === node.id;

            const icon = IconGenerator.createNodeIcon(node.id, node.x, node.y, isSource, isDest);
            g.appendChild(icon);

            // Node label
            const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            label.setAttribute('x', node.x);
            label.setAttribute('y', node.y + 45);
            label.setAttribute('class', 'node-id-label');
            label.setAttribute('text-anchor', 'middle');
            label.textContent = `Node ${node.id}`;
            g.appendChild(label);

            g.addEventListener('click', () => this.onNodeClick(node.id));

            this.svg.appendChild(g);
        });
    }

    editEdgeWeight(source, target, textElement) {
        const edge = this.graph.getEdge(source, target);
        if (!edge) return;

        const newWeight = prompt(
            `Edit weight for Edge (Node ${source} ↔ Node ${target})\nCurrent: ${edge.weight}`,
            edge.weight
        );

        if (newWeight !== null && newWeight !== '') {
            const weight = parseInt(newWeight);
            if (weight > 0) {
                this.graph.updateEdgeWeight(source, target, weight);
textElement.textContent = weight;

//Recalculate after weight change
if (this.sourceNode !== null && this.destNode !== null) {
    this.runDijkstra();
}
            } else {
                alert('Weight must be a positive number');
            }
        }
    }
runDijkstra() {
    if (!this.sourceNode || !this.destNode) return;
    
    const { distances, previous } = DijkstraAlgorithm.findShortestPath(
        this.graph, this.sourceNode
    );

    const path = DijkstraAlgorithm.getPath(
        this.sourceNode, this.destNode, previous
    );

    // Update result box
    const resultBox = document.querySelector('.result-box');
    if (resultBox) {
        resultBox.innerHTML = `
            Path: ${path.map(n => `Node ${n}`).join(' → ')}<br>
            Distance: ${distances[this.destNode] || '∞'}
        `;
    }

    
    try {
        if (window.routingTableManager && typeof window.routingTableManager.updateTable === 'function') {
            window.routingTableManager.updateTable(distances, previous, this.sourceNode);
        }
    } catch (e) {
        console.warn('Routing table update failed:', e);
    }

    this.highlightPath(this.sourceNode, this.destNode, previous);
const destRow = document.querySelector('#routing-table tbody tr:nth-child(2)');
if (destRow) destRow.classList.add('active-path');
}
    onNodeClick(nodeId) {
        if (this.sourceNode === null) {
            this.sourceNode = nodeId;
            document.getElementById('selected-source').textContent = `Node ${nodeId}`;
        } else if (this.destNode === null && nodeId !== this.sourceNode) {
            this.destNode = nodeId;
            document.getElementById('selected-dest').textContent = `Node ${nodeId}`;
        } else if (this.sourceNode === nodeId) {
            this.sourceNode = null;
            document.getElementById('selected-source').textContent = 'Click on a node';
        } else if (this.destNode === nodeId) {
            this.destNode = null;
            document.getElementById('selected-dest').textContent = 'Click on a node';
        }

        this.redrawGraph();
    }

    redrawGraph() {
        this.svg.innerHTML = '';
        this.drawGraph();
    }

    highlightPath(sourceId, destId, previous) {
        this.activeEdges.clear();
        this.activeNodes.clear();

        const path = DijkstraAlgorithm.getPath(sourceId, destId, previous);

        // Highlight nodes
        path.forEach(nodeId => {
            this.activeNodes.add(nodeId);
            const nodeElement = this.svg.querySelector(`[data-testid="node-${nodeId}"]`);
            if (nodeElement) {
                const bg = nodeElement.querySelector('.node-background');
                if (bg) {
                    bg.setAttribute('fill', 'var(--node-active-bg)');
                    bg.setAttribute('stroke', 'var(--node-active-border)');
                }
            }
        });

        // Highlight edges
        for (let i = 0; i < path.length - 1; i++) {
            const edgeKey = `${Math.min(path[i], path[i + 1])}-${Math.max(path[i], path[i + 1])}`;
            this.activeEdges.add(edgeKey);
        }

        this.updateEdgeStyles();
        this.animatePacket(path);
    }

    updateEdgeStyles() {
        const edges = this.svg.querySelectorAll('.edge');
        edges.forEach(edge => {
            edge.classList.remove('active');
        });

        this.graph.edges.forEach(edgeData => {
            const edgeKey = `${Math.min(edgeData.source, edgeData.target)}-${Math.max(edgeData.source, edgeData.target)}`;
            if (this.activeEdges.has(edgeKey)) {
                const edges = this.svg.querySelectorAll(
                    `[data-testid="edge-${edgeData.source}-${edgeData.target}"], [data-testid="edge-${edgeData.target}-${edgeData.source}"]`
                );
                edges.forEach(e => e.classList.add('active'));
            }
        });
    }

    animatePacket(path) {
        if (path.length < 2) return;

        const existingPacket = this.svg.querySelector('.packet');
        if (existingPacket) existingPacket.remove();

        const packet = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        packet.setAttribute('r', '8');
        packet.setAttribute('class', 'packet');
        packet.style.offsetPath = this.buildOffsetPath(path);
        packet.style.offsetDistance = '0%';

        this.svg.appendChild(packet);

        packet.animate(
            [
                { offsetDistance: '0%' },
                { offsetDistance: '100%' }
            ],
            {
                duration: 3000,
                easing: 'linear',
                fill: 'forwards'
            }
        );
    }

    buildOffsetPath(path) {
        let pathData = '';
        for (let i = 0; i < path.length; i++) {
            const node = this.graph.nodes[path[i]];
            if (i === 0) {
                pathData += `M${node.x},${node.y}`;
            } else {
                pathData += `L${node.x},${node.y}`;
            }
        }
        return `path('${pathData}')`;
    }

    clearHighlights() {
        this.activeEdges.clear();
        this.activeNodes.clear();
        this.updateEdgeStyles();

        this.svg.querySelectorAll('.node-background').forEach(bg => {
            bg.setAttribute('fill', 'var(--node-bg)');
            bg.setAttribute('stroke', 'var(--node-border)');
        });

        const packet = this.svg.querySelector('.packet');
        if (packet) packet.remove();
    }

    clearSelection() {
        this.sourceNode = null;
        this.destNode = null;
        document.getElementById('selected-source').textContent = 'Click on a node';
        document.getElementById('selected-dest').textContent = 'Click on a node';
        this.redrawGraph();
    }
}
window.routingTableManager = new RoutingTableManager('routing-table'); 
