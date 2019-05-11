/**
 * Complex number class.
 *
 * @class Complex
 */
class Complex {
    /**
     * Creates an instance of Complex.
     *
     * @param {number} real Real part.
     * @param {number} imaginary imaginary part.
     * @memberof Complex
     */
    constructor(public real: number, public imaginary: number) {}

    /**
     * Returns the absolute value.
     *
     * @returns {number} Absolute value.
     * @memberof Complex
     */
    public abs(): number {
        return Math.sqrt(Math.pow(this.real, 2) + Math.pow(this.imaginary, 2));
    }

    /**
     * Adds two complex numbers.
     *
     * @param {Complex} other Other complex number.
     * @returns {Complex} Result number.
     * @memberof Complex
     */
    public add(other: Complex): Complex {
        return new Complex(this.real + other.real, this.imaginary + other.imaginary);
    }

    /**
     * Multiplies two complex numbers.
     *
     * @param {Complex} other Other complex number.
     * @returns {Complex} Result number.
     * @memberof Complex
     */
    public mul(other: Complex): Complex {
        return new Complex(
            this.real * other.real - this.imaginary * other.imaginary,
            this.real * other.imaginary + this.imaginary * other.real,
        );
    }
}

export default Complex;
