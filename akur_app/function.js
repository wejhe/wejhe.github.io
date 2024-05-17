$(document).ready(function(){
    $('[data-bs-toggle="tooltip"]').tooltip();
});

const toastElList = document.querySelectorAll('.toast')
const toastList = [...toastElList].map(toastEl => new bootstrap.Toast(toastEl, option))

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function statusCheck() {
    if (typeof(Storage) !== "undefined") {
        if (localStorage.getItem("loginStatus") === "true") {
            window.open("/home.html","_self");
        }

        if (localStorage.getItem("showLogoutToast") === "true") {
            const logoutToast = document.getElementById('logoutToast');
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(logoutToast);
            toastBootstrap.show();
            localStorage.removeItem("showLogoutToast");
        }
    } else {
        console.log("Storage not supported!");
    }
}

function notLoginCheck() {
    if (typeof(Storage) !== "undefined") {
        if (localStorage.getItem("loginStatus") === "false" || localStorage.getItem("loginStatus") === null) {
            window.open("/index.html","_self");
        }
    } else {
        console.log("Storage not supported!");
    }
}

function changeKodeCabang() {
    var eNamaCabang = document.getElementById("namaCabang");
    var vNamaCabang = eNamaCabang.value;

    var eKodeCabang = document.getElementById("kodeCabang");
    eKodeCabang.value = vNamaCabang;
}

