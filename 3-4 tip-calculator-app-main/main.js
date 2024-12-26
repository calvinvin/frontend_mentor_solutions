const formSplitter = document.getElementById("splitter");
const formSplitterInputs = formSplitter.querySelectorAll("input");
const billInput = document.getElementById("bill");
const peopleInput = document.getElementById("number-of-people");
const tipInputs = formSplitter.querySelectorAll("input[name='tip']");
const tipRadioInputs = Array.from(tipInputs).filter(input=>input.type==='radio');
const tipCustomInput = Array.from(tipInputs).filter(input=>input.type==='number')[0];
const outputTipAmount = document.getElementById("tip-amount");
const outputTotal = document.getElementById("total");

function clearTipCustomInput() {
    tipCustomInput.value = "";
}
function clearCheckedRadioInputs() {
    tipRadioInputs.forEach( RadioInput => RadioInput.checked = false );
}
function clearOutputs() {
    outputTipAmount.textContent = "$0.00";    
    outputTotal.textContent = "$0.00";
}
function calculateOutput() {
    let bill = Number(billInput.value);
    let people = Number(peopleInput.value);
    let tip = Number(formSplitter.elements.tip.value || tipCustomInput.value);
    if ( bill === 0 || people === 0 ) {
        clearOutputs();
        return;
    }
    let tipAmount = ( tip === 0 ) ? 0 : bill * tip * 0.01 / people;
    let totalAmount = ( bill + bill * tip * 0.01 ) / people;
    tipAmount = tipAmount.toFixed(2);
    totalAmount = totalAmount.toFixed(2);
    outputTipAmount.textContent = `$${tipAmount}`;
    outputTotal.textContent = `$${totalAmount}`;
}

tipRadioInputs.forEach(
    tipRadioInput => tipRadioInput.addEventListener(
        "click", clearTipCustomInput
    )
);
tipCustomInput.addEventListener(
    "click", clearCheckedRadioInputs
);
formSplitter.addEventListener(
    "reset", clearOutputs
);
formSplitterInputs.forEach(
    input => input.addEventListener('input', calculateOutput)
);