$("button").on("click", function(event) {
    event.preventDefault();
    //creating variable for crypto name
    var cryptoName = $("#cryptoSearchterm").val().toUpperCase();
    if (cryptoName === "") { return };

    // creating variable for url

    var cryptoAPI = "https://financialmodelingprep.com/api/v3/quote/" + cryptoName + "?apikey=53d04d2cbba5395011a5c347e18042dc";

    $.ajax({
        url: cryptoAPI,
        method: "GET",
        dataType: "json"

    }).then(function(response) {
        // console.log(response);
        // deletes from previous search
        $("#cryptoResults").empty();

        // creates display for name, price, percent change, market cap and previous close of specific crypto
        for (i = 0; i < response.length; i++) {
            function displayCrypto() {
                var name = response[i].name;
                var price = response[i].price;
                var change = response[i].previousClose;
                var marketCap = response[i].marketCap;

                   // create elements within crypto div to display info

                        
                var addName = $("<div class='name greenType'></div>").text(name);        
                var addPrice = $("<div class='price'></div>").text("Price - $" +
                    price);        
                var addChange = $("<div class='change'></div>").text("Previous Close- $" +
                    change);        
                var addMarketCap = $("<div class='marketCap'></div>").text("Market Cap - $" +
                    marketCap);

                         //display in crypto bucket
                        
                $("#cryptoResults").append(addName);        
                $("#cryptoResults").append(addPrice);        
                $("#cryptoResults").append(addChange);        
                $("#cryptoResults").append(addMarketCap);
            };
            displayCrypto();

        }
    });

});