function start() {
    var loginButton = document.getElementById("login");
    loginButton.innerHTML += '<div class="spinner-border spinner-border-sm text-light ms-2" role="status"><span class="visually-hidden"></span></div>';

    sleep(3000).then(() => {
        var eNamaCabang = document.getElementById("namaCabang");
        var vNamaCabang = eNamaCabang.options[eNamaCabang.selectedIndex].text;
        
        var eKodeCabang = document.getElementById("kodeCabang");
        var vKodeCabang = eKodeCabang.value;
    
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem("loginStatus", true);
            localStorage.setItem("namaCabang", vNamaCabang);
            localStorage.setItem("kodeCabang", vKodeCabang);
            localStorage.setItem("showLoginToast", true);

            if (
                localStorage.getItem("progressOverall") === null || "NaN"
                && localStorage.getItem("progressCOSO1") === null || "NaN"
                && localStorage.getItem("progressCOSO2") === null || "NaN"
                && localStorage.getItem("progressCOSO3") === null || "NaN"
                && localStorage.getItem("progressCOSO4") === null || "NaN"
                && localStorage.getItem("progressCOSO5") === null || "NaN"
                && localStorage.getItem("progressCOSO11") === null
                && localStorage.getItem("progressCOSO12") === null
                && localStorage.getItem("progressCOSO13") === null
                && localStorage.getItem("progressCOSO14") === null
                && localStorage.getItem("progressCOSO15") === null
                && localStorage.getItem("progressCOSO16") === null
                && localStorage.getItem("progressCOSO17") === null
                && localStorage.getItem("progressCOSO21") === null
                && localStorage.getItem("progressCOSO31") === null
                && localStorage.getItem("progressCOSO32") === null
                && localStorage.getItem("progressCOSO33") === null
                && localStorage.getItem("progressCOSO34") === null
                && localStorage.getItem("progressCOSO35") === null
                && localStorage.getItem("progressCOSO41") === null
                && localStorage.getItem("progressCOSO42") === null
                && localStorage.getItem("progressCOSO51") === null
                && localStorage.getItem("progressCOSO52") === null
                && localStorage.getItem("item111") === null
                && localStorage.getItem("item112") === null
                && localStorage.getItem("item113") === null
                && localStorage.getItem("item121") === null
                && localStorage.getItem("item122") === null
                && localStorage.getItem("item123") === null
                && localStorage.getItem("item131") === null
                && localStorage.getItem("item132") === null
                && localStorage.getItem("item133") === null
                && localStorage.getItem("item141") === null
                && localStorage.getItem("item142") === null
                && localStorage.getItem("item143") === null
                && localStorage.getItem("item151") === null
                && localStorage.getItem("item152") === null
                && localStorage.getItem("item153") === null
                && localStorage.getItem("item161") === null
                && localStorage.getItem("item162") === null
                && localStorage.getItem("item163") === null
                && localStorage.getItem("item171") === null
                && localStorage.getItem("item172") === null
                && localStorage.getItem("item173") === null
                && localStorage.getItem("item211") === null
                && localStorage.getItem("item212") === null
                && localStorage.getItem("item213") === null
                && localStorage.getItem("item311") === null
                && localStorage.getItem("item312") === null
                && localStorage.getItem("item313") === null
                && localStorage.getItem("item321") === null
                && localStorage.getItem("item322") === null
                && localStorage.getItem("item323") === null
                && localStorage.getItem("item331") === null
                && localStorage.getItem("item332") === null
                && localStorage.getItem("item333") === null
                && localStorage.getItem("item341") === null
                && localStorage.getItem("item342") === null
                && localStorage.getItem("item343") === null
                && localStorage.getItem("item351") === null
                && localStorage.getItem("item352") === null
                && localStorage.getItem("item353") === null
                && localStorage.getItem("item411") === null
                && localStorage.getItem("item412") === null
                && localStorage.getItem("item413") === null
                && localStorage.getItem("item421") === null
                && localStorage.getItem("item422") === null
                && localStorage.getItem("item423") === null
                && localStorage.getItem("item511") === null
                && localStorage.getItem("item512") === null
                && localStorage.getItem("item513") === null
                && localStorage.getItem("item521") === null
                && localStorage.getItem("item522") === null
                && localStorage.getItem("item523") === null
            ) {
                localStorage.setItem("progressOverall", "0");
                localStorage.setItem("progressCOSO1", "0");
                localStorage.setItem("progressCOSO2", "0");
                localStorage.setItem("progressCOSO3", "0");
                localStorage.setItem("progressCOSO4", "0");
                localStorage.setItem("progressCOSO5", "0");
                localStorage.setItem("progressCOSO11", "0");
                localStorage.setItem("progressCOSO12", "0");
                localStorage.setItem("progressCOSO13", "0");
                localStorage.setItem("progressCOSO14", "0");
                localStorage.setItem("progressCOSO15", "0");
                localStorage.setItem("progressCOSO16", "0");
                localStorage.setItem("progressCOSO17", "0");
                localStorage.setItem("progressCOSO21", "0");
                localStorage.setItem("progressCOSO31", "0");
                localStorage.setItem("progressCOSO32", "0");
                localStorage.setItem("progressCOSO33", "0");
                localStorage.setItem("progressCOSO34", "0");
                localStorage.setItem("progressCOSO35", "0");
                localStorage.setItem("progressCOSO41", "0");
                localStorage.setItem("progressCOSO42", "0");
                localStorage.setItem("progressCOSO51", "0");
                localStorage.setItem("progressCOSO52", "0");
                localStorage.setItem("item111", "empty");
                localStorage.setItem("item112", "empty");
                localStorage.setItem("item113", "empty");
                localStorage.setItem("item121", "empty");
                localStorage.setItem("item122", "empty");
                localStorage.setItem("item123", "empty");
                localStorage.setItem("item131", "empty");
                localStorage.setItem("item132", "empty");
                localStorage.setItem("item133", "empty");
                localStorage.setItem("item141", "empty");
                localStorage.setItem("item142", "empty");
                localStorage.setItem("item143", "empty");
                localStorage.setItem("item151", "empty");
                localStorage.setItem("item152", "empty");
                localStorage.setItem("item153", "empty");
                localStorage.setItem("item161", "empty");
                localStorage.setItem("item162", "empty");
                localStorage.setItem("item163", "empty");
                localStorage.setItem("item171", "empty");
                localStorage.setItem("item172", "empty");
                localStorage.setItem("item173", "empty");
                localStorage.setItem("item211", "empty");
                localStorage.setItem("item212", "empty");
                localStorage.setItem("item213", "empty");
                localStorage.setItem("item311", "empty");
                localStorage.setItem("item312", "empty");
                localStorage.setItem("item313", "empty");
                localStorage.setItem("item321", "empty");
                localStorage.setItem("item322", "empty");
                localStorage.setItem("item323", "empty");
                localStorage.setItem("item331", "empty");
                localStorage.setItem("item332", "empty");
                localStorage.setItem("item333", "empty");
                localStorage.setItem("item341", "empty");
                localStorage.setItem("item342", "empty");
                localStorage.setItem("item343", "empty");
                localStorage.setItem("item351", "empty");
                localStorage.setItem("item352", "empty");
                localStorage.setItem("item353", "empty");
                localStorage.setItem("item411", "empty");
                localStorage.setItem("item412", "empty");
                localStorage.setItem("item413", "empty");
                localStorage.setItem("item421", "empty");
                localStorage.setItem("item422", "empty");
                localStorage.setItem("item423", "empty");
                localStorage.setItem("item511", "empty");
                localStorage.setItem("item512", "empty");
                localStorage.setItem("item513", "empty");
                localStorage.setItem("item521", "empty");
                localStorage.setItem("item522", "empty");
                localStorage.setItem("item523", "empty");
            }

            window.open("/home.html", "_self");
        } else {
            console.log("Storage not supported!");
        }
    });
}

