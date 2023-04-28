w= 1600
h = 2000
marg = 100//randomVal(10, 400)

willReadFrequently = true

let shade;
function preload() {
  shade = loadShader("shader.vert", "shader.frag");
}
url = new URL(window.location.href)
urlParams = new URLSearchParams(url.search)
if(url.searchParams.has('size') == true) {
  pxSize = url.searchParams.get('size')
} else {
  url.searchParams.append('size', 1);
}
pxSize = url.searchParams.get('size')


//declarations
angs = []
blocks = []
colArray = [frameCol, chroma(truePal[0]).saturate(0).hex()]
colNum = randomInt(0, 1)
colA = colArray[colNum]
colB = colArray[1-colNum]
aspects = []
accNum = 1
accentCol = chroma(truePal[accNum]).saturate(0).hex()
colDiff = chroma.contrast(truePal[0], accentCol)
diffNeeded = 1.2
console.log(colDiff)

accFound = false
if(colDiff > diffNeeded) {
  accFound = true
}
tries = 0
while(accFound == false) {
  accNum++
  accentCol = chroma(truePal[accNum]).saturate(0).hex()
  
  colDiff = chroma.contrast(truePal[0], accentCol)
  console.log(colDiff)
  if(colDiff > diffNeeded) {
    accFound = true
  }
  if(accNum > truePal.length-2) {
    accentCol = frameCol
    accFound = true
  }
}
// bgc = chroma(randColor()).saturate(-2).hex()
bgc = chroma.mix(randColor(), 'white', 0.9).hex()

//parameters
printMess = fxrand()

numDivs = randomInt(3, 10)
totalSects = numDivs+1
lineWtC = 2//randomVal(5, 20)

flowerExpo = randomVal(0.1, 0.5)
flowerMidPt = randomVal(0.1, 0.5)
flowerPetals = randomInt(4, 8)

glyphType = randomInt(1, 2)
lineWt = 1 - randomVal(0.5, 0.1)
cornerRatio = randomVal(0.0, 0.5)//0.2
sculptorStartRatio = randomVal(0.1, 1)
sculptExpo = 0.5//randomVal(0.5, 5)
stretchMin = 200//randomInt(30, 70)

bgType = randomInt(1, 5)
doubleBG = randBool(0.1)

//weighing one direction in x or y, under 1 is right/down, above is left/up
sectWeightX = randomVal(0.1, 10)
sectWeightY = randomVal(0.1, 10)



function setup() {
  var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oraßn|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|verßi|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
    isMobile = true;
}
  createCanvas(w, h, WEBGL);
  if(pxSize == 1) {
    pixelDensity(1)
  } else if (pxSize == 2) {
    pixelDensity(2)
  } else if (pxSize == 3) {
    pixelDensity(3)
  }

  p = createGraphics(w, h)
  c = createGraphics(w, h)
  b = createGraphics(w, h)

  l1 = createGraphics(w, h)
  l2 = createGraphics(w, h)
  angleMode(DEGREES)
  p.angleMode(DEGREES)
  c.angleMode(DEGREES)
  noLoop()
  p.noLoop()
  c.noLoop()


  padding = constrain((w/(numDivs+3))-(lineWt/2), 0, w/2)
}

function draw() {
  background(bgc)
  c.background('white')
  b.background('white')
  p.background(bgc)
  l1.background(bgc)

  //Build our background Major Composition layer
  b.fill('black')
  b.stroke('white')
  b.strokeWeight(10)
  
  //Build the subdivided grid
  for(let i = 0; i < numDivs; i++) {
    dir = fxrand()
    
    if(dir < 0.5) {
      newSectionVert()
    } else {
      newSectionHor()
    }
  }
  //Fill the array with Block objects
  blockFinder()

  //bg builder
  if(bgType == 1) {
    rayBG()
  } else if(bgType == 2) {
    concentricBG()
  } else if(bgType == 3) {
    mandalaBG()
  } else if(bgType == 4) {
    checkerBG()
  } else if(bgType == 5) {
    gridBG()
  }

  if(doubleBG == true) {
    decider = randomInt(1, 2)
    if(decider == 1) {
      checkerBG()
    } else if( decider == 2) {
      gridBG()
    }
  }
  
  // dotBG()
  
  
  //Fill those Block objects with patterns/modules
  for(let i = 0; i < blocks.length-1; i++) {
    // p.strokeWeight(3)
    // blocks[i].showLines()
    colNow = blocks[i].col
    if(i < 1) {
      blocks[i].showHeader()
    } else {
      if(blocks[i].bar == true) {
        decider = randomInt(1, 7) 
        if(decider == 1) {
          blocks[i].showTextBox()
        } else if(decider == 2) {
          blocks[i].showCircRow()
        } else if(decider == 3) {
          blocks[i].showLinesMeet()
        } else if(decider == 4) {
          blocks[i].showRect()
        } else if(decider == 5) {
          blocks[i].arrowLine()
        } else if(decider == 6) {
          blocks[i].showDashLine()
        } else if(decider == 7) {
          blocks[i].showScatterGrid()
        }
      } else {
        decider = randomInt(1, 7) 
        if(decider == 1) {
          blocks[i].showTextBox()
        } else if(decider == 2) {
          blocks[i].showTextCirc()
        } else if(decider == 3) {
          blocks[i].showLinesMeet()
        } else if(decider == 4) {
          blocks[i].showShapeGrad()
        } else if(decider == 5) {
          blocks[i].showBez()
        } else if(decider == 6) {
          blocks[i].showCave()
        } else if(decider == 7) {
          blocks[i].showScatterGrid()
        }

        cornOrn = randBool(0.3) 
        if(cornOrn == true) {
          blocks[i].cornerOrnament()
        }
      }
      
    }
    
    slatFilter(blocks[i].pos.x, blocks[i].pos.y, blocks[i].wid, blocks[i].hei)
    
  }


  // p.background('white')
  // p.stroke('black')
  // cave(w/2, h/2, w/2, h/2)
  // arrowLine(randomVal(0, w), randomVal(0, h), randomVal(0, w), randomVal(0, h), 100)
  // obj = new Glyph(w/2, h/2, w/2, h/2, frameCol, 0.0)
  // obj.showLineGlyph()
  // orgFlower(w/2, h/2, w/2, h/2)
  // slatFilter(w/2, h/2, w, h)


  //Post processing
  //  copy(p, 0, 0, w, h, 0, 0, w, h)
   bgc = color(bgc)
   accCol = color(accentCol)
   shader(shade)
   shade.setUniform("u_resolution", [w, h]);
   shade.setUniform("p", p);
   shade.setUniform("c", c);
   shade.setUniform("b", b);
   shade.setUniform("printMess", printMess);
   shade.setUniform("l1", l1);
   shade.setUniform("l2", l2);
   shade.setUniform("seed", randomVal(0, 10));
   shade.setUniform("marg", map(marg, 0, w, 0, 1));
   shade.setUniform("bgc", [
     bgc.levels[0] / 255,
     bgc.levels[1] / 255,
     bgc.levels[2] / 255,
   ]);
   shade.setUniform("accCol", [
    accCol.levels[0] / 255,
    accCol.levels[1] / 255,
    accCol.levels[2] / 255,
  ]);

   rect(0, 0, w, h)

   fxpreview()
  //  save("blockBatchE.png")
  //  setTimeout(() => {
  //   window.location.reload();
  // }, "8000");
}
