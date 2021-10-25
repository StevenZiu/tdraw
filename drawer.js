const chalk = require("chalk")

// init drawer
const Drawer = function () {
  this.canvas = null
  this.width = null
  this.height = null
  this.init = false
}

Drawer.prototype.onCommand = function (command) {
  let _command = this.processCommand(command)
  if (this.isValidCommand(_command)) {
    this.log("success", `Enter command: ${command}`)
    switch (_command[0]) {
      case "C":
        this.initCanvas(_command[1], _command[2])
        break
      case "L":
        this.drawLine(_command[1], _command[2], _command[3], _command[4])
        break
      case "R":
        console.log(_command)
        this.drawRect(_command[1], _command[2], _command[3], _command[4])
        break
      case "X":
        this.reset()
      default:
        break
    }
  } else {
    this.log("warning", "Incorrect command parameters")
  }
}

Drawer.prototype.processCommand = function (command) {
  const _command = command.split(" ")
  const result = []
  result.push(command[0])
  for (let i = 1; i < _command.length; i++) {
    result.push(parseInt(_command[i]))
  }
  return result
}

Drawer.prototype.isValidCommand = function (command) {
  switch (command[0]) {
    case "C":
      if (
        Number.isFinite(command[1]) &&
        Number.isFinite(command[2]) &&
        command[1] < 50 &&
        command[2] < 50
      ) {
        return true
      } else {
        this.log(
          "warning",
          "The width and height should not be larger than 500*500"
        )
        return false
      }
    case "X":
      return true
    case "L":
      if (!this.init) {
        this.log("warning", "Please init canvas first by using command C w h.")
        return false
      }
      if (command[1] !== command[3] && command[2] !== command[4]) {
        this.log(
          "warning",
          "Currently only horizontal or vertical lines are supported"
        )
        return false
      }
      if (
        this.outsideCanvas(command[1], command[2]) ||
        this.outsideCanvas(command[3], command[4])
      ) {
        this.log("warning", "Outside canvas.")
        return false
      }
      return true
    case "R":
      if (!this.init) {
        this.log("warning", "Please init canvas first by using command C w h.")
        return false
      }
      if (
        this.outsideCanvas(command[1], command[2]) ||
        this.outsideCanvas(command[3], command[4])
      ) {
        this.log("warning", "Outside canvas.")
        return false
      }
      if (command[1] >= command[3] || command[2] >= command[4]) {
        this.log(
          "warning",
          "The x1, y1 should be left upper corner, the x2, y2 should be right lower corner."
        )
        return false
      }
      return true
    default:
      return false
  }
}

Drawer.prototype.outsideCanvas = function (x, y) {
  console.log(x, y)
  if (x <= 0 || x > this.width || y <= 0 || y > this.height) {
    return true
  } else {
    return false
  }
}

Drawer.prototype.initCanvas = function (width, height) {
  if (this.init) {
    this.log("warning", "Canvas already exist. Type X to clear current canvas")
  } else {
    let canvas = []
    for (let i = 0; i <= height + 1; i++) {
      let row = []
      for (let j = 0; j <= width + 1; j++) {
        if (i === 0 || i === height + 1) {
          row.push("-")
        } else if (j === 0 || j === width + 1) {
          row.push("|")
        } else {
          row.push(" ")
        }
      }
      canvas.push(row)
    }
    this.canvas = canvas
    this.init = true
    this.width = width
    this.height = height
    this.showCanvas()
  }
}

Drawer.prototype.drawLine = function (x1, y1, x2, y2, showResult = true) {
  let _x1, _x2, _y1, _y2
  if (x1 > x2) {
    _x1 = x2
    _x2 = x1
  } else {
    _x1 = x1
    _x2 = x2
  }
  if (y1 > y2) {
    _y1 = y2
    _y2 = y1
  } else {
    _y1 = y1
    _y2 = y2
  }
  for (let i = _y1; i <= _y2; i++) {
    for (let j = _x1; j <= _x2; j++) {
      this.canvas[i][j] = "x"
    }
  }
  if (showResult) this.showCanvas()
}

Drawer.prototype.drawRect = function (x1, y1, x2, y2) {
  this.drawLine(x1, y1, x2, y1, false)
  this.drawLine(x1, y1, x1, y2, false)
  this.drawLine(x2, y2, x2, y1, false)
  this.drawLine(x2, y2, x1, y2, false)
  this.showCanvas()
}

Drawer.prototype.reset = function () {
  this.init = false
  this.canvas = []
  this.width = null
  this.height = null
  this.log("success", "Canvas has been cleaned.")
}

Drawer.prototype.showCanvas = function () {
  console.log(this.canvas.map((row) => row.join(" ")).join("\n"))
}

Drawer.prototype.log = function (type, msg) {
  switch (type) {
    case "warning":
      console.log(chalk.magenta(msg))
      break
    case "success":
      console.log(chalk.green(msg))
      break
    default:
      break
  }
}

module.exports = Drawer
