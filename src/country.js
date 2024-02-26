"use strict";

let countryWrapper = $(".country__card-wrapper");

let country_name = localStorage.getItem("data-country");

const body = $("body");
const header = $("header");
const darkModeBtn = $(".dark-btn");
const backMainFile = $(".main-file");
const borderCountry = $(".borderCountry");

let title = $("title");
let icon = $("#icon");

let URL = "https://restcountries.com/v2";

// ----------------- fetching data --------------------

async function fetchCountry(URL, name) {
  try {
    let response = await fetch(`${URL}/name/${name}?fullText=true`);
    let result = await response.json();

    console.log(result);
    renderCountry(result[0]);
  } catch (e) {
    console.log(e);
  }
}

fetchCountry(URL, country_name);

// -------------------- rendering data----------------------

function renderCountry(el) {
  title.innerHTML = `${el.name}`;
  icon.setAttribute("href", `${el.flags.svg}`);
  countryWrapper.innerHTML = `
   <div class="country__card flex gap-[120px] items-center">
       <div class="country__card--img">
            <img src="${el.flags.png}" alt="img" class='w-[500px] h-[350px] rounded-[6px] border-[1px] border-silver'>
        </div>
      <div class="country__card--title">
         <h1 class="font-extrabold text-[32px] mb-[20px]">${el.name}</h1>
         <div class="country__card--title-list flex gap-[141px] mb-[68px]">
             <ul>
                <li class="mb-1"><strong>Native Name:</strong> ${el.nativeName}</li>
                <li class="mb-1"><strong>Population:</strong> ${el.population}</li>
                <li class="mb-1"><strong>Region:</strong> ${el.region}</li>
                <li class="mb-1"><strong>Sub Region:</strong> ${el.subregion}</li>
                <li><strong>Capital:</strong> ${el.capital}</li>
            </ul>
            <ul>
                <li class="mb-1"><strong>Top Level Domain:</strong> ${el.topLevelDomain}</li>
                <li class="mb-1"><strong>Currencies:</strong> ${el.currencies[0].name}</li>
                <li><strong>Languages:</strong> ${el.languages[0]?.nativeName}</li>
            </ul>
        </div>
        <div class="country__card--title-btn flex gap-[15px] items-center">
            <strong>Border Countries: </strong>
            <p class="country__card--title-bottom flex gap-[10px]">
                  <span class="borderCountry py-[5px] px-[28px] cursor-pointer">${el.borders[0]}</span>
                  <span class="borderCountry py-[5px] px-[20px] cursor-pointer">${el.borders[1]}</span>
                  <span class="borderCountry py-[5px] px-[20px] cursor-pointer">${el.borders[2]}</span>
            </p>
        </div>
    </div>
</div>
       `;
}

// ------------------------------- Dark Mode ------------------------------------

function darkMode() {
  body.classList.toggle("dark-mode");
  header.classList.toggle("dark-mode");
  backMainFile.classList.toggle("dark-mode");
  borderCountry.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    darkModeBtn.innerHTML = '<i class="bi bi-sun text-xl"></i>';
    localStorage.setItem("dark-mode", true);
  } else {
    localStorage.setItem("dark-mode", false);
    darkModeBtn.innerHTML = '<i class="bi bi-moon"></i>';
  }
}

darkModeBtn.addEventListener("click", () => {
  darkMode();
});

// ----------------- Refresh paytidagi dark mode ---------------------

function dark() {
  let isDark = localStorage.getItem("dark-mode");

  if (isDark == "true") {
    body.classList.add("dark-mode");
    header.classList.add("dark-mode");
    backMainFile.classList.add("dark-mode");
    borderCountry.classList.add("dark-mode");


    darkModeBtn.innerHTML = '<i class = "bi bi-sun text-xl"></i>';
  } else {
    body.classList.remove("dark-mode");
    header.classList.remove("dark-mode");
    backMainFile.classList.remove("dark-mode");
    borderCountry.classList.remove("dark-mode");

    darkModeBtn.innerHTML = '<i class="bi bi-moon"></i>';
  }
}

dark();