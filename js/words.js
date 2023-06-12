{
    let attempts = 5;
    let secretWord;
    let secretPositions = new Map();
    let inputPositions = new Map();
    let keyMap = new Map();
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
    const keyboardManger = (keyMap) => {
        let alphabet = keyboard.children;
        for (let j = 0; j < alphabet.length; j++) {
            let letter = alphabet[j].innerText;
            if (keyMap.has(letter)) {
                if (keyMap.get(letter) === comparations.LETTER) {
                    alphabet[j].style.backgroundColor = "#a0f6a4";
                } else if (keyMap.get(letter) === comparations.POSITION) {
                    alphabet[j].style.backgroundColor = "yellow";
                } else if (keyMap.get(letter) === comparations.NOTHING) {
                    alphabet[j].style.backgroundColor = "lightgrey";
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

    //genereting secret word using db json on localhost
    //C:\dev\corso\server>json-server --watch word5.json
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
            //console.log(secretWord);
            //mapping secret word
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

    //checks if letter is present or in right position
    //NOTHING: letter NOT present, LETTER: letter present, POSITION: letter present and right position
    const isPresentOrRightPos = (container, keyboardMap) => {
        //for each letter in secret word (for each secretMap key)
        for (const letter of secretPositions.keys()) {
            //does input word contains the letter?
            if (inputPositions.has(letter)) {
                //preparing html element:
                const collection = container.children;
                //how many letters are there?
                //if inputLetters > secretLetters some letters of input word are extra, so (even if present) won't be displayed in green 
                const arraySecret = secretPositions.get(letter);
                let arrayInput = inputPositions.get(letter);
                arraySecret.forEach(pos => {
                    //searching for letter in the same position first
                    if (arrayInput.includes(pos)) {
                        const index = arrayInput.indexOf(pos);
                        arrayInput.splice(index, 1);
                        collection[pos].style.backgroundColor = "yellow";
                        keyboardMap.set(letter, comparations.POSITION);
                        //console.log(`letter ${letter}: ${arrayInput}`);
                    } else {
                        const index = arrayInput.at(0);
                        arrayInput.splice(0, 1);
                        if(index != null && index != undefined) {
                            collection[index].style.backgroundColor = "#a0f6a4";
                        }
                        if (keyboardMap.get(letter) !== comparations.POSITION) {
                            keyboardMap.set(letter, comparations.LETTER);
                        }
                        //console.log(`letter ${letter}: ${arrayInput}`);
                    }
                });
            } else {
                console.log(`${letter} not present`);
            }
        }
    };

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
            if (input !== secretWord) {
                //mapping input
                mapPositions(input, inputPositions);
                //creating html elements for showing input with tips
                const inputContainer = document.createElement("div");
                for (i = 0; i < input.length; i++) {
                    const letterContainer = document.createElement("div");
                    letterContainer.classList.add("wordLetter");
                    letterContainer.innerText = input[i];
                    inputContainer.appendChild(letterContainer);
                }
                //map for keyboard manager
                keyMap.clear();
                for (inputKey of inputPositions.keys()) {
                    keyMap.set(inputKey, comparations.NOTHING)
                }
                isPresentOrRightPos(inputContainer, keyMap);
                letters.appendChild(inputContainer);
                keyboardManger(keyMap);
                showAttempts();
            } else {
                found = true;
                reset();
                return;
            }
        }
    };
}