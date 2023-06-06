{
    let attempts = 5;
    const secretWord = `fiori`;
    let found = false;

    const isEqual = document.getElementById("showResult");
    const tentativi = document.getElementById("attempts");
    const msg = document.getElementById("winOrLose");

    window.onload = () => {
        document.getElementById("checkWord").addEventListener("click", checkWord);
        showAttempts();
    };

    const checkPosition = (word, letter) => {
        if (secretWord.indexOf(letter) === word.indexOf(letter)) {
            console.log(`letter ${letter} is in the right position`);
            const tip = document.createElement("p");
            tip.innerHTML = `letter ${letter} is in the right position`;
            isEqual.appendChild(tip);
        }
    }

    const checkLetters = (input) => {
        let chars = input.split('');
        chars.forEach(letter => {
            if (secretWord.includes(letter)) {
                const tip = document.createElement("p")
                tip.innerHTML = `letter ${letter} is present`;
                isEqual.appendChild(tip);
                console.log(`letter ${letter} is present`);
                checkPosition(input, letter);
            }
        });
    };

    const showAttempts = () => {
        tentativi.innerHTML = `You have ${attempts} attempts left`;
    };

    const reset = () => {
        let message;
        attempts = 5;
        showAttempts();
        //clear previus inputs
        while (isEqual.firstChild) { isEqual.removeChild(isEqual.firstChild); }
        //end game message
        found ? message = "You win!" : message = "You lose!";
        console.log(message);
        msg.innerHTML = `${message}`
    };

    const checkWord = () => {
        msg.innerHTML = "";
        attempts--;
        if (attempts <= 0) {
            reset();
            return;
        }
        const input = document.getElementById("textInput").value;
        const newP = document.createElement("p");
        if (input !== secretWord) {
            checkLetters(input);
            newP.innerHTML = `${input} isn't my word!`;
            isEqual.appendChild(newP);
        } else {
            found = true;
            reset();
            return;
        }
        showAttempts();
    };
}