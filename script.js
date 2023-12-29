//collecting the items for budget
const budget = document.getElementById("budget");
const category = document.getElementById("category")
const addEntryButton = document.getElementById("add-entry")


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
function collectCalorieData () {
    
}
addEntryButton.addEventListener("click", addEntry)
