function show() {
    var showResultButton = document.getElementById("showResult");
    showResultButton.innerHTML += '<div class="spinner-border spinner-border-sm text-light ms-2" role="status"><span class="visually-hidden"></span></div>';

    sleep(3000).then(() => {
        var ePassword = document.getElementById("password");
        var password = ePassword.value;

        sha256(password).then(hash => {
            if (hash === "498917ac1eee2c8a9881002ea3ee810c773d8d14ebdb63387e1ae61a92891a90") {
                execute();
            } else {
                var timestamp = document.getElementById("timestamp");

                const now = new Date();
                var hours = now.getHours().toString();
                var minutes = now.getMinutes().toString();

                if (hours.length == 1) {
                    hours = "0" + hours;
                }

                if (minutes.length == 1) {
                    minutes = "0" + minutes;
                }

                timestamp.innerText = hours + " : " + minutes;

                removeElementsByClass("spinner-border spinner-border-sm text-light ms-2");
                const passwordSalahToast = document.getElementById('passwordSalahToast');
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(passwordSalahToast);
                toastBootstrap.show();
            }
        });

        function execute() {
            var eFile = document.getElementById("jsonFile");
            var file = eFile.files[0];
            
            var reader = new FileReader();
            reader.readAsText(file);
            
            reader.onload = function(event) {
                var json = JSON.parse(event.target.result);

                document.getElementById("loginForm").remove();
                document.getElementById("resultHeader").removeAttribute("hidden");
                document.getElementById("resultBody").removeAttribute("hidden");

                document.getElementById("header").innerText = json.namaCabang + ' (' + json.kodeCabang + ')';
                document.getElementById("subHeader").innerText += ' ' + json.namaCabang;

                function updateItem(json, itemNumber) {
                    const item = json['item' + itemNumber];

                    if (item.status === true) {
                        document.getElementById("status" + itemNumber).innerHTML = '<span class="badge text-bg-success">Sudah</span>';
                    } else {
                        document.getElementById("status" + itemNumber).innerHTML = '<span class="badge text-bg-danger">Belum</span>';
                    }
                    
                    if (item.rencana.length > 0) {
                        document.getElementById("rencana" + itemNumber).innerText = item.rencana;
                    } else {
                        document.getElementById("rencana" + itemNumber).innerText = "-";
                    }

                    if (item.target.length > 0) {
                        document.getElementById("target" + itemNumber).innerText = item.target;
                    } else {
                        document.getElementById("target" + itemNumber).innerText = "-";
                    }

                    if (item.bukti.length > 0) {
                        document.getElementById("bukti" + itemNumber).innerHTML = `<a href="${item.bukti}" target="_blank">${item.namaBukti}</a>`;
                    } else {
                        document.getElementById("bukti" + itemNumber).innerText = "-";
                    }
                }

                function setSkorKuesioner (json, kuesioner) {
                    const status1 = json['item' + kuesioner + '1'].status;
                    const status2 = json['item' + kuesioner + '2'].status;
                    const status3 = json['item' + kuesioner + '3'].status;

                    if (status1 === true && status2 === true && status3 === true) {
                        document.getElementById("skor" + kuesioner).innerText = "100";
                    } else if (status1 === true && status2 === true && status3 === false) {
                        document.getElementById("skor" + kuesioner).innerText = "80";
                    } else if (status1 === true && status2 === false && status3 === true) {
                        document.getElementById("skor" + kuesioner).innerText = "60";
                    } else if (status1 === false && status2 === true && status3 === true) {
                        document.getElementById("skor" + kuesioner).innerText = "40";
                    } else if (status1 === true && status2 === false && status3 === false) {
                        document.getElementById("skor" + kuesioner).innerText = "20";
                    } else if (status1 === false && status2 === true && status3 === false) {
                        document.getElementById("skor" + kuesioner).innerText = "20";
                    } else if (status1 === false && status2 === false && status3 === true) {
                        document.getElementById("skor" + kuesioner).innerText = "20";
                    } else if (status1 === false && status2 === false && status3 === false) {
                        document.getElementById("skor" + kuesioner).innerText = "0";
                    }
                }

                function setSkorAkhir (kuesioner) {
                    const skorKuesioner = document.getElementById("skor" + kuesioner).innerText;
                    const risiko = document.getElementById("risiko" + kuesioner).innerText;
                    const skorAkhir = document.getElementById("skorAkhir" + kuesioner);
                    
                    if (risiko === "H") {
                        skorAkhir.innerText = Math.floor(skorKuesioner * 100/100);
                    } else if (risiko === "MH") {
                        skorAkhir.innerText = Math.floor(skorKuesioner * 75/100); 
                    } else if (risiko === "M") {
                        skorAkhir.innerText = Math.floor(skorKuesioner * 50/100); 
                    } else if (risiko === "L") {
                        skorAkhir.innerText = Math.floor(skorKuesioner * 25/100); 
                    }
                }

                function setProfilRisiko () {
                    let totalSkorAkhir = 0;
                    const eProfilRisiko = document.getElementById("profilRisiko");

                    const kuesioners = [
                        11, 12, 13, 14, 15, 16, 17,
                        21,
                        31, 32, 33, 34, 35,
                        41, 42,
                        51, 52
                    ];

                    kuesioners.forEach(kuesioner => {
                        const skorAkhir = parseInt(document.getElementById("skorAkhir" + kuesioner).innerText);
                        totalSkorAkhir += skorAkhir;
                    });

                    if (totalSkorAkhir <= 1500 && totalSkorAkhir >= 1511) {
                        eProfilRisiko.innerText = "SANGAT BAIK";
                    } else if (totalSkorAkhir <= 1150 && totalSkorAkhir >= 651){
                        eProfilRisiko.innerText = "BAIK";
                    } else if (totalSkorAkhir <= 650 && totalSkorAkhir >= 351){
                        eProfilRisiko.innerText = "CUKUP BAIK";
                    } else if (totalSkorAkhir <= 350 && totalSkorAkhir >= 151){
                        eProfilRisiko.innerText = "TIDAK BAIK";
                    } else if (totalSkorAkhir <= 150 && totalSkorAkhir >= 0){
                        eProfilRisiko.innerText = "BURUK";
                    }

                    const scoreBar = totalSkorAkhir / 1500 * 100;
                    eProfilRisiko.innerText += " (" + scoreBar.toFixed(2) + "%)";

                    document.getElementById("scoreBar").style.width = scoreBar.toFixed(2) + "%";
                }

                const itemsToUpdate = [
                    111, 112, 113, 121, 122, 123, 131, 132, 133, 141, 142, 143, 151, 152, 153, 161, 162, 163, 171, 172, 173,
                    211, 212, 213,
                    311, 312, 313, 321, 322, 323, 331, 332, 333, 341, 342, 343, 351, 352, 353,
                    411, 412, 413, 421, 422, 423,
                    511, 512, 513, 521, 522, 523
                ];

                const kuesionerToUpdate = [
                    11, 12, 13, 14, 15, 16, 17,
                    21,
                    31, 32, 33, 34, 35,
                    41, 42,
                    51, 52
                ];

                itemsToUpdate.forEach(item => {
                    updateItem(json, item);
                });

                kuesionerToUpdate.forEach(kuesioner => {
                    setSkorKuesioner(json, kuesioner);
                    setSkorAkhir(kuesioner);
                });

                setProfilRisiko();
            };
        }
    });    
}

