/**
 * Represents the HTML Canvas that is displayed
 */
class Canvas {
    /**
     * Creates an instance of the canvas class
     * @constructor
     * @param {number} width The width of the game
     * @param {number} height The height of the game
     */
    constructor (width, height) {
        this.element = document.createElement("canvas")
        this.element.width = width
        this.element.height = height
        /**
         * The context for the canvas or something
         */
        this.context = this.element.getContext("2d")
        /**
         * List of all components drawn on this canvas
         * @type {[Component]}
         */
        this.components = []
        this.width = width
        this.height = height
    }
    /**
     * Adds a component to the list of this canvas' components
     * @param {Component} component
     */
    addComponent (component) {
        this.components.push(component)
    }
    /**
     * Adds an array of components to the list of this canvas' components
     * @param {[Component]} components
     */
    addComponents (components) {
        this.components = this.components.concat(components)
    }
    /**
     * Clears the canvas of everything
     */
    clear() {
        this.context.clearRect(0, 0, this.element.width, this.element.height);
    }
    /**
     * Draws the squares inside a game object's board
     * @param {Game} game a Game object you want to draw the squares of
     */
    redrawGame (game) {
        for (let column of game.board) {
            for (let square of column) {
                for (let item of square) {
                    item.toComponent(this).draw()
                }
            }
        }
    }
    /**
     * Updates the canvas by redrawing all shapes on it
     */
    redraw() {
        this.clear()
        for (let component of this.components) {
            component.draw();
        }
    }
    /**
     * Inserts the canvas into the page
     * @param {Node} refrenceNode 
     */
    start(refrenceNode) { 
        refrenceNode.parentNode.replaceChild(this.element, refrenceNode);
    }
}
