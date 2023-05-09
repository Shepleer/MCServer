const SPECIAL_CHARACTERS = "@$!%*?&";
const LETTERS = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";

function randomCharacterFrom(string: string): string {
    const max = string.length - 1;
    let randomChar = string.charAt(Math.floor(Math.random() * max));
    return randomChar;
}

function shuffleString(string: string): string {
    const array = string.split('');
    let currentIndex = array.length,  randomIndex;
    
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }
    
    const result = array.reduce((prev, next) => prev + next, "");
    return result;
}


/// Should be used only for seeds/tests
function generatePassword(): string {
    let length = 16;
    let randomString = "";

    for (let i = 0; i < length; i++) {
        if (i < 2) {
            randomString += randomCharacterFrom(LETTERS);
        } else if (i < 5) {
            randomString += randomCharacterFrom(LETTERS).toUpperCase();
        } else if (i < 8) {
            randomString += randomCharacterFrom(NUMBERS);
        } else {
            randomString += randomCharacterFrom(SPECIAL_CHARACTERS);
        }
    }

    let ss = shuffleString(randomString);
    console.log("DEBUGGLL ", ss);
    return ss;
}

function validatePassword(password: string): boolean {
    const regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    
    if (regexp.test(password)) {
        return true;
    }

    return false;
}

export { generatePassword, validatePassword };