async function sha256(input) {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

$(document).ready(function(){
    $('[data-bs-toggle="tooltip"]').tooltip();
});

const toastElList = document.querySelectorAll('.toast')
const toastList = [...toastElList].map(toastEl => new bootstrap.Toast(toastEl, option))

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function exportAKUR() {
    var exportButton = document.getElementById("export");
    exportButton.innerHTML += '<div class="spinner-border spinner-border-sm text-light ms-2" role="status"><span class="visually-hidden"></span></div>';

    sleep(3000).then(() => {
        (async () => {
            try {
                const progressOverall = await bcas.getItem("progressOverall");
                const kodeCabang = await bcas.getItem("kodeCabang");
                const namaCabang = await bcas.getItem("namaCabang");
                const item111 = await bcas.getItem("item111");
                const item112 = await bcas.getItem("item112");
                const item113 = await bcas.getItem("item113");
                const item121 = await bcas.getItem("item121");
                const item122 = await bcas.getItem("item122");
                const item123 = await bcas.getItem("item123");
                const item131 = await bcas.getItem("item131");
                const item132 = await bcas.getItem("item132");
                const item133 = await bcas.getItem("item133");
                const item141 = await bcas.getItem("item141");
                const item142 = await bcas.getItem("item142");
                const item143 = await bcas.getItem("item143");
                const item151 = await bcas.getItem("item151");
                const item152 = await bcas.getItem("item152");
                const item153 = await bcas.getItem("item153");
                const item161 = await bcas.getItem("item161");
                const item162 = await bcas.getItem("item162");
                const item163 = await bcas.getItem("item163");
                const item171 = await bcas.getItem("item171");
                const item172 = await bcas.getItem("item172");
                const item173 = await bcas.getItem("item173");
                const item211 = await bcas.getItem("item211");
                const item212 = await bcas.getItem("item212");
                const item213 = await bcas.getItem("item213");
                const item311 = await bcas.getItem("item311");
                const item312 = await bcas.getItem("item312");
                const item313 = await bcas.getItem("item313");
                const item321 = await bcas.getItem("item321");
                const item322 = await bcas.getItem("item322");
                const item323 = await bcas.getItem("item323");
                const item331 = await bcas.getItem("item331");
                const item332 = await bcas.getItem("item332");
                const item333 = await bcas.getItem("item333");
                const item341 = await bcas.getItem("item341");
                const item342 = await bcas.getItem("item342");
                const item343 = await bcas.getItem("item343");
                const item351 = await bcas.getItem("item351");
                const item352 = await bcas.getItem("item352");
                const item353 = await bcas.getItem("item353");
                const item411 = await bcas.getItem("item411");
                const item412 = await bcas.getItem("item412");
                const item413 = await bcas.getItem("item413");
                const item421 = await bcas.getItem("item421");
                const item422 = await bcas.getItem("item422");
                const item423 = await bcas.getItem("item423");
                const item511 = await bcas.getItem("item511");
                const item512 = await bcas.getItem("item512");
                const item513 = await bcas.getItem("item513");
                const item521 = await bcas.getItem("item521");
                const item522 = await bcas.getItem("item522");
                const item523 = await bcas.getItem("item523");

                if (progressOverall === "100") {
                    const jsonString = `{"kodeCabang": "${kodeCabang}",
                    "namaCabang": "${namaCabang}",
                    "item111": ${item111},
                    "item112": ${item112},
                    "item113": ${item113},
                    "item121": ${item121},
                    "item122": ${item122},
                    "item123": ${item123},
                    "item131": ${item131},
                    "item132": ${item132},
                    "item133": ${item133},
                    "item141": ${item141},
                    "item142": ${item142},
                    "item143": ${item143},
                    "item151": ${item151},
                    "item152": ${item152},
                    "item153": ${item153},
                    "item161": ${item161},
                    "item162": ${item162},
                    "item163": ${item163},
                    "item171": ${item171},
                    "item172": ${item172},
                    "item173": ${item173},
                    "item211": ${item211},
                    "item212": ${item212},
                    "item213": ${item213},
                    "item311": ${item311},
                    "item312": ${item312},
                    "item313": ${item313},
                    "item321": ${item321},
                    "item322": ${item322},
                    "item323": ${item323},
                    "item331": ${item331},
                    "item332": ${item332},
                    "item333": ${item333},
                    "item341": ${item341},
                    "item342": ${item342},
                    "item343": ${item343},
                    "item351": ${item351},
                    "item352": ${item352},
                    "item353": ${item353},
                    "item411": ${item411},
                    "item412": ${item412},
                    "item413": ${item413},
                    "item421": ${item421},
                    "item422": ${item422},
                    "item423": ${item423},
                    "item511": ${item511},
                    "item512": ${item512},
                    "item513": ${item513},
                    "item521": ${item521},
                    "item522": ${item522},
                    "item523": ${item523}
                    }`;

                    var now = new Date();
                    var date = now.getDate().toString();
                    var monthNum = now.getMonth().toString();
                    var year = now.getFullYear().toString();
                    const month = ["01","02","03","04","05","06","07","08","09","10","11","12"];
                    var monthName = month[monthNum];
                    var fullDate = date + monthName + year;

                    const jsonData = JSON.parse(jsonString);
                    const blob = new Blob([JSON.stringify(jsonData)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);

                    const link = document.createElement('a');
                    link.href = url;
                    link.download = fullDate + '_AKUR_' + kodeCabang + '_' + namaCabang + '.json';
                    document.body.appendChild(link);

                    link.click();

                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);

                    alert("Hasil pengisian AKUR berhasil diekspor dalam bentuk JSON. Silahkan kirimkan file JSON yang telah diunduh kepada SKAI melalui Microsoft Teams untuk dilakukan review lebih lanjut!");
                    removeElementsByClass("spinner-border spinner-border-sm text-light ms-2");
                } else {
                    alert("Proses ekspor gagal dilakukan. Pastikan progress anda sudah 100% sebelum melakukan ekspor. Jika kendala terus berlanjut, hubungi SKAI untuk mendapatkan bantuan teknis!");
                    removeElementsByClass("spinner-border spinner-border-sm text-light ms-2");
                }
            } catch (error) {
                console.log(error);
            }
        })();
    })
}

function removeElementsByClass(className){
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function loginAdmin() {
    window.open("/result.html","_self");
}

function statusCheck() {
    (async () => {
        try {
            const loginStatus = await bcas.getItem("loginStatus");
            const showLogoutToast = await bcas.getItem("showLogoutToast");

            if (loginStatus === true) {
                window.open("/home.html","_self");
            }

            if (showLogoutToast === true) {
                const logoutToast = document.getElementById('logoutToast');
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(logoutToast);
                toastBootstrap.show();
                bcas.removeItem("showLogoutToast");
            }
        } catch (error) {
            console.log(error);
        }
    })();
}

function notLoginCheck() {
    (async () => {
        try {
            const loginStatus = await bcas.getItem("loginStatus");

            if (loginStatus === false || loginStatus === null) {
                window.open("/index.html","_self");
            }
        } catch (error) {
            console.log(error);
        }
    })();
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

        bcas.setItem("loginStatus", true);
        bcas.setItem("namaCabang", vNamaCabang);
        bcas.setItem("kodeCabang", vKodeCabang);
        bcas.setItem("showLoginToast", true);

        (async () => {
            try {
                const progressOverall = await bcas.getItem("progressOverall");
                const progressCOSO1 = await bcas.getItem("progressCOSO1");
                const progressCOSO2 = await bcas.getItem("progressCOSO2");
                const progressCOSO3 = await bcas.getItem("progressCOSO3");
                const progressCOSO4 = await bcas.getItem("progressCOSO4");
                const progressCOSO5 = await bcas.getItem("progressCOSO5");
                const progressCOSO11 = await bcas.getItem("progressCOSO11");
                const progressCOSO12 = await bcas.getItem("progressCOSO12");
                const progressCOSO13 = await bcas.getItem("progressCOSO13");
                const progressCOSO14 = await bcas.getItem("progressCOSO14");
                const progressCOSO15 = await bcas.getItem("progressCOSO15");
                const progressCOSO16 = await bcas.getItem("progressCOSO16");
                const progressCOSO17 = await bcas.getItem("progressCOSO17");
                const progressCOSO21 = await bcas.getItem("progressCOSO21");
                const progressCOSO31 = await bcas.getItem("progressCOSO31");
                const progressCOSO32 = await bcas.getItem("progressCOSO32");
                const progressCOSO33 = await bcas.getItem("progressCOSO33");
                const progressCOSO34 = await bcas.getItem("progressCOSO34");
                const progressCOSO35 = await bcas.getItem("progressCOSO35");
                const progressCOSO41 = await bcas.getItem("progressCOSO41");
                const progressCOSO42 = await bcas.getItem("progressCOSO42");
                const progressCOSO51 = await bcas.getItem("progressCOSO51");
                const progressCOSO52 = await bcas.getItem("progressCOSO52");
                const item111 = await bcas.getItem("item111");
                const item112 = await bcas.getItem("item112");
                const item113 = await bcas.getItem("item113");
                const item121 = await bcas.getItem("item121");
                const item122 = await bcas.getItem("item122");
                const item123 = await bcas.getItem("item123");
                const item131 = await bcas.getItem("item131");
                const item132 = await bcas.getItem("item132");
                const item133 = await bcas.getItem("item133");
                const item141 = await bcas.getItem("item141");
                const item142 = await bcas.getItem("item142");
                const item143 = await bcas.getItem("item143");
                const item151 = await bcas.getItem("item151");
                const item152 = await bcas.getItem("item152");
                const item153 = await bcas.getItem("item153");
                const item161 = await bcas.getItem("item161");
                const item162 = await bcas.getItem("item162");
                const item163 = await bcas.getItem("item163");
                const item171 = await bcas.getItem("item171");
                const item172 = await bcas.getItem("item172");
                const item173 = await bcas.getItem("item173");
                const item211 = await bcas.getItem("item211");
                const item212 = await bcas.getItem("item212");
                const item213 = await bcas.getItem("item213");
                const item311 = await bcas.getItem("item311");
                const item312 = await bcas.getItem("item312");
                const item313 = await bcas.getItem("item313");
                const item321 = await bcas.getItem("item321");
                const item322 = await bcas.getItem("item322");
                const item323 = await bcas.getItem("item323");
                const item331 = await bcas.getItem("item331");
                const item332 = await bcas.getItem("item332");
                const item333 = await bcas.getItem("item333");
                const item341 = await bcas.getItem("item341");
                const item342 = await bcas.getItem("item342");
                const item343 = await bcas.getItem("item343");
                const item351 = await bcas.getItem("item351");
                const item352 = await bcas.getItem("item352");
                const item353 = await bcas.getItem("item353");
                const item411 = await bcas.getItem("item411");
                const item412 = await bcas.getItem("item412");
                const item413 = await bcas.getItem("item413");
                const item421 = await bcas.getItem("item421");
                const item422 = await bcas.getItem("item422");
                const item423 = await bcas.getItem("item423");
                const item511 = await bcas.getItem("item511");
                const item512 = await bcas.getItem("item512");
                const item513 = await bcas.getItem("item513");
                const item521 = await bcas.getItem("item521");
                const item522 = await bcas.getItem("item522");
                const item523 = await bcas.getItem("item523");

                if (
                    progressOverall === null || "NaN"
                    && progressCOSO1 === null || "NaN"
                    && progressCOSO2 === null || "NaN"
                    && progressCOSO3 === null || "NaN"
                    && progressCOSO4 === null || "NaN"
                    && progressCOSO5 === null || "NaN"
                    && progressCOSO11 === null
                    && progressCOSO12 === null
                    && progressCOSO13 === null
                    && progressCOSO14 === null
                    && progressCOSO15 === null
                    && progressCOSO16 === null
                    && progressCOSO17 === null
                    && progressCOSO21 === null
                    && progressCOSO31 === null
                    && progressCOSO32 === null
                    && progressCOSO33 === null
                    && progressCOSO34 === null
                    && progressCOSO35 === null
                    && progressCOSO41 === null
                    && progressCOSO42 === null
                    && progressCOSO51 === null
                    && progressCOSO52 === null
                    && item111 === null
                    && item112 === null
                    && item113 === null
                    && item121 === null
                    && item122 === null
                    && item123 === null
                    && item131 === null
                    && item132 === null
                    && item133 === null
                    && item141 === null
                    && item142 === null
                    && item143 === null
                    && item151 === null
                    && item152 === null
                    && item153 === null
                    && item161 === null
                    && item162 === null
                    && item163 === null
                    && item171 === null
                    && item172 === null
                    && item173 === null
                    && item211 === null
                    && item212 === null
                    && item213 === null
                    && item311 === null
                    && item312 === null
                    && item313 === null
                    && item321 === null
                    && item322 === null
                    && item323 === null
                    && item331 === null
                    && item332 === null
                    && item333 === null
                    && item341 === null
                    && item342 === null
                    && item343 === null
                    && item351 === null
                    && item352 === null
                    && item353 === null
                    && item411 === null
                    && item412 === null
                    && item413 === null
                    && item421 === null
                    && item422 === null
                    && item423 === null
                    && item511 === null
                    && item512 === null
                    && item513 === null
                    && item521 === null
                    && item522 === null
                    && item523 === null
                ) {
                    bcas.setItem("progressOverall", "0");
                    bcas.setItem("progressCOSO1", "0");
                    bcas.setItem("progressCOSO2", "0");
                    bcas.setItem("progressCOSO3", "0");
                    bcas.setItem("progressCOSO4", "0");
                    bcas.setItem("progressCOSO5", "0");
                    bcas.setItem("progressCOSO11", "0");
                    bcas.setItem("progressCOSO12", "0");
                    bcas.setItem("progressCOSO13", "0");
                    bcas.setItem("progressCOSO14", "0");
                    bcas.setItem("progressCOSO15", "0");
                    bcas.setItem("progressCOSO16", "0");
                    bcas.setItem("progressCOSO17", "0");
                    bcas.setItem("progressCOSO21", "0");
                    bcas.setItem("progressCOSO31", "0");
                    bcas.setItem("progressCOSO32", "0");
                    bcas.setItem("progressCOSO33", "0");
                    bcas.setItem("progressCOSO34", "0");
                    bcas.setItem("progressCOSO35", "0");
                    bcas.setItem("progressCOSO41", "0");
                    bcas.setItem("progressCOSO42", "0");
                    bcas.setItem("progressCOSO51", "0");
                    bcas.setItem("progressCOSO52", "0");
                    bcas.setItem("item111", "empty");
                    bcas.setItem("item112", "empty");
                    bcas.setItem("item113", "empty");
                    bcas.setItem("item121", "empty");
                    bcas.setItem("item122", "empty");
                    bcas.setItem("item123", "empty");
                    bcas.setItem("item131", "empty");
                    bcas.setItem("item132", "empty");
                    bcas.setItem("item133", "empty");
                    bcas.setItem("item141", "empty");
                    bcas.setItem("item142", "empty");
                    bcas.setItem("item143", "empty");
                    bcas.setItem("item151", "empty");
                    bcas.setItem("item152", "empty");
                    bcas.setItem("item153", "empty");
                    bcas.setItem("item161", "empty");
                    bcas.setItem("item162", "empty");
                    bcas.setItem("item163", "empty");
                    bcas.setItem("item171", "empty");
                    bcas.setItem("item172", "empty");
                    bcas.setItem("item173", "empty");
                    bcas.setItem("item211", "empty");
                    bcas.setItem("item212", "empty");
                    bcas.setItem("item213", "empty");
                    bcas.setItem("item311", "empty");
                    bcas.setItem("item312", "empty");
                    bcas.setItem("item313", "empty");
                    bcas.setItem("item321", "empty");
                    bcas.setItem("item322", "empty");
                    bcas.setItem("item323", "empty");
                    bcas.setItem("item331", "empty");
                    bcas.setItem("item332", "empty");
                    bcas.setItem("item333", "empty");
                    bcas.setItem("item341", "empty");
                    bcas.setItem("item342", "empty");
                    bcas.setItem("item343", "empty");
                    bcas.setItem("item351", "empty");
                    bcas.setItem("item352", "empty");
                    bcas.setItem("item353", "empty");
                    bcas.setItem("item411", "empty");
                    bcas.setItem("item412", "empty");
                    bcas.setItem("item413", "empty");
                    bcas.setItem("item421", "empty");
                    bcas.setItem("item422", "empty");
                    bcas.setItem("item423", "empty");
                    bcas.setItem("item511", "empty");
                    bcas.setItem("item512", "empty");
                    bcas.setItem("item513", "empty");
                    bcas.setItem("item521", "empty");
                    bcas.setItem("item522", "empty");
                    bcas.setItem("item523", "empty");
                    window.open("/home.html", "_self");
                } else {
                    window.open("/home.html", "_self");
                }
            } catch (error) {
                console.log(error);
            }
        })();
    });
}

