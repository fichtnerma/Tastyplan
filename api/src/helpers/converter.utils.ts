export function convertToTime(timeString: string) {
    if (!timeString) {
        return undefined;
    }
    const splitTimes = timeString.split(' ');
    let time = 0;
    for (let index = 0; index < splitTimes.length; index += 2) {
        const element = splitTimes[index];
        if (splitTimes[index + 1] === 'mins') {
            time += parseInt(element);
        } else if (splitTimes[index + 1] === 'hrs') {
            time += parseInt(element) * 60;
        }
    }
    return time;
}

export function shuffleArray(array: { id: number }[]) {
    let currentIndex = array.length,
        randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}
