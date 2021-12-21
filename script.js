var tray = document.getElementById('tray');
var header = document.getElementById('header');
var menu = document.getElementById('menu');
var sumTrayContainer = document.getElementById('sumTrayContainer');
var trayControls = document.getElementById('trayControls');
var historicContainer = document.getElementById('historicContainer');
var historicControls = document.getElementById('historicControls');
var historic = document.getElementById('historic');
var deleteHistoricContainer = document.getElementById('deleteHistoricContainer');
var deleteHistoric = document.getElementById('deleteHistoric');
var backArrow = document.getElementById('backArrow');
var forArrow = document.getElementById('forArrow');
var slide = document.getElementById("slide");
var slideContainer = document.getElementById("slideContainer");
var itemSize;
var isJumping = false;
var resetNeeded = false;
var isReseting = false;
var gravity;  
var bouncePower; 
var bounced;
var delay = 0;
var isAnimating = false;
var angularPosX;
var angularPosY;
var vax; 
var vay; 
var vy; 
var linearPosY;
var itemList;
var cubeSize;
var cubeList;
var menuContainer = document.getElementById('menuContainer');
var section1 = document.getElementById('section1');
var timedAnimation;
var timedReset;
var timedJump;
var sum = 0;
var sumContainer = document.getElementById('sumContainer');
var historicList = [];
var historicListOrganized = [];
var isSumming = false;
var trayContainer = document.getElementById('trayContainer');
var historicTitle = document.getElementById('historicTitle');
var sumTray = document.getElementById('sumTray');
var section2 = document.getElementById('section2');
var section3 = document.getElementById('section3');
var alertContainer = document.getElementById('alertContainer');
var alertMessage = document.getElementById('alertMessage');
var alertClose = document.getElementById('alertClose');
var customizableMenuContainer = document.getElementById('customizableMenuContainer');
var customizableMessage = document.getElementById('customizableMessage');
var customizableMenuOK = document.getElementById('customizableMenuOK');
var customizableMenuClose = document.getElementById('customizableMenuClose');
var customizableNumber = document.getElementById('customizableNumber');
var customizableMenu = document.getElementById('customizableMenu');
var toolContainer = document.getElementById('toolContainer');
var tool = document.getElementById('tool');
var customizableItem = document.getElementById('customizableItem');
var sideLimits = document.getElementById('sideLimits');
var trashTrayContainer = document.getElementById('trashTrayContainer');
var refreshTrayContainer = document.getElementById('refreshTrayContainer');
var alertContainerEmpty = document.getElementById('alertContainerEmpty');
var alertMessageEmpty = document.getElementById('alertMessageEmpty');
var alertCloseEmpty = document.getElementById('alertCloseEmpty');
var doc = document.getElementById('body');
var loading = document.getElementById('loading')
var traySize;

function sumResults () { 
    
    if (isSumming == false) {

        isSumming = true;
        var facenumber4List = document.getElementsByClassName('faceNumber4');
        for (var a = 0; a < facenumber4List.length; a++) {
            historicList.push(Number(facenumber4List[a].textContent))
            sum += Number(facenumber4List[a].textContent);
        }
        var sumContent = document.createTextNode(sum);
        if (sumContainer.firstChild) {
            sumContainer.removeChild(sumContainer.lastChild);
        }
        sumContainer.append(sumContent);
        var historicLine = document.createElement('div');
        historicLine.classList.add('historicLine');
        if (historicList.length == 1) {
            historicListOrganized = historicList;
        } else if (historicList.length > 1) {
            for (var i = 0; i < historicList.length; i++) {
                if (i == (historicList.length - 1)) {
                    historicListOrganized += `${historicList[i]} = ${sum}`
                } else {
                    historicListOrganized += `${historicList[i]} + `
                }
            }
        }
        var historicContent = document.createTextNode(historicListOrganized);
        historicLine.appendChild(historicContent);
        if (historicListOrganized.length > 0) {
            historic.appendChild(historicLine);
        }
        historic.scroll(0, (historic.scrollTop + 1000));
        historicListOrganized = [];
        historicList = [];
        sum = 0;
        resizeHistoricContainer();
    }
    isSumming = false;
}

