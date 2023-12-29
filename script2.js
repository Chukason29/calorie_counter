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
function addEntry(event) {
    // This code makes the form not to reload
    event.preventDefault()

    //This code dynamically picks the html element based of the category selected
    const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);

    //Inside the t
    const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1;

    //Using html literal to hold html values
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
    targetInputContainer.insertAdjacentHTML("beforeend", HTMLString);
}

//This function dynamically gets inputs from custom fields
function getCaloriesFromInputs(list) {
    let calories = 0;
    
    for (let i = 0; i < list.length; i++) {

        //cleaning the number input
        const currVal = cleanInputString(list[i].value);

        //checking if input is valid
        let invalidInputMatch = isInvalidInput(currVal)
        if (invalidInputMatch) {
            isError = true
            return null
        }
        calories += Number(currVal)
    }
    return calories
}


//This function collects the value of input by category
function calculateCalories(e) {
    e.preventDefault();
    isError = false;
    
    //These variables collects all number inputs from each category as NodeList
    const breakfastNumberInputs = document.querySelectorAll('#breakfast input[type=number]');
    const lunchNumberInputs = document.querySelectorAll('#lunch input[type=number]');
    const dinnerNumberInputs = document.querySelectorAll('#dinner input[type=number]');
    const snacksNumberInputs = document.querySelectorAll('#snacks input[type=number]');
    const exerciseNumberInputs = document.querySelectorAll('#exercise input[type=number]');
    
    //These variables collects the calculated calories from each category
    const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs)
    const lunchCalories = getCaloriesFromInputs(lunchNumberInputs)
    const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs)
    const snacksCalories = getCaloriesFromInputs(snacksNumberInputs)
    const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs)

    // collects the original budget 
    const budgetCalories = getCaloriesFromInputs([budgetNumberInput])

    if (isError){
        return
    }
    // collects the consumed calorie of breakfast, lunch, dinner and snacks
    const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories

    const remainingCalories = budgetCalories - consumedCalories + exerciseCalories;
    const surplusOrDeficit = remainingCalories >= 0 ? 'Surplus' : 'Deficit';
    output.innerHTML = `
    <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}</span>
    <hr>
    <p>${budgetCalories} Calories Budgeted</p>
    <p>${consumedCalories} Calories Consumed</p>
    <p>${exerciseCalories} Calories Burned</p>
    `;

    output.classList.remove('hide');
  
  }
  //This function clears the input fields created in each category
  function clearForm() {
    // inputContainers return a NodeList when queried with querySelectorAll
    // a nodeList looks like an array but not a array.to convert is to a proper
    // array we the use the Array.from()
    const inputContainers = Array.from(document.querySelectorAll('.input-container'))
  }
addEntryButton.addEventListener('click', addEntry)
calorieCounter.addEventListener('submit', calculateCalories)