function welcome() {
    notLoginCheck();
    updateProgress();

    (async () => {
        try {
            const showLoginToast = await bcas.getItem("showLoginToast");
            const showResetToast = await bcas.getItem("showResetToast");
            const namaCabang = await bcas.getItem("namaCabang");
            const kodeCabang = await bcas.getItem("kodeCabang");
            const progressOverall = await bcas.getItem("progressOverall");
            const progressCOSO1 = await bcas.getItem("progressCOSO1");
            const progressCOSO2 = await bcas.getItem("progressCOSO2");
            const progressCOSO3 = await bcas.getItem("progressCOSO3");
            const progressCOSO4 = await bcas.getItem("progressCOSO4");
            const progressCOSO5 = await bcas.getItem("progressCOSO5");

            if (showLoginToast === true) {
                const loginToast = document.getElementById('loginToast');
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(loginToast);
                toastBootstrap.show();
                bcas.removeItem("showLoginToast");
            }

            if (showResetToast === true) {
                const resetToast = document.getElementById('resetToast');
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(resetToast);
                toastBootstrap.show();
                bcas.removeItem("showResetToast");              
            }

            var welcome = document.getElementById("welcome");
            welcome.innerText = "Halo, " + namaCabang;

            var home = document.getElementById("home");
            home.innerHTML += "Home - " + namaCabang + " (" + kodeCabang + ")";

            if (
                progressOverall !== null
                && progressCOSO1 !== null
                && progressCOSO2 !== null
                && progressCOSO3 !== null
                && progressCOSO4 !== null
                && progressCOSO5 !== null
            ) {
                document.getElementById("progressOverall").style.width = progressOverall + "%";
                document.getElementById("progressOverallLabel").innerText = "Overall Progress (" + progressOverall + "%)";
                document.getElementById("progressCOSO1").innerText = progressCOSO1 + "%";
                document.getElementById("progressCOSO2").innerText = progressCOSO2 + "%";
                document.getElementById("progressCOSO3").innerText = progressCOSO3 + "%";
                document.getElementById("progressCOSO4").innerText = progressCOSO4 + "%";
                document.getElementById("progressCOSO5").innerText = progressCOSO5 + "%";
            }
        } catch (error) {
            console.log(error);
        }
    })();
}

function resetData() {
    var resetDataButton = document.getElementById("buttonResetData");
    resetDataButton.innerHTML += '<div class="spinner-border spinner-border-sm text-light ms-2" role="status"><span class="visually-hidden"></span></div>';

    sleep(1000).then(() => {
        bcas.setItem("progressOverall", "0");
        bcas.setItem("progressCOSO1", "0");
        bcas.setItem("progressCOSO2", "0");
        bcas.setItem("progressCOSO3", "0");
        bcas.setItem("progressCOSO4", "0");
        bcas.setItem("progressCOSO5", "0");
        bcas.setItem("progressCOSO11", "0");
        bcas.setItem("progressCOSO12", "0");
        bcas.setItem("progressCOSO13", "0");
        bcas.setItem("progressCOSO14", "0");
        bcas.setItem("progressCOSO15", "0");
        bcas.setItem("progressCOSO16", "0");
        bcas.setItem("progressCOSO17", "0");
        bcas.setItem("progressCOSO21", "0");
        bcas.setItem("progressCOSO31", "0");
        bcas.setItem("progressCOSO32", "0");
        bcas.setItem("progressCOSO33", "0");
        bcas.setItem("progressCOSO34", "0");
        bcas.setItem("progressCOSO35", "0");
        bcas.setItem("progressCOSO41", "0");
        bcas.setItem("progressCOSO42", "0");
        bcas.setItem("progressCOSO51", "0");
        bcas.setItem("progressCOSO52", "0");
        bcas.setItem("item111", "empty");
        bcas.setItem("item112", "empty");
        bcas.setItem("item113", "empty");
        bcas.setItem("item121", "empty");
        bcas.setItem("item122", "empty");
        bcas.setItem("item123", "empty");
        bcas.setItem("item131", "empty");
        bcas.setItem("item132", "empty");
        bcas.setItem("item133", "empty");
        bcas.setItem("item141", "empty");
        bcas.setItem("item142", "empty");
        bcas.setItem("item143", "empty");
        bcas.setItem("item151", "empty");
        bcas.setItem("item152", "empty");
        bcas.setItem("item153", "empty");
        bcas.setItem("item161", "empty");
        bcas.setItem("item162", "empty");
        bcas.setItem("item163", "empty");
        bcas.setItem("item171", "empty");
        bcas.setItem("item172", "empty");
        bcas.setItem("item173", "empty");
        bcas.setItem("item211", "empty");
        bcas.setItem("item212", "empty");
        bcas.setItem("item213", "empty");
        bcas.setItem("item311", "empty");
        bcas.setItem("item312", "empty");
        bcas.setItem("item313", "empty");
        bcas.setItem("item321", "empty");
        bcas.setItem("item322", "empty");
        bcas.setItem("item323", "empty");
        bcas.setItem("item331", "empty");
        bcas.setItem("item332", "empty");
        bcas.setItem("item333", "empty");
        bcas.setItem("item341", "empty");
        bcas.setItem("item342", "empty");
        bcas.setItem("item343", "empty");
        bcas.setItem("item351", "empty");
        bcas.setItem("item352", "empty");
        bcas.setItem("item353", "empty");
        bcas.setItem("item411", "empty");
        bcas.setItem("item412", "empty");
        bcas.setItem("item413", "empty");
        bcas.setItem("item421", "empty");
        bcas.setItem("item422", "empty");
        bcas.setItem("item423", "empty");
        bcas.setItem("item511", "empty");
        bcas.setItem("item512", "empty");
        bcas.setItem("item513", "empty");
        bcas.setItem("item521", "empty");
        bcas.setItem("item522", "empty");
        bcas.setItem("item523", "empty");
        bcas.setItem("showResetToast", true);

        sleep(2000).then(() => {
            window.open("/home.html", "_self");
        });  
    });
}