function setVar () {

    if (amountDicesOnTray() > 0) {
        bounced = 0;
        bouncePower = 0.5
        vax = 0.5;
        vay = 5.5; 
        angularPosX = -30; 
        angularPosY = 0; 
        linearPosY = 0;
        var diceBackgroundList = document.getElementsByClassName('diceBackground');
        vy = -diceBackgroundList[0].getBoundingClientRect().height*0.025;
        gravity = diceBackgroundList[0].getBoundingClientRect().height*0.00075;
        itemList = document.getElementsByClassName('item');
        cubeSize = itemList[0].getBoundingClientRect().width * 0.6;
        cubeList = document.getElementsByClassName('cube');
        isJumping = false;
        resetNeeded = false;
    }
};

function newResizeTray () {
    if (window.innerWidth <= 590) {
        traySize = (Math.sqrt((Math.pow(toolContainer.getBoundingClientRect().width, 2)) + (Math.pow(toolContainer.getBoundingClientRect().height, 2)))) * 0.55;       
        if (traySize > (toolContainer.getBoundingClientRect().height * 0.85)) {
            traySize = toolContainer.getBoundingClientRect().height * 0.85;
        }
        if (traySize > (toolContainer.getBoundingClientRect().width * 0.9)) {
            traySize = toolContainer.getBoundingClientRect().width * 0.9;
        }
        tray.style.width = `${traySize}px`;
        tray.style.height = `${traySize}px`;
    } else {
        traySize = (Math.sqrt((Math.pow(toolContainer.getBoundingClientRect().width, 2)) + (Math.pow(toolContainer.getBoundingClientRect().height, 2)))) * 0.5;       
        if (traySize > (toolContainer.getBoundingClientRect().height * 0.85)) {
            traySize = toolContainer.getBoundingClientRect().height * 0.85;
        }
        if (traySize > (toolContainer.getBoundingClientRect().width * 0.7)) {
            traySize = toolContainer.getBoundingClientRect().width * 0.7;
        }
        tray.style.width = `${traySize}px`;
        tray.style.height = `${traySize}px`;
    }
}

function resizeHistoricContainer () {
    section2.style.width = `${tool.getBoundingClientRect().width}px`;
    historicContainer.style.width = `${(section2.getBoundingClientRect().width * 0.97)}px`;
    historicContainer.style.height = `${(historicContainer.getBoundingClientRect().width * 0.65)}px`;
    historic.style.height = `${(historicContainer.getBoundingClientRect().width * 0.5)}px`;
};

function resizeSection3 () {
    section3.style.width = `${tool.getBoundingClientRect().width}px`;
}

function fixingElements () {
    newResizeTray();
    resizeHistoricContainer();
    resizeSection3();
    if (sumContainer.firstChild) {
        sumContainer.removeChild(sumContainer.lastChild);
    }
    historic.scroll(0, (historic.scrollTop + 1000));
    delay = 0;
};

window.addEventListener("resize", fixingElements);

fixingElements();

function amountDicesOnTray () {
    return tray.childElementCount;
}

