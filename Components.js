/**
 * a component on the page
 */
class Component {
    /**
     * @param {any} canvas The canvas to draw this component on.
     * @param {number} x The x position of the component
     * @param {number} y The y position of the component
     * @param {any} color The color of the component
     */
    constructor (canvas, x, y, color) {
        this.canvas = canvas;
        this.ctx = canvas.context;
        this.x = x;
        this.y = y;
        /**
         * Color of the component. Can be formated as:
         * - "white", "black", "blue", etc.
         * - "rgb(255,255,255)"
         * - "rgba(255,255,255,255)"
         * - Probably some other ways but idk them
         * @type {String}
         */
        this.color = color;
    }
    /**
     * Filler function b/c of stuff with protocols or whatever
     */
    draw () {}
}
/**
 * @extends Component
 * creates a rectangular object
 */
class Rect extends Component{
    /**
     * Creates an isntance of the Rect class
     * @param {any} canvas The canvas to draw this rectangle in.
     * @param {number} width The width of the rectangle
     * @param {number} height The height of the rectangle
     * @param {number} x The x position of the center of the rectangle
     * @param {number} y The y position of the center of the rectangle
     * @param {any} color The color of the rectangle
     */
    constructor(canvas, width, height, x, y, color) {
        super (canvas, x, y, color);
        this.width = width
        this.height = height

    }
    /**
     * Draws the rectangle on the canvas
     */
    draw () {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
    }
}
class Button extends Rect {
    constructor (canvas, width, height, x, y, color, action) {
        super (canvas, width, height, x, y, color)
        this.action = action
    }
}
/**
 * @extends Rect
 * creates a Square Object
 */
class Square extends Rect {
    /**
     * Creates an isntance of the square class
     * @param {any} canvas The canvas to draw this square in.
     * @param {number} width The width of the square
     * @param {number} x The x position of the square
     * @param {number} y The y position of the square
     * @param {any} color The color of the square
     */
    constructor(canvas, width, x, y, color) {
        super (canvas, width, width, x, y, color);
    }
}
/**
 * creates a Loading Cicle Thing Object
 */
class LoadingCircle extends Component {
    /**
     * Creates an isntance of the loading thing class
     * @param {any} canvas The canvas to draw this loading thing in.
     * @param {number} width The width of the loading thing
     * @param {number} x The x position of the loading thing
     * @param {number} y The y position of the loading thing
     * @param {any} color The color of the square
     */
    constructor(canvas, width, x, y, color) {
        super (canvas, x, y, color);
        this.width = width
        this.subComponents = [];
        for (let i = 0; i < 6; i++) {
                this.subComponents.push(new Square(canvas, width/5, 0, 0, color));
        }
        this.t = 0;
    }
    draw () {
        for (let square of this.subComponents) {
            square.x = this.width/2 * Math.cos(this.t/10) + this.x;
            square.y = this.width/2 * Math.sin(this.t/10) + this.y;
            square.draw();
            this.t += 7;
        }
        this.t -= 41.75;
    }    
}
/**
 * Creates text
 */
class Text extends Component {
    /**
     * Creates a new instance of text
     * @param {Any} canvas The canvas to draw it on
     * @param {number} x The x coordinate of the center of the text
     * @param {number} y The x coordinate of the center of the text
     * @param {String} color The text's color
     * @param {String} font Font size and font of the text
     * @param {String} value What the text says
     */
    constructor (canvas, x, y, color, font, value) {
        super(canvas, x, y, color);
        this.font = font;
        this.value = value;

        let context = canvas.context
        context.font = font
        this.width = context.measureText(value).width;
        // Note that the height will break if the font size is 1 or 3 digits
        this.height =  font.slice(0,2);
    }
    draw () {
        this.ctx.font = this.font;
        this.ctx.fillStyle = this.color;
        this.ctx.fillText(this.value, this.x - this.width/2, this.y - this.height/2);
    }
}
/**
 * @extends Component
 * creates a line object
 */
