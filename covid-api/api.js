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

      newConfirmed.innerHTML = `Newly confirmed cases:  <strong>${countries[selectedItem].NewConfirmed}</strong>`;
      totalConfirmed.innerHTML = `Total confirmed cases:  <strong>${countries[selectedItem].TotalConfirmed}</strong>`;
      newDeaths.innerHTML = `New deaths:  <strong>${countries[selectedItem].NewDeaths}</strong>`;
      totalDeaths.innerHTML = `Total deaths:  <strong>${countries[selectedItem].TotalDeaths}</strong>`;
      newRecovered.innerHTML = `Newly recovered:  <strong>${countries[selectedItem].NewRecovered}</strong>`;
      totalRecovered.innerHTML = `Total recovered:  <strong>${countries[selectedItem].TotalRecovered}</strong>`;

      results.appendChild(country)
      results.appendChild(newConfirmed)
      results.appendChild(totalConfirmed)
      results.appendChild(newDeaths)
      results.appendChild(totalDeaths)
      results.appendChild(newRecovered)
      results.appendChild(totalRecovered)

    });
  });
