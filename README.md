#### Build With

Nodejs v12.11.0 for main program

Jest for unit test

#### Getting started

Make sure you have installed the node v12.11.0 in your local, the higher version should not cause any issue.

`npm i //install dependency`

`npm start //start app in the terminal`

`npm test //run unit test to cover all available comman`

#### Available commands

`-h //show all the available terminal commands`

`Q //quit the app`

#### Before playing with the app

The `C w h` must be called before running any other command, as this will help setup initial canvas size. If you want to reset current canvas, simply type `X`.

The `L` and `R` command can have overlap area, that's said, if you have drawed a line, later you can still draw a rectangle by using the coords from the line. As they are both using drawLine function. Also, the line and reactangle command can draw from bucket filled area.

All command has the parameters check, and edge check, so if you input any invalid string or outside canvas coords, there will have some warning message display.
