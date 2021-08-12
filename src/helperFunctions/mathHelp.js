export function roundNumber(num, decimals) {
    let expanded = Math.round(num * Math.pow(10, decimals));
    return expanded / Math.pow(10, decimals);
}