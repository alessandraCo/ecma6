{
    window.onload = () => {
        document.getElementById("startEncrypt").addEventListener("click", encryptMessage);
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    };

    const hasCapitalLetters = (toEncrypt) => {
        for (i = 0; i < toEncrypt.length; i++) {
            const unicodeChar = toEncrypt.charCodeAt(i);
            if (unicodeChar < 32 || unicodeChar > 90) {
                return false;
            }
        }
        return true;
    };

    const caesarEncryption = (toEncrypt, number) => {
        let newMessage = new Array();
        //for each string letter
        for (i = 0; i < toEncrypt.length; i++) {
            let unicodeChar = toEncrypt.charCodeAt(i);
            //if the letter isn't a space or a special character
            if (unicodeChar >= 32 && unicodeChar <= 64) {
                newMessage.push(toEncrypt.charAt(i));
            } else {
                //return the letter encrypted by using its unicode value
                while(unicodeChar +  number < 65) {
                    unicodeChar += 26;
                } 
                while (unicodeChar + number > 90) {
                    unicodeChar -= 26;
                } 
                let newChar = String.fromCharCode((unicodeChar + number));
                newMessage.push(newChar);
            }
        }
        return newMessage;
    };

    const encryptMessage = () => {
        const message = document.getElementById("message").value;
        const caesarNumber = Number(document.getElementById("caesarNumber").value);
        const errorMsg = document.getElementById("errorMsg");
        const showMessage = document.getElementById("showMessage");

        //clear previus inputs
        while(showMessage.firstChild) {showMessage.removeChild(showMessage.firstChild);}

        if (hasCapitalLetters(message)) {
            errorMsg.innerHTML = "";
            const encrypt = caesarEncryption(message, caesarNumber);
            console.log(encrypt.join(''));
            const result = document.createElement("p");
            result.innerHTML = encrypt.join('');
            showMessage.appendChild(result);
        } 
        //if message hasn't capital letters:
        else {
            console.log("only messages with capital letters");
            errorMsg.innerHTML="only messages with capital letters";
            errorMsg.style.color = "red";
        }
    };
}