function welcome() {
    notLoginCheck();
    updateProgress();

    if (typeof(Storage) !== "undefined") {
        if (localStorage.getItem("showLoginToast") === "true") {
            const loginToast = document.getElementById('loginToast');
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(loginToast);
            toastBootstrap.show();
            localStorage.removeItem("showLoginToast");
        }

        if (localStorage.getItem("showResetToast") === "true") {
            const resetToast = document.getElementById('resetToast');
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(resetToast);
            toastBootstrap.show();
            localStorage.removeItem("showResetToast");
        }

        var namaCabang = localStorage.getItem("namaCabang");
        var kodeCabang = localStorage.getItem("kodeCabang");

        var welcome = document.getElementById("welcome");
        welcome.innerText = "Halo, " + namaCabang;

        var home = document.getElementById("home");
        home.innerHTML += "Home - " + namaCabang + " (" + kodeCabang + ")";

        var progressOverall = document.getElementById("progressOverall");
        var progressOverallLabel = document.getElementById("progressOverallLabel");
        var progressCOSO1 = document.getElementById("progressCOSO1");
        var progressCOSO2 = document.getElementById("progressCOSO2");
        var progressCOSO3 = document.getElementById("progressCOSO3");
        var progressCOSO4 = document.getElementById("progressCOSO4");
        var progressCOSO5 = document.getElementById("progressCOSO5");

        if (
            localStorage.getItem("progressOverall") !== null
            && localStorage.getItem("progressCOSO1") !== null
            && localStorage.getItem("progressCOSO2") !== null
            && localStorage.getItem("progressCOSO3") !== null
            && localStorage.getItem("progressCOSO4") !== null
            && localStorage.getItem("progressCOSO5") !== null
        ) {
            progressOverall.style.width = localStorage.getItem("progressOverall") + "%";
            progressOverallLabel.innerText = "Overall Progress (" + localStorage.getItem("progressOverall") + "%)";
            progressCOSO1.innerText = localStorage.getItem("progressCOSO1") + "%";
            progressCOSO2.innerText = localStorage.getItem("progressCOSO2") + "%";
            progressCOSO3.innerText = localStorage.getItem("progressCOSO3") + "%";
            progressCOSO4.innerText = localStorage.getItem("progressCOSO4") + "%";
            progressCOSO5.innerText = localStorage.getItem("progressCOSO5") + "%";
        }
    } else {
        console.log("Storage not supported!");
    }
}

function resetData() {
    var resetDataButton = document.getElementById("buttonResetData");
    resetDataButton.innerHTML += '<div class="spinner-border spinner-border-sm text-light ms-2" role="status"><span class="visually-hidden"></span></div>';

    sleep(3000).then(() => {
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem("progressOverall", "0");
            localStorage.setItem("progressCOSO1", "0");
            localStorage.setItem("progressCOSO2", "0");
            localStorage.setItem("progressCOSO3", "0");
            localStorage.setItem("progressCOSO4", "0");
            localStorage.setItem("progressCOSO5", "0");
            localStorage.setItem("progressCOSO11", "0");
            localStorage.setItem("progressCOSO12", "0");
            localStorage.setItem("progressCOSO13", "0");
            localStorage.setItem("progressCOSO14", "0");
            localStorage.setItem("progressCOSO15", "0");
            localStorage.setItem("progressCOSO16", "0");
            localStorage.setItem("progressCOSO17", "0");
            localStorage.setItem("progressCOSO21", "0");
            localStorage.setItem("progressCOSO31", "0");
            localStorage.setItem("progressCOSO32", "0");
            localStorage.setItem("progressCOSO33", "0");
            localStorage.setItem("progressCOSO34", "0");
            localStorage.setItem("progressCOSO35", "0");
            localStorage.setItem("progressCOSO41", "0");
            localStorage.setItem("progressCOSO42", "0");
            localStorage.setItem("progressCOSO51", "0");
            localStorage.setItem("progressCOSO52", "0");
            localStorage.setItem("item111", "empty");
            localStorage.setItem("item112", "empty");
            localStorage.setItem("item113", "empty");
            localStorage.setItem("item121", "empty");
            localStorage.setItem("item122", "empty");
            localStorage.setItem("item123", "empty");
            localStorage.setItem("item131", "empty");
            localStorage.setItem("item132", "empty");
            localStorage.setItem("item133", "empty");
            localStorage.setItem("item141", "empty");
            localStorage.setItem("item142", "empty");
            localStorage.setItem("item143", "empty");
            localStorage.setItem("item151", "empty");
            localStorage.setItem("item152", "empty");
            localStorage.setItem("item153", "empty");
            localStorage.setItem("item161", "empty");
            localStorage.setItem("item162", "empty");
            localStorage.setItem("item163", "empty");
            localStorage.setItem("item171", "empty");
            localStorage.setItem("item172", "empty");
            localStorage.setItem("item173", "empty");
            localStorage.setItem("item211", "empty");
            localStorage.setItem("item212", "empty");
            localStorage.setItem("item213", "empty");
            localStorage.setItem("item311", "empty");
            localStorage.setItem("item312", "empty");
            localStorage.setItem("item313", "empty");
            localStorage.setItem("item321", "empty");
            localStorage.setItem("item322", "empty");
            localStorage.setItem("item323", "empty");
            localStorage.setItem("item331", "empty");
            localStorage.setItem("item332", "empty");
            localStorage.setItem("item333", "empty");
            localStorage.setItem("item341", "empty");
            localStorage.setItem("item342", "empty");
            localStorage.setItem("item343", "empty");
            localStorage.setItem("item351", "empty");
            localStorage.setItem("item352", "empty");
            localStorage.setItem("item353", "empty");
            localStorage.setItem("item411", "empty");
            localStorage.setItem("item412", "empty");
            localStorage.setItem("item413", "empty");
            localStorage.setItem("item421", "empty");
            localStorage.setItem("item422", "empty");
            localStorage.setItem("item423", "empty");
            localStorage.setItem("item511", "empty");
            localStorage.setItem("item512", "empty");
            localStorage.setItem("item513", "empty");
            localStorage.setItem("item521", "empty");
            localStorage.setItem("item522", "empty");
            localStorage.setItem("item523", "empty");
            localStorage.setItem("showResetToast", true);
            window.open("/home.html", "_self");
        } else {
            console.log("Storage not supported!");
        }
    });
}

