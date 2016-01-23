var SERVE_STATE=0, PLAYING_STATE=1, SCORING_STATE=2;
var GRAVITY = .0005, MAX_SCORE=5, SCORING_TIME=500;
var state=SERVE_STATE, serveLeft=true, hitLeft=true; leftScore=0, rightScore=0;
var arrowPhase = 0, position = {x:3.5,y:5.5}, velocity = {x:0,y:0};
var timeRemaining=0;

void draw() {
    background(0);
    fill(100,100,255);
    noStroke();
    rect(0,0,leftScore,1);
    rect(48-rightScore,0,rightScore,1);

    switch (state) {
        case SERVE_STATE:
            noStroke();
            fill(225,255,0);
            ellipse(position.x,position.y,2,2);
            
            stroke(0,200,100);
            var offset = (serveLeft?-1:1) * (arrowPhase%40)/5 - (serveLeft?0:16);
            for (var i=0; i<40; i+=4) {
                line(14 + i + offset,5.25, (serveLeft?16:12) + i + offset, 7.25);
                line(14 + i + offset,6.25, (serveLeft?16:12) + i + offset, 4.25);
            }
            
            arrowPhase++;
            break;
            
        case PLAYING_STATE:
            position.x += velocity.x;
            position.y += velocity.y;
            velocity.y += GRAVITY;
            noStroke();
            fill(225,255,0);
            ellipse(position.x,position.y,2,2);
            if (position.y>8) {
                if (hitLeft)
                    rightScore++;
                else
                    leftScore++;
                
                if (rightScore >= MAX_SCORE || leftScore >= MAX_SCORE) {
                    state = SCORING_STATE;
                    timeRemaining = SCORING_TIME;
                } else {
                    state=SERVE_STATE;
                    hitLeft = serveLeft = !serveLeft;
                    position = serveLeft ? {x:3.5,y:5.5} : {x:44.5,y:5.5};
                }
            }
            
            break;
        case SCORING_STATE:
            fill(255);
            var font = loadFont('verdana');
            textFont(font,10);
            text(leftScore, 1.5, 8);
            text(rightScore, 46.5 - textWidth(rightScore.toString()),8);
            timeRemaining--;
            if (timeRemaining < 0) {
                state=SERVE_STATE, serveLeft=true, hitLeft=true; leftScore=0, rightScore=0;
                arrowPhase = 0, position = {x:3.5,y:5.5}, velocity = {x:0,y:0};
            }
            
    }
}

void mouseClicked() {
    switch (state) {
        case SERVE_STATE:
            if (ballHit(mouseX,mouseY)) {
                hit();
                state = PLAYING_STATE;
            }
            break;
        case PLAYING_STATE:
            if (ballHit(mouseX,mouseY))
                hit();
            break;
    }
}

void ballHit(x,y) {
    var dx = x - position.x, dy = y - position.y;
    return Math.sqrt(dx*dx + dy*dy) < 4;
}

void hit() {
    velocity = {x:random(.1,.2) * (hitLeft?1:-1)}
    var targetX = hitLeft ? random(42,48) : random(0,6);
    var time = (targetX - position.x) / velocity.x;
    velocity.y = (8-position.y) / time - GRAVITY*time / 2;
    hitLeft = !hitLeft;
}

