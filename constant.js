const chalk = require("chalk")
const chalkTable = require("chalk-table")

const commandHelperTableOptions = {
  leftPad: 2,
  columns: [
    { field: "command", name: chalk.magenta("Command") },
    { field: "desc", name: chalk.green("Description") },
  ],
}

const commandHelperTable = chalkTable(commandHelperTableOptions, [
  {
    command: "C w h",
    desc: "Create a new canvas of width w and height h.",
  },
  {
    command: "L x1 y1 x2 y2",
    desc: "Create a new line from (x1,y1) to (x2,y2).",
  },
  {
    command: "R x1 y1 x2 y2",
    desc: "Create a new rectangle, whose upper left corner is (x1,y1) and lower right corner is (x2,y2).",
  },
  {
    command: "B x y c",
    desc: "Fill the entire area connected to (x,y) with 'colour' c. ",
  },
  {
    command: "Q",
    desc: "Quit the program",
  },
])

module.exports = {
  commandHelperTable,
}