function configItemSize () {
    if (amountDicesOnTray() > 0) {
        itemSize = 100 / Math.ceil(Math.sqrt(amountDicesOnTray()));
        if (itemSize >= 60) {
            itemSize = 60;
        }
        var itemList = document.getElementsByClassName('item');
        for (var i = 0; i < itemList.length; i++) {
            itemList[i].style.width = `${itemSize}%`;
            itemList[i].style.height = `${itemList[i].getBoundingClientRect().width}px`;
        }
        var cubeSize = itemList[0].getBoundingClientRect().width * 0.6;
        var cubeList = document.getElementsByClassName('cube');
        for (var j = 0; j < cubeList.length; j++) {
            cubeList[j].style.transform = `translateZ(-${cubeSize*4}px) rotateX(-30deg) rotateY(0deg) translateX(-${cubeSize*0.5}px) translateY(-${cubeSize*1.45}px)`;
        }
        var faceList = document.getElementsByClassName('face');
        for (var r = 0; r < faceList.length; r++) {
            faceList[r].style.width = `${cubeSize}px`;
            faceList[r].style.height = `${cubeSize}px`;
        }
        var side1List = document.getElementsByClassName('side1');
        for (var l = 0; l < side1List.length; l++) {
            side1List[l].style.transform = `rotateY(45deg) translateZ(${cubeSize*0.5}px)`;
        }
        var side2List = document.getElementsByClassName('side2');
        for (var m = 0; m < side2List.length; m++) {
            side2List[m].style.transform = `rotateY(-135deg) translateZ(${cubeSize*0.5}px)`;
        }
        var side3List = document.getElementsByClassName('side3');
        for (var n = 0; n < side3List.length; n++) {
            side3List[n].style.transform = `rotateY(135deg) translateZ(${cubeSize*0.5}px)`;
        }
        var side4List = document.getElementsByClassName('side4');
        for (var o = 0; o < side4List.length; o++) {
            side4List[o].style.transform = `rotateY(-45deg) translateZ(${cubeSize*0.5}px)`;
        }
        var side5List = document.getElementsByClassName('side5');
        for (var p = 0; p < side5List.length; p++) {
            side5List[p].style.transform = `rotateX(90deg) rotateZ(45deg) translateZ(${cubeSize*0.5}px)`;
        }
        var side6List = document.getElementsByClassName('side6');
        for (var q = 0; q < side6List.length; q++) {
            side6List[q].style.transform = `rotateX(-90deg) rotateZ(45deg) translateZ(${cubeSize*0.5}px)`;
        }
        var faceNumberList = document.getElementsByClassName('faceNumber');
        for (var s = 0; s < faceNumberList.length; s++) {
            faceNumberList[s].style.fontSize = `${cubeSize*0.5}px`;
        }
    }
}; 

window.addEventListener('resize', configItemSize);

function translatedReset (div) {
    slideContainer.scroll(0, 0);
    slidePosition = 0;
};

function historicControl (direction) {
    if (direction == 'down') {
        historic.scroll(0, (historic.scrollTop + 100));
    }
    if (direction == 'up') {
        historic.scroll(0, (historic.scrollTop - 100));
    }
};

