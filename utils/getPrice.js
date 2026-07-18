export function getPrice() {
    const min = 2000;
    const max = 4000;

    const price = Math.random() * (max - min) + min;
    return price.toFixed(2);
}