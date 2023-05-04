export function levenshteinMultiWordSimilarity(s1: string, s2: string) {
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
            temp = levenshteinSimilarity(split1[i], split2[j]);
            if (max < temp) max = temp;
        }
        sum += max / split1.length;
    }
    return sum;
}

export function levenshteinSimilarity(s1: string, s2: string) {
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
    return (longerLength - levenshteinDistance(longer, shorter)) / longerLength;
}

function levenshteinDistance(s1: string, s2: string) {
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
                    if (s1.charAt(i - 1) != s2.charAt(j - 1))
                        newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0) costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}

export function gestaltSimilarity(s1: string, s2: string) {
    const stack = [s1, s2];
    let score = 0;
    while (stack.length != 0) {
        const first_sub_string = stack.pop();
        const second_sub_string = stack.pop();
        let longest_sequence_length = 0;
        let longest_sequence_index_1 = -1;
        let longest_sequence_index_2 = -1;
        for (let i = 0; i < first_sub_string.length; i++) {
            for (let j = 0; j < second_sub_string.length; j++) {
                let k = 0;
                while (
                    i + k < first_sub_string.length &&
                    j + k < second_sub_string.length &&
                    first_sub_string.charAt(i + k) === second_sub_string.charAt(j + k)
                ) {
                    k++;
                }
                if (k > longest_sequence_length) {
                    longest_sequence_length = k;
                    longest_sequence_index_1 = i;
                    longest_sequence_index_2 = j;
                }
            }
        }
        if (longest_sequence_length > 0) {
            score += longest_sequence_length * 2;
            if (longest_sequence_index_1 !== 0 && longest_sequence_index_2 !== 0) {
                stack.push(first_sub_string.substring(0, longest_sequence_index_1));
                stack.push(second_sub_string.substring(0, longest_sequence_index_2));
            }
            if (
                longest_sequence_index_1 + longest_sequence_length !== first_sub_string.length &&
                longest_sequence_index_2 + longest_sequence_length !== second_sub_string.length
            ) {
                stack.push(
                    first_sub_string.substring(
                        longest_sequence_index_1 + longest_sequence_length,
                        first_sub_string.length,
                    ),
                );
                stack.push(
                    second_sub_string.substring(
                        longest_sequence_index_2 + longest_sequence_length,
                        second_sub_string.length,
                    ),
                );
            }
        }
    }
    return score / (s1.length + s2.length);
}

export function smithWatermanSimilarity(s1: string, s2: string) {
    const n = s1.length;
    const m = s2.length;
    const matrix = [];
    for (let i = 0; i <= n; i++) {
        matrix[i] = [0];
    }
    for (let j = 0; j <= m; j++) {
        matrix[0][j] = 0;
    }
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            matrix[i][j] = Math.max(
                matrix[i - 1][j - 1] + smithWatermanMatch(s1.charAt(i - 1), s2.charAt(j - 1)),
                matrix[i - 1][j] + smithWatermanGap(),
                matrix[i][j - 1] + smithWatermanGap(),
            );
        }
    }
    return matrix[n][m] / Math.max(n, m);
}

function smithWatermanMatch(c1: string, c2: string) {
    if (c1 === c2) return 1;
    return -1;
}

function smithWatermanGap() {
    return -1;
}

export function jaroWinklerSimilarity(s1: string, s2: string) {
    const jaro_distance = jaroSimilarity(s1, s2);
    const prefix_length = jaroPrefix(s1, s2);
    const jaro_winkler_distance = jaro_distance + 0.1 * prefix_length * (1 - jaro_distance);
    return jaro_winkler_distance;
}

function jaroSimilarity(s1: string, s2: string) {
    const m = jaroMatches(s1, s2);
    if (m === 0) return 0;
    const t = jaroTranspositions(s1, s2);
    const jaro_distance = (m / s1.length + m / s2.length + (m - t / 2) / m) / 3;
    return jaro_distance;
}

function jaroTranspositions(s1: string, s2: string) {
    const max_distance = Math.floor(Math.max(s1.length, s2.length) / 2) - 1;
    const s1_matches = [];
    const s2_matches = [];
    let matches = 0;
    for (let i = 0; i < s1.length; i++) {
        const start = Math.max(0, i - max_distance);
        const end = Math.min(i + max_distance + 1, s2.length);
        for (let j = start; j < end; j++) {
            if (s1.charAt(i) === s2.charAt(j) && !s2_matches[j]) {
                s1_matches[i] = true;
                s2_matches[j] = true;
                matches++;
                break;
            }
        }
    }
    if (matches === 0) return 0;
    let k = 0;
    for (let i = 0; i < s1.length; i++) {
        if (s1_matches[i]) {
            let j;
            for (j = k; j < s2.length; j++) {
                if (s2_matches[j]) {
                    k = j + 1;
                    break;
                }
            }
            if (s1.charAt(i) !== s2.charAt(j)) {
                k++;
            }
        }
    }
    return Math.floor(matches / 2);
}

function jaroPrefix(s1: string, s2: string) {
    let prefix_length = 0;
    for (let i = 0; i < 4; i++) {
        if (s1.charAt(i) === s2.charAt(i)) prefix_length++;
        else break;
    }
    return prefix_length;
}

function jaroMatches(s1: string, s2: string) {
    const max_distance = Math.floor(Math.max(s1.length, s2.length) / 2) - 1;
    const s1_matches = [];
    const s2_matches = [];
    let matches = 0;
    for (let i = 0; i < s1.length; i++) {
        const start = Math.max(0, i - max_distance);
        const end = Math.min(i + max_distance + 1, s2.length);
        for (let j = start; j < end; j++) {
            if (s2_matches[j] !== true && s1.charAt(i) === s2.charAt(j)) {
                s1_matches[i] = true;
                s2_matches[j] = true;
                matches++;
                break;
            }
        }
    }
    return matches;
}
