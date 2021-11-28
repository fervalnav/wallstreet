
let timerObj = {
    minutes: 5,
    seconds: 0,
    timerId: 0
}

let ron = {
    prices: {
        barcelo: [3.5, 4.3, 4.5],
        brugal: [2, 3, 4],
        cacique: [1, 2, 3],
        morgan: [1, 2, 3],
        ritual: [1, 2, 3]
    },
    last: {
        barcelo: 2,
        brugal: 2,
        cacique: 0,
        morgan: 1,
        ritual: 0
    },
    actual: {
        barcelo: 2,
        brugal: 0,
        cacique: 2,
        morgan: 1,
        ritual: 0
    },
    count: {
        barcelo: 0,
        brugal: 0,
        cacique: 0,
        morgan: 0,
        ritual: 0
    }
}


let whisky = {
    prices: {
        walker: [2, 3, 4],
        ballantines: [2, 3, 4],
        jyb: [1, 2, 3],
        cutty: [1, 2, 3],
        dyc: [2.9, 3.1, 3.3]
    },
    last: {
        walker: 2,
        ballantines: 2,
        jyb: 0,
        cutty: 1,
        dyc: 0
    },
    actual: {
        walker: 2,
        ballantines: 0,
        jyb: 2,
        cutty: 1,
        dyc: 0
    },
    count: {
        walker: 0,
        ballantines: 0,
        jyb: 0,
        cutty: 0,
        dyc: 0
    }
}

let ginebra = {
    prices: {
        beefeater: [2, 3, 4],
        larios: [2, 3, 4],
        tanqueray: [1, 2, 3],
        bombay: [1, 2, 3],
        bpink: [1, 2, 3],
        rives: [2.9, 3.1, 3.3]
    },
    last: {
        beefeater: 2,
        larios: 2,
        tanqueray: 0,
        bombay: 1,
        bpink: 0,
        rives: 0
    },
    actual: {
        beefeater: 2,
        larios: 0,
        tanqueray: 2,
        bombay: 1,
        bpink: 0,
        rives: 0
    },
    count: {
        beefeater: 0,
        larios: 0,
        tanqueray: 0,
        bombay: 0,
        bpink: 0,
        rives: 0
    }
}

let vodka = {
    prices: {
        absolut: [2, 3, 4],
        smirnoff: [2, 3, 4],
        yurinka: [1, 2, 3]
    },
    last: {
        absolut: 2,
        smirnoff: 2,
        yurinka: 0
    },
    actual: {
        absolut: 2,
        smirnoff: 0,
        yurinka: 2
    },
    count: {
        absolut: 0,
        smirnoff: 0,
        yurinka: 0
    }
}

function updateValue(key, value) {
    if (value < 0) {
        value = 0;
        console.log("Solo numeros positivos");
    }
    if (key == "seconds") {
        if (value < 10) {
            value = "0" + value;
        }

        if (value > 59) {
            value = 59;
        }
    }

    $("#" + key).html(value || 0);
    timerObj[key] = value;
}


function startTimer() {
    buttonManager(["start", false], ["pause", true], ["stop", true]);
    freezeInputs();

    timerObj.timerId = setInterval(function () {
        timerObj.seconds--;
        if (timerObj.seconds < 0) {
            if (timerObj.minutes == 0) {
                return stopTimer();
            }
            timerObj.seconds = 59;
            timerObj.minutes--;
        }

        updateValue("minutes", timerObj.minutes);
        updateValue("seconds", timerObj.seconds);
    }, 1000);
}
function stopTimer() {
    clearInterval(timerObj.timerId);
    buttonManager(["start", true], ["pause", false], ["stop", false]);
    unfreezeInputs();
    updateValue("minutes", $("#minutes-input").val());

    let seconds = $("#seconds-input").val();
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    updateValue("seconds", seconds);
}

function pauseTimer() {
    buttonManager(["start", true], ["pause", false], ["stop", true]);
    clearInterval(timerObj.timerId);

}


function buttonManager(...buttonsArray) {
    for (let i = 0; i < buttonsArray.length; i++) {
        let button = "#" + buttonsArray[i][0] + "-button";
        if (buttonsArray[i][1]) {
            $(button).removeAttr('disabled');
        } else {
            $(button).attr('disabled', 'disabled');
        }
    }
}


function freezeInputs() {
    $("#minutes-input").attr('disabled', 'disabled');
    $("#seconds-input").attr('disabled', 'disabled');
}

function unfreezeInputs() {
    $("#minutes-input").removeAttr('disabled');
    $("#seconds-input").removeAttr('disabled');
}

function updatePrices(obj) {
    const keysSorted = Object.keys(obj.count).sort(function(a,b){return obj.count[a]-obj.count[b]})
    obj.last = JSON.parse(JSON.stringify(obj.actual))
    const interval = keysSorted.length/3
    for(let i = 0 ; i<keysSorted.length; i++) {
        if(i<=interval) obj.actual[keysSorted[i]] = 0
        else if ( i<=interval*2) obj.actual[keysSorted[i]] = 1
        else obj.actual[keysSorted[i]] = 2

        obj.count[keysSorted[i]] = 0
    }
}


function setPrices(obj) {
    const keys = Object.keys(obj.prices);
    for (let i = 0; i < keys.length; i++) {
        let lastPrice = obj.last[keys[i]];
        let actualPrice = obj.actual[keys[i]];
        let prices = obj.prices[keys[i]];
        if (actualPrice > lastPrice) {
            $(`#p${keys[i]}`).html(prices[actualPrice] + " &#8364 &#x25B2")
            $(`#${keys[i]}`).css("color", "green")
        } else if (actualPrice < lastPrice) {
            $(`#p${keys[i]}`).html(prices[actualPrice] + " &#8364 	&#x25BC")
            $(`#${keys[i]}`).css("color", "red")
        } else {
            $(`#p${keys[i]}`).html(prices[actualPrice] + " &#8364 	&#x25B6")
            $(`#${keys[i]}`).css("color", "orange")
        }

    }
}

function update (){
    updatePrices(ron);
    updatePrices(whisky);
    updatePrices(ginebra);
    updatePrices(vodka);
    setPrices(ron);
    setPrices(whisky);
    setPrices(ginebra);
    setPrices(vodka);
    stopTimer();
    updateValue('minutes', 5);
    updateValue('seconds', 0);
    startTimer();

}
function add(type, bebida) {
    switch(type) {
        case 'ron':
            ron.count[bebida]++
            break
        case 'gin':
            ginebra.count[bebida]++
            break
        case 'whisky':
            whisky.count[bebida]++
            break
        case 'vodka':
            vodka.count[bebida]++
            break
    }
}
$(document).ready(function () {
    update();
    setInterval(update, 10000)
})