function coso1home(){
    notLoginCheck();
    updateProgress();

    (async () => {
        try {
            const progressOverall = await bcas.getItem("progressOverall");
            const progressCOSO1 = await bcas.getItem("progressCOSO1");
            const progressCOSO2 = await bcas.getItem("progressCOSO2");
            const progressCOSO3 = await bcas.getItem("progressCOSO3");
            const progressCOSO4 = await bcas.getItem("progressCOSO4");
            const progressCOSO5 = await bcas.getItem("progressCOSO5");
            const progressCOSO11 = await bcas.getItem("progressCOSO11");
            const progressCOSO12 = await bcas.getItem("progressCOSO12");
            const progressCOSO13 = await bcas.getItem("progressCOSO13");
            const progressCOSO14 = await bcas.getItem("progressCOSO14");
            const progressCOSO15 = await bcas.getItem("progressCOSO15");
            const progressCOSO16 = await bcas.getItem("progressCOSO16");
            const progressCOSO17 = await bcas.getItem("progressCOSO17");

            if (
                progressOverall !== null
                && progressCOSO1 !== null
                && progressCOSO2 !== null
                && progressCOSO3 !== null
                && progressCOSO4 !== null
                && progressCOSO5 !== null
                && progressCOSO11 !== null
                && progressCOSO12 !== null
                && progressCOSO13 !== null
                && progressCOSO14 !== null
                && progressCOSO15 !== null
                && progressCOSO16 !== null
                && progressCOSO17 !== null
            ) {
                document.getElementById("progressOverall").style.width = progressOverall + "%";
                document.getElementById("progressInside").innerText = progressOverall + "%";
                document.getElementById("progressCOSO1").innerText = progressCOSO1 + "%";
                document.getElementById("progressCOSO2").innerText = progressCOSO2 + "%";
                document.getElementById("progressCOSO3").innerText = progressCOSO3 + "%";
                document.getElementById("progressCOSO4").innerText = progressCOSO4 + "%";
                document.getElementById("progressCOSO5").innerText = progressCOSO5 + "%";
                document.getElementById("progressCOSO11").innerText = progressCOSO11 + "/3";
                document.getElementById("progressCOSO12").innerText = progressCOSO12 + "/3";
                document.getElementById("progressCOSO13").innerText = progressCOSO13 + "/3";
                document.getElementById("progressCOSO14").innerText = progressCOSO14 + "/3";
                document.getElementById("progressCOSO15").innerText = progressCOSO15 + "/3";
                document.getElementById("progressCOSO16").innerText = progressCOSO16 + "/3";
                document.getElementById("progressCOSO17").innerText = progressCOSO17 + "/3";
            }
        } catch (error) {
            console.log(error);
        }
    })();
}

function coso2home(){
    notLoginCheck();
    updateProgress();

    (async () => {
        try {
            const progressOverall = await bcas.getItem("progressOverall");
            const progressCOSO1 = await bcas.getItem("progressCOSO1");
            const progressCOSO2 = await bcas.getItem("progressCOSO2");
            const progressCOSO3 = await bcas.getItem("progressCOSO3");
            const progressCOSO4 = await bcas.getItem("progressCOSO4");
            const progressCOSO5 = await bcas.getItem("progressCOSO5");
            const progressCOSO21 = await bcas.getItem("progressCOSO21");

            if (
                progressOverall !== null
                && progressCOSO1 !== null
                && progressCOSO2 !== null
                && progressCOSO3 !== null
                && progressCOSO4 !== null
                && progressCOSO5 !== null
                && progressCOSO21 !== null
            ) {
                document.getElementById("progressOverall").style.width = progressOverall + "%";
                document.getElementById("progressInside").innerText = progressOverall + "%";
                document.getElementById("progressCOSO1").innerText = progressCOSO1 + "%";
                document.getElementById("progressCOSO2").innerText = progressCOSO2 + "%";
                document.getElementById("progressCOSO3").innerText = progressCOSO3 + "%";
                document.getElementById("progressCOSO4").innerText = progressCOSO4 + "%";
                document.getElementById("progressCOSO5").innerText = progressCOSO5 + "%";
                document.getElementById("progressCOSO21").innerText = progressCOSO21 + "/3";
            }
        } catch (error) {
            console.log(error);
        }
    })();
}

function coso3home(){
    notLoginCheck();
    updateProgress();

    (async () => {
        try {
            const progressOverall = await bcas.getItem("progressOverall");
            const progressCOSO1 = await bcas.getItem("progressCOSO1");
            const progressCOSO2 = await bcas.getItem("progressCOSO2");
            const progressCOSO3 = await bcas.getItem("progressCOSO3");
            const progressCOSO4 = await bcas.getItem("progressCOSO4");
            const progressCOSO5 = await bcas.getItem("progressCOSO5");
            const progressCOSO31 = await bcas.getItem("progressCOSO31");
            const progressCOSO32 = await bcas.getItem("progressCOSO32");
            const progressCOSO33 = await bcas.getItem("progressCOSO33");
            const progressCOSO34 = await bcas.getItem("progressCOSO34");
            const progressCOSO35 = await bcas.getItem("progressCOSO35");

            if (
                progressOverall !== null
                && progressCOSO1 !== null
                && progressCOSO2 !== null
                && progressCOSO3 !== null
                && progressCOSO4 !== null
                && progressCOSO5 !== null
                && progressCOSO31 !== null
                && progressCOSO32 !== null
                && progressCOSO33 !== null
                && progressCOSO34 !== null
                && progressCOSO35 !== null
            ) {
                document.getElementById("progressOverall").style.width = progressOverall + "%";
                document.getElementById("progressInside").innerText = progressOverall + "%";
                document.getElementById("progressCOSO1").innerText = progressCOSO1 + "%";
                document.getElementById("progressCOSO2").innerText = progressCOSO2 + "%";
                document.getElementById("progressCOSO3").innerText = progressCOSO3 + "%";
                document.getElementById("progressCOSO4").innerText = progressCOSO4 + "%";
                document.getElementById("progressCOSO5").innerText = progressCOSO5 + "%";
                document.getElementById("progressCOSO31").innerText = progressCOSO31 + "/3";
                document.getElementById("progressCOSO32").innerText = progressCOSO32 + "/3";
                document.getElementById("progressCOSO33").innerText = progressCOSO33 + "/3";
                document.getElementById("progressCOSO34").innerText = progressCOSO34 + "/3";
                document.getElementById("progressCOSO35").innerText = progressCOSO35 + "/3";
            }
        } catch (error) {
            console.log(error);
        }
    })();
}

function coso4home(){
    notLoginCheck();
    updateProgress();

    (async () => {
        try {
            const progressOverall = await bcas.getItem("progressOverall");
            const progressCOSO1 = await bcas.getItem("progressCOSO1");
            const progressCOSO2 = await bcas.getItem("progressCOSO2");
            const progressCOSO3 = await bcas.getItem("progressCOSO3");
            const progressCOSO4 = await bcas.getItem("progressCOSO4");
            const progressCOSO5 = await bcas.getItem("progressCOSO5");
            const progressCOSO41 = await bcas.getItem("progressCOSO41");
            const progressCOSO42 = await bcas.getItem("progressCOSO42");

            if (
                progressOverall !== null
                && progressCOSO1 !== null
                && progressCOSO2 !== null
                && progressCOSO3 !== null
                && progressCOSO4 !== null
                && progressCOSO5 !== null
                && progressCOSO41 !== null
                && progressCOSO42 !== null
            ) {
                document.getElementById("progressOverall").style.width = progressOverall + "%";
                document.getElementById("progressInside").innerText = progressOverall + "%";                document.getElementById("progressCOSO1").innerText = progressCOSO1 + "%";
                document.getElementById("progressCOSO2").innerText = progressCOSO2 + "%";
                document.getElementById("progressCOSO3").innerText = progressCOSO3 + "%";
                document.getElementById("progressCOSO4").innerText = progressCOSO4 + "%";
                document.getElementById("progressCOSO5").innerText = progressCOSO5 + "%";
                document.getElementById("progressCOSO41").innerText = progressCOSO41 + "/3";
                document.getElementById("progressCOSO42").innerText = progressCOSO42 + "/3";
            }
        } catch (error) {
            console.log(error);
        }
    })();
}

