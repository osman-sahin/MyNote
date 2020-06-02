// var apiUrl = "https://noteapi.osahin.net/";

var app = angular.module("myApp", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", { templateUrl: "pages/app.html" })
        .when("/login", { templateUrl: "pages/login.html" });
});

app.controller("myCtrl", function ($scope) {

    $scope.checkAuth = function () {
        var tokenJson = localStorage["token"] | sessionStorage["token"];

        // https://www.w3schools.com/angular/angular_routing.asp
        if (!tokenJson) {
            console.log("not logged in")
            return;
        }
        // check if token is valid

        // display app view
    };

    
    $scope.checkAuth();
});




$(function () {  // when DOM ready in order to use JQuery
    $(".navbar-login a").click(function (event) {
        event.preventDefault();
        var href = $(this).attr("href");
        // https://getbootstrap.com/docs/4.0/components/navs/#via-javascript
        $('#pills-tab a[href="' + href + '"]').tab('show'); // select by tab name
    });
    $('body').on("click", "#pills-tab a", function (e) {
        e.preventDefault();
        $(this).tab('show')
    });
});
