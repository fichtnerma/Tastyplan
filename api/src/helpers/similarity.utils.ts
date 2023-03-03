export function similarity2(s1: string, s2: string) {
    const split1 = s1.toLowerCase().split(' ');
    const split2 = s2.toLowerCase().split(' ');
    let sum = 0;
    let max = 0;
    let temp = 0;
    if (split2.length === 1 && split2[0] === split1[0]) {
        return 1;
    }
    for (let i = 0; i < split1.length; i++) {
        max = 0;
        for (let j = 0; j < split2.length; j++) {
            temp = similarity(split1[i], split2[j]);
            if (max < temp) max = temp;
        }
        sum += max / split1.length;
    }
    return sum;
}

export function similarity(s1: string, s2: string) {
    let longer = s1;
    let shorter = s2;
    if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
    }
    const longerLength = longer.length;
    if (longerLength == 0) {
        return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / longerLength;
}

export function editDistance(s1: string, s2: string) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    const costs = [];
    for (let i = 0; i <= s1.length; i++) {
        let lastValue = i;
        for (let j = 0; j <= s2.length; j++) {
            if (i == 0) costs[j] = j;
            else {
                if (j > 0) {
                    let newValue = costs[j - 1];
                    if (s1.charAt(i - 1) != s2.charAt(j - 1)) newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0) costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}