function coso5home(){
    notLoginCheck();
    updateProgress();

    (async () => {
        try {
            const progressOverall = await bcas.getItem("progressOverall");
            const progressCOSO1 = await bcas.getItem("progressCOSO1");
            const progressCOSO2 = await bcas.getItem("progressCOSO2");
            const progressCOSO3 = await bcas.getItem("progressCOSO3");
            const progressCOSO4 = await bcas.getItem("progressCOSO4");
            const progressCOSO5 = await bcas.getItem("progressCOSO5");
            const progressCOSO51 = await bcas.getItem("progressCOSO51");
            const progressCOSO52 = await bcas.getItem("progressCOSO52");

            if (
                progressOverall !== null
                && progressCOSO1 !== null
                && progressCOSO2 !== null
                && progressCOSO3 !== null
                && progressCOSO4 !== null
                && progressCOSO5 !== null
                && progressCOSO51 !== null
                && progressCOSO52 !== null
            ) {
                document.getElementById("progressOverall").style.width = progressOverall + "%";
                document.getElementById("progressInside").innerText = progressOverall + "%";
                document.getElementById("progressCOSO1").innerText = progressCOSO1 + "%";
                document.getElementById("progressCOSO2").innerText = progressCOSO2 + "%";
                document.getElementById("progressCOSO3").innerText = progressCOSO3 + "%";
                document.getElementById("progressCOSO4").innerText = progressCOSO4 + "%";
                document.getElementById("progressCOSO5").innerText = progressCOSO5 + "%";
                document.getElementById("progressCOSO51").innerText = progressCOSO51 + "/3";
                document.getElementById("progressCOSO52").innerText = progressCOSO52 + "/3";
            }
        } catch (error) {
            console.log(error);
        }
    })();
}

function showKuesioner() {
    notLoginCheck();
    updateProgress();

    var navCenter = document.getElementById("navCenter");
    var progressContainer = document.getElementById("progressContainer");
    progressContainer.setAttribute("hidden", true);
    navCenter.classList.add("mt-1");
    navCenter.innerHTML += '<div id="loading">Memuat progress anda<div id="spinner" class="spinner-border spinner-border-sm text-black ms-2" role="status"><span class="visually-hidden"></span></div></div>';

    (async () => {
        try {
            const namaCabang = await bcas.getItem("namaCabang");
            const kodeCabang = await bcas.getItem("kodeCabang");
            const progressOverall = await bcas.getItem("progressOverall");
            const progressCOSO11 = await bcas.getItem("progressCOSO11");
            const progressCOSO12 = await bcas.getItem("progressCOSO12");
            const progressCOSO13 = await bcas.getItem("progressCOSO13");
            const progressCOSO14 = await bcas.getItem("progressCOSO14");
            const progressCOSO15 = await bcas.getItem("progressCOSO15");
            const progressCOSO16 = await bcas.getItem("progressCOSO16");
            const progressCOSO17 = await bcas.getItem("progressCOSO17");
            const progressCOSO21 = await bcas.getItem("progressCOSO21");
            const progressCOSO31 = await bcas.getItem("progressCOSO31");
            const progressCOSO32 = await bcas.getItem("progressCOSO32");
            const progressCOSO33 = await bcas.getItem("progressCOSO33");
            const progressCOSO34 = await bcas.getItem("progressCOSO34");
            const progressCOSO35 = await bcas.getItem("progressCOSO35");
            const progressCOSO41 = await bcas.getItem("progressCOSO41");
            const progressCOSO42 = await bcas.getItem("progressCOSO42");
            const progressCOSO51 = await bcas.getItem("progressCOSO51");
            const progressCOSO52 = await bcas.getItem("progressCOSO52");

            document.getElementById("navCenter").classList.remove("mt-1");
            document.getElementById("loading").setAttribute("hidden", true);
            document.getElementById("progressContainer").removeAttribute("hidden");

            sleep(100).then(() => {
                if (progressOverall !== null) {
                    document.getElementById("progressOverall").style.width = progressOverall + "%";
                    document.getElementById("progressInside").innerText = progressOverall + "%";
                }
            })

            if (
                progressCOSO11 !== null
                && progressCOSO12 !== null
                && progressCOSO13 !== null
                && progressCOSO14 !== null
                && progressCOSO15 !== null
                && progressCOSO16 !== null
                && progressCOSO17 !== null
                && progressCOSO21 !== null
                && progressCOSO31 !== null
                && progressCOSO32 !== null
                && progressCOSO33 !== null
                && progressCOSO34 !== null
                && progressCOSO35 !== null
                && progressCOSO41 !== null
                && progressCOSO42 !== null
                && progressCOSO51 !== null
                && progressCOSO52 !== null
            ) {
                document.getElementById("progressCOSO11").innerText += " (terisi " + progressCOSO11 + " dari 3)";
                document.getElementById("progressCOSO12").innerText += " (terisi " + progressCOSO12 + " dari 3)";
                document.getElementById("progressCOSO13").innerText += " (terisi " + progressCOSO13 + " dari 3)";
                document.getElementById("progressCOSO14").innerText += " (terisi " + progressCOSO14 + " dari 3)";
                document.getElementById("progressCOSO15").innerText += " (terisi " + progressCOSO15 + " dari 3)";
                document.getElementById("progressCOSO16").innerText += " (terisi " + progressCOSO16 + " dari 3)";
                document.getElementById("progressCOSO17").innerText += " (terisi " + progressCOSO17 + " dari 3)";
                document.getElementById("progressCOSO21").innerText += " (terisi " + progressCOSO21 + " dari 3)";
                document.getElementById("progressCOSO31").innerText += " (terisi " + progressCOSO31 + " dari 3)";
                document.getElementById("progressCOSO32").innerText += " (terisi " + progressCOSO32 + " dari 3)";
                document.getElementById("progressCOSO33").innerText += " (terisi " + progressCOSO33 + " dari 3)";
                document.getElementById("progressCOSO34").innerText += " (terisi " + progressCOSO34 + " dari 3)";
                document.getElementById("progressCOSO35").innerText += " (terisi " + progressCOSO35 + " dari 3)";
                document.getElementById("progressCOSO41").innerText += " (terisi " + progressCOSO41 + " dari 3)";
                document.getElementById("progressCOSO42").innerText += " (terisi " + progressCOSO42 + " dari 3)";
                document.getElementById("progressCOSO51").innerText += " (terisi " + progressCOSO51 + " dari 3)";
                document.getElementById("progressCOSO52").innerText += " (terisi " + progressCOSO52 + " dari 3)";
            }

            if(progressCOSO11 === "3") {
                document.getElementById("progressCOSO11").innerText = "COSO 1 - Kuesioner 1 (selesai)";
            }
            if(progressCOSO12 === "3") {
                document.getElementById("progressCOSO12").innerText = "COSO 1 - Kuesioner 2 (selesai)";
            }
            if(progressCOSO13 === "3") {
                document.getElementById("progressCOSO13").innerText = "COSO 1 - Kuesioner 3 (selesai)";
            }
            if(progressCOSO14 === "3") {
                document.getElementById("progressCOSO14").innerText = "COSO 1 - Kuesioner 4 (selesai)";
            }
            if(progressCOSO15 === "3") {
                document.getElementById("progressCOSO15").innerText = "COSO 1 - Kuesioner 5 (selesai)";
            }
            if(progressCOSO16 === "3") {
                document.getElementById("progressCOSO16").innerText = "COSO 1 - Kuesioner 6 (selesai)";
            }
            if(progressCOSO17 === "3") {
                document.getElementById("progressCOSO17").innerText = "COSO 1 - Kuesioner 7 (selesai)";
            }
            if(progressCOSO21 === "3") {
                document.getElementById("progressCOSO21").innerText = "COSO 2 - Kuesioner 1 (selesai)";
            }
            if(progressCOSO31 === "3") {
                document.getElementById("progressCOSO31").innerText = "COSO 3 - Kuesioner 1 (selesai)";
            }
            if(progressCOSO32 === "3") {
                document.getElementById("progressCOSO32").innerText = "COSO 3 - Kuesioner 2 (selesai)";
            }
            if(progressCOSO33 === "3") {
                document.getElementById("progressCOSO33").innerText = "COSO 3 - Kuesioner 3 (selesai)";
            }
            if(progressCOSO34 === "3") {
                document.getElementById("progressCOSO34").innerText = "COSO 3 - Kuesioner 4 (selesai)";
            }
            if(progressCOSO35 === "3") {
                document.getElementById("progressCOSO35").innerText = "COSO 3 - Kuesioner 5 (selesai)";
            }
            if(progressCOSO41 === "3") {
                document.getElementById("progressCOSO41").innerText = "COSO 4 - Kuesioner 1 (selesai)";
            }
            if(progressCOSO42 === "3") {
                document.getElementById("progressCOSO42").innerText = "COSO 4 - Kuesioner 2 (selesai)";
            }
            if(progressCOSO51 === "3") {
                document.getElementById("progressCOSO51").innerText = "COSO 5 - Kuesioner 1 (selesai)";
            }
            if(progressCOSO52 === "3") {
                document.getElementById("progressCOSO52").innerText = "COSO 5 - Kuesioner 2 (selesai)";
            }
        } catch (error) {
            console.log(error);
        }
    })();
}

