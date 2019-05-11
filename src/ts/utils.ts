/**
 * Utility functions.
 *
 * @abstract
 * @class Utils
 */
abstract class Utils {
    /**
     * Linear interpolation.
     *
     * @static
     * @param {number} a Value A.
     * @param {number} b Value B.
     * @param {number} p Percentage to interpolate.
     * @returns {number} Interpolated value.
     * @memberof Utils
     */
    public static lerp(a: number, b: number, p: number): number {
        return (1 - p) * a + p * b;
    }

    /**
     * Creates a new Canvas element.
     *
     * @static
     * @param {number} width Canvas width.
     * @param {number} height Canvas height.
     * @returns {HTMLCanvasElement} Canvas element.
     * @memberof Utils
     */
    public static canvas(width: number, height: number): HTMLCanvasElement {
        const canvas = document.createElement<"canvas">("canvas");
        canvas.width = width;
        canvas.height = height;

        document.body.append(canvas);

        return canvas;
    }

    /**
     * Builds a color gradient.
     *
     * @static
     * @param {string} color1 Start color in hexadecimal.
     * @param {string} color2 End color in hexadecimal.
     * @param {number} steps Number of steps including base colors.
     * @returns {string[]} Color gradient.
     * @memberof Utils
     */
    public static gradient(color1: string, color2: string, steps: number): string[] {
        steps = Math.floor(steps) - 2;

        const colors: string[] = [];

        colors.push(color1);

        if (steps > 0) {
            const r1 = color1.substr(0, 2);
            const g1 = color1.substr(2, 2);
            const b1 = color1.substr(4, 2);

            const r2 = color2.substr(0, 2);
            const g2 = color2.substr(2, 2);
            const b2 = color2.substr(4, 2);

            for (let i = 1; i <= steps; i++) {
                const percentage = i / (steps + 2);

                const r = Math.floor(Utils.lerp(Utils.dec(r1), Utils.dec(r2), percentage));
                const g = Math.floor(Utils.lerp(Utils.dec(g1), Utils.dec(g2), percentage));
                const b = Math.floor(Utils.lerp(Utils.dec(b1), Utils.dec(b2), percentage));

                const color = Utils.hex(r) + Utils.hex(g) + Utils.hex(b);

                colors.push(color);
            }
        }

        colors.push(color2);

        return colors;
    }

    /**
     * Converts a hexadecimal number to a decimal one.
     *
     * @static
     * @param {string} hex Hexadecimal number.
     * @returns {number} Decimal number.
     * @memberof Utils
     */
    public static dec(hex: string): number {
        return parseInt(hex, 16);
    }

    /**
     * Converts a decimal number to a hexadecimal one.
     *
     * @static
     * @param {string} number Decimal number.
     * @returns {number} Hexadecimal number.
     * @memberof Utils
     */
    public static hex(dec: number): string {
        return ("0" + dec.toString(16)).slice(-2);
    }

    /**
     * Computes percentiles for an array.
     *
     * @static
     * @param {number[]} array Array of numbers.
     * @param {number[]} percentages Percentages.
     * @returns {number[]} Percentiles.
     * @memberof Utils
     */
    public static percentiles(array: number[], percentages: number[]): number[] {
        const sorted = array.slice().sort((a, b) => (a > b ? 1 : -1));

        const percentiles: number[] = [];

        for (const percentage of percentages) {
            const index = Math.floor((percentage / 100) * (sorted.length - 1));

            percentiles.push(sorted[index]);
        }

        return percentiles;
    }

    /**
     * Returns percentage steps.
     *
     * @static
     * @param {number} count Count of steps.
     * @returns {number[]} Percentage steps.
     * @memberof Utils
     */
    public static percentages(count: number): number[] {
        const data: number[] = [];

        for (let i = 1; i <= count; i++) {
            data.push((100 / count) * i);
        }

        return data;
    }

    /**
     * Returns distinct numbers.
     *
     * @static
     * @param {number[]} array Numbers.
     * @returns {number[]} Distinct array.
     * @memberof Utils
     */
    public static distinct(array: number[]): number[] {
        const data: number[] = [];

        for (const item of array) {
            if (!data.includes(item)) {
                data.push(item);
            }
        }

        return data;
    }

    /**
     * Replaces a Canvas element by an Image element.
     *
     * @static
     * @param {HTMLCanvasElement} canvas Canvas element.
     * @returns {HTMLImageElement} Image element.
     * @memberof Utils
     */
    public static image(canvas: HTMLCanvasElement): HTMLImageElement {
        const image = document.createElement<"img">("img");
        image.src = canvas.toDataURL();

        canvas.remove();

        document.body.append(image);

        return image;
    }
}

export default Utils;
