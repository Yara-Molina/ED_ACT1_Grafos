import Grafo from "../models/Grafo.mjs";

document.addEventListener('DOMContentLoaded', function() {
    const graphInstance = new Grafo();

    const vertForm = document.getElementById('vertForm');
    const weightForm1 = document.getElementById('weightForm1');
    const dfsButton = document.getElementById('dfsButton');
    const bfsButton = document.getElementById('bfsButton');
    const dfsResultContainer = document.getElementById('dfsResultContainer');
    const shortestPathForm = document.getElementById('shortestPathForm');
    const shortestPathButton = document.getElementById('shortestPathButton');
    const shortestPathResultContainer = document.getElementById('shortestPathResultContainer');

    if (vertForm) {
        vertForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const vertInput = document.getElementById('vertInput');
            if (!vertInput) {
                Swal.fire("Elemento no encontrado");
                return;
            }
            const vertName = vertInput.value.trim();

            if (vertName !== '') {
                graphInstance.addOneVert(vertName);
                Swal.fire(`Vértice agregado: ${vertName}`);
                vertInput.value = '';
            } else {
                Swal.fire('Ingrese un nombre válido para el vértice.');
            }
        });
    } else {
        Swal.fire("Formulario de vértices no encontrado");
    }

    if (weightForm1) {
        weightForm1.addEventListener('submit', function(event) {
            event.preventDefault();

            const startInput = document.getElementById('startInput1');
            const endInput = document.getElementById('endInput');
            const weightInput = document.getElementById('weightInput');

            if (!startInput || !endInput || !weightInput) {
                Swal.fire("Algunos elementos no fueron encontrados");
                return;
            }

            const startVert = startInput.value.trim();
            const endVert = endInput.value.trim();
            const weight = parseInt(weightInput.value);

            if (startVert !== '' && endVert !== '' && !isNaN(weight)) {
                const addWeight = graphInstance.addWeigth(startVert, endVert, weight);
                if (addWeight) {
                    Swal.fire(`Distancia agregada ${startVert} hasta ${endVert} con un peso de ${weight}`);
                    startInput.value = '';
                    endInput.value = '';
                    weightInput.value = '';
                } else {
                    Swal.fire('Error al añadir peso, verifica tus vertices.');
                }
            } else {
                Swal.fire('Colocar valores válidos.');
            }
        });
    } else {
        Swal.fire("Formulario de pesos no encontrado");
    }

    if (dfsButton && dfsResultContainer) {
        dfsButton.addEventListener('click', function() {
            dfsResultContainer.innerHTML = '';

            graphInstance.searchDeep((vertex) => {
                dfsResultContainer.innerHTML += `${vertex} `;
            }).then((result) => {
                Swal.fire({
                    title: 'DFS Resultado:',
                    text: result.trim(),
                    icon: 'info',
                    confirmButtonText: 'OK'
                });
            });
        });
    } else {
        Swal.fire("Botón de DFS o contenedor de resultados no encontrado");
    }

    if (shortestPathButton && shortestPathForm && shortestPathResultContainer) {
        shortestPathButton.addEventListener('click', function(event) {
            event.preventDefault();

            const startVertex = document.getElementById('startInput2').value.trim();

            if (startVertex !== '') {
                const { distances, paths } = graphInstance.rutaCorta(startVertex);

                let distanceResult = `Distancia más corta desde '${startVertex}':\n`;
                for (let vertex in distances) {
                    const distance = distances[vertex] === Infinity ? 'Muy grande' : distances[vertex];
                    distanceResult += `Nodo ${vertex}: ${distance}\n`;
                }

                let pathResult = "\nCaminos cortos:\n";
                for (let vertex in paths) {
                    if (paths[vertex].length > 0) {
                        pathResult += `Hasta ${vertex}: ${paths[vertex].join(' -> ')}\n`;
                    } else {
                        pathResult += `No hay unión de '${startVertex}' a ${vertex}\n`;
                    }
                }

                Swal.fire({
                    title: 'Resultado',
                    html: `<pre>${distanceResult + pathResult}</pre>`,
                    icon: 'info',
                    confirmButtonText: 'OK'
                });
            } else {
                Swal.fire('Utiliza un vértice válido');
            }
        });
    } else {
        Swal.fire("Formulario de ruta más corta, botón o contenedor de resultados no encontrado");
    }

    const graph = new Grafo();
graph.addVert('v1', 'v2', 'v3', 'v4', 'v5', 'v6');
graph.addWeigth('v1', 'v2', 2);
graph.addWeigth('v2','v1', 2)
graph.addWeigth('v1', 'v6', 3)
graph.addWeigth('v6','v1',3)
graph.addWeigth('v1', 'v3', 1000000)
graph.addWeigth('v3','v1', 1000000)
graph.addWeigth('v1', 'v4', 1000000)
graph.addWeigth('v4','v1', 1000000)
graph.addWeigth('v1', 'v5', 1000000)
graph.addWeigth('v5','v1', 1000000)
graph.addWeigth('v2', 'v3', 1)
graph.addWeigth('v3','v2', 1)
graph.addWeigth('v2', 'v4', 1000000)
graph.addWeigth('v4','v2', 1000000)
graph.addWeigth('v2', 'v5', 1000000)
graph.addWeigth('v5','v2', 1000000)
graph.addWeigth('v2', 'v6', 1000000)
graph.addWeigth('v6','v2', 1000000)
graph.addWeigth('v3', 'v4', 8)
graph.addWeigth('v4','v3', 8)
graph.addWeigth('v3', 'v5', 3)
graph.addWeigth('v5','v3', 3)
graph.addWeigth('v3', 'v6', 1000000)
graph.addWeigth('v6','v3', 1000000)
graph.addWeigth('v4', 'v5', 11)
graph.addWeigth('v5','v4', 11)
graph.addWeigth('v4', 'v6', 1000000)
graph.addWeigth('v6','v4',1000000)
graph.addWeigth('v5', 'v6', 6)
graph.addWeigth('v6','v5', 6)
graph.addWeigth('v6', 'v3', 5)
graph.addWeigth('v3','v6', 5)

const { distances, paths } = graph.rutaCorta('v5');

console.log("Distancias más cortas desde 'v1':");
for (let vertex in distances) {
    const distance = distances[vertex] === 1000000 ? 'Muy grande' : distances[vertex];
    console.log(`Nodo ${vertex}: ${distance}`);
}

console.log("\nCaminos más cortos:");
for (let vertex in paths) {
    if (paths[vertex].length > 0) {
        console.log(`A ${vertex}: ${paths[vertex].join(' -> ')}`);
    } else {
        console.log(`No hay ruta de 'v1' a ${vertex}`);
    }
}

})