function addItem (qtd, numberOfSides) {

    tray.style.backgroundImage = '';
    if (isJumping == false) {
        if (resetNeeded) {
            reset();
        }
        setTimeout(() => {
            for (var c = 0; c < qtd; c++) {
                if (tray.childElementCount <= 3) {
                    var item = document.createElement('div');
                    item.classList.add('item');
                    var diceBackground = document.createElement('div');
                    diceBackground.classList.add('diceBackground');
                    var diceHitBox = document.createElement('div');
                    diceHitBox.classList.add('diceHitBox');
                    var cube = document.createElement('div');
                    cube.classList.add('cube');
                    var tag = document.createElement('div');
                    tag.classList.add('tag');
                    var tagContent = document.createTextNode(numberOfSides);
                    tag.appendChild(tagContent);
                    var face1 = document.createElement('div');
                    face1.classList.add('face');
                    face1.classList.add('side1');
                    var face1number = document.createElement('div');
                    face1number.classList.add('faceNumber');
                    face1number.classList.add('faceNumber1');
                    var face2 = document.createElement('div');
                    face2.classList.add('face');
                    face2.classList.add('side2');
                    var face2number = document.createElement('div');
                    face2number.classList.add('faceNumber');
                    face2number.classList.add('faceNumber2');
                    var face3 = document.createElement('div');
                    face3.classList.add('face');
                    face3.classList.add('side3');
                    var face3number = document.createElement('div');
                    face3number.classList.add('faceNumber');
                    face3number.classList.add('faceNumber3');
                    var face4 = document.createElement('div');
                    face4.classList.add('face');
                    face4.classList.add('side4');
                    var face4number = document.createElement('div');
                    face4number.classList.add('faceNumber');
                    face4number.classList.add('faceNumber4');
                    var face5 = document.createElement('div');
                    face5.classList.add('face');
                    face5.classList.add('side5');
                    var face5number = document.createElement('div');
                    face5number.classList.add('faceNumber');
                    face5number.classList.add('faceNumber5');
                    var face6 = document.createElement('div');
                    face6.classList.add('face');
                    face6.classList.add('side6');
                    var face6number = document.createElement('div');
                    face6number.classList.add('faceNumber');
                    face6number.classList.add('faceNumber6');

                    face1.appendChild(face1number);    
                    face2.appendChild(face2number); 
                    face3.appendChild(face3number); 
                    face4.appendChild(face4number); 
                    face5.appendChild(face5number); 
                    face6.appendChild(face6number);   
                    cube.appendChild(face1);
                    cube.appendChild(face2);
                    cube.appendChild(face3);
                    cube.appendChild(face4);
                    cube.appendChild(face5);
                    cube.appendChild(face6);
                    diceHitBox.appendChild(cube);
                    diceBackground.appendChild(diceHitBox);
                    item.appendChild(tag);
                    item.appendChild(diceBackground);
                    tray.appendChild(item);

                    configItemSize();
                    fillSides();
                } else {
                    openAlert();
                    delay = 0;
                    return;
                }
            }
            delay = 0;
            if (sumContainer.firstChild) {
                sumContainer.removeChild(sumContainer.lastChild);
            }
        }, delay);
        
    }
};

function jump () { 

    if (isJumping == false && !resetNeeded) {
        setVar();
        animateFaces(); 
        isJumping = true;
        timedJump = setInterval(function () {
            linearPosY += vy;
            vy += gravity;
            angularPosX += vax;
            angularPosY += vay;
            if (linearPosY > (traySize * 0.04)) {
                linearPosY = traySize * 0.04;
                vy *= -bouncePower;
                bounced++;
            }
            if (angularPosY > 765) {
                angularPosY = 765;
            }
            if (angularPosX > 0) {
                angularPosX = 0;
            }
            var diceHitBoxList = document.getElementsByClassName('diceHitBox');
            for (var z = 0; z < diceHitBoxList.length; z++) {
                diceHitBoxList[z].style.transform = `translateY(${linearPosY}px)`;
            }
            var cubeList = document.getElementsByClassName('cube');
            for (var a = 0; a < cubeList.length; a++) {
                cubeList[a].style.transform = `translateZ(-${cubeSize*4}px) rotateX(${angularPosX}deg) rotateY(${angularPosY}deg) translateX(-${cubeSize*0.5}px) translateY(-${cubeSize*1.45}px)`
            }
            if(bounced == 4) {
                clearInterval(timedJump);
                isJumping = false;
                resetNeeded = true;
                delay = 500;
            }
        }, 20); 
    }
};

function animateFaces () { 
    timedAnimation = setInterval(() => {
        var itemList = document.getElementsByClassName('item');
        for (var h = 0; h < itemList.length; h++) {
            var tagList = itemList[h].getElementsByClassName('tag');
            var result = Math.floor((Math.random() * tagList[0].textContent) + 1);
            var faceNumberList = itemList[h].getElementsByClassName('faceNumber');
            for (var m = 0; m < faceNumberList.length; m++) {
                if (faceNumberList[m].firstChild) {
                    faceNumberList[m].replaceChild(document.createTextNode(result), faceNumberList[m].firstChild);
                } else {
                    faceNumberList[m].appendChild(document.createTextNode(result));
                }
            }
        }
        if (isJumping == false) {
            sumResults();
            clearInterval(timedAnimation);
            //sum = 0;
        } 
    }, 245);
}

