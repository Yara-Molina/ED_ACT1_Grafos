import List from './List.mjs';

export default class Grafo {
    #matrizAdy = [];
    #mapPoint = new Map();

    constructor() {}

    addVert(...vertices) {
        for (let value of vertices) {
            this.#matrizAdy.push(new List());
            this.#mapPoint.set(value, this.#matrizAdy.length - 1);
        }
    }

    addOneVert(value) {
        this.#matrizAdy.push(new List());
        this.#mapPoint.set(value, this.#matrizAdy.length - 1);
    }

    addWeigth(startVert, endVert, weight = 1) {
        if (this.#mapPoint.has(startVert) && this.#mapPoint.has(endVert)) {
            this.#matrizAdy[this.#mapPoint.get(startVert)].addNode(endVert, weight);
            return true;
        }
        return false;
    }

    searchDeep() {
        return new Promise((resolve) => {
            let visited = [];
            const entries = [...structuredClone(this.#mapPoint)];
            for (let i = 0; i < this.#matrizAdy.length; i++)
                visited[i] = false;
    
            const dfs = (vertex) => {
                visited[this.#mapPoint.get(vertex)] = true;
                result += ` ${vertex}\n`;
                let neighbors = [...this.#matrizAdy[this.#mapPoint.get(vertex)].returnList()];
                for (let neighbor of neighbors) {
                    if (!visited[this.#mapPoint.get(neighbor.homeName)]) {
                        dfs(neighbor.homeName);
                    }
                }
            };
    
            let result = '';
            let [key] = entries[0];
            dfs(key);
            resolve(result.trim());
        });
    }


    rutaCorta(start) {
        const distances = {}  // D: Matriz unidimensional 1 x n
        const previous = {}  // Para rastrear la ruta
        const unvisited = new Set(this.#mapPoint.keys());  // L': Conjunto de vértices restantes
        const L = new Set()  // Conjunto de vértices con ruta óptima conocida
    
        // Inicializar las distancias y nodos previos
        for (let vertex of this.#mapPoint.keys()) {
            distances[vertex] = Infinity  // Inicializar las distancias con infinito
            previous[vertex] = null  // Inicializar nodos previos como null
        }
        distances[start] = 0  // Distancia al nodo inicial es 0
    
        while (L.size !== this.#mapPoint.size) {
            // Encontrar el vértice en L' con la menor distancia en D
            let minNode = [...unvisited].reduce((minNode, node) => 
                distances[node] < distances[minNode] ? node : minNode, [...unvisited][0]);
            
            L.add(minNode);  // Añadir el vértice u a L
            unvisited.delete(minNode)  // Actualizar L'
    
            // Obtener los vecinos del nodo mínimo
            const neighbors = this.#matrizAdy[this.#mapPoint.get(minNode)].returnList()
    
            // Actualiza las distancias de los vecinos
            for (let neighbor of neighbors) {
                const alt = distances[minNode] + neighbor.distance;
                if (alt < distances[neighbor.homeName]) {
                    distances[neighbor.homeName] = alt
                    previous[neighbor.homeName] = minNode
                }
            }
        }
    
        return { distances, previous };
    }

}