function coso1home(){
    notLoginCheck();
    updateProgress();

    if (typeof(Storage) !== "undefined") {
        var namaCabang = localStorage.getItem("namaCabang");
        var kodeCabang = localStorage.getItem("kodeCabang");

        var home = document.getElementById("home");
        home.innerHTML += "Home - " + namaCabang + " (" + kodeCabang + ")";

        var progressCOSO1 = document.getElementById("progressCOSO1");
        var progressCOSO2 = document.getElementById("progressCOSO2");
        var progressCOSO3 = document.getElementById("progressCOSO3");
        var progressCOSO4 = document.getElementById("progressCOSO4");
        var progressCOSO5 = document.getElementById("progressCOSO5");

        var progressCOSO11 = document.getElementById("progressCOSO11");
        var progressCOSO12 = document.getElementById("progressCOSO12");
        var progressCOSO13 = document.getElementById("progressCOSO13");
        var progressCOSO14 = document.getElementById("progressCOSO14");
        var progressCOSO15 = document.getElementById("progressCOSO15");
        var progressCOSO16 = document.getElementById("progressCOSO16");
        var progressCOSO17 = document.getElementById("progressCOSO17");

        if (
            localStorage.getItem("progressOverall") !== null
            && localStorage.getItem("progressCOSO1") !== null
            && localStorage.getItem("progressCOSO2") !== null
            && localStorage.getItem("progressCOSO3") !== null
            && localStorage.getItem("progressCOSO4") !== null
            && localStorage.getItem("progressCOSO5") !== null
            && localStorage.getItem("progressCOSO11") !== null
            && localStorage.getItem("progressCOSO12") !== null
            && localStorage.getItem("progressCOSO13") !== null
            && localStorage.getItem("progressCOSO14") !== null
            && localStorage.getItem("progressCOSO15") !== null
            && localStorage.getItem("progressCOSO16") !== null
            && localStorage.getItem("progressCOSO17") !== null
        ) {
            home.innerHTML += " - OVR Progress : " + localStorage.getItem("progressOverall") + "%";
            progressCOSO1.innerText = localStorage.getItem("progressCOSO1") + "%";
            progressCOSO2.innerText = localStorage.getItem("progressCOSO2") + "%";
            progressCOSO3.innerText = localStorage.getItem("progressCOSO3") + "%";
            progressCOSO4.innerText = localStorage.getItem("progressCOSO4") + "%";
            progressCOSO5.innerText = localStorage.getItem("progressCOSO5") + "%";
            progressCOSO11.innerText = localStorage.getItem("progressCOSO11") + "/3";
            progressCOSO12.innerText = localStorage.getItem("progressCOSO12") + "/3";
            progressCOSO13.innerText = localStorage.getItem("progressCOSO13") + "/3";
            progressCOSO14.innerText = localStorage.getItem("progressCOSO14") + "/3";
            progressCOSO15.innerText = localStorage.getItem("progressCOSO15") + "/3";
            progressCOSO16.innerText = localStorage.getItem("progressCOSO16") + "/3";
            progressCOSO17.innerText = localStorage.getItem("progressCOSO17") + "/3";
        }
    } else {
        console.log("Storage not supported!");
    }
}

function coso2home(){
    notLoginCheck();
    updateProgress();

    if (typeof(Storage) !== "undefined") {
        var namaCabang = localStorage.getItem("namaCabang");
        var kodeCabang = localStorage.getItem("kodeCabang");

        var home = document.getElementById("home");
        home.innerHTML += "Home - " + namaCabang + " (" + kodeCabang + ")";

        var progressCOSO1 = document.getElementById("progressCOSO1");
        var progressCOSO2 = document.getElementById("progressCOSO2");
        var progressCOSO3 = document.getElementById("progressCOSO3");
        var progressCOSO4 = document.getElementById("progressCOSO4");
        var progressCOSO5 = document.getElementById("progressCOSO5");

        var progressCOSO21 = document.getElementById("progressCOSO21");

        if (
            localStorage.getItem("progressOverall") !== null
            && localStorage.getItem("progressCOSO1") !== null
            && localStorage.getItem("progressCOSO2") !== null
            && localStorage.getItem("progressCOSO3") !== null
            && localStorage.getItem("progressCOSO4") !== null
            && localStorage.getItem("progressCOSO5") !== null
            && localStorage.getItem("progressCOSO21") !== null
        ) {
            home.innerHTML += " - OVR Progress : " + localStorage.getItem("progressOverall") + "%";
            progressCOSO1.innerText = localStorage.getItem("progressCOSO1") + "%";
            progressCOSO2.innerText = localStorage.getItem("progressCOSO2") + "%";
            progressCOSO3.innerText = localStorage.getItem("progressCOSO3") + "%";
            progressCOSO4.innerText = localStorage.getItem("progressCOSO4") + "%";
            progressCOSO5.innerText = localStorage.getItem("progressCOSO5") + "%";
            progressCOSO21.innerText = localStorage.getItem("progressCOSO21") + "/3";
        }
    } else {
        console.log("Storage not supported!");
    }
}

