const chalk = require("chalk")

// drawer constructor
const Drawer = function () {
  this.canvas = null
  this.width = null
  this.height = null
  this.init = false
}

// Command listener
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
        this.drawRect(_command[1], _command[2], _command[3], _command[4])
        break
      case "B":
        this.fill(_command[1], _command[2], _command[3])
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

// Command pre-processor
Drawer.prototype.processCommand = function (command) {
  const _command = command.split(" ")
  const result = []
  result.push(command[0])
  for (let i = 1; i < _command.length; i++) {
    if (!isNaN(_command[i])) {
      result.push(parseInt(_command[i]))
    } else {
      result.push(_command[i])
    }
  }
  return result
}

// validate command parameters
Drawer.prototype.isValidCommand = function (command) {
  switch (command[0]) {
    case "C":
      if (
        !isNaN(command[1]) &&
        !isNaN(command[2]) &&
        command[1] < 50 &&
        command[2] < 50
      ) {
        return true
      } else {
        this.log(
          "warning",
          "The width and height should be number and smaller than 50*50"
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
      if (
        isNaN(command[1]) ||
        isNaN(command[2]) ||
        isNaN(command[3]) ||
        isNaN(command[4])
      ) {
        this.log("warning", "please input both start and end coords")
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
        isNaN(command[1]) ||
        isNaN(command[2]) ||
        isNaN(command[3]) ||
        isNaN(command[4])
      ) {
        this.log(
          "warning",
          "please input both upper left and lower right coords"
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
      if (command[1] >= command[3] || command[2] >= command[4]) {
        this.log(
          "warning",
          "The x1, y1 should be left upper corner, the x2, y2 should be right lower corner."
        )
        return false
      }
      return true
    case "B":
      if (!this.init) {
        this.log("warning", "Please init canvas first by using command C w h.")
        return false
      }
      if (isNaN(command[1]) || isNaN(command[2])) {
        this.log("warning", "please input starting coords")
        return false
      }
      if (this.outsideCanvas(command[1], command[2])) {
        this.log("warning", "The point is at the outside of canvas.")
        return false
      }
      return true
    default:
      return false
  }
}

// check if some coords outside the canvas
Drawer.prototype.outsideCanvas = function (x, y) {
  if (x <= 0 || x > this.width || y <= 0 || y > this.height) {
    return true
  } else {
    return false
  }
}

// init canvas
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

// draw line
Drawer.prototype.drawLine = function (x1, y1, x2, y2, showResult = true) {
  // The line could have different direction, we swap them there to make sure the direction always positive
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

// draw rect
Drawer.prototype.drawRect = function (x1, y1, x2, y2) {
  this.drawLine(x1, y1, x2, y1, false)
  this.drawLine(x1, y1, x1, y2, false)
  this.drawLine(x2, y2, x2, y1, false)
  this.drawLine(x2, y2, x1, y2, false)
  this.showCanvas()
}

// bucket fill
Drawer.prototype.fill = function (x, y, char = "o") {
  // recursive helper, ultra fast
  const recursiveFill = (canvas, x, y, char) => {
    // if there is already has some filled, we skip
    if (this.canvas[y][x] !== " ") {
      return
    }
    this.canvas[y][x] = char
    recursiveFill(this.canvas, x + 1, y, char)
    recursiveFill(this.canvas, x - 1, y, char)
    recursiveFill(this.canvas, x, y + 1, char)
    recursiveFill(this.canvas, x, y - 1, char)
  }
  recursiveFill(this.canvas, x, y, char)
  this.showCanvas()
}

// reset the whole canvas
Drawer.prototype.reset = function () {
  this.init = false
  this.canvas = []
  this.width = null
  this.height = null
  this.log("success", "Canvas has been cleaned.")
}

// display current canvas
Drawer.prototype.showCanvas = function () {
  console.log(this.canvas.map((row) => row.join(" ")).join("\n"))
}

// logger
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
