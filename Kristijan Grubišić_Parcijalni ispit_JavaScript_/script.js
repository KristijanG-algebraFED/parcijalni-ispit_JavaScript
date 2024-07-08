document.addEventListener("DOMContentLoaded", function () {
  var searchForm = document.getElementById("search-form");
  var searchTermInput = document.getElementById("search-term");
  var resultsList = document.getElementById("results");
  var loader = document.getElementById("loader");

  function fetchResults(term) {
    if (term === "") {
      showMessage("Please enter a search term.");
      return;
    }

    showLoader();
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://itunes.apple.com/search?term=" + term + "&entity=song", true);
    xhr.onload = function () {
      if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        if (data.results.length === 0) {
          showMessage("No results found.");
        } else {
          displayResults(data.results);
        }
      } else {
        showMessage("Error fetching data.");
      }
      hideLoader();
    };
    xhr.onerror = function () {
      showMessage("Error fetching data.");
      hideLoader();
    };
    xhr.send();
  }

  function displayResults(results) {
    resultsList.innerHTML = "";
    for (var i = 0; i < results.length; i++) {
      var result = results[i];
      var listItem = document.createElement("li");
      listItem.textContent = result.trackName + " by " + result.artistName;
      resultsList.appendChild(listItem);
    }
  }

  function showMessage(message) {
    resultsList.innerHTML = "<li>" + message + "</li>";
  }

  function showLoader() {
    loader.classList.remove("hidden");
  }

  function hideLoader() {
    loader.classList.add("hidden");
  }

  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var term = searchTermInput.value.trim();
    fetchResults(term);
  });

  searchTermInput.addEventListener("input", function () {
    var term = searchTermInput.value.trim();
    fetchResults(term);
  });
});
