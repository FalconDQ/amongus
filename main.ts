let players: string[] = []
radio.setTransmitPower(7)
radio.setGroup(1)
players.push(control.deviceName())
players.push("wsqwsqwsqw")
for (let index = 0; index <= players.length; index++) {
    basic.showString("" + (players[index]))
}
basic.forever(function () {
	
})
