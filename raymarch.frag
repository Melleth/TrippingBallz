#define PI 3.14159265359
#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;

const float EPS = .005;
const float T_MAX = 100.;
const int MARCH_STEPS = 48;
const vec3 LIGHT =  vec3(0., 2., 2.);

varying vec2 vTexCoord;

float scene(vec3 p) {
    // http://www.iquilezles.org/www/articles/distfunctions/distfunctions.htm
    p = mod(p + 1., 2.) - 1.; 
    return length(p) - .5;

}

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

float march(vec3 ro, vec3 rd) {
    float t = 0.;
    for (int i = 0; i < MARCH_STEPS; i++) {
        vec3 p = ro + rd * t;
        float d = scene(p);
        /*
            if d is negative then we are inside or touching the object
            or if surpasses the max dist we want to check - then we break the loop
        */
        if (d < EPS || t > T_MAX) break;
        t += .5 * d;
    }
    return t;
}

void main() {

    // normalized uv coordinates
    //vec2 uv = (gl_FragCoord.xy - resolution) / resolution.y;

    vec2 uv = vTexCoord;
    
    uv = rotate2d(sin(time/10.0)*PI) * uv;
    // ray origin
    // a static ray origin
    //vec3 ro = vec3(1., -1., -3.);
    
    // a moving ray origin
    // to traverse through repeated space
    vec3 ro = vec3(0., .75, -10. + 100.*sin(time/100.));		
    vec3 rd = vec3(uv, 1.);

    float t = march(ro, rd);


    
    // background color
    gl_FragColor = vec4(0., 0., 0., 1.);

    // check t (depth) is in range
    if (t < T_MAX) {
            
        // get the position
        vec3 p = ro + rd * t;
        
        // we can use t and position to color our objects
        // set object color		
    
        float fog = 2. / (1. + t * t);
        //vec3 color = vec3(p.x, p.y, p.z);
        vec3 color =  vec3(fog*p.x,fog*p.y, fog*p.z);
        
        gl_FragColor = vec4(color, 1.);
    
    }
        


}