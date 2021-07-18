const key = "vI9thC2LcJ55LzyNcLXvone2JikDgnpZEiSSk4UM";
let url;

// Banner area
const title = document.getElementById("title");
const landingDate = document.getElementById("landing-date");
const launchDate = document.getElementById("launch-date");

//Sort by Camera Dropdown and Submit
const camera = document.querySelector(".camera");
const submitBtn = document.querySelector(".submit");
const cameraSort = document.getElementById('sort')

cameraSort.style.display = 'none'

//Photos Section
const rovers = document.getElementById('rovers')
const photoWrapper = document.getElementById("photos");

rovers.style.display = 'block'

// Submit for dropdown menu
submitBtn.addEventListener("click", getPhotos);

// Populate dropdown menu with proper camera list for specific rover
function populateMenu(rover) {
  let baseURL = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=100`;
    
  url = `${baseURL}&api_key=${key}`;
  
  camera.value = "All camera views"; // Reset camera value
  
  fetch(url)
    .then(function (result) {
      return result.json();
    })
    .then(function (json) {
      let photos = json.photos;
      let selectViews = document.querySelector("select");
      let options = [];

      while (selectViews.childNodes.length > 2) {
        selectViews.removeChild(selectViews.lastChild);
      }

      photos.forEach((photo) => {
        // Populates camera views in dropdown
        let selectView = document.createElement("option");
        selectView.innerText = photo.camera.full_name;
        selectView.value = photo.camera.name;
        selectViews.appendChild(selectView);

        if (options.includes(selectView.value)) {
          selectViews.removeChild(selectView);
        } else {
          options.push(selectView.value);
        }
      });
    });
  getPhotos();  
}

// Fetches photos based on camera view selection
function getPhotos() {    
  let camVal = camera.value
  
  if (camVal === 'All camera views'){
    newurl = url.replace(`&camera=`, '')  
  } else {
    newurl = url.replace(`&camera=`, '')
    newurl += `&camera=${camVal}`;
  }

  fetch(newurl)
    .then(function (result) {
      return result.json();
    })
    .then(function (json) {
      displayPhotos(json);
    });
}

// Displays photos
function displayPhotos(json) {
  cameraSort.style.display = 'flex'
  rovers.style.display = 'none'
  
  while (photoWrapper.firstChild) {
    photoWrapper.removeChild(photoWrapper.firstChild);
  }
  let photos = json.photos;

  title.innerText = photos[0].rover.name;
  landingDate.innerHTML = `Landing Date: <strong>${photos[0].rover.landing_date}</strong>`
  launchDate.innerHTML = `Launch Date: <strong>${photos[0].rover.launch_date}</strong>`

  // Checks array for results
  if (photos.length === 0) {
    console.log("No results");
  } else {
    photos.forEach((photo) => {
      // Populates cards and modals
      let card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal${photo.id}">
                          <img src="${photo.img_src}" class='card-img-top' alt=''>
                          <div class='card-body'>
                            <p class='card-text'>${photo.camera.full_name}</p>
                            <p class='card-text'>Sol: ${photo.sol}</p>
                          </div>
                        </button>
                        <div class="modal fade" id="modal${photo.id}" tabindex="-1" aria-labelledby="modal${photo.id}Label" aria-hidden="true">
                          <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="modal${photo.id}Label">${photo.camera.full_name}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div class="modal-body">
                                <img src="${photo.img_src}" class='card-img-top' alt=''>
                              </div>                              
                            </div>
                          </div>
                        </div>`;
      photoWrapper.appendChild(card);
    });
  }
}