function coso3home(){
    notLoginCheck();
    updateProgress();

    if (typeof(Storage) !== "undefined") {
        var namaCabang = localStorage.getItem("namaCabang");
        var kodeCabang = localStorage.getItem("kodeCabang");

        var home = document.getElementById("home");
        home.innerHTML += "Home - " + namaCabang + " (" + kodeCabang + ")";

        var progressCOSO1 = document.getElementById("progressCOSO1");
        var progressCOSO2 = document.getElementById("progressCOSO2");
        var progressCOSO3 = document.getElementById("progressCOSO3");
        var progressCOSO4 = document.getElementById("progressCOSO4");
        var progressCOSO5 = document.getElementById("progressCOSO5");

        var progressCOSO31 = document.getElementById("progressCOSO31");
        var progressCOSO32 = document.getElementById("progressCOSO32");
        var progressCOSO33 = document.getElementById("progressCOSO33");
        var progressCOSO34 = document.getElementById("progressCOSO34");
        var progressCOSO35 = document.getElementById("progressCOSO35");

        if (
            localStorage.getItem("progressOverall") !== null
            && localStorage.getItem("progressCOSO1") !== null
            && localStorage.getItem("progressCOSO2") !== null
            && localStorage.getItem("progressCOSO3") !== null
            && localStorage.getItem("progressCOSO4") !== null
            && localStorage.getItem("progressCOSO5") !== null
            && localStorage.getItem("progressCOSO31") !== null
            && localStorage.getItem("progressCOSO32") !== null
            && localStorage.getItem("progressCOSO33") !== null
            && localStorage.getItem("progressCOSO34") !== null
            && localStorage.getItem("progressCOSO35") !== null
        ) {
            home.innerHTML += " - OVR Progress : " + localStorage.getItem("progressOverall") + "%";
            progressCOSO1.innerText = localStorage.getItem("progressCOSO1") + "%";
            progressCOSO2.innerText = localStorage.getItem("progressCOSO2") + "%";
            progressCOSO3.innerText = localStorage.getItem("progressCOSO3") + "%";
            progressCOSO4.innerText = localStorage.getItem("progressCOSO4") + "%";
            progressCOSO5.innerText = localStorage.getItem("progressCOSO5") + "%";
            progressCOSO31.innerText = localStorage.getItem("progressCOSO31") + "/3";
            progressCOSO32.innerText = localStorage.getItem("progressCOSO32") + "/3";
            progressCOSO33.innerText = localStorage.getItem("progressCOSO33") + "/3";
            progressCOSO34.innerText = localStorage.getItem("progressCOSO34") + "/3";
            progressCOSO35.innerText = localStorage.getItem("progressCOSO35") + "/3";
        }
    } else {
        console.log("Storage not supported!");
    }
}

function coso4home(){
    notLoginCheck();
    updateProgress();

    if (typeof(Storage) !== "undefined") {
        var namaCabang = localStorage.getItem("namaCabang");
        var kodeCabang = localStorage.getItem("kodeCabang");

        var home = document.getElementById("home");
        home.innerHTML += "Home - " + namaCabang + " (" + kodeCabang + ")";

        var progressCOSO1 = document.getElementById("progressCOSO1");
        var progressCOSO2 = document.getElementById("progressCOSO2");
        var progressCOSO3 = document.getElementById("progressCOSO3");
        var progressCOSO4 = document.getElementById("progressCOSO4");
        var progressCOSO5 = document.getElementById("progressCOSO5");

        var progressCOSO41 = document.getElementById("progressCOSO41");
        var progressCOSO42 = document.getElementById("progressCOSO42");

        if (
            localStorage.getItem("progressOverall") !== null
            && localStorage.getItem("progressCOSO1") !== null
            && localStorage.getItem("progressCOSO2") !== null
            && localStorage.getItem("progressCOSO3") !== null
            && localStorage.getItem("progressCOSO4") !== null
            && localStorage.getItem("progressCOSO5") !== null
            && localStorage.getItem("progressCOSO41") !== null
            && localStorage.getItem("progressCOSO42") !== null
        ) {
            home.innerHTML += " - OVR Progress : " + localStorage.getItem("progressOverall") + "%";
            progressCOSO1.innerText = localStorage.getItem("progressCOSO1") + "%";
            progressCOSO2.innerText = localStorage.getItem("progressCOSO2") + "%";
            progressCOSO3.innerText = localStorage.getItem("progressCOSO3") + "%";
            progressCOSO4.innerText = localStorage.getItem("progressCOSO4") + "%";
            progressCOSO5.innerText = localStorage.getItem("progressCOSO5") + "%";
            progressCOSO41.innerText = localStorage.getItem("progressCOSO41") + "/3";
            progressCOSO42.innerText = localStorage.getItem("progressCOSO42") + "/3";
        }
    } else {
        console.log("Storage not supported!");
    }
}

