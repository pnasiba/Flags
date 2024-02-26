"use strict";

let flagsWrapper = $(".flags__wrapper");
let inputSearch = $("#search");
let regionsFilter = $("#region");

const body = $("body");
const header2 = $("header");
const tagh1 = $(".title");
const darkModeBtn = $(".dark-btn");

let cards = $$('.card')

let flagsDataUrl = "https://restcountries.com/v2";

// ------------------------ GetFlags Function and Normalize ---------------------------

const getFlags = async (reqURL) => {
  flagsWrapper.innerHTML = "<span class='loader mx-auto mt-32'></span>";
  try {
    const response = await fetch(`${flagsDataUrl}/all`);
    if (response.status === 200) {
      const result = await response.json();
      flagsWrapper.innerHTML = "";
      renderData(result);
    }
  } catch (err) {
    flagsWrapper.innerHTML = `<h1 class="text-red-600 text-3xl">${err.message}</h1>`;
  }
};

getFlags(flagsDataUrl);

// ----------------------------- Render Data -----------------------------------

function renderData(data) {
  if (data.length) {
    data.forEach((el) => {
      const card = createElement(
        "div",
        "card w-[261px] rounded-md cursor-pointer",
        ` 
        <img src="${el.flag}" alt="${
          el.name
        }" class="h-[170px] w-full object-cover rounded-tr-md rounded-tl-md">
             <div class="flags-title pt-[24px] pl-[24px] pb-[46px] rounded-bl-[5px] rounded-br-[5px] h-[200px]">
                 <h3 class="mb-[16px] text-[18px] font-extrabold text-[#111517]">${
                   el.name.length > 26
                     ? el.name.substring(0, 20) + "..."
                     : el.name
                 }</h3>
                 <p class="mb-[2px]"><strong>Population:</strong> ${
                   el.population
                 }</p>
                 <p class="mb-[2px]"><strong>Region:</strong> ${el.region}</p>
                 <p><strong>Capital:</strong> ${el.capital}</p>
                 <p><strong>Area:</strong> ${el.area}</p>
             </div>
        `
      );
      card.dataset.country = el.name
      flagsWrapper.appendChild(card);
    });
  } else {
    flagsWrapper.innerHTML = "<h1 class='text-4xl font-bold text-red-500 mx-auto relative top-40'>NOT FOUND</h1>";
  }
}

// ------------------------------- Dark Mode ------------------------------------

function darkMode() {
  body.classList.toggle("dark-mode");
  header2.classList.toggle("dark-mode");

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
    header2.classList.add("dark-mode");

    darkModeBtn.innerHTML = ' <i class = "bi bi-sun text-xl"></i>';
  } else {
    body.classList.remove("dark-mode");
    header2.classList.remove("dark-mode");

    darkModeBtn.innerHTML = '<i class="bi bi-moon"></i>';
  }
}

dark();

// ----------------- Search Country---------------------
async function searchCountries(searchTerm) {
  flagsWrapper.innerHTML = "<span class='loader mx-auto mt-32'></span>";
  try {
    const response = await fetch(`${flagsDataUrl}/name/${searchTerm}`);
    const result = await response.json();
    flagsWrapper.innerHTML = "";
    renderData(result);
  } catch (e) {
    flagsWrapper.innerHTML = `<h1>${e.message}</h1>`;
  }
}

inputSearch.addEventListener("keyup", (e) => {
  if (e.keyCode == 13 && e.target.value.trim().length) {
    searchCountries(e.target.value.trim().toLowerCase());
  }
});

// --------------Filter Region ---------------------
async function filterRegions(filterEl) {
  try {
    const response = await fetch(`${flagsDataUrl}/region/${filterEl}`);
    const result = await response.json();
    flagsWrapper.innerHTML = "";
    renderData(result);
  } catch (e) {
    flagsWrapper.innerHTML = `<h1>${e.message}</h1>`;
  }
}

regionsFilter.addEventListener("change", (e) => {
  filterRegions(e.target.value.trim());
});


flagsWrapper.addEventListener('click', (e)=>{
  if (
    e.target.parentNode.classList.contains("card") ||
    e.target.parentNode.classList.contains("flags-title")
  ) {
    console.log(e.target);
    let data = e.target.parentNode.getAttribute("data-country");
    localStorage.setItem("data-country", data);

    if(localStorage.getItem('data-country')){
      window.location.href = './country.html'
    }
  }
})