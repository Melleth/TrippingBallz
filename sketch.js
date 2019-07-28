const WIDTH = 500;
const HEIGHT = 500;

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

function drawBox() {
    shader(raymarchShader);
    raymarchShader.setUniform('resolution', resolution);
    mouse = [mouseX, mouseY];
    raymarchShader.setUniform('mouse', mouse);
    raymarchShader.setUniform('time', time);
    noStroke();
    rotateX(0.5 * time);
    rotateY(0.3 * time);
    box(200);
}

function drawBackground() {
    backgroundShader.setUniform('resolution', resolution);
    backgroundShader.setUniform('mouse', mouse);
    backgroundShader.setUniform('time', time);
    backgroundCanvas.shader(backgroundShader);
    backgroundCanvas.rect(0,0,1,1);
    texture(backgroundCanvas,0,0);
    translate(0,0,-500);
    rect(-WIDTH,-HEIGHT,WIDTH*2, HEIGHT*2);

}

function draw() { 
    orbitControl();
    background(0);
    time+=.01;
    push();
    drawBackground();
    pop();
    drawBox();
}