function updateProgress() {
    (async () => {
        try {
            const progressCOSO11 = await bcas.getItem("progressCOSO11");
            const progressCOSO12 = await bcas.getItem("progressCOSO12");
            const progressCOSO13 = await bcas.getItem("progressCOSO13");
            const progressCOSO14 = await bcas.getItem("progressCOSO14");
            const progressCOSO15 = await bcas.getItem("progressCOSO15");
            const progressCOSO16 = await bcas.getItem("progressCOSO16");
            const progressCOSO17 = await bcas.getItem("progressCOSO17");
            const progressCOSO21 = await bcas.getItem("progressCOSO21");
            const progressCOSO31 = await bcas.getItem("progressCOSO31");
            const progressCOSO32 = await bcas.getItem("progressCOSO32");
            const progressCOSO33 = await bcas.getItem("progressCOSO33");
            const progressCOSO34 = await bcas.getItem("progressCOSO34");
            const progressCOSO35 = await bcas.getItem("progressCOSO35");
            const progressCOSO41 = await bcas.getItem("progressCOSO41");
            const progressCOSO42 = await bcas.getItem("progressCOSO42");
            const progressCOSO51 = await bcas.getItem("progressCOSO51");
            const progressCOSO52 = await bcas.getItem("progressCOSO52");

            var progressCOSO1 = Math.floor((
                parseInt(progressCOSO11)
                + parseInt(progressCOSO12)
                + parseInt(progressCOSO13)
                + parseInt(progressCOSO14)
                + parseInt(progressCOSO15)
                + parseInt(progressCOSO16)
                + parseInt(progressCOSO17)
            ) / 21 * 100).toString();

            var progressCOSO2 = Math.floor((
                parseInt(progressCOSO21)
            ) / 3 * 100).toString();

            var progressCOSO3 = Math.floor((
                parseInt(progressCOSO31)
                + parseInt(progressCOSO32)
                + parseInt(progressCOSO33)
                + parseInt(progressCOSO34)
                + parseInt(progressCOSO35)
            ) / 15 * 100).toString();

            var progressCOSO4 = Math.floor((
                parseInt(progressCOSO41)
                + parseInt(progressCOSO42)
            ) / 6 * 100).toString();

            var progressCOSO5 = Math.floor((
                parseInt(progressCOSO51)
                + parseInt(progressCOSO52)
            ) / 6 * 100).toString();

            var progressOverall = Math.floor((
                parseInt(progressCOSO11)
                + parseInt(progressCOSO12)
                + parseInt(progressCOSO13)
                + parseInt(progressCOSO14)
                + parseInt(progressCOSO15)
                + parseInt(progressCOSO16)
                + parseInt(progressCOSO17)
                + parseInt(progressCOSO21)
                + parseInt(progressCOSO31)
                + parseInt(progressCOSO32)
                + parseInt(progressCOSO33)
                + parseInt(progressCOSO34)
                + parseInt(progressCOSO35)
                + parseInt(progressCOSO41)
                + parseInt(progressCOSO42)
                + parseInt(progressCOSO51)
                + parseInt(progressCOSO52)                
            ) / 51 * 100).toString();

            bcas.setItem("progressCOSO1", progressCOSO1)
                .then(() => {
                    bcas.setItem("progressCOSO2", progressCOSO2);
                })
                .then(() => {
                    bcas.setItem("progressCOSO3", progressCOSO3);
                })
                .then(() => {
                    bcas.setItem("progressCOSO4", progressCOSO4);
                })
                .then(() => {
                    bcas.setItem("progressCOSO5", progressCOSO5);
                })
                .then(() => {
                    bcas.setItem("progressOverall", progressOverall);
                })
                .then(async () => {
                    const progressCOSO1New = await bcas.getItem("progressCOSO1");
                    const progressCOSO2New = await bcas.getItem("progressCOSO2");
                    const progressCOSO3New = await bcas.getItem("progressCOSO3");
                    const progressCOSO4New = await bcas.getItem("progressCOSO4");
                    const progressCOSO5New = await bcas.getItem("progressCOSO5");
        
                    if (progressCOSO1New == 100) {
                        try {
                            if (document.getElementById("progressCOSO1").classList.contains("bg-danger")) {
                                document.getElementById("progressCOSO1").classList.remove("bg-danger");
                                document.getElementById("progressCOSO1").classList.add("bg-success");
                            } else {
                                document.getElementById("progressCOSO1").classList.add("bg-success");
                            }
                        } catch (error) {
                            //do nothing
                        }
                    }
        
                    if (progressCOSO2New == 100) {
                        try {
                            if (document.getElementById("progressCOSO2").classList.contains("bg-danger")) {
                                document.getElementById("progressCOSO2").classList.remove("bg-danger");
                                document.getElementById("progressCOSO2").classList.add("bg-success");
                            } else {
                                document.getElementById("progressCOSO2").classList.add("bg-success");
                            }
                        } catch (error) {
                            //do nothing
                        }
                    }
        
                    if (progressCOSO3New == 100) {
                        try {
                            if (document.getElementById("progressCOSO3").classList.contains("bg-danger")) {
                                document.getElementById("progressCOSO3").classList.remove("bg-danger");
                                document.getElementById("progressCOSO3").classList.add("bg-success");
                            } else {
                                document.getElementById("progressCOSO3").classList.add("bg-success");
                            }
                        } catch (error) {
                            //do nothing
                        }
                    }
        
                    if (progressCOSO4New == 100) {
                        try {
                            if (document.getElementById("progressCOSO4").classList.contains("bg-danger")) {
                                document.getElementById("progressCOSO4").classList.remove("bg-danger");
                                document.getElementById("progressCOSO4").classList.add("bg-success");
                            } else {
                                document.getElementById("progressCOSO4").classList.add("bg-success");
                            }
                        } catch (error) {
                            //do nothing
                        }
                    }
        
                    if (progressCOSO5New == 100) {
                        try {
                            if (document.getElementById("progressCOSO5").classList.contains("bg-danger")) {
                                document.getElementById("progressCOSO5").classList.remove("bg-danger");
                                document.getElementById("progressCOSO5").classList.add("bg-success");
                            } else {
                                document.getElementById("progressCOSO5").classList.add("bg-success");
                            }
                        } catch (error) {
                            //do nothing
                        }
                    }
                });
        } catch (error) {
            console.log(error);
        }
    })();
}

function loadData1(coso) {
    var itemNo = "item" + coso + "1";

    var toggle1 = document.getElementById("toggle1");
    var buktiPelaksanaan1 = document.getElementById("buktiPelaksanaan1");
    var buktiPelaksanaan1Value = document.getElementById("buktiPelaksanaan1Value");
    var rencanaTindakLanjut1Value = document.getElementById("rencanaTindakLanjut1Value");
    var targetPerbaikan1Value = document.getElementById("targetPerbaikan1Value");
    var simpan1 = document.getElementById("simpan1");
    var reset1 = document.getElementById("reset1");

    (async () => {
        try {
            const itemJSON = await bcas.getItem(itemNo);

            if (itemJSON === "empty") {
                simpan1.removeAttribute("hidden");
                reset1.setAttribute("hidden", true);
            } else {
                var item = JSON.parse(itemJSON);

                toggle1.checked = item.status;
                toggle1.setAttribute("disabled", true);
                toggleKuesioner1();

                buktiPelaksanaan1Value.remove();
                buktiPelaksanaan1.innerHTML += '<a href="' + item.bukti + '" target="_blank"><i class="bi bi-file-earmark-play-fill me-2"></i>' + item.namaBukti + '</a>';
                
                rencanaTindakLanjut1Value.value = item.rencana;
                rencanaTindakLanjut1Value.setAttribute("disabled", true);

                targetPerbaikan1Value.value = item.target;
                targetPerbaikan1Value.setAttribute("disabled", true);

                simpan1.setAttribute("hidden", true);
                reset1.removeAttribute("hidden");
                toggleKuesioner1();
            }
        } catch (error) {
            console.log(error);
        }
    })();
}

function simpanData1(coso) {
    var itemNo = "item" + coso + "1";
    var progressCOSONo = "progressCOSO" + coso;
    var cosoSplit = coso.split("");
    var windowOpen = '/coso' + cosoSplit[0] + '/kuesioner' + cosoSplit[1] + '.html';

    var simpanButton1 = document.getElementById("simpan1");
    simpanButton1.innerHTML += '<div class="spinner-border spinner-border-sm text-light ms-2" role="status"><span class="visually-hidden"></span></div>';

    sleep(1000).then(() => {
        var toggle1 = document.getElementById("toggle1").checked;
        var buktiPelaksanaan1Value = document.getElementById("buktiPelaksanaan1Value").files[0];
        var rencanaTindakLanjut1Value = document.getElementById("rencanaTindakLanjut1Value").value;
        var targetPerbaikan1Value = document.getElementById("targetPerbaikan1Value").value;

        if (toggle1 === true) {
            var namaBukti = buktiPelaksanaan1Value.name;
            getBase64(buktiPelaksanaan1Value, function(base64String) {
                var jsonString = '{"status":true, "namaBukti":"' + namaBukti + '", "bukti":"' + base64String + '", "rencana":"", "target":""}';
                bcas.setItem(itemNo, jsonString)
                    .then(async () => {
                        try {
                            const progressCOSO = await bcas.getItem(progressCOSONo);
                            var prev = parseInt(progressCOSO);
                            var next = ++prev;
                            next = next.toString();
                            bcas.setItem(progressCOSONo, next)
                                .then(() => {
                                    updateProgress();
                                    location.href = windowOpen;
                                });
                        } catch (error) {
                            console.log(error);
                        }
                    });
            });
        } else {
            var jsonString = '{"status":false, "namaBukti":"", "bukti":"", "rencana":"' + rencanaTindakLanjut1Value + '", "target":"' + targetPerbaikan1Value + '"}';
            bcas.setItem(itemNo, jsonString)
                .then(async () => {
                    try {
                        const progressCOSO = await bcas.getItem(progressCOSONo);
                        var prev = parseInt(progressCOSO);
                        var next = ++prev;
                        next = next.toString();
                        bcas.setItem(progressCOSONo, next)
                            .then(() => {
                                updateProgress();
                                location.href = windowOpen;
                            });
                    } catch (error) {
                        console.log(error);
                    }
                });
        }
    })
}