function reset () {
    if (resetNeeded && !isJumping && !isReseting) { // se precisar resetar, NÃO está pulando e já NÃO está resetando

        isReseting = true;
        fillSides();
        var xAngularOk = false;                 
        var yAngularOk = false;
        var yLinearOk = false;
        timedReset = setInterval(function () {
            vax = 3;
            vay = 4.5;
            vy = 3;
            angularPosX -= vax;
            angularPosY -= vay;
            linearPosY -= vy;
            if (angularPosY < 720) {
                angularPosY = 720;
                xAngularOk = true;
            }
            if (angularPosX < -30) {
                angularPosX = -30;
                yAngularOk = true;
            }
            if (linearPosY < 0) {
                linearPosY = 0;
                yLinearOk = true;
            }
            var cubeList = document.getElementsByClassName('cube');
            for (var e = 0; e < cubeList.length; e++) {
                cubeList[e].style.transform = `translateZ(-${cubeSize*4}px) rotateX(${angularPosX}deg) rotateY(${angularPosY}deg) translateX(-${cubeSize*0.5}px) translateY(-${cubeSize*1.45}px)`;
            }
            var diceHitBoxList = document.getElementsByClassName('diceHitBox');
            for (var k = 0; k < diceHitBoxList.length; k++) {
                diceHitBoxList[k].style.transform = `translateY(${linearPosY}px)`;
            }
            if (xAngularOk && yAngularOk && yLinearOk) {
                xAngularOk = false;                 
                yAngularOk = false;
                yLinearOk = false;
                setVar();
                clearInterval(timedReset);
                resetNeeded = false;
                isReseting = false;
            }
        }, 20);
    }
};

function cancelAnimation () {
    setVar();
    var cubeList = document.getElementsByClassName('cube');
    for (var e = 0; e < cubeList.length; e++) {
        cubeList[e].style.transform = `translateZ(-${cubeSize*4}px) rotateX(${angularPosX}deg) rotateY(${angularPosY}deg) translateX(-${cubeSize*0.5}px) translateY(-${cubeSize*1.45}px)`;
    }
    var diceHitBoxList = document.getElementsByClassName('diceHitBox');
    for (var k = 0; k < diceHitBoxList.length; k++) {
        diceHitBoxList[k].style.transform = `translateY(${linearPosY}px)`;
    }
    clearInterval(timedAnimation);
    clearInterval(timedReset);
    clearInterval(timedJump);
    configItemSize();
    fillSides();
    isReseting = false;
    resetNeeded = false;
}

window.addEventListener("resize", cancelAnimation);

function fillSides () {
    var itemList = document.getElementsByClassName('item');
    for (var c = 0; c < itemList.length; c++) {
        var tagList = itemList[c].getElementsByClassName('tag'); // só existe uma div com classe tag em cada 
        var faceNumberList = itemList[c].getElementsByClassName('faceNumber');
        if (faceNumberList[3].firstChild) {
            faceNumberList[3].replaceChild(document.createTextNode(tagList[0].textContent), faceNumberList[3].firstChild);
        } else {
            faceNumberList[3].appendChild(document.createTextNode(tagList[0].textContent));
        }
        if (faceNumberList[0].firstChild) {
            faceNumberList[0].replaceChild(document.createTextNode(tagList[0].textContent), faceNumberList[0].firstChild);
        } else {
            faceNumberList[0].appendChild(document.createTextNode(tagList[0].textContent));
        }
        if (faceNumberList[4].firstChild) {
            faceNumberList[4].replaceChild(document.createTextNode(tagList[0].textContent), faceNumberList[4].firstChild);
        } else {
            faceNumberList[4].appendChild(document.createTextNode(tagList[0].textContent));
        }
    }
};

