{
    let total = 0;
    const showCost = document.getElementById("theCost");

    window.onload = () => {
        document.getElementById("calculateCost").addEventListener("click", calculateCost);
    };

    const wordCost = (word) => {
        //L * 0.001 + 0.01 €
        if(word === "stop") {
            return total;
        } else {
            let myCost = (word.length * 0.001) + 0.01;
            console.log(`the word ${word} costs ${myCost}`)
            total += myCost;
        }
    };

    const calculateCost = () => {
        total = 0;
        const input = document.getElementById("message").value;
        const wordsinMessage = input.split(" ");
        const lastIndex = wordsinMessage.length - 1;
        if(wordsinMessage[lastIndex] !== "stop") {
            const errorMsg = `Error: message must end with 'stop'`;
            console.log(errorMsg);
            const msg = document.createElement("p");
            msg.innerHTML = errorMsg;
            showCost.appendChild(msg);
            return;
        }
        wordsinMessage.map(wordCost);
        console.log(total);
        const tot = Math.round(total*100)/100;
        console.log(tot);

        while(showCost.firstChild) {showCost.removeChild(showCost.firstChild);}
        const result = document.createElement("p");
        result.innerHTML = `the cost is ${tot} €`;
        showCost.appendChild(result);
    };
}