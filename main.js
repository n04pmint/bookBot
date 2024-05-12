const fs = require('fs');

function main(){
    const title = 'Frankenstein'
    const path = 'input/input.txt';
    const book = getInput(path);
    const numWords = getNumWords(book);
    const numLetters = getLetterCount(book);
    writeFile(title, numWords, numLetters)

    console.log(`--- Begin report of ${title} ---`)
    console.log(`There are ${numWords} words found in this book`)
    console.log('')

    for (char in numLetters) {
        console.log(`The letter '${char}' was found ${numLetters[char]} times`)
    }
    console.log("")
    console.log('--- End Report ---')


}

function writeFile(title, numWords, numLetters) {

    const filePath = 'output/output.txt'
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.log('File does not exist, creating new file...')
        }
        fs.writeFileSync(filePath, `--- Begin report of ${title} ---\n`)
        fs.appendFileSync(filePath, `There are ${numWords} words found in this book\n`)
        fs.appendFileSync(filePath, '\n')
        for (char in numLetters) {
            fs.appendFileSync(filePath, `The letter '${char}' was found ${numLetters[char]} times\n`)
    }
        fs.appendFileSync(filePath, '\n')
        fs.appendFileSync(filePath, '--- End Report ---\n')
    })

   
}

function getLetterCount(book) {
    const lowerStr = book.toLowerCase();
    const letters = {};

    for (letter in lowerStr){
        
        if (isUnicodeAlpha(lowerStr[letter])){
            if(!letters[lowerStr[letter]]){
                letters[lowerStr[letter]] = 0;
            }
            letters[lowerStr[letter]]++;
        }
    }
    // sort the data by aplhabeth
    const sortedKeys = Object.keys(letters).sort();
    

    const sortedLetters = {};
    for (const key of sortedKeys) {
        sortedLetters[key] = letters[key]
    }
    return sortedLetters;

}
function getNumWords(book) {
    let words = book.split(/\s+/);
    return words.length;
}

function getInput(path){
    const data = fs.readFileSync(path, 'utf8');
    return data;
}

function isUnicodeAlpha(str) {
    return /^[^\W\d_]+$/.test(str) || /^\p{L}+$/u.test(str);
}


main()