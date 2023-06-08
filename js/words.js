{
    let attempts = 5;
    let secretWord;
    let secretMap = new Map();
    let secretPositions = new Map();
    let inputMap = new Map();
    let found = false;

    const comparations = ({
        NOTHING: Symbol('nothing'),
        LETTER: Symbol('letter'),
        POSITION: Symbol('position'),
    })

    const tentativi = document.getElementById("attempts");
    const msg = document.getElementById("winOrLose");
    const letters = document.getElementById("inputs");
    const errorMsg = document.getElementById("errorMsg");
    const keyboard = document.getElementById("alphabetContainer");

    //keyboard manager
    const keyboardManger = (letter, compare) => {
        let alphabet = keyboard.children;
        for (j = 0; j < alphabet.length; j++) {
            if (alphabet[j].innerText === letter) {
                if (compare === comparations.LETTER) {
                    alphabet[j].style.backgroundColor = "#a0f6a4";
                    return;
                } else if (compare === comparations.POSITION) {
                    alphabet[j].style.backgroundColor = "yellow";
                    return;
                } else {
                    alphabet[j].style.backgroundColor = "lightgrey";
                    return;
                }
            }
        }
        return;
    };

    const resetKeyboard = () => {
        let alphabet = keyboard.children;
        for (j = 0; j < alphabet.length; j++) { 
            alphabet[j].style.backgroundColor = "#b0e6f5";
        }
    };

    //mapping letter positions
    const mapPositions = (word, map) => {
        map.clear();
        const array = word.split('');
        for (i = 0; i < array.length; i++) {
            //if there is more than one letter
            if (map.has(array[i])) {
                map.get(array[i]).push(i);
            } else {
                const positions = new Array();
                positions.push(i);
                map.set(array[i], positions);
            }
        }
    };

    //counting number of the same letter
    const countSameLetter = (word, letter) => {
        const array = word.split('');
        let count = 0;
        array.forEach(element => {
            if (element === letter) {
                count++;
            }
        });
        //console.log(`there are ${count} letter ${letter} in ${word}`);
        return count;
    };

    //mapping world letter
    const mapThisWord = (word, map) => {
        map.clear();
        const array = word.split('');
        array.forEach(letter => {
            const count = countSameLetter(word, letter);
            //key: letter
            //value: number of the same letter
            map.set(letter, count);
        });
    };

    //genereting secret word using db json on localhost
    const generateSecretWord = () => {
        const pr1 = fetch('http://localhost:3000/parole');
        const pr2 = pr1.then(convertiJson);
        pr2.then(responseOK, responseKO);

        function convertiJson(response) {
            return response.json();
        }

        function responseOK(data) {
            //choosing randomly a new secret word
            const random = Math.floor(Math.random() * data.length);
            secretWord = data[random];
            //mapping secret word
            mapThisWord(secretWord, secretMap);
            mapPositions(secretWord, secretPositions);
        };

        function responseKO(err) {
            alert(err.message);
        }

    };

    window.onload = () => {
        document.getElementById("checkWord").addEventListener("click", checkWord);
        generateSecretWord();
        showAttempts();
    };

    //letter present or letter present and in right position
    //0: letter NOT present, 1: letter present, 2: letter present and right position
    const isPresentOrRightPos = (letter, index) => {
        //if the letter is present
        if (secretMap.has(letter)) {
            console.log(`letter ${letter} is present`);
            const arraySecret = secretPositions.get(letter);
            //right position
            if (arraySecret.includes(index)) {
                console.log(`letter ${letter} is in the right position`);
                //2: letter present and right position
                const result = comparations.POSITION;
                return result;
            } else {
                if (inputMap.get(letter) > 1) {
                    //0: letter NOT present (already found)
                    const result = comparations.NOTHING;
                    return result;
                } else {
                    //1: letter present
                    const result = comparations.LETTER;
                    return result;
                }
            }
        }
        //0: letter NOT present
        const result = comparations.NOTHING;
        return result;
    };

    //the letter is in the right position
    // const checkPosition = (word, letter) => {
    //     if (secretWord.indexOf(letter) === word.indexOf(letter)) {
    //         console.log(`letter ${letter} is in the right position`);
    //         return true;
    //     }
    //     return false;
    // }

    //the letter is present
    // const checkLetter = (letter) => {
    //     if (secretWord.includes(letter)) {
    //         console.log(`letter ${letter} is present`);
    //         return true;
    //     }
    //     return false;
    // };

    const showAttempts = () => {
        tentativi.innerHTML = `You have ${attempts} attempts left`;
    };

    const reset = () => {
        let message;
        attempts = 5;
        showAttempts();
        //clear previus inputs
        while (letters.firstChild) { letters.removeChild(letters.firstChild); }
        //end game message
        found ? message = `You win! The world was ${secretWord}` : message = `You lose! The world was ${secretWord}`;
        console.log(message);
        msg.innerHTML = `${message}`;
        found = false;
        generateSecretWord();
        resetKeyboard();
    };

    const checkWord = () => {
        errorMsg.innerText = "";
        msg.innerHTML = "";
        attempts--;
        const inputIn = document.getElementById("textInput").value;
        //remove spaces and in lower case
        const input = inputIn.trim().toLowerCase();
        //mapping input
        mapThisWord(input, inputMap);
        if (attempts == 0) {
            if (input === secretWord) { found = true; }
            reset();
            return;
        }
        if (input.length !== 5) {
            errorMsg.innerText = `the world must have 5 letters`;
            console.log(`the world must have 5 letters`);
            attempts++;
            return;
        } else {
            const inputContainer = document.createElement("div");
            for (i = 0; i < input.length; i++) {
                let compare;
                const letterContainer = document.createElement("div");
                letterContainer.classList.add("wordLetter");
                letterContainer.innerText = input[i];
                if (input !== secretWord) {
                    compare = isPresentOrRightPos(input[i], i);
                    if (compare === comparations.LETTER) {
                        letterContainer.style.backgroundColor = "#a0f6a4";
                    }
                    if (compare === comparations.POSITION) {
                        letterContainer.style.backgroundColor = "yellow";
                    }
                    inputContainer.appendChild(letterContainer);
                    letters.appendChild(inputContainer);
                    keyboardManger(input[i], compare);
                    // const letterPresent = checkLetter(input[i]);
                    // if (letterPresent) {
                    //     letterContainer.style.backgroundColor = "#a0f6a4";
                    // }
                    // const positionPresent = checkPosition(input, input[i]);
                    // if (positionPresent) {
                    //     letterContainer.style.backgroundColor = "yellow";
                    // }
                } else {
                    found = true;
                    reset();
                    return;
                }
            }
            showAttempts();
        }
    };
}