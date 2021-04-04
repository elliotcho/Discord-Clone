export const formatDate = (d: string) => {
    const dateStr = new Date(parseInt(d)).toLocaleString();
    const split = dateStr.split(",");

    return split[0];
}