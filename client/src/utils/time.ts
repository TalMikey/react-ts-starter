export const displayElapsedTime = (elapsedTime: number) => {
    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = (Math.floor(elapsedTime % 60000) / 1000).toFixed(0);

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
} 