function coso5home(){
    notLoginCheck();
    updateProgress();

    if (typeof(Storage) !== "undefined") {
        var namaCabang = localStorage.getItem("namaCabang");
        var kodeCabang = localStorage.getItem("kodeCabang");

        var home = document.getElementById("home");
        home.innerHTML += "Home - " + namaCabang + " (" + kodeCabang + ")";

        var progressCOSO1 = document.getElementById("progressCOSO1");
        var progressCOSO2 = document.getElementById("progressCOSO2");
        var progressCOSO3 = document.getElementById("progressCOSO3");
        var progressCOSO4 = document.getElementById("progressCOSO4");
        var progressCOSO5 = document.getElementById("progressCOSO5");

        var progressCOSO51 = document.getElementById("progressCOSO51");
        var progressCOSO52 = document.getElementById("progressCOSO52");

        if (
            localStorage.getItem("progressOverall") !== null
            && localStorage.getItem("progressCOSO1") !== null
            && localStorage.getItem("progressCOSO2") !== null
            && localStorage.getItem("progressCOSO3") !== null
            && localStorage.getItem("progressCOSO4") !== null
            && localStorage.getItem("progressCOSO5") !== null
            && localStorage.getItem("progressCOSO51") !== null
            && localStorage.getItem("progressCOSO52") !== null
        ) {
            home.innerHTML += " - OVR Progress : " + localStorage.getItem("progressOverall") + "%";
            progressCOSO1.innerText = localStorage.getItem("progressCOSO1") + "%";
            progressCOSO2.innerText = localStorage.getItem("progressCOSO2") + "%";
            progressCOSO3.innerText = localStorage.getItem("progressCOSO3") + "%";
            progressCOSO4.innerText = localStorage.getItem("progressCOSO4") + "%";
            progressCOSO5.innerText = localStorage.getItem("progressCOSO5") + "%";
            progressCOSO51.innerText = localStorage.getItem("progressCOSO51") + "/3";
            progressCOSO52.innerText = localStorage.getItem("progressCOSO52") + "/3";
        }
    } else {
        console.log("Storage not supported!");
    }
}

