import Point2D from "../Class/Point2D";

export const getBezierPoint = (t: number, p0: Point2D, p1: Point2D, p2: Point2D, p3: Point2D): Point2D => {
  const x = (1-t)**3 * p0.x + 3*(1-t)**2 * t * p1.x + 3*(1-t) * t**2 * p2.x + t**3 * p3.x;
  const y = (1-t)**3 * p0.y + 3*(1-t)**2 * t * p1.y + 3*(1-t) * t**2 * p2.y + t**3 * p3.y;
  return new Point2D(x, y);
}

export const smoothPath = (path: Point2D[], iterations = 2): Point2D[] => {
    if (path.length < 2) return path;

    let newPath: Point2D[] = path;

    for (let it = 0; it < iterations; it++) {
        const temp: Point2D[] = [];
        temp.push(new Point2D(newPath[0].x, newPath[0].y)); // keep first point

        for (let i = 0; i < newPath.length - 1; i++) {
            const p0 = newPath[i];
            const p1 = newPath[i + 1];

            // Cut 1/4 along segment
            const Q = new Point2D(
                0.75 * p0.x + 0.25 * p1.x,
                0.75 * p0.y + 0.25 * p1.y
            );

            // Cut 3/4 along segment
            const R = new Point2D(
                0.25 * p0.x + 0.75 * p1.x,
                0.25 * p0.y + 0.75 * p1.y
            );

            temp.push(Q, R);
        }

        temp.push(new Point2D(newPath.at(-1)!.x, newPath.at(-1)!.y)); // keep last point
        newPath = temp;
    }

    return newPath;
}

export const findCenterOfPoints = (points: Array<Point2D>): Point2D => {

    let x: number = 0, y: number = 0;

    points.forEach((i: Point2D) => {
        x += i.x,
        y += i.y
    });

    x /= points.length;
    y /= points.length;

    return new Point2D(x, y);

}