// Globals
var apiUrl = "https://localhost:44365/";


// Functions
function isLoggedIn() {
    // todo: sessionstorage ve localstorage da tutulan login bilgilerine bakarak
    // login olup olmadığına karar ver ve eğer logins uygulamayı aç
    // login değilse login/register sayfasını göster
}

function loginData() {
    // todo: sessionstorage da, eğer orada bulamadıysan
    // localstorage da kayıtlı login data yı json'dan object'e dönüştür ve yolla
    // eğer yoksa null yolla
}
function success(message) {
    resetLoginForms();
    $(".tab-pane.active .alerts")
        .removeClass("alert-danger")
        .addClass("alert-success")
        .text(message)
        .show();
}
function error(modelState) {
    if (modelState) {
        var errors = [];
        for (var prop in modelState) {
            for (var i = 0; i < modelState[prop].length; i++) {
                errors.push(modelState[prop][i])
            }
        }

        var ul = $("<ul/>");
        for (var i = 0; i < errors.length; i++) {
            ul.append($("<li/>").text(errors[i]));
        }
        $(".tab-pane.active .alerts")
            .removeClass("alert-success")
            .addClass("alert-danger")
            .html(ul)
            .show();
    }
}
function errorMessage(message) {
    if (message) {
        $(".tab-pane.active .alerts")
            .removeClass("alert-success")
            .addClass("alert-danger")
            .text(message)
            .show();
    }
}
function resetLoginForms() {
    $(".alerts").hide();
    $('#login form').each(function () {
        this.reset();
    });
}

// Events
$("#signupform").submit(function (event) {
    event.preventDefault();
    var formData = $(this).serialize();

    $.post(apiUrl + "api/Account/Register", formData, function (data) {
        success("Your account has been created successfully.")
    }).fail(function (xhr) {
        error(xhr.responseJSON.ModelState);
    });
});

$("#signinform").submit(function (event) {
    event.preventDefault();
    var formData = $(this).serialize();

    $.post(apiUrl + "Token", formData, function (data) {

        var datastor = JSON.stringify(data);  // nesneyi stringe cevirir. Parse is stringi nesneye cevirir.
        if ($("#rememberme").prop("checked")) {
            sessionStorage.removeItem("login");
            localStorage["login"] = datastor;
        }
        else {
            localStorage.removeItem("login");
            sessionStorage["login"] = datastor;
        }
        success("You been logged in successfully. Now, you are being redirected automatically..");

        setTimeout(function () {
            $("#login").hide();
        }, 500);

    }).fail(function (xhr) {
        errorMessage(xhr.responseJSON.error_description);
    });
});

$("#login a[data-toggle='pill']").on('shown.bs.tab', function (e) {
    // e.target // newly activated tab
    // e.relatedTarget // previous active tab
    resetLoginForms();
})

$(document).ajaxStart(function () {
    $(".loading").removeClass("d-none");
})

$(document).ajaxStop(function () {
    $(".loading").addClass("d-none");
})

$(".navbar-login a").click(function () {
    var href = $(this).attr("href");
    $('#pills-tab a[href="' + href + '"]').tab('show'); // select by tab name
})