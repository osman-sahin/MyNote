// Globals
var apiUrl = "https://localhost:44365/";

var selectedNote = null;
var selectedLink = null;

// Functions
function checkLogin() {
    // todo: sessionstorage ve localstorage da tutulan login bilgilerine bakarak
    // login olup olmadığına karar ver ve eğer logins uygulamayı aç
    // login değilse login/register sayfasını göster
    var loginData = getLoginData();

    if (!loginData || !loginData.access_token) {
        showLoginPage();
        return;
    }

    //token gecerli mi?
    ajax("api/Account/UserInfo", "GET", null,
        function (data) {
            showAppPage();
        },
        function () {
            showLoginPage();
        });
}
function showAppPage() {
    $(".only-logged-out").hide();
    $(".only-logged-in").show();
    $(".page").hide();

    // retrieve notes
    ajax("api/Notes/List", "GET", null,
        function (data) {

            $("#notes").html("");
            for (var i = 0; i < data.length; i++) {
                var a = $("<a/>").attr("href", "#").addClass("list-group-item list-group-item-action show-note")
                    .text(data[i].Title)
                    .prop("note", data[i]);
                $("#notes").append(a);
            }
        },
        function () {

        });

    $("#page-app").show();
}
function showLoginPage() {
    $(".only-logged-in").hide();
    $(".only-logged-out").show();
    $(".page").hide();
    $("#page-login").show();
}
function getAuthHeader() {
    return { Authorization: "Bearer " + getLoginData().access_token };
}
function ajax(url, type, data, successFunc, errorFunc) {
    $.ajax({
        url: apiUrl + url,
        type: type,
        data: data,
        headers: getAuthHeader(),
        success: successFunc,
        error: errorFunc
    });
}
function updateNote() {
    ajax("api/Notes/Update/" + selectedNote.Id, "PUT",
        { Id: selectedNote.Id, Title: $("#note-title").val(), Content: $("#note-content").val() },
        function (data) {
            selectedLink.note = data;
            selectedLink.text = data.Title;
        },
        function () {
            alert("Update failed!");
        }
    );
}
function getLoginData() {

    var json = sessionStorage["login"] || localStorage["login"];

    if (json) {
        try {
            return JSON.parse(json);
        } catch (e) {
            return null;
        }
    }
    return null;
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

        resetLoginForms();
        success("You been logged in successfully. Now, you are being redirected automatically..");

        setTimeout(function () {
            // resetLoginForm konulabilir.
            showAppPage();
        }, 1000);

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

$(".navbar-login a").click(function (event) {
    event.preventDefault();
    var href = $(this).attr("href");
    $('#pills-tab a[href="' + href + '"]').tab('show'); // select by tab name
})

$("#btnLogout").click(function (event) {
    event.preventDefault();
    sessionStorage.removeItem("login");
    localStorage.removeItem("login");
    resetLoginForms();  // yukarı da konulabilir
    showLoginPage();
});

$("body").on("click", ".show-note", function (event) {
    event.preventDefault();
    selectedLink = this;
    selectedNote = this.note;
    $("#note-title").val(selectedNote.Title);
    $("#note-content").val(selectedNote.Content);

    $(".show-note").removeClass("bg-success text-white");
    $(this).addClass("bg-success text-white");
});

$("#frmNote").submit(function (event) {
    event.preventDefault();

    if (selectedNote) {
        updateNote();
    }
    else {
        addNote();
    }
});

// Actions
checkLogin();