function showKuesioner() {
    notLoginCheck();
    updateProgress();

    if (typeof(Storage) !== "undefined") {
        var namaCabang = localStorage.getItem("namaCabang");
        var kodeCabang = localStorage.getItem("kodeCabang");

        var progressCOSO11 = document.getElementById("progressCOSO11");
        var progressCOSO12 = document.getElementById("progressCOSO12");
        var progressCOSO13 = document.getElementById("progressCOSO13");
        var progressCOSO14 = document.getElementById("progressCOSO14");
        var progressCOSO15 = document.getElementById("progressCOSO15");
        var progressCOSO16 = document.getElementById("progressCOSO16");
        var progressCOSO17 = document.getElementById("progressCOSO17");
        var progressCOSO21 = document.getElementById("progressCOSO21");
        var progressCOSO31 = document.getElementById("progressCOSO31");
        var progressCOSO32 = document.getElementById("progressCOSO32");
        var progressCOSO33 = document.getElementById("progressCOSO33");
        var progressCOSO34 = document.getElementById("progressCOSO34");
        var progressCOSO35 = document.getElementById("progressCOSO35");
        var progressCOSO41 = document.getElementById("progressCOSO41");
        var progressCOSO42 = document.getElementById("progressCOSO42");
        var progressCOSO51 = document.getElementById("progressCOSO51");
        var progressCOSO52 = document.getElementById("progressCOSO52");

        var home = document.getElementById("home");
        home.innerHTML += "Home - " + namaCabang + " (" + kodeCabang + ")";

        if (localStorage.getItem("progressOverall") !== null) {
            home.innerHTML += " - OVR Progress : " + localStorage.getItem("progressOverall") + "%";
        }

        if(
            localStorage.getItem("progressCOSO11") !== null
            && localStorage.getItem("progressCOSO12") !== null 
            && localStorage.getItem("progressCOSO13") !== null
            && localStorage.getItem("progressCOSO14") !== null
            && localStorage.getItem("progressCOSO15") !== null
            && localStorage.getItem("progressCOSO16") !== null
            && localStorage.getItem("progressCOSO17") !== null
            && localStorage.getItem("progressCOSO21") !== null
            && localStorage.getItem("progressCOSO31") !== null
            && localStorage.getItem("progressCOSO32") !== null
            && localStorage.getItem("progressCOSO33") !== null
            && localStorage.getItem("progressCOSO34") !== null
            && localStorage.getItem("progressCOSO35") !== null
            && localStorage.getItem("progressCOSO41") !== null
            && localStorage.getItem("progressCOSO42") !== null
            && localStorage.getItem("progressCOSO51") !== null
            && localStorage.getItem("progressCOSO52") !== null
        ) {
            progressCOSO11.innerText += " (terisi " + localStorage.getItem("progressCOSO11") + " dari 3)";
            progressCOSO12.innerText += " (terisi " + localStorage.getItem("progressCOSO12") + " dari 3)";
            progressCOSO13.innerText += " (terisi " + localStorage.getItem("progressCOSO13") + " dari 3)";
            progressCOSO14.innerText += " (terisi " + localStorage.getItem("progressCOSO14") + " dari 3)";
            progressCOSO15.innerText += " (terisi " + localStorage.getItem("progressCOSO15") + " dari 3)";
            progressCOSO16.innerText += " (terisi " + localStorage.getItem("progressCOSO16") + " dari 3)";
            progressCOSO17.innerText += " (terisi " + localStorage.getItem("progressCOSO17") + " dari 3)";
            progressCOSO21.innerText += " (terisi " + localStorage.getItem("progressCOSO21") + " dari 3)";
            progressCOSO31.innerText += " (terisi " + localStorage.getItem("progressCOSO31") + " dari 3)";
            progressCOSO32.innerText += " (terisi " + localStorage.getItem("progressCOSO32") + " dari 3)";
            progressCOSO33.innerText += " (terisi " + localStorage.getItem("progressCOSO33") + " dari 3)";
            progressCOSO34.innerText += " (terisi " + localStorage.getItem("progressCOSO34") + " dari 3)";
            progressCOSO35.innerText += " (terisi " + localStorage.getItem("progressCOSO35") + " dari 3)";
            progressCOSO41.innerText += " (terisi " + localStorage.getItem("progressCOSO41") + " dari 3)";
            progressCOSO42.innerText += " (terisi " + localStorage.getItem("progressCOSO42") + " dari 3)";
            progressCOSO51.innerText += " (terisi " + localStorage.getItem("progressCOSO51") + " dari 3)";
            progressCOSO52.innerText += " (terisi " + localStorage.getItem("progressCOSO52") + " dari 3)";
        }

        if(localStorage.getItem("progressCOSO11") === "3") {
            progressCOSO11.innerText = "COSO 1 - Kuesioner 1 (selesai)";
        }
        if(localStorage.getItem("progressCOSO12") === "3") {
            progressCOSO12.innerText = "COSO 1 - Kuesioner 2 (selesai)";
        }
        if(localStorage.getItem("progressCOSO13") === "3") {
            progressCOSO13.innerText = "COSO 1 - Kuesioner 3 (selesai)";
        }
        if(localStorage.getItem("progressCOSO14") === "3") {
            progressCOSO14.innerText = "COSO 1 - Kuesioner 4 (selesai)";
        }
        if(localStorage.getItem("progressCOSO15") === "3") {
            progressCOSO15.innerText = "COSO 1 - Kuesioner 5 (selesai)";
        }
        if(localStorage.getItem("progressCOSO16") === "3") {
            progressCOSO16.innerText = "COSO 1 - Kuesioner 6 (selesai)";
        }
        if(localStorage.getItem("progressCOSO17") === "3") {
            progressCOSO17.innerText = "COSO 1 - Kuesioner 7 (selesai)";
        }
        if(localStorage.getItem("progressCOSO21") === "3") {
            progressCOSO21.innerText = "COSO 2 - Kuesioner 1 (selesai)";
        }
        if(localStorage.getItem("progressCOSO31") === "3") {
            progressCOSO31.innerText = "COSO 3 - Kuesioner 1 (selesai)";
        }
        if(localStorage.getItem("progressCOSO32") === "3") {
            progressCOSO32.innerText = "COSO 3 - Kuesioner 2 (selesai)";
        }
        if(localStorage.getItem("progressCOSO33") === "3") {
            progressCOSO33.innerText = "COSO 3 - Kuesioner 3 (selesai)";
        }
        if(localStorage.getItem("progressCOSO34") === "3") {
            progressCOSO34.innerText = "COSO 3 - Kuesioner 4 (selesai)";
        }
        if(localStorage.getItem("progressCOSO35") === "3") {
            progressCOSO35.innerText = "COSO 3 - Kuesioner 5 (selesai)";
        }
        if(localStorage.getItem("progressCOSO41") === "3") {
            progressCOSO41.innerText = "COSO 4 - Kuesioner 1 (selesai)";
        }
        if(localStorage.getItem("progressCOSO42") === "3") {
            progressCOSO42.innerText = "COSO 4 - Kuesioner 2 (selesai)";
        }
        if(localStorage.getItem("progressCOSO51") === "3") {
            progressCOSO51.innerText = "COSO 5 - Kuesioner 1 (selesai)";
        }
        if(localStorage.getItem("progressCOSO52") === "3") {
            progressCOSO52.innerText = "COSO 5 - Kuesioner 2 (selesai)";
        }
    } else {
        console.log("Storage not supported!");
    }
}

