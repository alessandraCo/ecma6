{
    window.onload = () => {
        document.getElementById("reverseText").addEventListener("click", reverseText);
    };

    const revertWord = (wordIn) => {
        if(wordIn.length >= 5) {
            let chars = wordIn.split('');
            return chars.reverse().join("");
        } else {
            return wordIn;
        }
    };

    const reverseText = () => {
        //get document elements
        const newText = document.getElementById("showText");
        const newP = document.createElement("p");
        //clear previus inputs
        while(newText.firstChild) {newText.removeChild(newText.firstChild);}
        //set properties of newPre
        newP.style.overflowX = "auto";
        newP.style.overflowY = "auto";
        //inputText: string
        const inputText = document.getElementById("textInput").value;
        //outputText: string[] (array of strings)
        const outputText = inputText.split(" ");
        //modifying the array using revertWord function
        let newOutput = outputText.map(revertWord);

        console.log(newOutput);
       
        newP.innerHTML = newOutput.join(" ");
        newText.appendChild(newP);
    };
}
