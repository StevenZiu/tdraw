const readline = require("readline")
const chalk = require("chalk")
const { commandHelperTable } = require("./constant")
const Drawer = require("./drawer")
const rl = readline.createInterface(process.stdin, process.stdout)
const D = new Drawer()

console.log(
  chalk.green(
    "Welcome to terminal canvas, for full command tools, type -h quit app type Q"
  )
)

// listener
rl.on("line", function (line) {
  if (line === "-h") {
    console.log(chalk.blue("Full command: \n"))
    console.log(commandHelperTable)
  } else if (line === "Q") {
    console.log(chalk.blue("Good day!\n"))
    rl.close()
  } else if (/^[CLRXB]/gi.test(line)) {
    D.onCommand(line)
  } else {
    console.log(chalk.blue("Unknown command.\n"))
  }
}).on("close", function () {
  process.exit(0)
})
