'use strict';
let fieldWidth  = 400;
let fieldHeight = 400;
let boxSize     = 20;
let game        = false;

function setup() {
    game  = new gameOfLife(fieldWidth, fieldHeight, boxSize);

    // createCanvas must be the first statement
    createCanvas(fieldWidth, fieldHeight);  
    frameRate(20);
    background(255);

    game.create();
}


function draw() {
    game.play();
}