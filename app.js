//---------------Search Area Functional
const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
searchBtn.addEventListener('click', function () {
    let searchInput = document.getElementById('search-input').value.trim();

    //---------------API Call according to Search Box
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.meals) {

                //--------------Meal Listing using ForEach Loop             
                data.meals.forEach(meal => {
                    html += `
                    <div class = "mealItem" data-id = "${meal.idMeal}" onclick="displayMealDetails('${meal.idMeal}')">
                        <div class = "mealImg">
                            <img src = "${meal.strMealThumb}" alt="food">
                        </div>
                        <div class = "mealName">
                            <h3>${meal.strMeal}</h3>
                        </div>
                    </div>
                `;
                });
                //--------------Error Message Provide Condition            
                mealList.classList.remove('notFound');
            } else {
                html = "Sorry! This food is not our list";
                mealList.classList.add('notFound');
            }
            mealList.innerHTML = html;
        });
})
//-----------Show strIngredient Area 
function displayMealDetails(id) {
    // console.log(id);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => showDetails(data.meals[0]))
}
function showDetails(meal) {
    const value = Object.values(meal);
    const ul = document.getElementById('users-container');

    //--------This Logic is not working when i use forEach.
    for (let i = 9; i < 18; i++) {
        if (value[i] === 'null' || value[i] === "") {
            break;
        }
        // else {
        //     console.log(value[i])
        // }
    }
    ul.innerHTML = `
        <img src=${meal.strMealThumb} alt="Food">
        <h3 class="shift-item">${meal.strMeal}</h3>
        <h4 class="align-item">Meal Ingredient:-</h4>
        <ul class="align-item">
            <li>${meal.strIngredient1}</li>
            <li>${meal.strIngredient2}</li>
            <li>${meal.strIngredient3}</li>
            <li>${meal.strIngredient4}</li>
            <li>${meal.strIngredient5}</li>
            <li>${meal.strIngredient6}</li>
            <li>${meal.strIngredient7}</li>
            <li>${meal.strIngredient8}</li>
            <li>${meal.strIngredient9}</li>
            <li>${meal.strIngredient10}</li> 
        </ul>    
    `
}