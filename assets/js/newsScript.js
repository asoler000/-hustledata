$(document).ready(function () {
    var usersSearch = "";
    var apiKey = "&apikey=53d04d2cbba5395011a5c347e18042dc"

    // on-click event: store user input and call getNews function
    $("button").on("click", function (event) {
        event.preventDefault();
        usersSearch = $(this).siblings("#search-term").val().toUpperCase().trim(); // identifies and saves the users search input
        $(this).siblings("#search-term").val(null); // clears input field
        getNews();
    });

    // GET news from API and display to page
    function getNews() {
        var queryURL = "https://financialmodelingprep.com/api/v3/stock_news?tickers=" + usersSearch + "&limit=50" + apiKey; // can change the limit to any #
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // console.log(response);
            // Deleting news from previous searches
            $("#newsResults").empty();
            // console.log("hi");
            for (i = 0; i < response.length; i++) {
                // creating news cards and display the info in each cards
                function createArticleCard() {
                    var image = response[i].image;
                    var title = response[i].title;
                    var articleURL = response[i].url;
                    // var description = response[i].text;
                    // var publishedDate = response[i].publishedDate.slice(0, 10);

                    // creating new card and its' elements to hold each article
                    var addMainArticleCard = $("<div>").addClass("card mb-3").attr("style", "max-width: 540px;");
                    var addImageAndTextRow = $("<div>").addClass("row no-gutters");
                    var addImageColumn = $("<div>").addClass("col-md-4");
                    var addImage = $("<a>").attr("href", articleURL).attr("target", "_blank").html('<img src="' + image + '" class="card-img newsImg"></img>');
                    var addTextColumn = $("<div>").addClass("col-md-8");
                    var addTextCard = $("<div>").addClass("card-body");
                    var addTitle = $("<div>").addClass("card-title newsTitle").html('<a href="' + articleURL + '" target="_blank">' + title + '</img>');
                    // var addDescription = $("<p>").addClass("card-text").text(description);
                    // var addPublishedDate = $("<p>").addClass("card-text").html('<small class="text-muted">' + publishedDate + '</small>');

                    // appending elements to the html
                    $("#newsResults").append(addMainArticleCard);
                    addMainArticleCard.append(addImageAndTextRow);
                    addImageAndTextRow.append(addImageColumn);
                    addImageColumn.append(addImage);
                    addImageAndTextRow.append(addTextColumn);
                    addTextColumn.append(addTextCard);
                    addTextCard.append(addTitle);
                    // addTextCard.append(addDescription);
                    // addTextCard.append(addPublishedDate);
                };
                createArticleCard();
            };
        });
    };






});