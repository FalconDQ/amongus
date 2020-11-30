function initGameMaster () {
    basic.showString("READY")
    imposter = players[randint(0, players.length - 1)]
    radio.sendValue("imposter", imposter)
    addImposter(imposter)
}
input.onButtonPressed(Button.A, function () {
    if (master == 1) {
        for (let index = 0; index <= players.length - 1; index++) {
            basic.showString("" + (players[index]))
        }
    }
})
input.onGesture(Gesture.Shake, function () {
    if (amImposter == 1) {
        basic.showString("Imposter")
    } else {
        basic.showString("Crewmate")
    }
})
function addNearestPlayer (num: number) {
    if (signalStrength > highestSignal) {
        highestSignal = signalStrength
        closestPlayer = num
    }
}
function addImposter (num: number) {
    imposter = num
    if (control.deviceSerialNumber() == num) {
        amImposter = 1
    }
}
input.onButtonPressed(Button.AB, function () {
    if (join == 1 && master == 1) {
        join = 0
        initGameMaster()
    }
})
function initMasterPlayer () {
    players = []
    master = 1
    players.push(control.deviceSerialNumber())
    basic.showString("Master")
    join = 1
}
function attackNearestPlayer () {
    radio.sendValue("kill", closestPlayer)
}
function addPlayer (num: number) {
    if (master == 1) {
        if (players.indexOf(num) == -1) {
            players.push(num)
        }
    }
}
radio.onReceivedString(function (receivedString) {
    signalStrength = Math.map(radio.receivedPacket(RadioPacketProperty.SignalStrength), -95, -42, 1, 50)
    addNearestPlayer(radio.receivedPacket(RadioPacketProperty.SerialNumber))
})
input.onButtonPressed(Button.B, function () {
    if (amImposter == 1) {
        attackNearestPlayer()
    }
})
function initNormalPLayer () {
    basic.showString("Player")
    player = 1
    radio.sendValue("join", control.deviceSerialNumber())
}
radio.onReceivedValue(function (name, value) {
    if (name.compare("join") == 0) {
        addPlayer(value)
    } else if (name.compare("imposter") == 0) {
        addImposter(value)
    } else if (name.compare("kill") == 0) {
        killPlayer(value)
    } else {
    	
    }
})
function killPlayer (player: number) {
    if (player == control.deviceSerialNumber() && amImposter == 0) {
        lives += -1
        for (let index = 0; index < lives; index++) {
            images.iconImage(IconNames.Heart).scrollImage(3, 500)
        }
        if (lives == 0) {
            dead()
        }
    }
}
function dead () {
    while (true) {
        images.iconImage(IconNames.Sad).showImage(0)
    }
}
let closestPlayer = 0
let highestSignal = 0
let signalStrength = 0
let players: number[] = []
let imposter = 0
let master = 0
let join = 0
let amImposter = 0
let player = 0
let lives = 0
led.setBrightness(130)
lives = 3
player = 0
amImposter = 0
amImposter = 0
join = 0
master = 0
radio.setTransmitSerialNumber(true)
radio.setTransmitPower(7)
radio.setGroup(1)
if (input.buttonIsPressed(Button.B)) {
    initMasterPlayer()
} else {
    initNormalPLayer()
}
game.setLife(lives)
basic.forever(function () {
    if (master == 1) {
        basic.showLeds(`
            # . . . #
            # # . # #
            # . # . #
            # . . . #
            # . . . #
            `)
    } else {
        basic.showLeds(`
            . # # # .
            . # . . #
            . # # # .
            . # . . .
            . # . . .
            `)
    }
    basic.pause(2000)
})
basic.forever(function () {
    basic.pause(200)
    radio.sendString("hello")
})
