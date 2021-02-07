//---------------Search Area Functional
    const searchBtn = document.getElementById('search-btn');
    const mealList = document.getElementById('meal');
    searchBtn.addEventListener('click', function(){
        let searchInput = document.getElementById('search-input').value.trim();

//---------------API Call according to Search Box
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){

//--------------Meal Listing using ForEach Loop             
            data.meals.forEach(meal => {
                html += `
                    <div class = "mealItem" data-id = "${meal.idMeal}">
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
        } else{
            html = "Sorry! This food is not our list";
            mealList.classList.add('notFound');
        }
        mealList.innerHTML = html;
    });
})
