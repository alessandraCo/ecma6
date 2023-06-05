{
    window.onload = () => {
        document.getElementById("orderText").addEventListener("click", orderText);
    }

    //unsortedText = set (no duplicates) without punctuation, not sorted yet
    let unsortedText = new Set();

    //function that computes unsortedText (removes punctuation, apostrophes and toLowerCase)
    const removePunctuation = (word) => {
        //remove apostrophes
        if(word.includes("'")) {
            const wordsWithApostrophe = word.split("'");
            wordsWithApostrophe.map(removePunctuation);
            return;
        }
        //remove punctuation
        if(word.includes('.') || word.includes(':') || word.includes(',') || word.includes(';') || word.includes('!') || word.includes('?')) {
            unsortedText.add(word.substring(0, word.length-1).toLowerCase());
        } else {
            unsortedText.add(word.toLowerCase());
        } 
    };

    const orderText = () => {
        const textIn = "Il Lonfo non vaterca né gluisce e molto raramente barigatta, ma quando soffia il bego a bisce bisce sdilenca un poco e gnagio s'archipatta. È frusco il Lonfo! È pieno di lupigna arrafferia malversa e sofolenta! Se cionfi ti sbiduglia e ti arrupigna se lugri ti botalla e ti criventa. Eppure il vecchio Lonfo ammargelluto che bete e zugghia e fonca nei trombazzi fa lègica busìa, fa gisbuto; e quasi quasi in segno di sberdazzi gli affarferesti un gniffo. Ma lui zuto t'alloppa, ti sbernecchia; e tu l'accazzi.";
        let text = Array.from(textIn.trim().split(" "));
        text.map(removePunctuation);
        const sortedText = Array.from(unsortedText).sort();
        console.log(sortedText);

        const showResult = document.getElementById("showResult");

        //clear previus inputs
        while(showResult.firstChild) {showResult.removeChild(showResult.firstChild);}

        const p = document.createElement('p');
        p.innerText = sortedText.join(" ");
        showResult.appendChild(p);
    };
}