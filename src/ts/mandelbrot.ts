import Complex from "./complex";
import Utils from "./utils";

/**
 * Mandelbrot set fractal.
 *
 * @abstract
 * @class Mandelbrot
 */
abstract class Mandelbrot {
    /**
     * Builds the Mandelbrot set fractal.
     *
     * @static
     * @param {number} iterations Max iteration count.
     * @param {number} width Canvas width.
     * @param {number} height Canvas height.
     * @returns {number[]} Iteration count for each point.
     * @memberof Mandelbrot
     */
    public static build(iterations: number, width: number, height: number): number[] {
        const left = -2.5;
        const right = 1.5;
        const bottom = -1.5;
        const top = 1.5;

        const data: number[] = [];

        for (let cy = 0; cy < height; cy++) {
            for (let cx = 0; cx < width; cx++) {
                const x = Utils.lerp(left, right, cx / width);
                const y = Utils.lerp(bottom, top, cy / height);

                const item = Mandelbrot.compute(x, y, iterations);

                data.push(item);
            }
        }

        return data;
    }

    /**
     * Computes the Mandelbrot set for a given position (not canvas coordinates).
     *
     * @private
     * @static
     * @param {number} x X position.
     * @param {number} y Y position.
     * @param {number} iterations Max iteration count.
     * @returns {number} Iteration count.
     * @memberof Mandelbrot
     */
    private static compute(x: number, y: number, iterations: number): number {
        const c = new Complex(x, y);
        let z = new Complex(0, 0);
        let i = 0;

        while (z.abs() <= 2 && i < iterations) {
            z = z.mul(z).add(c);
            i++;
        }

        if (i === iterations) {
            return -1;
        } else {
            return i;
        }
    }
}

export default Mandelbrot;
