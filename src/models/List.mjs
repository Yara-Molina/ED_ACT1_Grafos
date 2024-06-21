
import Nodo from "./Nodo.mjs";
import Home from "./Home.mjs";

export default class List {
    #headNodo;
    #nodeCount;

    constructor() {
        this.#headNodo = null
        this.#nodeCount = 0
    }

    addNode(homeName, distance) {
        let home = new Home(homeName, distance)
        let newNodo = new Nodo(home)
        if (this.#headNodo === null) {
            this.#headNodo = newNodo
        } else {
            let actualNode = this.#headNodo;
            while (actualNode.next !== null) {
                actualNode = actualNode.next;
            }
            actualNode.next = newNodo;
        }
        this.#nodeCount++;
    }

    getSize() {
        return this.#nodeCount;
    }

    isListEmpty() {
        return this.#headNodo === null;
    }

    getHeadNode() {
        return this.#headNodo;
    }

    getNodeAt(index) {
        if (index < 0 || index >= this.#nodeCount) return null;
    
        let actualNode = this.#headNodo;
        let actualIndex = 0
    
        while (actualIndex < index && actualNode !== null) {
            actualNode = actualNode.next;
            actualIndex++
        }
    
        return actualNode;
    }

    returnList() {
        const elementos = [];
        let actual = this.#headNodo;
        while (actual !== null) {
            elementos.push(actual.value);
            actual = actual.next;
        }
        return elementos;
    }
    
}

