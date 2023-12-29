//collecting the items for budget
const budget = document.getElementById("budget");
const category = document.getElementById("category")
const addEntryButton = document.getElementById("add-entry")
const calculateCalories = document.getElementById("calculateCalories")


function addEntry(event) {
    event.preventDefault()
    const categoryDiv = document.querySelector(`#${category.value}`)
    const categoryTextInputs = document.querySelectorAll(`#${category.value} input[type = text]`)
    const categoryTextInputsLength = categoryTextInputs.length + 1
    const categoryHTML = `
        <p>Entry ${categoryTextInputsLength } Name</p>
        <input type = "text" id = "${category.value}-${categoryTextInputsLength}-name" placeholder= "Name">
        
        <p>Entry ${categoryTextInputsLength } Calorie</p>
        <input type = "number" id = "${category.value}-${categoryTextInputsLength}-calorie" min="0" class="calorie" placeholder= "Calorie">
        <br><br>
    `
    categoryDiv.insertAdjacentHTML("beforeend", categoryHTML)
    console.log(categoryTextInputs);
}
function collectCalorieData (items) {
    items = Array.from(items)
    let calories = 0
    for (let i = 0; i < items.length; i++) {
        const element = items[i];
        calories += element.value
    }
    return calories
}
function calculateCalorie(e)
{
    e.preventDefault()
    const breakFastInput = collectCalorieData(document.querySelectorAll("#breakfast input[type=number]"))
    const lunchInput = collectCalorieData(document.querySelectorAll("#lunch input[type=number]"))
    const dinnerInput = collectCalorieData(document.querySelectorAll("#dinner input[type=number]"))
    const snacksInput = collectCalorieData(document.querySelectorAll("#snacks input[type=number]"))
    const exerciseInput = collectCalorieData(document.querySelectorAll("#exercise input[type=number]"))

    console.log(breakFastInput);
}
addEntryButton.addEventListener("click", addEntry)
calculateCalories.addEventListener("submit", calculateCalorie)