function updateProgress() {
    var progressCOSO1 = Math.floor((
        parseInt(localStorage.getItem("progressCOSO11"))
        + parseInt(localStorage.getItem("progressCOSO12"))
        + parseInt(localStorage.getItem("progressCOSO13"))
        + parseInt(localStorage.getItem("progressCOSO14"))
        + parseInt(localStorage.getItem("progressCOSO15"))
        + parseInt(localStorage.getItem("progressCOSO16"))
        + parseInt(localStorage.getItem("progressCOSO17"))
    ) / 21 * 100);

    var progressCOSO2 = Math.floor((
        parseInt(localStorage.getItem("progressCOSO21"))
    ) / 3 * 100);

    var progressCOSO3 = Math.floor((
        parseInt(localStorage.getItem("progressCOSO31"))
        + parseInt(localStorage.getItem("progressCOSO32"))
        + parseInt(localStorage.getItem("progressCOSO33"))
        + parseInt(localStorage.getItem("progressCOSO34"))
        + parseInt(localStorage.getItem("progressCOSO35"))
    ) / 15 * 100);

    var progressCOSO4 = Math.floor((
        parseInt(localStorage.getItem("progressCOSO41"))
        + parseInt(localStorage.getItem("progressCOSO42"))
    ) / 6 * 100);

    var progressCOSO5 = Math.floor((
        parseInt(localStorage.getItem("progressCOSO51"))
        + parseInt(localStorage.getItem("progressCOSO52"))
    ) / 6 * 100);

    var progressOverall = Math.floor((
        parseInt(localStorage.getItem("progressCOSO11"))
        + parseInt(localStorage.getItem("progressCOSO12"))
        + parseInt(localStorage.getItem("progressCOSO13"))
        + parseInt(localStorage.getItem("progressCOSO14"))
        + parseInt(localStorage.getItem("progressCOSO15"))
        + parseInt(localStorage.getItem("progressCOSO16"))
        + parseInt(localStorage.getItem("progressCOSO17"))
        + parseInt(localStorage.getItem("progressCOSO21"))
        + parseInt(localStorage.getItem("progressCOSO31"))
        + parseInt(localStorage.getItem("progressCOSO32"))
        + parseInt(localStorage.getItem("progressCOSO33"))
        + parseInt(localStorage.getItem("progressCOSO34"))
        + parseInt(localStorage.getItem("progressCOSO35"))
        + parseInt(localStorage.getItem("progressCOSO41"))
        + parseInt(localStorage.getItem("progressCOSO42"))
        + parseInt(localStorage.getItem("progressCOSO51"))
        + parseInt(localStorage.getItem("progressCOSO52"))
    ) / 51 * 100);

    localStorage.setItem("progressCOSO1", progressCOSO1);
    localStorage.setItem("progressCOSO2", progressCOSO2);
    localStorage.setItem("progressCOSO3", progressCOSO3);
    localStorage.setItem("progressCOSO4", progressCOSO4);
    localStorage.setItem("progressCOSO5", progressCOSO5);
    localStorage.setItem("progressOverall", progressOverall);

    if (localStorage.getItem("progressCOSO1") == 100) {
        if (document.getElementById("progressCOSO1").classList.contains("bg-danger")) {
            document.getElementById("progressCOSO1").classList.remove("bg-danger");
            document.getElementById("progressCOSO1").classList.add("bg-success");
        } else {
            document.getElementById("progressCOSO1").classList.add("bg-success");
        }
    }

    if (localStorage.getItem("progressCOSO2") == 100) {
        if (document.getElementById("progressCOSO2").classList.contains("bg-danger")) {
            document.getElementById("progressCOSO2").classList.remove("bg-danger");
            document.getElementById("progressCOSO2").classList.add("bg-success");
        } else {
            document.getElementById("progressCOSO2").classList.add("bg-success");
        }
    }

    if (localStorage.getItem("progressCOSO3") == 100) {
        if (document.getElementById("progressCOSO3").classList.contains("bg-danger")) {
            document.getElementById("progressCOSO3").classList.remove("bg-danger");
            document.getElementById("progressCOSO3").classList.add("bg-success");
        } else {
            document.getElementById("progressCOSO3").classList.add("bg-success");
        }
    }

    if (localStorage.getItem("progressCOSO4") == 100) {
        if (document.getElementById("progressCOSO4").classList.contains("bg-danger")) {
            document.getElementById("progressCOSO4").classList.remove("bg-danger");
            document.getElementById("progressCOSO4").classList.add("bg-success");
        } else {
            document.getElementById("progressCOSO4").classList.add("bg-success");
        }
    }

    if (localStorage.getItem("progressCOSO5") == 100) {
        if (document.getElementById("progressCOSO5").classList.contains("bg-danger")) {
            document.getElementById("progressCOSO5").classList.remove("bg-danger");
            document.getElementById("progressCOSO5").classList.add("bg-success");
        } else {
            document.getElementById("progressCOSO5").classList.add("bg-success");
        }
    }
}

function logout() {
    var logoutButton = document.getElementById("logout");
    logoutButton.innerHTML += '<div class="spinner-border spinner-border-sm text-light ms-2" role="status"><span class="visually-hidden"></span></div>';

    sleep(3000).then(() => {
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem("loginStatus", false);
            localStorage.removeItem("namaCabang");
            localStorage.removeItem("kodeCabang");
            localStorage.setItem("showLogoutToast", true);
            window.open("/index.html", "_self");
        } else {
            console.log("Storage not supported!");
        }
    });
}