function initGameMaster () {
    basic.showString("Game ready")
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
function addImposter (num: number) {
    imposter = num
    if (control.deviceSerialNumber() == num) {
        amImposter = 1
    }
    basic.showString("" + (imposter))
    basic.showString("" + (amImposter))
}
input.onButtonPressed(Button.AB, function () {
    if (join == 1 && master == 1) {
        join = 0
        initGameMaster()
    }
})
function addPlayer (num: number) {
    if (master == 1) {
        if (players.indexOf(num) == -1) {
            players.push(num)
        }
    }
}
radio.onReceivedString(function (receivedString) {
	
})
radio.onReceivedValue(function (name, value) {
    if (name.compare("hello") == 0) {
        addPlayer(value)
    } else {
        if (name.compare("imposter") == 0) {
            addImposter(value)
        }
    }
})
let imposter = 0
let players: number[] = []
let master = 0
let join = 0
let amImposter = 0
amImposter = 0
join = 0
master = 0
radio.setTransmitSerialNumber(true)
radio.setTransmitPower(7)
radio.setGroup(1)
if (input.buttonIsPressed(Button.B)) {
    players = []
    master = 1
    players.push(control.deviceSerialNumber())
    basic.showString("Master - Players can join...")
    join = 1
} else {
    basic.showString("Player")
}
radio.sendValue("hello", control.deviceSerialNumber())
basic.forever(function () {
	
})
