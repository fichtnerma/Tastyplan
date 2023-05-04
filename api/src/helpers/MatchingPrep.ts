const fillWords = [
    'fresh',
    'frozen',
    'dried',
    'canned',
    'cooked',
    'raw',
    'minced',
    'boneless',
    'uncooked',
    'diced',
    'chopped',
    'freshly',
    'squeezed',
    'lean',
    'large',
    'medium',
    'small',
    'extra',
    'pitted',
    'finely',
    'skinless',
];
export default class Prep {
    static prepForMatching(str: string) {
        const lower = str.toLowerCase();
        const noRoundBrackets = lower.replace(/\((.*)\)/g, '');
        const noFillWords = fillWords.reduce((acc, word) => {
            return acc.replace(word, '');
        }, noRoundBrackets);
        if (noFillWords.trim()[0] === ',') {
            return noFillWords.trim().replace(',', '');
        }
        const noDescription = noFillWords.replace(/\,(.*)/g, '');
        const trimmed = noDescription.trim();
        return trimmed;
    }
}
