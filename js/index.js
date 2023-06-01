{
    window.onload = () => {
        document.getElementById("startComputing").addEventListener("click", goFunction);
    }

    //const fibonacciSerie = new Array();

    //const primeNumbers = new Array();

    const norFiboNorPrime = new Array();

    //first attempt: compute Fibonacci Sequence first to verify if it contains the considered number
    //disadvantages: is difficult to calculate Fibonacci Sequence length

    // const sum = (last = 0, secondLast = 0) => last + secondLast;

    // const computeFibonacci = (maxLength) => {
    //     let count = fibonacciSerie.length;
    //     while (count < maxLength) {
    //         if (count === 0) {
    //             fibonacciSerie.push(sum());
    //         } else if (count === 1) {
    //             fibonacciSerie.push(sum(1));
    //         } else {
    //             fibonacciSerie.push(sum(fibonacciSerie[count - 1], fibonacciSerie[count - 2]));
    //         }
    //         count = fibonacciSerie.length;
    //     }
    // };

    //function that returns true if the considered number is a Perfect Square
    const isPerfectSquare = (number) => Number.isInteger(Math.sqrt(number));

    //function that returns true if the considered number is part of Fibonacci Sequence
    //algorithm: a number is part of Fibonacci Sequence if and only if either one of (5N^2 + 4) or (5N^2 - 4) is a perfect square
    const isFromFibonacci = (number) => {
        let checkFibo = true;
        if(isPerfectSquare(5*number*number+4) || isPerfectSquare(5*number*number-4)) {
            return checkFibo = true;
        } else {
            return checkFibo = false;
        }

    };

    //function that returns true if the considered number is a Prime number
    //algorith: try to divide the number by all numbers starting from number-1
    //It stops when the % is equals 0 (composite number) or when the divider becomes 1 (prime number)
    const isPrime = (number) => {
        let checkPrime = true;
        let count = number - 1;
        while (count > 1) {
            if (number % count === 0) {      //composite number
                return checkPrime = false;
            }
            count--;
        }
        return checkPrime = true;           //prime number
    };

    //function that computes the norFiboNorPrime sequence of the given size
    const computeNorFiboNorPrime = (maxSize) => {
        let n = 0;
        let dim = norFiboNorPrime.length;
        while (dim < maxSize) {
            if (!isPrime(n) && !isFromFibonacci(n)) {
                norFiboNorPrime.push(n);
            }
            dim = norFiboNorPrime.length;
            n++;
        }
    };

    function goFunction() {
        computeNorFiboNorPrime(786);
        console.log(norFiboNorPrime);

        const section = document.getElementById("showResult");

        const dim = norFiboNorPrime.length;
        let start = 0;
        let end;
        while (start < dim) {
            if (start+30 < dim) {
                end = start+30;
            } else {
                end = dim
            }
            const newP = document.createElement("p");
            newP.innerHTML = norFiboNorPrime.slice(start, end).join(' ');
            section.appendChild(newP);
            start += 30;
        }    
    }
}

