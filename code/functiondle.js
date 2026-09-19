let inputBox = document.getElementById("inputBox");
const recordBox = document.getElementById("recordBox");

const MAXINPUT = 9999999999;
const MININPUT = 0;
const GOALNUMBER = 24;

function MysteryFunction(input){
    return parseInt(input) + 1;
}

function NewInput(input){
    inputBox.value = "";
    let output = MysteryFunction(input);
    recordBox.textContent += input + ' \u2192 ' + output + '\r\n';
    if (output == GOALNUMBER){
        window.alert("You win!")
    }
}

window.addEventListener("keydown", function(event){
	if (event.key === "Enter"){
        let input = inputBox.value;
        if (input >= MININPUT){
            if (input <= MAXINPUT){
                NewInput(input);
            } else {
                this.alert("Maximum input is " + MAXINPUT)
            };
        } else {
            this.alert("Minimum input is " + MININPUT);
        };
        console.log(input);
    }
})