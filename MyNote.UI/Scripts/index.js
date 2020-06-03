var apiUrl = "https://noteapi.osahin.net/";
var app = angular.module("myApp", ["ngRoute"]);

app.directive("alerts", function () {
    return {
        templateUrl: "directives/alerts.html"
    };
});

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", { templateUrl: "pages/app.html", controller: "appController" })
        .when("/login", { templateUrl: "pages/login.html", controller: "loginController" });
});

app.controller("mainController", function ($scope, $http) {

    $scope.isLoading = false;
    $scope.showLoading = function () {
        $scope.isLoading = true;
    };
    $scope.hideLoading = function () {
        $scope.isLoading = false;
    };

    $scope.loginData = function () {
        var loginDataJson = localStorage["login"] | sessionStorage["login"]

        if (!loginDataJson) {
            return null;
        }

        try {
            return JSON.parse(loginDataJson);
        } catch (e) {
            return null;
        }
    };

    $scope.token = function () {
        var loginData = $scope.loginData();

        if (!loginData) {
            return null;
        }
        return loginData.access_token;
    };

    $scope.ajax = function (apiUri, method, data, isAuth, successFunc, errorFunc) {
        $scope.showLoading();
        var headers = null;

        if (isAuth)
            headers = { Authorization: "Bearer " + $scope.token() };

        $http({
            url: apiUrl + apiUri,
            method: method,
            headers: headers,
            data: data
        }).then(
            function (response) {
                successFunc(response);
                $scope.hideLoading();
            },
            function (response) {
                errorFunc(response);
                $scope.hideLoading();
            });
    };

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

app.controller("loginController", function ($scope, $http) {

    $scope.currentTab = "login"
    $scope.alertFor = "login"
    $scope.alertType = "danger";
    $scope.alerts = [];

    $scope.registerForm = {
        Email: "",
        Password: "",
        ConfirmPassword: ""
    };
    $scope.loginForm = {
        grant_type: "password",
        username: "",
        password: ""
    }

    $scope.rememberMe = false;

    $scope.errors = function (data) {
        $scope.alertFor = $scope.currentTab;
        $scope.alertType = "danger";
        $scope.alerts = [];
        if (data.ModelState) {
            for (var prop in data.ModelState) {
                for (var index in data.ModelState[prop]) {
                    $scope.alerts.push(data.ModelState[prop][index]);
                }
            }
        }
    };
    $scope.success = function (alert) {
        $scope.alertFor = $scope.currentTab;
        $scope.alertType = "success";
        $scope.alerts = [alert];
    };

    $scope.resetRegisterForm = function () {
        $scope.registerForm.Email = "";
        $scope.registerForm.Password = "";
        $scope.registerForm.ConfirmPassword = "";
    }
    $scope.resetLoginForm = function () {
        $scope.loginForm.username = "";
        $scope.loginForm.password = "";
        $scope.rememberMe = false;
    }

    $scope.$watch("currentTab", function () {
        $scope.resetLoginForm();
        $scope.resetRegisterForm();
        $scope.alerts = [];
    });

    $scope.registerSubmit = function () {

        $scope.ajax("api/Account/Register", "post", $scope.registerForm, false,
            function (response) {
                $scope.resetRegisterForm();
                $scope.success("Your account has been created successfully!")
            },
            function (response) {
                $scope.errors(response.data);
            }
        );
    };

    $scope.loginSubmit = function () {
        alert("login submitted");
    };
});

app.controller("appController", function ($scope, $location) {
    $location.path("/login");
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

    // https://stackoverflow.com/questions/37769900/how-to-change-a-scope-variable-outside-the-controller-in-angularjs
    // https://www.hiren.dev/2014/06/how-to-access-scope-variable-outside.html
    // reach angular from outside of angular
    $('body').on('shown.bs.tab', 'a[data-toggle="pill"]', function (e) {
        var $scope = angular.element($('[ng-view]')[0]).scope();
        $scope.currentTab = $(e.target).attr("id") == "pills-signup-tab" ? "register" : "login";
        $scope.$apply();
        //e.target // newly activated tab
        //e.relatedTarget // previous active tab
        //console.log(e.target, e.relatedTarget);
    });
});
