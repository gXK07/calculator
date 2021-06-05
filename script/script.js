let display = document.querySelector("#display");
buttons = document.querySelectorAll('button');
let value1;
let value2;
let valueOperateur;
let mode = "value1";
let displayValue = "";
let point = false;

function doClear(){
    value1 = 0;
    value2 = 0;
    valueOperateur = "";
    mode = "value1";
    displayValue = "";
    display.textContent = displayValue;
    point = false;
}

function doDelete(){
    displayValue = displayValue.slice(0, -1);
    display.textContent = displayValue;
}
function calculate(e){
    if(e.path[0].id === "."){
        if(!point){
            point = true;
        }
        else return;
    }
   else if(e.path[0].id === "clear"){
        doClear();
    }
    else if(e.path[0].id === "delete"){
        doDelete();
    }
    //si on a pas encore cliqué sur un opérateur
    if(mode === "value1"){
    // première suite nombre a être cliqué
        if(e.path[0].className === "number"){
            displayContent(e);
        }
    // première fois qu'on appuis sur un opérateur 
        else if(e.path[0].className === "operateur"){
            value1 = Number(display.textContent);
            valueOperateur = e.path[0].id;
            displayValue = "";
            mode = "value2";
            point = false;
        }
        else if(e.path[0].id === "egal"){
         alert("make an operation before clicking egal");   
        }
    }
    // si on a cliqué sur un opérateur 
    else if(mode === "value2"){
        // suite de touches cliqué apres qu'on ai cliqué sur un opérateur 
        if(e.path[0].className === "number"){
            displayContent(e);
        }
        // si on appuis une 2eme fois sur opérateur (affiche le resultat, range ce résultat dans la value1, vide la value2 et change la valeur de l'opérateur)
        else if(e.path[0].className === "operateur"){
            value2 = Number(display.textContent);
            display.textContent = operate(value1, valueOperateur, value2);
            valueOperateur = e.path[0].id;
            value1 = Number(display.textContent);
            displayValue = "";
            point = false;
        }
        // si on appuis sur egal : affiche le resultat et vide la value1, la value2 et la value opérateur
        else if(e.path[0].id === "egal"){
            value2 = Number(display.textContent);
            display.textContent = operate(value1, valueOperateur, value2);
            mode = "value1";
            valueOperateur = "";
            displayValue = "";
        }
    }
}
function countDecimals(x) {
    if (Math.floor(x) !== x){
        return x.toString().split(".")[1].length;
    }
    return 0;
}

function displayContent(e){
    displayValue = displayValue + e.path[0].id;
    display.textContent =  displayValue; 
}

function add(number1, number2){
    return number1+number2;
}
function substract(number1, number2){
    return number1-number2;
}
function multiply(number1, number2){
    return number1*number2;
}
function divide(number1, number2){
    if (number2===0){
        alert("don't divide by 0");
        return;
    }
    return number1/number2;
}

function operate(nb1, opp, nb2){
    if(opp === "+"){
        if(countDecimals(add(nb1,nb2))> 4){
            return (add(nb1,nb2)).toFixed(4);
        }
        return add(nb1,nb2);
    }
    if(opp === "-"){
        if(countDecimals(substract(nb1,nb2))> 4){
            return (substract(nb1,nb2)).toFixed(4);
        }
        return substract(nb1,nb2);
    }
    if(opp === "x"){
        if(countDecimals(multiply(nb1,nb2))> 4){
            return (multiply(nb1,nb2)).toFixed(4);
        }
        return multiply(nb1,nb2);
    }
    if(opp === "÷"){
        if(countDecimals(divide(nb1,nb2))> 4){
            return (divide(nb1,nb2)).toFixed(4);
        }
        return divide(nb1,nb2);
    }
}

buttons.forEach(button => button.addEventListener("click", calculate));
