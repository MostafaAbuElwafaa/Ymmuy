let userName;
let userEmail;
let userPhone;
let userAge;
let userPassword;
let userRePassword;
let userNameAlert;
let userEmailAlert;
let userPhoneAlert;
let userAgeAlert;
let userpasswordAlert;
let userRepasswordAlert;


search("").then(function () {
    $(".loading-screen").fadeOut(500, function () {
        $("body").css("overflow", "visible")
    })
})
var isTrue = 0;
$(".strip-toggel-menu").click(function () {
    isTrue ? ($(".nav-tab-menu").addClass("open-menu").removeClass("close-menu"), nvWidth = $(".nav-tab-menu").width() - 10, $(".strip-header-nav").css("left", nvWidth), $(".fa-align-justify").toggleClass("fa-times"), $(".nav-tab-menu .item1").animate({
        opacity: "1",
        paddingTop: "25px"
    }, 1100), $(".nav-tab-menu .item2").animate({
        opacity: "1",
        paddingTop: "25px"
    }, 1200), $(".nav-tab-menu .item3").animate({
        opacity: "1",
        paddingTop: "25px"
    }, 1300), $(".nav-tab-menu .item4").animate({
        opacity: "1",
        paddingTop: "25px"
    }, 1400), $(".nav-tab-menu .item5").animate({
        opacity: "1",
        paddingTop: "25px"
    }, 1500), $(".nav-tab-menu .item6").animate({
        opacity: "1",
        paddingTop: "25px"
    }, 1600), isTrue = !isTrue) : ($(".nav-tab-menu").addClass("close-menu").removeClass("open-menu"), $(".fa-align-justify").toggleClass("fa-times"), $(".strip-header-nav").css("left", 0), $(".nav-tab-menu li").animate({
        opacity: "0",
        paddingTop: "500px"
    }, 500), isTrue = !isTrue)
});
var isSearchTrue = 0;
$(".strip-search").click(function () {
    isSearchTrue ? ($(".search").addClass("open-menu").removeClass("close-search"), $(".fa-search").toggleClass("fa-times"), $(".search-input").animate({
        top: "49%"
    }, 1500, function () {
        $(".search-input").animate({
            top: "50%"
        }, 250)
    }), isSearchTrue = isSearchTrue) : ($(".search").addClass("close-search").removeClass("open-menu"), $(".fa-search").toggleClass("fa-times"), $(".search-input").animate({
        top: "300%"
    }), isSearchTrue = isSearchTrue)
});
var row = document.getElementById("rowData");
// اشتغل//
async function search(e) {
    $(".loading-container").fadeIn(100)
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${e}`)
    meals = await meals.json()
    displayMeals(meals.meals)
    console.log(search());
    $(".loading-container").fadeOut(400)
    return meals
}
function displayCategories() {
    let e = ""
    for (var i = 0; i < arr.length; i++) e += `
    <div class="col-md-6 col-lg-3 my-3 myM shadow">
        <div class="movie shadow rounded position-relative">
            <div onclick="filterByCategory('${arr[i].strCategory}')" class="post">
                <img src='${arr[i].strCategoryThumb}' class="w-100 rounded" />
                <div class="layer d-flex align-items-center ">
                    <div class="info p-2">
                        <h2>${arr[i].strCategory}</h2>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    row.innerHTML = e
    $("html, body").animate({
        scrollTop: 0
    }, 200)
}
function displayMeals(arr) {

    let meals = ""
    for (let i = 0; i < arr.length; i++) {
        meals += `
        <div class="col-md-6 col-lg-3 my-3 myM  shadow">
            <div onclick="getMeal('${arr[i].idMeal}')" class="movie shadow rounded position-relative">
                <div class="post ">
                    <img src='${arr[i].strMealThumb}' class="w-100 rounded" />
                    <div class="layer d-flex align-items-center ">
                        <div class="info p-2">
                            <h2>${arr[i].strMeal}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    }
    row.innerHTML = meals
    $("html, body").animate({
        scrollTop: 0
    }, 200)
}
// اشتغل//
async function getMeal(mealID) {
    $(".loading-container").fadeIn(100)
    let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    meal = await meal.json()
    displayMeal(meal.meals[0])
    $(".loading-container").fadeOut(500)
}
function displayMeal(meal) {
    let recipes = ""
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            recipes += `<li class="my-3 mx-1 p-1 alert-success rounded">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }
    let tags = meal.strTags?.split(",")
    let tagsStr = ""
    for (let i = 0; i < tags?.length; i++) {
        tagsStr += `<li class="my-3 mx-1 p-1 alert-danger rounded">${tags[i]}</li>`
    }
    let str = `
    <div class="col-md-4 myM text-white">
					<img class="w-100" src="${meal.strMealThumb}" alt=""
						srcset=""><br>
					<h1>${meal.strMeal}</h1>
				</div>
				<div class="col-md-8 myM text-white text-left">
					<h2>Instructions</h2>
					<p>${meal.strInstructions}</p>
					<p><b class="fw-bolder">Area :</b> ${meal.strArea}</p>
					<p><b class="fw-bolder">Category :</b> ${meal.strCategory}</p>
					<h3>Recipes :</h3>
					<ul class="d-flex " id="recipes">
					</ul>
					<h3 class="my-2 mx-1 p-1">Tags :</h3>
					<ul class="d-flex " id="tags">
					</ul>
					<a class="btn btn-success text-white" target="_blank" href="${meal.strSource}">Source</a>
					<a class="btn youtube text-white" target="_blank" href="${meal.strYoutube}">Youtub</a>
				</div>`
    row.innerHTML = str
    document.getElementById("recipes").innerHTML = recipes
    document.getElementById("tags").innerHTML = tagsStr
    $("html, body").animate({
        scrollTop: 0
    }, 200)
}
$(".nav-item a").click(async (e) => {
    let listBy = e.target.getAttribute("data-list")
    document.getElementById("search-container").innerHTML = ""
    row.innerHTML = ""
    $("html, body").animate({
        scrollTop: 0
    }, 200)
    if (listBy == "contact") {
        row.innerHTML = `
        <section id="contact" class="container myM w-75 mx-auto mb-5 ">
		<div class="p-2">
			<h2 class="text-light mb-5">ContacUs...</h2>
			<div class="row">
				<div class="col-md-6">
					<div class="form-group">
						<input class="form-control shadow " onkeyup="validation()" id="name"
							placeholder="Enter Your Name">
						<div class="alert mt-1 alert-danger d-none" id="namealert" role="alert">
							Special Characters and Numbers not allowed
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" id="email" placeholder="Enter Email">
						<div class="alert mt-1 alert-danger d-none" id="emailalert" role="alert">
							Enter valid email. *Ex: xxx@yyy.zzz
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" id="phone" placeholder="Enter phone">
						<div class="alert mt-1 alert-danger  d-none" id="phonealert" role="alert">
							Enter valid Phone Number
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" id="age" placeholder="Enter Age">
						<div class="alert mt-1 alert-danger  d-none" id="agealert" role="alert">
							Enter valid Age
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" type="password" id="password"
							placeholder="Enter Password">
						<div class="alert mt-1 alert-danger  d-none" id="passwordalert" role="alert">
							Enter valid password *Minimum eight characters, at least one letter and one number:*
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" type="password" id="rePassword"
							placeholder="Enter RePassword">
						<div class="alert mt-1 alert-danger  d-none" id="repasswordalert" role="alert">
							Enter valid Repassword
						</div>
					</div>
				</div>
			</div>
			<button type="submit" disabled id="submitBtn" class="btn btn-outline-danger">Submit</button>
		</div>
	</section>`
        userName.addEventListener("focus", function () {
            nameToached = true
        })
        userEmail.addEventListener("focus", function () {
            emailToached = true
        })
        userPhone.addEventListener("focus", function () {
            phoneToached = true
        })
        userAge.addEventListener("focus", function () {
            ageToached = true
        })
        userPassword.addEventListener("focus", function () {
            passwordToached = true
        })
        userRePassword.addEventListener("focus", function () {
            repasswordToached = true
        })
    }
    if (listBy == "search") {
        row.innerHTML = ""
        document.getElementById("search-container").innerHTML = `
        <div class="row">
				<div class="col-md-6"><input id="searchInput" class="form-control mb-2 " placeholder="Search By Name">
				</div>
				<div class="col-md-6">
					<input class="form-control " type="text" maxlength="1" id="letter"
						placeholder="search By First Letter...">
				</div>

			</div>`
        $("#searchInput").keyup((e) => {
            search(e.target.value)
        })
        $("#letter").keyup((e) => {
            (e.target.value)
        })
        $('#letter').on("input", function () {
            if (this.value.length > 1)
                this.value = this.value.slice(0, 1);
        });
    }
    let click_event = new CustomEvent('click');
    document.querySelector('.strip-toggel-menu').dispatchEvent(click_event);
    let x;
    if (listBy == "categories") {
        $(".loading-container").fadeIn(100)
        x = await (listBy + ".php")
        arr = x.categories.splice(0, 20);
        displayCategories()
        $(".loading-container").fadeOut(500)
    } else if (listBy == "a") {
        $(".loading-container").fadeIn(100)
        x = await ("list.php?a=list")
        arr = x.meals.splice(0, 20);
        
        $(".loading-container").fadeOut(500)
    } else if (listBy == "i") {
        $(".loading-container").fadeIn(100)
        x = await ("list.php?i=list")
        arr = x.meals.splice(0, 20);
        
        $(".loading-container").fadeOut(500)
    }
})
function validation() {
    if (nameToached) {
        if (userNameValid()) {
            userName.classList.remove("is-invalid")
            userName.classList.add("is-valid")
            userNameAlert.classList.replace("d-block", "d-none")
            userNameAlert.classList.replace("d-block", "d-none")

        } else {
            userName.classList.replace("is-valid", "is-invalid")
            userNameAlert.classList.replace("d-none", "d-block")
        }
    }
    if (emailToached) {
        if (userEmailValid()) {
            userEmail.classList.remove("is-invalid")
            userEmail.classList.add("is-valid")
            userEmailAlert.classList.replace("d-block", "d-none")
            userEmailAlert.classList.replace("d-block", "d-none")
        } else {
            userEmail.classList.replace("is-valid", "is-invalid")
            userEmailAlert.classList.replace("d-none", "d-block")
        }
    }
    if (phoneToached) {
        if (userPhoneValid()) {
            userPhone.classList.remove("is-invalid")
            userPhone.classList.add("is-valid")
            userPhoneAlert.classList.replace("d-block", "d-none")
            userPhoneAlert.classList.replace("d-block", "d-none")
        } else {
            userPhone.classList.replace("is-valid", "is-invalid")
            userPhoneAlert.classList.replace("d-none", "d-block")
        }
    }
    if (ageToached) {
        if (userAgeValid()) {
            userAge.classList.remove("is-invalid")
            userAge.classList.add("is-valid")
            userAgeAlert.classList.replace("d-block", "d-none")
            userAgeAlert.classList.replace("d-block", "d-none")
        } else {
            userAge.classList.replace("is-valid", "is-invalid")
            userAgeAlert.classList.replace("d-none", "d-block")
        }
    }
    if (passwordToached) {
        if (userPasswordValid()) {
            userPassword.classList.remove("is-invalid")
            userPassword.classList.add("is-valid")
            userpasswordAlert.classList.replace("d-block", "d-none")
            userpasswordAlert.classList.replace("d-block", "d-none")
        } else {
            userPassword.classList.replace("is-valid", "is-invalid")
            userpasswordAlert.classList.replace("d-none", "d-block")
        }
    }
    if (repasswordToached) {
        if (userRePasswordValid()) {
            userRePassword.classList.remove("is-invalid")
            userRePassword.classList.add("is-valid")
            userRepasswordAlert.classList.replace("d-block", "d-none")
            userRepasswordAlert.classList.replace("d-block", "d-none")
        } else {
            userRePassword.classList.replace("is-valid", "is-invalid")
            userRepasswordAlert.classList.replace("d-none", "d-block")
        }
    }
    if (userNameValid() && userEmailValid() && userPhoneValid() && userAgeValid() && userPasswordValid() && userRePasswordValid()) {
        document.getElementById("submitBtn").removeAttribute("disabled")
    } else {
        document.getElementById("submitBtn").setAttribute("disabled", "true")
    }
}