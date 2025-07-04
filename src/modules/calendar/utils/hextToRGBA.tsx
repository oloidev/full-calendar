export function hexToRGBA(hex: string, alpha = 0.1): string {
    const sanitizedHex = hex.replace("#", "");
    const bigint = parseInt(sanitizedHex, 16);

    if (sanitizedHex.length !== 6 || isNaN(bigint)) {
        console.warn("hexToRGBA recibió un color inválido:", hex);
        return `rgba(0, 0, 0, ${alpha})`;
    }

    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
