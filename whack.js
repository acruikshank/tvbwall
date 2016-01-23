var state = 0, timer = 0, moles = [], timeRemaining, score, font;
var INIT=0, WAITING_FOR_PRESS=1, PLAYING=2, SCORING=3;
var SQUASH_TIME = 20;
var GAME_TIME = 1500;
var SCORE_TIME = 500;

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
            fill(0,0,255);
            eachSpace(function(i,j,mole) {
                if (mole && mole.t == 'squashed') {
                    if (mole.x > 0) {
                        fill(255*mole.x/SQUASH_TIME,0,0);
                        var radius = 10 * (SQUASH_TIME-mole.x)/SQUASH_TIME;
                        ellipse(i,j+2,radius,radius);
                        mole.x--;
                    } else {
                        moles[i][j] = null;
                        addMole();
                    }
                }
            });
            eachSpace(function(i,j,mole) {
                if (mole && mole.t == 'live') {
                    if (mole.v > 1) { fill(255,255,0); } else { fill(0,0,255); }
                    rect(i,j+2,1,1);
                }
            });

            fill(255,80,80);            
            rect(0,0,48,1);
            fill(80,255,80);
            rect(0,0,48*timeRemaining/GAME_TIME,1);
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
            initGame();
            timeRemaining = GAME_TIME;
            score = 0;
            state = PLAYING;
            break;
        case PLAYING:
            var mole = moles[mouseX][mouseY-2];
            if (mole) {
                mole.t = 'squashed';
                mole.x = SQUASH_TIME;
                score += mole.v;
            }
            break;
    } 
}

function eachSpace(f) {
    for (var i=0; i<48; i++) for (var j=0; j<6; j++) f(i,j,moles[i][j]);
}

function randomPoint() {
    return [int(random(48)),int(random(6))];
}

void addMole() {
    for (var point=randomPoint(); moles[point[0]][point[1]]; point=randomPoint());
    moles[point[0]][point[1]] = {t:'live', v:int(random(15)) > 0 ? 1 : 5};
}

void initGame() {
    moles = [];
    for (var i=0; i<48; i++) {
        moles[i] = [];
        for (var j=0; j<6; j++) moles[i][j] = null;
    }

    for (var i=0; i<35; i++)
        addMole();
}

