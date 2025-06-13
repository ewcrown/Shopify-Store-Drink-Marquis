var settingsGetShopInfo = {
    "url": "https://markodesign.net/testbold/boldAPI.php?action=getShopInfo",
    "method": "GET"
};

var settingsGetCustomers = {
    "url": "https://markodesign.net/testbold/boldAPI.php?action=getShopCustomers",
    "method": "GET"
}

$( document ).ready(function() {
    $.ajax(settingsGetShopInfo).done(function (response) {
        var responseObj = JSON.parse(response);
        const objectArray = Object.entries(responseObj);
        objectArray.forEach(([key, value]) => {
            $('#bold_shop_info').append('<strong>' + key + '</strong> - ' + value + '<br/>');
        });
    });

    $.ajax(settingsGetCustomers).done(function (response) {
        var responseObj = JSON.parse(response);
        //console.log(responseObj);
        const objectArray = responseObj.customers;
        console.log(objectArray);
         objectArray.forEach((element) => {
             const objectArray2 = Object.entries(element);
             objectArray2.forEach(([key, value]) => {
                 $('#bold_users_info').append('<strong>' + key + '</strong> - ' + value + '<br/>');
             });
         });
    });
});

// $.get( "ajax/test.html", function( data ) {
//     $( ".result" ).html( data );
//     alert( "Load was performed." );
// });
/*
    "headers": {
        "Authorization": "Bearer AxtQ7NXFinuNZWH1LUZMwAWnRvp5pVm8",
        "Cookie": "__cf_bm=A2sECIFsUIt7FM9qKk_.dXS7s73RUX3V3oEwUz60yTU-1644495679-0-AWXi4BJnIWXGCZ/3EV2i2W/J3t7PX951ndARb42ZMDmxBs7n2wmo4SLs3ZtWQREJixX3SCpLMsqsfSzNLAH0TPc="
    },
 */