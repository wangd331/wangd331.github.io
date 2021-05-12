//load airtable library
let Airtable = require("airtable");

//use airtable library, connect t our base using API key
let base = new Airtable({ apiKey: "key84IGFrxEVOOtlK" }).base("appPfbi2JyyRZDB5w");

//get our collection base, select all records (row)

//specify functions that will receive the data
base("locations").select({}).eachPage(gotPageOfLocations, gotAllLocations);

//create empty array to hold data (const = var)
const locations = [];

//callback function that receives data
function gotPageOfLocations(records, fetchNextPage){
    console.log("gotPageOfLocations()");
    //add the records from this page to our array
    locations.push(...records);
    //request more pages
    fetchNextPage();
}

//call back function that is called when all pages are loaded (err stands for error)
function gotAllLocations(err){
    console.log("gotAllLocations()");
    //report an error
    if (err){
        console.log("error loading data");
        console.error(err);
        return;
    }
    //call functions to log and show the albums
    consoleLogLocations();
    showLocations();
}

//loop through the locations and console.log them
function consoleLogLocations(){
    console.log("consoleLogLocations()");
    locations.forEach((location) => {
        console.log("Location:", location);
    });
}

//look through our airtable data, create elements
function showLocations() {
    console.log("showLocations()");
    locations.forEach((location) => {

        //create container div for each record
        var locationContainer = document.createElement("div");
        locationContainer.classList.add("location-container");
        document.querySelector("#container").appendChild(locationContainer);

        //add location coordinates
        var locationCoordinate = document.createElement("h1");
        locationCoordinate.classList.add("location-coordinate");
        locationCoordinate.innerText = location.fields.coordinates;
        locationContainer.appendChild(locationCoordinate);

        //create coordinate point for each location
        var coordinate = document.createElement("div");
        coordinate.classList.add("coordinate");
        locationContainer.appendChild(coordinate);

        //create detail page container div for each record
        var detailContainer = document.createElement("div");
        detailContainer.classList.add("location-detail");
        locationContainer.appendChild(detailContainer);

        //create element to show location caption
        var locationCaption = document.createElement("p");
        locationCaption.classList.add("location-caption");
        locationCaption.innerText = location.fields.caption;
        detailContainer.appendChild(locationCaption);
        
        //create element to show location image
        var locationImage = document.createElement("img");
        locationImage.classList.add("location-image");
        locationImage.src = location.fields.images[0].url;
        detailContainer.appendChild(locationImage);

        //get display field (image or caption), loop through the array and add each display as a class to the location container
        var detailDisplay = location.fields.display;
        detailDisplay.forEach(function(display) {
            detailContainer.classList.add(display);
        });

        //hide all irrelevant displays, only show caption for records categorized as "caption" and only show photo for records categorized as "photo"
        function hideCaption() {
            if (detailContainer.classList.contains("photo")) {
                locationCaption.style.display = "none";
            } else {
                locationCaption.style.display = "block";
            }
        };
        hideCaption();

        //hide photos
        function hidePhoto() {
            if(detailContainer.classList.contains("caption")) {
                locationImage.style.display = "none";
            } else {
                locationImage.style.display = "block";
            }
        };
        hidePhoto();

        //category filtering: get category field from airtable, loop through the array and add each category as a class to the location container
        var locationCategory = location.fields.category;
        locationCategory.forEach(function(category) {
            locationContainer.classList.add(category);
        });

        //clicking on food filter hides all non food records
        var filterFood = document.querySelector(".food-filter");
        filterFood.addEventListener("click", function() {
            if (locationContainer.classList.contains("food")) {
                locationContainer.style.display = "block";
                locationContainer.style.color = "#83060E";
                coordinate.style.backgroundColor = "#83060E";
                locationImage.style.color = "#83060E";
                locationCaption.style.color = "#83060E";
                // document.querySelector("#filters").style.color = "#83060E";
                filterFood.style.backgroundColor = "#83060E";
                filterInstitution.style.backgroundColor = "#fff";
                filterRegion.style.backgroundColor = "#fff";
                filterRecreation.style.backgroundColor = "#fff";
            } else {
                locationContainer.style.display = "none";
            }
        });

        //clicking on institution filter hides all non food records
        var filterInstitution = document.querySelector(".institution-filter");
        filterInstitution.addEventListener("click", function() {
            if (locationContainer.classList.contains("institution")) {
                locationContainer.style.display = "block";
                locationContainer.style.color = "#D8A33F";
                coordinate.style.backgroundColor = "#D8A33F";
                locationImage.style.color = "#D8A33F";
                locationCaption.style.color = "#D8A33F";
                // document.querySelector("#filters").style.color = "#D8A33F";
                filterInstitution.style.backgroundColor = "#D8A33F";
                filterFood.style.backgroundColor = "#fff";
                filterRegion.style.backgroundColor = "#fff";
                filterRecreation.style.backgroundColor = "#fff";
            } else {
                locationContainer.style.display = "none";
            }
        });          
        //clicking on recreation filter hides all non food records
        var filterRecreation = document.querySelector(".recreation-filter");
        filterRecreation.addEventListener("click", function() {
            if (locationContainer.classList.contains("recreation")) {
                locationContainer.style.display = "block";
                locationContainer.style.color = "#165D48";
                coordinate.style.backgroundColor = "#165D48";
                locationImage.style.color = "#165D48";
                locationCaption.style.color = "#165D48";
                // document.querySelector("#filters").style.color = "#165D48";
                filterRecreation.style.backgroundColor = "#165D48";
                filterInstitution.style.backgroundColor = "#fff";
                filterRegion.style.backgroundColor = "#fff";
                filterFood.style.backgroundColor = "#fff";
            } else {
                locationContainer.style.display = "none";
            }
        });
        //clicking on region filter hides all non food records
        var filterRegion = document.querySelector(".region-filter");
        filterRegion.addEventListener("click", function() {
            if (locationContainer.classList.contains("region")) {
                locationContainer.style.display = "block";
                locationContainer.style.color = "#213061";
                coordinate.style.backgroundColor = "#213061";
                locationImage.style.color = "#213061";
                locationCaption.style.color = "#213061";
                // document.querySelector("#filters").style.color = "#213061";
                filterRegion.style.backgroundColor = "#213061";
                filterInstitution.style.backgroundColor = "#fff";
                filterFood.style.backgroundColor = "#fff";
                filterRecreation.style.backgroundColor = "#fff";
            } else {
                locationContainer.style.display = "none";
            }
        });
        //reset filters
        var filterReset = document.querySelector(".reset");
        filterReset.addEventListener("click", function() {
          locationContainer.style.display = "block";
          locationContainer.style.color = "#000";
          coordinate.style.backgroundColor = "#000";
          locationImage.style.color = "#000";
          locationCaption.style.color = "#000";
          filterRegion.style.backgroundColor = "#fff";
          filterInstitution.style.backgroundColor = "#fff";
          filterFood.style.backgroundColor = "#fff";
          filterRecreation.style.backgroundColor = "#fff";
        });
        
        //show/hide details toggle
        coordinate.addEventListener("click", function() {
            if (detailContainer.style.display === "none") {
              detailContainer.style.display = "block";
            } else {
              detailContainer.style.display = "none";
            }
        });
    });
}


