const WIDTH = 500;
const HEIGHT = 500;

var backgroundDistance = 0.0;

let raymarchShader, backgroundShader, backgroundCanvas, time, resolution;


function setup() { 
    createCanvas(WIDTH, HEIGHT, WEBGL);
    backgroundCanvas = createGraphics(WIDTH*2, HEIGHT*2, WEBGL);
} 

function preload() {
    raymarchShader = loadShader('texture.vert', 'raymarch.frag');
    backgroundShader = loadShader('basic.vert', 'background.frag');
    time = 0;
    resolution =[WIDTH, HEIGHT];
    mouse = [mouseX, mouseY];
}

function drawBox(x, y, id) {
    shader(raymarchShader);
    raymarchShader.setUniform('resolution', resolution);
    mouse = [mouseX, mouseY];
    raymarchShader.setUniform('mouse', mouse);
    raymarchShader.setUniform('time', time/id);
    noStroke();
    push();
    translate(x, y);
    rotateX(0.5 * time);
    rotateY(0.3 * time);
    box(50);
    pop();
}

function drawBackground() {
    backgroundShader.setUniform('resolution', resolution);
    backgroundShader.setUniform('mouse', mouse);
    backgroundShader.setUniform('time', time);
    backgroundCanvas.shader(backgroundShader);
    backgroundCanvas.rect(0,0,1,1);
    texture(backgroundCanvas,0,0);
    translate(0,0,-500 + backgroundDistance);
    rect(-WIDTH,-HEIGHT,WIDTH*2, HEIGHT*2);

}

function draw() { 
    backgroundDistance += sin(time)

    orbitControl();
    background(0);
    time+=.01;
    push();
    drawBackground();
    pop();
    let N_BOXES = 16;
    let GRID_SIZE = 4;
    translate(-.25 * WIDTH, -.25 * HEIGHT);
    push();

    for (var i = 0; i < N_BOXES; i++) {
        push();

        let xGrid = i % GRID_SIZE;
        let yGrid = i / GRID_SIZE;
        //console.log(x + ", " + y);
        drawBox(xGrid * (WIDTH / GRID_SIZE), yGrid * (WIDTH / GRID_SIZE), i);
    }
    pop();
}