function resetData1(coso) {
    var itemNo = "item" + coso + "1";
    var progressCOSONo = "progressCOSO" + coso;
    var cosoSplit = coso.split("");
    var windowOpen = '/coso' + cosoSplit[0] + '/kuesioner' + cosoSplit[1] + '.html';

    var resetButton1 = document.getElementById("reset1");
    resetButton1.innerHTML += '<div class="spinner-border spinner-border-sm text-light ms-2" role="status"><span class="visually-hidden"></span></div>';

    sleep(1000).then(() => {
        bcas.setItem(itemNo, "empty")
            .then(async () => {
                try {
                    const progressCOSO = await bcas.getItem(progressCOSONo);
                    var prev = parseInt(progressCOSO);
                    var next = --prev;
                    next = next.toString();
                    bcas.setItem(progressCOSONo, next)
                        .then(() => {
                            updateProgress();
                            location.href = windowOpen;
                        })
                } catch (error) {
                    console.log(error);
                }
            });
    })
}

function loadData2(coso) {
    var itemNo = "item" + coso + "2";

    var toggle2 = document.getElementById("toggle2");
    var buktiPelaksanaan2 = document.getElementById("buktiPelaksanaan2");
    var buktiPelaksanaan2Value = document.getElementById("buktiPelaksanaan2Value");
    var rencanaTindakLanjut2Value = document.getElementById("rencanaTindakLanjut2Value");
    var targetPerbaikan2Value = document.getElementById("targetPerbaikan2Value");
    var simpan2 = document.getElementById("simpan2");
    var reset2 = document.getElementById("reset2");

    (async () => {
        try {
            const itemJSON = await bcas.getItem(itemNo);

            if (itemJSON === "empty") {
                simpan2.removeAttribute("hidden");
                reset2.setAttribute("hidden", true);
            } else {
                var item = JSON.parse(itemJSON);

                toggle2.checked = item.status;
                toggle2.setAttribute("disabled", true);
                toggleKuesioner2();

                buktiPelaksanaan2Value.remove();
                buktiPelaksanaan2.innerHTML += '<a href="' + item.bukti + '" target="_blank"><i class="bi bi-file-earmark-play-fill me-2"></i>' + item.namaBukti + '</a>';
                
                rencanaTindakLanjut2Value.value = item.rencana;
                rencanaTindakLanjut2Value.setAttribute("disabled", true);

                targetPerbaikan2Value.value = item.target;
                targetPerbaikan2Value.setAttribute("disabled", true);

                simpan2.setAttribute("hidden", true);
                reset2.removeAttribute("hidden");
                toggleKuesioner2();
            }
        } catch (error) {
            console.log(error);
        }
    })();
}

function simpanData2(coso) {
    var itemNo = "item" + coso + "2";
    var progressCOSONo = "progressCOSO" + coso;
    var cosoSplit = coso.split("");
    var windowOpen = '/coso' + cosoSplit[0] + '/kuesioner' + cosoSplit[1] + '.html';

    var simpanButton2 = document.getElementById("simpan2");
    simpanButton2.innerHTML += '<div class="spinner-border spinner-border-sm text-light ms-2" role="status"><span class="visually-hidden"></span></div>';

    sleep(1000).then(() => {
        var toggle2 = document.getElementById("toggle2").checked;
        var buktiPelaksanaan2Value = document.getElementById("buktiPelaksanaan2Value").files[0];
        var rencanaTindakLanjut2Value = document.getElementById("rencanaTindakLanjut2Value").value;
        var targetPerbaikan2Value = document.getElementById("targetPerbaikan2Value").value;

        if (toggle2 === true) {
            var namaBukti = buktiPelaksanaan2Value.name;
            getBase64(buktiPelaksanaan2Value, function(base64String) {
                var jsonString = '{"status":true, "namaBukti":"' + namaBukti + '", "bukti":"' + base64String + '", "rencana":"", "target":""}';
                bcas.setItem(itemNo, jsonString)
                    .then(async () => {
                        try {
                            const progressCOSO = await bcas.getItem(progressCOSONo);
                            var prev = parseInt(progressCOSO);
                            var next = ++prev;
                            next = next.toString();
                            bcas.setItem(progressCOSONo, next)
                                .then(() => {
                                    updateProgress();
                                    location.href = windowOpen;
                                });
                        } catch (error) {
                            console.log(error);
                        }
                    });
            });
        } else {
            var jsonString = '{"status":false, "namaBukti":"", "bukti":"", "rencana":"' + rencanaTindakLanjut2Value + '", "target":"' + targetPerbaikan2Value + '"}';
            bcas.setItem(itemNo, jsonString)
                .then(async () => {
                    try {
                        const progressCOSO = await bcas.getItem(progressCOSONo);
                        var prev = parseInt(progressCOSO);
                        var next = ++prev;
                        next = next.toString();
                        bcas.setItem(progressCOSONo, next)
                            .then(() => {
                                updateProgress();
                                location.href = windowOpen;
                            });
                    } catch (error) {
                        console.log(error);
                    }
                });
        }
    })
}

function resetData2(coso) {
    var itemNo = "item" + coso + "2";
    var progressCOSONo = "progressCOSO" + coso;
    var cosoSplit = coso.split("");
    var windowOpen = '/coso' + cosoSplit[0] + '/kuesioner' + cosoSplit[1] + '.html';

    var resetButton2 = document.getElementById("reset2");
    resetButton2.innerHTML += '<div class="spinner-border spinner-border-sm text-light ms-2" role="status"><span class="visually-hidden"></span></div>';

    sleep(1000).then(() => {
        bcas.setItem(itemNo, "empty")
            .then(async () => {
                try {
                    const progressCOSO = await bcas.getItem(progressCOSONo);
                    var prev = parseInt(progressCOSO);
                    var next = --prev;
                    next = next.toString();
                    bcas.setItem(progressCOSONo, next)
                        .then(() => {
                            updateProgress();
                            location.href = windowOpen;
                        })
                } catch (error) {
                    console.log(error);
                }
            });
    })
}

function loadData3(coso) {
    var itemNo = "item" + coso + "3";

    var toggle3 = document.getElementById("toggle3");
    var buktiPelaksanaan3 = document.getElementById("buktiPelaksanaan3");
    var buktiPelaksanaan3Value = document.getElementById("buktiPelaksanaan3Value");
    var rencanaTindakLanjut3Value = document.getElementById("rencanaTindakLanjut3Value");
    var targetPerbaikan3Value = document.getElementById("targetPerbaikan3Value");
    var simpan3 = document.getElementById("simpan3");
    var reset3 = document.getElementById("reset3");

    (async () => {
        try {
            const itemJSON = await bcas.getItem(itemNo);

            if (itemJSON === "empty") {
                simpan3.removeAttribute("hidden");
                reset3.setAttribute("hidden", true);
            } else {
                var item = JSON.parse(itemJSON);

                toggle3.checked = item.status;
                toggle3.setAttribute("disabled", true);
                toggleKuesioner3();

                buktiPelaksanaan3Value.remove();
                buktiPelaksanaan3.innerHTML += '<a href="' + item.bukti + '" target="_blank"><i class="bi bi-file-earmark-play-fill me-2"></i>' + item.namaBukti + '</a>';
                
                rencanaTindakLanjut3Value.value = item.rencana;
                rencanaTindakLanjut3Value.setAttribute("disabled", true);

                targetPerbaikan3Value.value = item.target;
                targetPerbaikan3Value.setAttribute("disabled", true);

                simpan3.setAttribute("hidden", true);
                reset3.removeAttribute("hidden");
                toggleKuesioner3();
            }
        } catch (error) {
            console.log(error);
        }
    })();
}

function simpanData3(coso) {
    var itemNo = "item" + coso + "3";
    var progressCOSONo = "progressCOSO" + coso;
    var cosoSplit = coso.split("");
    var windowOpen = '/coso' + cosoSplit[0] + '/kuesioner' + cosoSplit[1] + '.html';

    var simpanButton3 = document.getElementById("simpan3");
    simpanButton3.innerHTML += '<div class="spinner-border spinner-border-sm text-light ms-2" role="status"><span class="visually-hidden"></span></div>';

    sleep(1000).then(() => {
        var toggle3 = document.getElementById("toggle3").checked;
        var buktiPelaksanaan3Value = document.getElementById("buktiPelaksanaan3Value").files[0];
        var rencanaTindakLanjut3Value = document.getElementById("rencanaTindakLanjut3Value").value;
        var targetPerbaikan3Value = document.getElementById("targetPerbaikan3Value").value;

        if (toggle3 === true) {
            var namaBukti = buktiPelaksanaan3Value.name;
            getBase64(buktiPelaksanaan3Value, function(base64String) {
                var jsonString = '{"status":true, "namaBukti":"' + namaBukti + '", "bukti":"' + base64String + '", "rencana":"", "target":""}';
                bcas.setItem(itemNo, jsonString)
                    .then(async () => {
                        try {
                            const progressCOSO = await bcas.getItem(progressCOSONo);
                            var prev = parseInt(progressCOSO);
                            var next = ++prev;
                            next = next.toString();
                            bcas.setItem(progressCOSONo, next)
                                .then(() => {
                                    updateProgress();
                                    location.href = windowOpen;
                                });
                        } catch (error) {
                            console.log(error);
                        }
                    });
            });
        } else {
            var jsonString = '{"status":false, "namaBukti":"", "bukti":"", "rencana":"' + rencanaTindakLanjut3Value + '", "target":"' + targetPerbaikan3Value + '"}';
            bcas.setItem(itemNo, jsonString)
                .then(async () => {
                    try {
                        const progressCOSO = await bcas.getItem(progressCOSONo);
                        var prev = parseInt(progressCOSO);
                        var next = ++prev;
                        next = next.toString();
                        bcas.setItem(progressCOSONo, next)
                            .then(() => {
                                updateProgress();
                                location.href = windowOpen;
                            });
                    } catch (error) {
                        console.log(error);
                    }
                });
        }
    })
}

