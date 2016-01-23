noStroke();
background(0);

var scheme = 0;
var schemes = [
    function(c,o) { fill(c,o,o); },
    function(c,o) { fill(c,c,o); },
    function(c,o) { fill(o,c,c); },
    function(c,o) { fill(o,c,o); },
    function(c,o) { fill(o,o,c); },
    function(c,o) { fill(c,o,c); }
];

void draw() {
    if (random(5) > 1) return;
    var color = random(128) + 128;
    var other = random(color);
    schemes[scheme]( color, other );
    rect(random(48),0,1,8);
}

void mouseClicked() {
    scheme = (scheme + 1) % schemes.length;      
}