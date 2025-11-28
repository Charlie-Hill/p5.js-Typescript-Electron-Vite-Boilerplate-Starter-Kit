class Point2D {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public copy(): Point2D {
        return new Point2D(this.x, this.y);
    }

    public add(other: Point2D): Point2D {
        return new Point2D(this.x + other.x, this.y + other.y);
    }
}

export default Point2D;