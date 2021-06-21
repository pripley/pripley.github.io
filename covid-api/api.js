const baseURL = "https://api.covid19api.com/summary";

fetch(baseURL)
.then((response) => response.json())
.then((json) => {
    let countries = json.Countries;

    const searchData = document.querySelector("form");
    const selectItems = document.querySelector("select");

    // Populates countries in dropdown
    for (let c of countries) {
      let selectItem = document.createElement("option");
      selectItem.innerText = c.Country;
      selectItems.appendChild(selectItem);
    }

    // Displays data for selected country
    searchData.addEventListener("submit", function (e) {
      e.preventDefault();

      let selectedItem = selectItems.selectedIndex;
      selectedItem--;

      let country = document.getElementById('country') 
      let newConfirmed = document.getElementById('new-confirmed');
      let totalConfirmed = document.getElementById('total-confirmed');
      let newDeaths = document.getElementById('new-deaths');
      let totalDeaths = document.getElementById('total-deaths');
      let newRecovered = document.getElementById('new-recovered');
      let totalRecovered = document.getElementById('total-recovered');

      country.innerText = countries[selectedItem].Country
      newConfirmed.innerText = `Newly confirmed cases:  ${countries[selectedItem].NewConfirmed}`;
      totalConfirmed.innerText = `Total confirmed cases:  ${countries[selectedItem].TotalConfirmed}`;
      newDeaths.innerText = `New deaths:  ${countries[selectedItem].NewDeaths}`;
      totalDeaths.innerText = `Total deaths:  ${countries[selectedItem].TotalDeaths}`;
      newRecovered.innerText = `Newly recovered:  ${countries[selectedItem].NewRecovered}`;
      totalRecovered.innerText = `Total recovered:  ${countries[selectedItem].TotalRecovered}`;
    });
  });
