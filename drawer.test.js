const Drawer = require("./drawer")
const D = new Drawer()

describe("Terminal canvas should work with different command", () => {
  test("after running C w h, the canvas should be inited", () => {
    D.onCommand("C 5 5")
    expect(D.canvas).toStrictEqual([
      ["-", "-", "-", "-", "-", "-", "-"],
      ["|", " ", " ", " ", " ", " ", "|"],
      ["|", " ", " ", " ", " ", " ", "|"],
      ["|", " ", " ", " ", " ", " ", "|"],
      ["|", " ", " ", " ", " ", " ", "|"],
      ["|", " ", " ", " ", " ", " ", "|"],
      ["-", "-", "-", "-", "-", "-", "-"],
    ])
  })
  test("after running L 1 2 1 5, the canvas should draw a line from (1,2) to (1,5)", () => {
    D.onCommand("L 1 2 1 5")
    expect(D.canvas).toStrictEqual([
      ["-", "-", "-", "-", "-", "-", "-"],
      ["|", " ", " ", " ", " ", " ", "|"],
      ["|", "x", " ", " ", " ", " ", "|"],
      ["|", "x", " ", " ", " ", " ", "|"],
      ["|", "x", " ", " ", " ", " ", "|"],
      ["|", "x", " ", " ", " ", " ", "|"],
      ["-", "-", "-", "-", "-", "-", "-"],
    ])
  })
  test("after running R 2 2 4 4, the canvas should draw a rectangle with left upper at (2,2) and lower right at (4,4)", () => {
    D.onCommand("R 2 2 4 4")
    expect(D.canvas).toStrictEqual([
      ["-", "-", "-", "-", "-", "-", "-"],
      ["|", " ", " ", " ", " ", " ", "|"],
      ["|", "x", "x", "x", "x", " ", "|"],
      ["|", "x", "x", " ", "x", " ", "|"],
      ["|", "x", "x", "x", "x", " ", "|"],
      ["|", "x", " ", " ", " ", " ", "|"],
      ["-", "-", "-", "-", "-", "-", "-"],
    ])
  })
  test("after running B 1 1, the canvas should bucket fill all connected coords with o by default", () => {
    D.onCommand("B 1 1")
    expect(D.canvas).toStrictEqual([
      ["-", "-", "-", "-", "-", "-", "-"],
      ["|", "o", "o", "o", "o", "o", "|"],
      ["|", "x", "x", "x", "x", "o", "|"],
      ["|", "x", "x", " ", "x", "o", "|"],
      ["|", "x", "x", "x", "x", "o", "|"],
      ["|", "x", "o", "o", "o", "o", "|"],
      ["-", "-", "-", "-", "-", "-", "-"],
    ])
  })
  test("after running B 3 3, the canvas should bucket fill the area inside the reactangle", () => {
    D.onCommand("B 3 3")
    expect(D.canvas).toStrictEqual([
      ["-", "-", "-", "-", "-", "-", "-"],
      ["|", "o", "o", "o", "o", "o", "|"],
      ["|", "x", "x", "x", "x", "o", "|"],
      ["|", "x", "x", "o", "x", "o", "|"],
      ["|", "x", "x", "x", "x", "o", "|"],
      ["|", "x", "o", "o", "o", "o", "|"],
      ["-", "-", "-", "-", "-", "-", "-"],
    ])
  })
  test("after running X, the canvas should be reset", () => {
    D.onCommand("X")
    expect(D.canvas).toStrictEqual([])
  })
})
