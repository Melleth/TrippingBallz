#ifdef GL_ES
precision mediump float;
#endif
uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;

float box(vec2 _st, vec2 _size, float _smoothEdges){
    _size = vec2(0.5)-_size*0.5;
    vec2 aa = vec2(_smoothEdges*0.5);
    vec2 uv = smoothstep(_size,_size+aa,_st);
    uv *= smoothstep(_size,_size+aa,vec2(1.0)-_st);
    return uv.x*uv.y;

}
vec2 tile(vec2 st, float zoom){
    st *= zoom;
    return fract(st);
}

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

void main() {
    vec2 uv = (gl_FragCoord.xy - resolution) / resolution.y;
    uv *= rotate2d(time);
    vec2 st = tile(uv, 5.);
    st-=.5;
    st *= rotate2d(-time);
    st+=.5;
    vec3 col = vec3(box(st, vec2(0.75), 0.1));
    col *= vec3(sin(time) + 1.0, cos(time) + 1.0, sin(time) + 1.0);
    gl_FragColor = vec4(col, 1.0);
}