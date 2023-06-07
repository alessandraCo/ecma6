{
    window.onload = () => {
        document.getElementById("startComputing").addEventListener("click", countArmstrong);
    };

    const countDigits = (number) => {
        let digits = 0;
        while (number > 0) {
            number = Math.floor(number / 10);
            digits++;
        }
        return digits;
    };

    const isArmstrong = (numberIn) => {
        //saving numberIn
        let number = numberIn;
        //partial sums
        let sum = 0;
        //number of digits
        const numOfdigits = countDigits(number);
        //exception for number zero
        if (number === 0) { return; }
        else {
            //extracting each digit and updating sum
            while (number > 0) {
                let digit = Math.floor(number % 10);
                //console.log(`digit: ${digit}`);
                number = Math.floor(number / 10);
                //console.log(`remaining number: ${number}`);
                sum += (Math.pow(digit, numOfdigits));
                //console.log(`sum: ${sum}`);
            }
            return sum === numberIn;
        }
    };

    const countArmstrong = () => {
        let armstrongs = new Array();
        for (i = 0; i < 100000; i++) {
            if (isArmstrong(i)) {
                armstrongs.push(i);
            }
        }
        const count = armstrongs.length;
        console.log(armstrongs);
        console.log(`There are ${count} armstrong numbers between 0 and 100000`);

        const result = document.getElementById("showResult");

        while(result.firstChild) {result.removeChild(result.firstChild);}

        const numbers = document.createElement("p");
        numbers.innerText = armstrongs.join(" ");
        result.appendChild(numbers);
        const dim = document.createElement("p");
        dim.innerHTML = `There are ${count} armstrong numbers between 0 and 100000`;
        result.appendChild(dim);
    };
}