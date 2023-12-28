const calorieCounter = document.getElementById("calorie-counter")
const budgetNumberInput = document.getElementById("budget")
const entryDropdown = document.getElementById("entry-dropdown")
const addEntryButton = document.getElementById("add-entry")
const clearButton = document.getElementById("clear")
const output = document.getElementById("output")
let isError = false

// Although inputs fields are number types, javascript receives them as strings
// hence the need to convert them to numbers
function cleanInputString(str) {
    const regex = /[+-\s]/g;
    return str.replace(regex, '');
}
// exponential "e" is also allowed in HTML number input, hence this function
function isInvalidInput(str) {
    const regex = /\d+e\d+/i;
    return str.match(regex);
}
function addEntry() {
    //This code dynamically picks the html element based of the category selected
    const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);

    //Inside the t
    const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length;
    const HTMLString = `
    <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
    <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />
    <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
    <input
      type="number"
      min="0"
      id="${entryDropdown.value}-${entryNumber}-calories"
      placeholder="Calories"
    />`;
    targetInputContainer.innerHTML += HTMLString;
}
addEntryButton.addEventListener('click', addEntry)