class Line extends Component{
    /**
     * Creates an isntance of the Line class
     * @param {any} canvas The canvas to draw this line in.
     * @param {number} x The x position of one end of the line
     * @param {number} y The y position of one end of the line
     *  @param {number} x2 The x position of the other end of the line
     * @param {number} y2 The y position of the other end of the line
     * @param {number} thickness How thick the line is in pixels
     * @param {any} color The color of the line
     */
    constructor(canvas, x, y, x2, y2, thickness, color) {
        super (canvas, x, y, color);
        this.x2 = x2
        this.y2 = y2
        this.thickness = thickness

    }
    /**
     * Draws the line on the canvas
     */
    draw () {
        this.ctx.strokeStyle = this.color
        this.ctx.lineWidth = this.thickness
        this.ctx.beginPath()
        this.ctx.moveTo(this.x, this.y)
        this.ctx.lineTo(this.x2, this.y2)
        this.ctx.stroke()
        this.ctx.closePath()
    }
}
/**
 * @extends Component
 * creates a Square Object
 */
class Circle extends Component {
    /**
     * Creates an isntance of the circle class
     * @param {any} canvas The canvas to draw this circle in.
     * @param {number} width The width of the circle
     * @param {number} x The x position of the circle
     * @param {number} y The y position of the circle
     * @param {any} color The color of the circle
     */
    constructor(canvas, width, x, y, color) {
        super (canvas, x, y, color)
        this.width = width
    }
    draw () {
        this.ctx.fillStyle = this.color
        this.ctx.arc(this.x, this.y, this.width/2, 0, 2*Math.PI)
        this.ctx.fill()
        this.ctx.closePath()
    }
}
class Graph extends Rect {
    /**
     * Creates an isntance of the graph class
     * @param {any} canvas The canvas to draw this graph in.
     * @param {number} width The width of the graph
     * @param {number} height The height of the graph
     * @param {number} x The x position of the center of the graph
     * @param {number} y The y position of the center of the graph
     * @param {number} x2 Leftmost number on the x axis of the graph
     * @param {number} x3 Rightmost number on the x axis of the graph
     * @param {number} y2 Lowest number on the y axis of the graph
     * @param {number} y3 Highest number on the y axis of the graph
     * @param {string} bgColor The background color of the graph
     * @param {string} lColor The color of the lines on the graph
     * @param {any} equation Function that takes in 2 numbers and returns true or false
     */
    constructor(canvas, width, height, x, x2, x3, y, y2, y3, bgColor, lColor, equation) {
        super (canvas, width, height, x, y, bgColor)
        this.lColor = lColor
        this.x2 = x2
        this.y2 = y2
        this.x3 = x3
        this.y3 = y3
        this.background = new Rect (canvas, width, height, x, y, bgColor)
        this.points = []
        let x4 = x2
        for (let x5 = x; x5 < x + width; x5 ++) {
            let pointCol = []
            let y4 = y2
            for (let y5 = y; y5 < y + height; y5 ++) {
                if (equation(x4, y4)) {
                    pointCol.push(new Point(canvas, x5, y5, lColor, x4, y4))
                } else {
                    pointCol.push(new Point(canvas, x5, y5, bgColor, x4, y4))
                }
                y4 += (y3-y2)/height
            }
            x4 += (x3-x2)/width
            this.points.push(pointCol)
        }
    }
    draw () {
        this.background.draw()
        for (let pointCol of this.points) {
            for (let point of pointCol) {
                point.draw()
            }
        }
    }
}
class Point extends Square{
    /**
     * Creates a new instance of the point class
     * @param {any} canvas canvas to draw this point in
     * @param {number} x The x coordinate of the point within the canvas
     * @param {number} y The y coordinate of the point within the canvas
     * @param {number} color The color of the point
     * @param {number} x2 The x coord of the point within it's parent graph
     * @param {number} y2 The y coord of the point within it's parent graph
     */
    constructor(canvas, x, y, color, x2, y2) {
        super(canvas, 1, x, y, color)
        this.x2 = x2
        this.y2 = y2
    }
}
    