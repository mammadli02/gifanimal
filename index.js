$(document).ready(function() {

  var animals = [
    "dog", "cat", "rabbit", "hamster", "skunk", "goldfish",
    "bird", "ferret", "turtle", "sugar glider", "chinchilla",
    "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken",
    "capybara", "teacup pig", "serval", "salamander", "frog"
  ];

  
  function animalButtons(arrayToUse, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();

    for (var i = 0; i < animals.length; i++) {
      var a = $("<button>");
      a.addClass(classToAdd);
      a.attr("data-type", arrayToUse[i]);
      a.text(arrayToUse[i]);
      $(areaToAddTo).append(a);
    }

  }

  $(document).on("click", ".animal-button", function() {
    $("#animals").empty();
    $(".animal-button").removeClass("active");
    $(this).addClass("active");

    var type = $(this).attr("data-type");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=zROU2FgTlDUruJ8JbUnVUQaUeCC3rfhZ";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var animalDiv = $("<div class=\"animal-item\">");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var animated = results[i].images.fixed_height.url;
          var still = results[i].images.fixed_height_still.url;

          var animalImage = $("<img>");
          animalImage.attr("src", still);
          animalImage.attr("data-still", still);
          animalImage.attr("data-animate", animated);
          animalImage.attr("data-state", "still");
          animalImage.addClass("animal-image");

          animalDiv.append(p);
          animalDiv.append(animalImage);

          $("#animals").append(animalDiv);
        }
      });
  });

  $(document).on("click", ".animal-image", function() {

    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#add-animal").on("click", function(event) {
    event.preventDefault();
    var newAnimal = $("input").val();

    if (newAnimal.length > 2) {
      animals.push(newAnimal);
    }

    animalButtons(animals, "animal-button", "#animal-buttons");

  });

  animalButtons(animals, "animal-button", "#animal-buttons");
});


/*
function displayanimalInfo() {

 
  var type = $(this).attr("data-type");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=zROU2FgTlDUruJ8JbUnVUQaUeCC3rfhZ";

 
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var results = response.data;

            for (var i = 0; i < results.length; i++) {
              var animalDiv = $("<div class=\"animal-item\">");
    
              var rating = results[i].rating;
  
           

    
    var myRating = $("<p>").text("Rating: " + rating);

  
  

    


          var animated = results[i].images.fixed_height.url;
          var still = results[i].images.fixed_height_still.url;

          var animalImage = $("<img>");
          animalImage.attr("src", still);
          animalImage.attr("data-still", still);
          animalImage.attr("data-animate", animated);
          animalImage.attr("data-state", "still");
          animalImage.addClass("animal-image");




            animalDiv.append(myRating);

          animalDiv.append(animalImage);











    $("#animals-view").prepend(animalDiv);
            }
  });

}

function renderButtons() {

  
  $("#buttons-view").empty();

 
  for (var i = 0; i < animals.length; i++) {

    var myButton = $("<button>");
   
    myButton.addClass("animal-btn");
   
    myButton.attr("data-name", animals[i]);
    
    myButton.text(animals[i]);
    $("#buttons-view").append(myButton);
  }
}


$("#add-animal").on("click", function(event) {
  event.preventDefault();

  var animal = $("#animal-input").val().trim()

 
  animals.push(animal);

  
  renderButtons();
});


$(document).on("click", ".animal-btn", displayanimalInfo);

renderButtons();
})*/