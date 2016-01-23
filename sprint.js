var state = 0, timer = 0, timeRemaining, score, font;
var INIT=0, WAITING_FOR_PRESS=1, PLAYING=2, SCORING=3;
var INITIAL_START_TIME = 1000;
var TIME_DECREMENT = 10;
var SCORE_TIME = 500;
var timePerBlock = INITIAL_START_TIME, blockX;

void setup() {
    font = loadFont('verdana');
    textFont(font,7);
    noStroke();
}

void draw() {
    switch (state) {
        case INIT:
            background(0);
            fill(255);
            text('press to play', 1.5, 6);
            state = WAITING_FOR_PRESS;
            break;
        case PLAYING:
            background(0);
            fill(255,0,0);
            rect(blockX,0,1,8);
            fill(0,100,255);
            rect(blockX,8*(1-timeRemaining/timePerBlock),1,8);
            timeRemaining--;
            if (timeRemaining <= 0) {
                state = SCORING;
                timeRemaining = SCORE_TIME;
            }
            break;
        case SCORING:
            background(0);
            fill(255);
            textFont(font,10);
            text('score:'+score, 1.5, 8);
            timeRemaining--;
            if (timeRemaining < 0)
                state = INIT;
    } 
}

void mouseClicked() {
    switch (state) {
        case WAITING_FOR_PRESS:
            timePerBlock = INITIAL_START_TIME;
            score = 0;
            startBlock();
            state = PLAYING;
            break;
        case PLAYING:
            if (mouseX == blockX) {
                score++;
                startBlock();
            }
            break;
    } 
}

void startBlock() {
    blockX = int(random(48));
    timeRemaining = timePerBlock;
    timePerBlock = max(10,timePerBlock - TIME_DECREMENT);
}
