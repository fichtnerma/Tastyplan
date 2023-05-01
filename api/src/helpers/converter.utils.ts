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
