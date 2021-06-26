const baseURL = "https://api.covid19api.com/summary";

fetch(baseURL)
.then(response => response.json())
.then(json => {
    let countries = json.Countries;

    const searchData = document.querySelector('form');
    const selectItems = document.querySelector('select');
    const results = document.getElementById('results')

    // Populates countries in dropdown
    for (let c of countries) {
      let selectItem = document.createElement("option");
      selectItem.innerText = c.Country;
      selectItems.appendChild(selectItem);
    }

    // Displays data for selected country
    searchData.addEventListener("submit", function (e) {
      e.preventDefault();

      while (results.firstChild) { 
        results.removeChild(results.firstChild); 
      }

      let selectedItem = selectItems.selectedIndex;
      selectedItem--;

      let country = document.createElement('h2') 
      let newConfirmed = document.createElement('p');
      let totalConfirmed = document.createElement('p');
      let newDeaths = document.createElement('p');
      let totalDeaths = document.createElement('p');
      let newRecovered = document.createElement('p');
      let totalRecovered = document.createElement('p');

      country.innerText = countries[selectedItem].Country
      newConfirmed.innerText = `Newly confirmed cases:  ${countries[selectedItem].NewConfirmed}`;
      totalConfirmed.innerText = `Total confirmed cases:  ${countries[selectedItem].TotalConfirmed}`;
      newDeaths.innerText = `New deaths:  ${countries[selectedItem].NewDeaths}`;
      totalDeaths.innerText = `Total deaths:  ${countries[selectedItem].TotalDeaths}`;
      newRecovered.innerText = `Newly recovered:  ${countries[selectedItem].NewRecovered}`;
      totalRecovered.innerText = `Total recovered:  ${countries[selectedItem].TotalRecovered}`;

      results.appendChild(country)
      results.appendChild(newConfirmed)
      results.appendChild(totalConfirmed)
      results.appendChild(newDeaths)
      results.appendChild(totalDeaths)
      results.appendChild(newRecovered)
      results.appendChild(totalRecovered)

    });
  });
