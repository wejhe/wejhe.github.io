const main = document.getElementById("main");
const mainCircle = document.getElementById("main-circle");
const circleHint = document.getElementById("circle-hint");
const mainTop = document.getElementById("main-top");

mainCircle.addEventListener("mouseover", function () {
    mainCircle.style.width = "170px";
    mainCircle.style.height = "170px";
    mainCircle.style.borderRadius = "85px";
    mainCircle.style.marginBottom = "30px";
    main.style.paddingTop = "50px";
    circleHint.style.left = "calc(50% + 90px)";
    /*mainTop.style.visibility = "hidden";*/
});

mainCircle.addEventListener("mouseout", function () {
    mainCircle.style.width = "150px";
    mainCircle.style.height = "150px";
    mainCircle.style.borderRadius = "75px";
    mainCircle.style.marginBottom = "40px";
    main.style.paddingTop = "60px";
    circleHint.style.left = "calc(50% + 80px)";
    /*mainTop.style.visibility = "visible";*/
});