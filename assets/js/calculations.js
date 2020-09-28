$("button").on("click", function(event) {
    event.preventDefault();
    //creating variable for company ticker
    var companyName = $("#search-term").val().toUpperCase().trim();
    if (companyName === "") {return};

    // creating variable for url
    var companyInfoURL = "https://financialmodelingprep.com/api/v3/profile/"+ companyName + "?limit=120&apikey=53d04d2cbba5395011a5c347e18042dc";
    var financialRatiosURL = "https://financialmodelingprep.com/api/v3/ratios/"+ companyName + "?limit=120&apikey=53d04d2cbba5395011a5c347e18042dc";
    var incomeStatementURL = "https://financialmodelingprep.com/api/v3/income-statement/"+ companyName + "?limit=120&apikey=53d04d2cbba5395011a5c347e18042dc";
    // var balanceSheetURL = "https://financialmodelingprep.com/api/v3/balance-sheet-statement/"+ companyName + "?limit=120&apikey=53d04d2cbba5395011a5c347e18042dc";
    var cashFlowStatementURL = "https://financialmodelingprep.com/api/v3/cash-flow-statement/" + companyName + "?limit=120&apikey=53d04d2cbba5395011a5c347e18042dc";
    // Performing our AJAX GET request
    $.ajax({
        url: companyInfoURL,
        method: "GET",
        dataType: "json"
        // Target necessary info (name)
        }).then(function(data) {
            console.log(data);
            $("#searchResultTitle").empty();
            console.log(data[0].companyName);
            $("#searchResultTitle").text(data[0].companyName);
        })
    $.ajax({
    url: incomeStatementURL,
    method: "GET",
    dataType: "json"
    // Target necessary info (revenue)
    }).then(function(data){
        console.log(data);
        // creating 
        for (var i = 0; i < 4; i++) {
              // creating variable to grab 2019 revenue
            var currentRevenue = data[i].revenue
            // creating variable to continue to loop all until 5 years
            var nextRevenue = data[i + 1].revenue

            console.log(currentRevenue);
            console.log(nextRevenue);
            console.log("--");
        
            if (nextRevenue < currentRevenue) {
                isRevenueIncreasing = true;
            }
            else {
                isRevenueIncreasing = false;
                break
            }

        }
        console.log(isRevenueIncreasing);
        if (isRevenueIncreasing) {
            $("#boxOne2020").removeClass("red").addClass("green").text("Yes");
            
        }
        else  {
            $("#boxOne2020").removeClass("green").addClass("red").text("No");
        }
        
        
// Sales double last five to seven years?
        for (var i = 0; i < 4; i++) {
            // creating variable 
            var currentRevenue2019 = data[0].revenue
            var oldRevenue2016 = data[6].revenue
            // console log 
            console.log(currentRevenue2019);
            console.log(oldRevenue2016);
            console.log("--");
            // 
            if (currentRevenue2019 >= oldRevenue2016 * 2) {
                isRevenueDoubling = true;
            }
            else {
                isRevenueDoubling = false;
                break
            }
        }
        console.log(isRevenueDoubling);
        if (isRevenueDoubling) {
            $("#boxTwo2020").removeClass("red").addClass("green").text("Yes");
        }
        else  {
            $("#boxTwo2020").removeClass("green").addClass("red").text("No");
        }
    }) 
// Any Dividends Paid last five years?
    $.ajax({
        url: cashFlowStatementURL,
        method: "GET",
        dataType: "json"
            // Target necessary info (dividends paid)
        }).then(function(data){
            console.log(data);
            for (var i = 0; i < 4; i++) {
                var currentDividends = data[i].dividendsPaid
                var nextDividends = data[i + 1].dividendsPaid
                console.log(currentDividends);
                console.log(nextDividends);
                console.log("--");
                if (currentDividends || nextDividends < 0) {
                    isDividendsPaid = true;
                }
                else {
                    isDividendsPaid = false;
                    break
                }

            }
            console.log(isDividendsPaid);
            if (isDividendsPaid) {
                $("#FiveYearEps2020").removeClass("red").addClass("green").text("Yes");
                
            }
            else  {
                $("#FiveYearEps2020").removeClass("green").addClass("red").text("No");
            }
            

    }) 
    $.ajax({
        url: financialRatiosURL,
        method: "GET",
        dataType: "json"
            // Target necessary info (ratios)
        }).then(function(data){
            // var isDividendPaid = false;
            console.log(data);

            for (var i = 0; i < 4; i++) {
                var currentROE = data[i].returnOnEquity
                var nextROE = data[i + 1].returnOnEquity
                console.log(currentROE);
                console.log(nextROE);
                console.log("--");
                if (nextROE <= currentROE) {
                    isROEStable = true;
                }
                else {
                    isROEStable = false;
                    break
                }
    
            }
            console.log(isROEStable);
            if (isROEStable) {
                $("#roe").removeClass("red").addClass("green").text("Yes");
                
            }
            else  {
                $("#roe").removeClass("green").addClass("red").text("No");
            }
            

        })
    $.ajax({
        url: financialRatiosURL,
        method: "GET",
        dataType: "json"
            // Target necessary info (current ratio)
        }).then(function(data){
            // var isDividendPaid = false;
            console.log(data);

            for (var i = 0; i < 4; i++) {
                var currentRatio = data[i].currentRatio
                
                console.log(currentRatio);
                
                if (currentRatio >= 2) {
                    isRatioTwice = true;
                }
                else {
                    isRatioTwice = false;
                    break
                }
    
            }
            console.log(isROEStable);
            if (isROEStable) {
                $("#liabilities").removeClass("red").addClass("green").text("Yes");
                
            }
            else  {
                $("#liabilities").removeClass("green").addClass("red").text("No");
            }
            
            
        })

    
    
});