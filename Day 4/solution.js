var fs = require('fs');

const getInput = () => {
    const file = fs.readFileSync('input.txt', 'utf8');
    let raw = file.split('\r\n\r\n');
    let numbers = raw[0].split(',').map(Number);
    raw.splice(0, 1);
    let cards = raw.map(card => card.split('\r\n'));
    cards = cards.map(card => {
        return card.map(value => {
            return value.split([' ']).filter(x => x !== '').map(Number);
        })

    })

    return {numbers, cards};
}

//replace value with -1 if current value matches input
const findMatch = (input, card) => {
    card.forEach((row, i) => {
        row.forEach((value, j) => {
            if (value === input) {
                card[i][j] = -1;
            }
        })  
    })
    return card;
}

//check for bingo
const checkBingo = (card) => {
    for (let i = 0; i < 5; i++) {
        let row = 0;
        let col = 0;
        for (let j = 0; j < 5; j++) {
            row += card[i][j];
            col += card[j][i];
        }
        if (row === -5 || col === -5) return true;
    }
}


const getCardValue = (card) => {
    let total = 0;
    card.forEach(row => {
        row.forEach(value => {
            if (value !== -1) {
                total += value;
            }
        })
    })
    return total;
}



const main = () => {
    const {numbers, cards} = getInput();
    let bingo =false;

    for (let i =0; i < numbers.length; i++) {
        let number = numbers[i];
        
        cards.forEach(card => {
            return findMatch(number, card);
        })

        cards.forEach(card => {
            if (checkBingo(card)) {
                bingo = {card, number};
            }
        })
        
        if (bingo) break;
    }
    
    console.log(bingo);

    let cardValue = getCardValue(bingo.card);
    console.log(cardValue);
    console.log(bingo.number * cardValue);
    
}

main();