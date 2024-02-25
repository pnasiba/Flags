```
"use strict";

let flagsWrapper = $(".flags__wrapper");
let body = $("body");
let header = $("header");

const darkModeBtn = $(".dark-btn");

let flagsDataUrl = "https://restcountries.com/v2/all";

// -------------- GetFlags Function and Normalize --------

function getFlags(reqURL) {
  flagsWrapper.innerHTML =
    "<h1 class='text-4xl font-bold text-red-500'>LOADING ......</h1>";
  fetch(reqURL)
    .then((response) => response.json())
    .then((result) => {
      const allFlags = result.map((el) => {
        return {
          image: el.flags.png,
          name: el.name,
          population: el.population,
          region: el.region,
          capital: el.capital,
          area: el.area,
        };
      });
      renderData(allFlags);
    })
    .catch((err) => console.log(err))
    .finally(() => console.log("done"));
}

getFlags(flagsDataUrl);

// ----------------------------- Render Data -----------------------------------

function renderData(data) {
  if (data.length) {
    flagsWrapper.innerHTML = "";
    data.forEach((el) => {
      const card = createElement(
        "div",
        "card",
        ` 
        <img src="${el.image}" alt="">
             <div class="flags-title pt-[24px] pl-[24px] pb-[46px]">
                 <h3 class="mb-[16px] text-[18px] font-extrabold text-[#111517]">${el.name.length>26?el.name.substring(0, 24) + '...' : el.name}</h3>
                 <p class="mb-[2px]">Population: ${el.population}</p>
                 <p class="mb-[2px]">Region: ${el.region}</p>
                 <p>Capital: ${el.capital}</p>
                 <p>Area: ${el.area}</p>
             </div>
        `
      );
      flagsWrapper.appendChild(card);
    });
  }
}

// ------------------------------- Dark Mode ------------------------------------

// function darkMode() {
//   body.classList.toggle("dark-mode");
//   header.classList.toggle("dark-mode");
//   flagsTitle.classList.toggle("dark-mode");

//     formInput.forEach((el) => {
//       el.classList.toggle("dark-mode");
//     });

//   //   select.classList.toggle("dark-mode");

//   if (body.classList.contains("dark-mode")) {
//     darkModeBtn.innerHTML = ' <i class = "bi bi-sun text-xl"></i>';
//     localStorage.setItem("dark-mode", true);
//   } else {
//     localStorage.setItem("dark-mode", false);
//     darkModeBtn.innerHTML = '<i class="bi bi-moon"></i>';
//   }
// }

// darkModeBtn.addEventListener("click", () => {
//   darkMode();
// });

// ----------------- Refresh paytidagi dark mode ---------------------

// function dark() {
//   let isDark = localStorage.getItem("dark-mode");

//   if (isDark == "true") {
//     body.classList.add("dark-mode");
//     header.classList.add("dark-mode");
//     flagsTitle.classList.toggle("dark-mode");

//     formInput.forEach((el) => {
//       el.classList.add("dark-mode");
//     });

//     // select.classList.add("dark-mode");
//     darkModeBtn.innerHTML = ' <i class = "bi bi-sun text-xl"></i>';
//   } else {
//     body.classList.remove("dark-mode");
//     header.classList.remove("dark-mode");
//     flagsTitle.classList.toggle("dark-mode");

//     // input.forEach((el) => {
//     //   el.classList.remove("dark-mode");
//     // });

//     // select.classList.remove("dark-mode");
//     darkModeBtn.innerHTML = '<i class="bi bi-moon"></i>';
//   }
// }

// dark();
```