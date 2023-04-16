#ifdef GL_ES
precision highp float;
#endif

// grab texcoords from vert shader
varying vec2 vTexCoord;

//textures and uniforms from p5
uniform sampler2D p;
uniform sampler2D c;
uniform sampler2D b;
uniform float printMess;
uniform sampler2D l1;
uniform sampler2D l2;
uniform vec2 u_resolution;
uniform float seed;
uniform vec3 bgc;
uniform vec3 accCol;
uniform float marg;

float map(float value, float inMin, float inMax, float outMin, float outMax) {
  return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
}

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

vec3 adjustContrast(vec3 color, float value) {
  return 0.5 + (1.0 + value) * (color - 0.5);
}
vec3 adjustExposure(vec3 color, float value) {
  return (1.0 + value) * color;
}
vec3 adjustSaturation(vec3 color, float value) {
  const vec3 luminosityFactor = vec3(0.2126, 0.7152, 0.0722);
  vec3 grayscale = vec3(dot(color, luminosityFactor));

  return mix(grayscale, color, 1.0 + value);
}
vec3 adjustBrightness(vec3 color, float value) {
  return color + value;
}

float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

mat2 rotate(float angle){
    return mat2(cos(angle),-sin(angle),sin(angle),cos(angle));
}

void main() {
  vec2 uv = vTexCoord*u_resolution;
  vec2 st = vTexCoord;
  vec2 stB = vTexCoord;

  //flip the upside down image
  st.y = 1.0 - st.y;
  stB.y = 1.0 - stB.y;

  //form noise
  st.x += map(random(st.xy), 0.0, 1.0, -0.00025, 0.00025);
  st.y += map(random(seed+st.xy), 0.0, 1.0, -0.00025, 0.00025);
  float warp = map(noise(seed+st.xy*5.0), 0.0, 1.0, -0.01, 0.01);
  //st.xy += warp;

  //Shrink to fit inside margins
  float margX = marg;
  float margY = margX*0.8;
  st.x = map(st.x, 0.0, 1.0, -margX, 1.0+margX);
  st.y = map(st.y, 0.0, 1.0, -marg, 1.0+marg);
  stB.x = map(stB.x, 0.0, 1.0, -margX, 1.0+margX);
  stB.y = map(stB.y, 0.0, 1.0, -marg, 1.0+marg);


  //textures to sample from and manipulate st
  vec4 sampTex = texture2D(p, st);
  vec4 sampTexB = texture2D(b, st);
  vec4 sampTexC = texture2D(c, st);

  //initialize bg 
  vec3 bg = bgc.rgb;
  bool isTile = false;
  //if the tile is neither black nor white, its a tile we can draw to
  if(sampTexC.r != 0.0 && sampTexC.r != 1.0) {
    isTile = true;
  } else {
    isTile = false;
  }
  //if its a tile we can draw on and it's black on texB, the bg layer is accCol
  vec3 accColMixed = mix(accCol, bgc, 0.1);
  if(isTile == true && sampTexB.r != 1.0) {
    bg.rgb = accColMixed.rgb;
  }
  //sample and offset by p and b
  //offset is lessened on tiles with bg to reduce visual noise
  float offset = 0.0;
  if(isTile == true) {
    offset = 0.0005*printMess;
  } else {
    offset = 0.002*printMess;
  }
  //0.0025;
  //offset by p color
  st.x += map(sampTex.r, 0.0, 1.0, -offset, offset);
  st.y += map(sampTex.b, 0.0, 1.0, -offset, offset);
  st.xy += 0.5;
  st.xy *= rotate(map(sampTex.g, 0.0, 1.0, -0.00872665*printMess, 0.00872665*printMess));
  st.xy -= 0.5;

  //offset by b color
  st.x += map(sampTexB.r, 0.0, 1.0, -offset, offset);
  st.y += map(sampTexB.b, 0.0, 1.0, -offset, offset);
  st.xy += 0.5;
  st.xy *= rotate(map(sampTexB.g, 0.0, 1.0, -0.00872665*printMess, 0.00872665*printMess));
  st.xy -= 0.5;

  //warping
  // float n = noise(seed+st.xy*1.0);
  // st.y += map(n, 0.0, 1.0, 0.0, 0.1);
  
 
  
  
  // st.x += map(lum, 0.0, 1.0, -0.025, 0.025);


  vec4 texP = texture2D(p, st);
  vec4 texC = texture2D(c, st);
  vec4 texB = texture2D(b, stB);



  

  //color noise
  float noiseGray = map(random(st.xy), 0.0, 1.0, -0.05, 0.05);

  vec3 color = vec3(0.0);
  vec3 final = vec3(0.0);
  color = vec3(texP.r, texP.g, texP.b);
  
  if(color.rgb == bgc.rgb) {
    color.rgb = bg.rgb;
  } else {
    color = adjustContrast(color, 0.5);
    color = adjustSaturation(color, 1.0);

  }
  // color.rgb = bg.rgb;


  //Draw margin
  if(stB.x < 0.0|| stB.x > 1.0 || stB.y < 0.0 || stB.y > 1.0) {
    color = vec3(bgc.r, bgc.g, bgc.b);
  }
  
  // color = texB.rgb;
  color+= noiseGray;
  
  gl_FragColor = vec4(color, 1.0);
}