function play () {
    if (sumContainer.firstChild) {
        sumContainer.removeChild(sumContainer.lastChild);
    }
    if (tray.childElementCount > 0) {
        if (resetNeeded) {
            reset();
        };
        setTimeout(jump, delay);
    } else {
        OpenAlertEmpty();
    }
};

function refresh () {
    if (tray.childElementCount > 0) {
        if (!isJumping && !isReseting) {
            if (resetNeeded) {
                reset();
            };
            delay = 0;
            if (sumContainer.firstChild) {
                sumContainer.removeChild(sumContainer.lastChild);
            }
        }
    } else {
        OpenAlertEmpty();
    }
}

function clearTray () {
    while (tray.firstChild) {
        tray.removeChild(tray.lastChild);
    }
    if (sumContainer.firstChild) {
        sumContainer.removeChild(sumContainer.lastChild);
    }
};

function clearHistoric () {
    while (historic.firstChild) {
        historic.removeChild(historic.lastChild);
    }
}

function trashTray () {
    if (isJumping == false && isReseting == false && isSumming == false) {
        clearTray();
        resetNeeded = false;
        delay = 0;
    }
}

addItem(1, 6);

function openAlert () {
    alertContainer.style.display = 'flex';
}

function OpenAlertEmpty () {
    alertContainerEmpty.style.display = 'flex';
}

function closeAlert () {
    alertContainer.style.display = 'none';
};

function closeAlertEmpty () {
    alertContainerEmpty.style.display = 'none';
}

document.addEventListener('click', function (event) {
    if (event.target !== alertContainer &&
        event.target !== customizableItem) {
        closeAlert();
    }
});

function openCustomizableMenu () {
    if (tray.childElementCount <= 3) {
        if (isJumping == false && isReseting == false) {
            customizableMenuContainer.style.display = `flex`;
        }
    } else {
        openAlert();
    }
};

function closeCustomizableMenu () {
    customizableMenuContainer.style.display = `none`;
};

document.addEventListener('click', function (event) {
    if (event.target !== customizableMenuContainer && 
        event.target !== customizableItem && 
        event.target !== customizableMenu && 
        event.target !== customizableMessage && 
        event.target !== customizableNumber &&
        event.target !== customizableMessageButtons &&
        event.target !== customizableMenuOK &&
        event.target !== sideLimits) {
        document.getElementById('customizableNumber').value = '';
        sideLimits.style.color = '';
        closeCustomizableMenu();
    }
});

document.addEventListener('click', function (event) {
    if (event.target !== alertContainerEmpty &&
        event.target !== playTrayContainer &&
        event.target !== refreshTrayContainer) {
        closeAlertEmpty();
    }
});


function customizableMenuOKPress () {
    var value = document.getElementById('customizableNumber').value;
    if (value < 2 || value > 999) {
        if (sideLimits.style.color == '') {
            sideLimits.style.color = '#c9c8c8';
            var blink = setInterval(() => {
                sideLimits.style.color = '';
                clearInterval(blink);
            }, 1000);
        }
    } else {
        addItem(1, value.replace(/^0+/, ''));
        document.getElementById('customizableNumber').value = '';
        sideLimits.style.color = '';
        closeCustomizableMenu();
    }
};

function specificChars() {
    var pattern = /[^0-9]/g;
    var res = customizableNumber.value.replace(pattern, "");
    return res;
}

function adapt(pattern) {
    var filter = specificChars();
    var res = "";
    c = 0; 
    for (var i = 0; i < pattern.length; i++) {
        if (pattern[i] == "#") {
            res += filter.charAt(c);
            c++;
        } else if (c < filter.length) {
            res += pattern.charAt(i);
        }
    };
    return res;
};

customizableNumber.addEventListener("input", function() {
    customizableNumber.value = adapt("###");
});

document.documentElement.addEventListener("load", function(){
    document.getElementById("loading").style.display = "block";
});


window.addEventListener("load", function(){
    document.getElementById("loading").style.display = "none";
});
