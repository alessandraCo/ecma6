{
    let attempts = 5;
    let secretWord;
    let found = false;

    //const isEqual = document.getElementById("showResult");
    const tentativi = document.getElementById("attempts");
    const msg = document.getElementById("winOrLose");
    const letters = document.getElementById("inputs");
    const errorMsg = document.getElementById("errorMsg");

    const generateSecretWord = () => {
        const pr1 = fetch('http://localhost:3000/parole');
        const pr2 = pr1.then(convertiJson);
        pr2.then(responseOK, responseKO);

        function convertiJson(response) {
            return response.json();
        }

        function responseOK(data) {
            const random = Math.floor(Math.random() * data.length);
            secretWord = data[random];
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

    const checkPosition = (word, letter) => {
        if (secretWord.indexOf(letter) === word.indexOf(letter)) {
            console.log(`letter ${letter} is in the right position`);
            return true;
            // const tip = document.createElement("p");
            // tip.innerHTML = `letter ${letter} is in the right position`;
            // isEqual.appendChild(tip);
        }
        return false;
    }

    const checkLetter = (letter) => {
        if (secretWord.includes(letter)) {
            // const tip = document.createElement("p")
            // tip.innerHTML = `letter ${letter} is present`;
            // isEqual.appendChild(tip);
            console.log(`letter ${letter} is present`);
            return true;
        }
        return false;
    };

    const showAttempts = () => {
        tentativi.innerHTML = `You have ${attempts} attempts left`;
    };

    const reset = () => {
        let message;
        attempts = 5;
        showAttempts();
        //clear previus inputs
        //while (isEqual.firstChild) { isEqual.removeChild(isEqual.firstChild); }
        while (letters.firstChild) { letters.removeChild(letters.firstChild); }
        //end game message
        found ? message = `You win! The world was ${secretWord}` : message = `You lose! The world was ${secretWord}`;
        console.log(message);
        msg.innerHTML = `${message}`;
        found = false;
        generateSecretWord();
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
            const inputContainer = document.createElement("div");
            for (i = 0; i < input.length; i++) {
                const letterContainer = document.createElement("div");
                letterContainer.classList.add("wordLetter");
                letterContainer.innerText = input[i];
                if (input !== secretWord) {
                    const letterPresent = checkLetter(input[i]);
                    if (letterPresent) {
                        letterContainer.style.backgroundColor = "#a0f6a4";
                    }
                    const positionPresent = checkPosition(input, input[i]);
                    if (positionPresent) {
                        letterContainer.style.backgroundColor = "yellow";
                    }
                } else {
                    found = true;
                    reset();
                    return;
                }
                inputContainer.appendChild(letterContainer);
            }
            letters.appendChild(inputContainer);
            showAttempts();
        }
    };
}