function resetData3(coso) {
    var itemNo = "item" + coso + "3";
    var progressCOSONo = "progressCOSO" + coso;
    var cosoSplit = coso.split("");
    var windowOpen = '/coso' + cosoSplit[0] + '/kuesioner' + cosoSplit[1] + '.html';

    var resetButton3 = document.getElementById("reset3");
    resetButton3.innerHTML += '<div class="spinner-border spinner-border-sm text-light ms-2" role="status"><span class="visually-hidden"></span></div>';

    sleep(1000).then(() => {
        bcas.setItem(itemNo, "empty")
            .then(async () => {
                try {
                    const progressCOSO = await bcas.getItem(progressCOSONo);
                    var prev = parseInt(progressCOSO);
                    var next = --prev;
                    next = next.toString();
                    bcas.setItem(progressCOSONo, next)
                        .then(() => {
                            updateProgress();
                            location.href = windowOpen;
                        })
                } catch (error) {
                    console.log(error);
                }
            });
    })
}

function formValidation1() {
    var toggle1 = document.getElementById("toggle1").checked;
    var buktiPelaksanaan1Value = document.getElementById("buktiPelaksanaan1Value");
    var rencanaTindakLanjut1Value = document.getElementById("rencanaTindakLanjut1Value");
    var targetPerbaikan1Value = document.getElementById("targetPerbaikan1Value");
    var simpan1 = document.getElementById("simpan1");

    if (toggle1 === true) {
        if(
            buktiPelaksanaan1Value.value.length > 0
        ) {
            simpan1.removeAttribute("disabled");
        } else {
            simpan1.setAttribute("disabled", true);
        }
    } else {
        if(
            rencanaTindakLanjut1Value.value.length > 0
            && targetPerbaikan1Value.value.length > 0
        ) {
            simpan1.removeAttribute("disabled");
        } else {
            simpan1.setAttribute("disabled", true);
        }
    }
}

function toggleKuesioner1() {
    var toggle1 = document.getElementById("toggle1").checked;
    var buktiPelaksanaan1 = document.getElementById("buktiPelaksanaan1");
    var rencanaTindakLanjut1 = document.getElementById("rencanaTindakLanjut1");
    var targetPerbaikan1 = document.getElementById("targetPerbaikan1");
    var sudah1 = document.getElementById("sudah1");
    var belum1 = document.getElementById("belum1");
    var ikonSudah1 = document.getElementById("ikonSudah1");
    var ikonBelum1 = document.getElementById("ikonBelum1");

    if (toggle1 === true) {
        belum1.classList.add("opacity-50");
        sudah1.classList.remove("opacity-50");
        belum1.classList.remove("fw-bold");
        sudah1.classList.add("fw-bold");
        belum1.classList.remove("text-danger");
        sudah1.classList.add("text-success");
        ikonSudah1.removeAttribute("hidden");
        ikonBelum1.setAttribute("hidden", true);
        buktiPelaksanaan1.removeAttribute("hidden");
        rencanaTindakLanjut1.setAttribute("hidden", true);
        targetPerbaikan1.setAttribute("hidden", true);
    } else {
        belum1.classList.remove("opacity-50");
        sudah1.classList.add("opacity-50");
        sudah1.classList.remove("fw-bold");
        belum1.classList.add("fw-bold");
        sudah1.classList.remove("text-success");
        belum1.classList.add("text-danger");
        ikonBelum1.removeAttribute("hidden");
        ikonSudah1.setAttribute("hidden", true);
        buktiPelaksanaan1.setAttribute("hidden", true);
        rencanaTindakLanjut1.removeAttribute("hidden");
        targetPerbaikan1.removeAttribute("hidden");
    }
}

function formValidation2() {
    var toggle2 = document.getElementById("toggle2").checked;
    var buktiPelaksanaan2Value = document.getElementById("buktiPelaksanaan2Value");
    var rencanaTindakLanjut2Value = document.getElementById("rencanaTindakLanjut2Value");
    var targetPerbaikan2Value = document.getElementById("targetPerbaikan2Value");
    var simpan2 = document.getElementById("simpan2");

    if (toggle2 === true) {
        if(
            buktiPelaksanaan2Value.value.length > 0
        ) {
            simpan2.removeAttribute("disabled");
        } else {
            simpan2.setAttribute("disabled", true);
        }
    } else {
        if(
            rencanaTindakLanjut2Value.value.length > 0
            && targetPerbaikan2Value.value.length > 0
        ) {
            simpan2.removeAttribute("disabled");
        } else {
            simpan2.setAttribute("disabled", true);
        }
    }
}

function toggleKuesioner2() {
    var toggle2 = document.getElementById("toggle2").checked;
    var buktiPelaksanaan2 = document.getElementById("buktiPelaksanaan2");
    var rencanaTindakLanjut2 = document.getElementById("rencanaTindakLanjut2");
    var targetPerbaikan2 = document.getElementById("targetPerbaikan2");
    var sudah2 = document.getElementById("sudah2");
    var belum2 = document.getElementById("belum2");
    var ikonSudah2 = document.getElementById("ikonSudah2");
    var ikonBelum2 = document.getElementById("ikonBelum2");

    if (toggle2 === true) {
        belum2.classList.add("opacity-50");
        sudah2.classList.remove("opacity-50");
        belum2.classList.remove("fw-bold");
        sudah2.classList.add("fw-bold");
        belum2.classList.remove("text-danger");
        sudah2.classList.add("text-success");
        ikonSudah2.removeAttribute("hidden");
        ikonBelum2.setAttribute("hidden", true);
        buktiPelaksanaan2.removeAttribute("hidden");
        rencanaTindakLanjut2.setAttribute("hidden", true);
        targetPerbaikan2.setAttribute("hidden", true);
    } else {
        belum2.classList.remove("opacity-50");
        sudah2.classList.add("opacity-50");
        sudah2.classList.remove("fw-bold");
        belum2.classList.add("fw-bold");
        sudah2.classList.remove("text-success");
        belum2.classList.add("text-danger");
        ikonBelum2.removeAttribute("hidden");
        ikonSudah2.setAttribute("hidden", true);
        buktiPelaksanaan2.setAttribute("hidden", true);
        rencanaTindakLanjut2.removeAttribute("hidden");
        targetPerbaikan2.removeAttribute("hidden");
    }
}

function formValidation3() {
    var toggle3 = document.getElementById("toggle3").checked;
    var buktiPelaksanaan3Value = document.getElementById("buktiPelaksanaan3Value");
    var rencanaTindakLanjut3Value = document.getElementById("rencanaTindakLanjut3Value");
    var targetPerbaikan3Value = document.getElementById("targetPerbaikan3Value");
    var simpan3 = document.getElementById("simpan3");

    if (toggle3 === true) {
        if(
            buktiPelaksanaan3Value.value.length > 0
        ) {
            simpan3.removeAttribute("disabled");
        } else {
            simpan3.setAttribute("disabled", true);
        }
    } else {
        if(
            rencanaTindakLanjut3Value.value.length > 0
            && targetPerbaikan3Value.value.length > 0
        ) {
            simpan3.removeAttribute("disabled");
        } else {
            simpan3.setAttribute("disabled", true);
        }
    }
}

function toggleKuesioner3() {
    var toggle3 = document.getElementById("toggle3").checked;
    var buktiPelaksanaan3 = document.getElementById("buktiPelaksanaan3");
    var rencanaTindakLanjut3 = document.getElementById("rencanaTindakLanjut3");
    var targetPerbaikan3 = document.getElementById("targetPerbaikan3");
    var sudah3 = document.getElementById("sudah3");
    var belum3 = document.getElementById("belum3");
    var ikonSudah3 = document.getElementById("ikonSudah3");
    var ikonBelum3 = document.getElementById("ikonBelum3");

    if (toggle3 === true) {
        belum3.classList.add("opacity-50");
        sudah3.classList.remove("opacity-50");
        belum3.classList.remove("fw-bold");
        sudah3.classList.add("fw-bold");
        belum3.classList.remove("text-danger");
        sudah3.classList.add("text-success");
        ikonSudah3.removeAttribute("hidden");
        ikonBelum3.setAttribute("hidden", true);
        buktiPelaksanaan3.removeAttribute("hidden");
        rencanaTindakLanjut3.setAttribute("hidden", true);
        targetPerbaikan3.setAttribute("hidden", true);
    } else {
        belum3.classList.remove("opacity-50");
        sudah3.classList.add("opacity-50");
        sudah3.classList.remove("fw-bold");
        belum3.classList.add("fw-bold");
        sudah3.classList.remove("text-success");
        belum3.classList.add("text-danger");
        ikonBelum3.removeAttribute("hidden");
        ikonSudah3.setAttribute("hidden", true);
        buktiPelaksanaan3.setAttribute("hidden", true);
        rencanaTindakLanjut3.removeAttribute("hidden");
        targetPerbaikan3.removeAttribute("hidden");
    }
}

function getBase64(file, callback) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        callback(reader.result);
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}

function logout() {
    var logoutButton = document.getElementById("logout");
    logoutButton.innerHTML += '<div class="spinner-border spinner-border-sm text-light ms-2" role="status"><span class="visually-hidden"></span></div>';

    sleep(1000).then(() => {
        bcas.setItem("loginStatus", false);
        bcas.removeItem("namaCabang");
        bcas.removeItem("kodeCabang");
        bcas.setItem("showLogoutToast", true);

        sleep(2000).then(() => {
            window.open("/index.html","_self");
        });
    });
}
