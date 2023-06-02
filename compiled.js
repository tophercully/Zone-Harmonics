
w = 1600




//window.alba._testSeed()
const { seed = window.alba._testSeed()
    , width = w, tokenId } = window.alba.params;
const prng = window.alba.prng(seed);
console.log(seed)
console.log(prng())

function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(prng() * (max - min + 1) + min); // The maximum is exclusive and the minimum is inclusive
  }
  function randomVal(min, max) {
    return prng() * (max - min) + min;
  }
  function map_range(value, low1, high1, low2, high2) {
    return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
  }
  
  function shuff(array) {
    let currentIndex = array.length,
      randomIndex;
  
    while (currentIndex != 0) {
      randomIndex = Math.floor(prng() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
  
    return array;
  }
  
  function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
  }
  
  function setLineDash(list) {
    drawingContext.setLineDash(list);
  }
  
  function pointInterp(xA, yA, xB, yB, interp) {
    xPos = map_range(interp, 0, 1, xA, xB)
    yPos = map_range(interp, 0, 1, yA, yB)
    output = createVector(xPos, yPos)
    return output
  }
  
  function keyTyped() {
    if (key === "s" || key === "S") {
      save("img.png");
    }
    if (key === "1") {
      window.history.replaceState('', '', updateURLParameter(window.location.href, "size", "1"));
      window.location.reload();
    }
    if (key === "2") {
      window.history.replaceState('', '', updateURLParameter(window.location.href, "size", "2"));
      window.location.reload();
    }
    if (key === "3") {
      window.history.replaceState('', '', updateURLParameter(window.location.href, "size", "3"));
      window.location.reload();
    }
  }
  function updateURLParameter(url, param, paramVal)
  {
      var TheAnchor = null;
      var newAdditionalURL = "";
      var tempArray = url.split("?");
      var baseURL = tempArray[0];
      var additionalURL = tempArray[1];
      var temp = "";
  
      if (additionalURL) 
      {
          var tmpAnchor = additionalURL.split("#");
          var TheParams = tmpAnchor[0];
              TheAnchor = tmpAnchor[1];
          if(TheAnchor)
              additionalURL = TheParams;
  
          tempArray = additionalURL.split("&");
  
          for (var i=0; i<tempArray.length; i++)
          {
              if(tempArray[i].split('=')[0] != param)
              {
                  newAdditionalURL += temp + tempArray[i];
                  temp = "&";
              }
          }        
      }
      else
      {
          var tmpAnchor = baseURL.split("#");
          var TheParams = tmpAnchor[0];
              TheAnchor  = tmpAnchor[1];
  
          if(TheParams)
              baseURL = TheParams;
      }
  
      if(TheAnchor)
          paramVal += "#" + TheAnchor;
  
      var rows_txt = temp + "" + param + "=" + paramVal;
      return baseURL + "?" + newAdditionalURL + rows_txt;
  }
  
  function randColor() {
    return truePal[randomInt(0, truePal.length-1)]
  }

  function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }
  
  function colHSL(colAng) {
    // color(colAng, 0.9, randomVal(0.4, 0.8))
    lum = randomVal(20, 80)
    sat = map_range(lum, 20, 80, 10, 90)
    outputCol = hslToHex(colAng, sat, lum)
    return outputCol
  }
  
//   function randGenCol() {
//     return chroma(randomVal(minColAng, maxColAng), 1.0, randomVal(0.4, 0.8), 'hsl').hex()
//   }
  
  function randBool(chanceTrue) {
    if(chanceTrue != "undefined") {
      chanceTrue = chanceTrue
    } else {
      chanceTrue = 0.5
    }
    rand = prng()
    if(rand < chanceTrue) {
      bool = true
    } else {
      bool = false
    }
    return bool
  }
  
  function ptFromAng(xPosition, yPosition, ang, dis) {
    xMod = cos(ang)*dis
    yMod = sin(ang)*dis
  
    return createVector((xPosition+xMod), (yPosition+yMod))
  }
  
  function angBetween(x1, y1, x2, y2) {
    return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
  }
  
  function randTwoTone() {
    colsInThis = [colA, colB]
    return colsInThis[randomInt(0, 1)]
  }

  ///////////////////////////////////////////////////////////////////

  //Background color parameters

  bgCols = []
bgNum = randomInt(0, 1);
angA = randomVal(0, 360)
if(bgNum == 0) {
  bgc = hslToHex(angA, 20, 95)
  calcBgLum = 92.5
} else {
  bgc = hslToHex(angA, 20, 10)
  calcBgLum = 15
}

//Make a color that always contrasts bgc
if (calcBgLum > 50) {
  frameCol = 'black'; //black
} else if( calcBgLum < 50) {
  frameCol = 'white'; //white
}
posterPal = ['#d45c2d', "#45885c", "#edb33f", "#32528f", '#efaeb6', "#015294", "#e46019", '#2AB6FD', "##EF4020", "##2B48C7", '#2B5318', "#9D52FF", "#F6B6D4"]

palVal = randomInt(1, 4)*45
pal = posterPal//[colHSL(angA), colHSL(angA + palVal +randomVal(-10, 10))]

truePal = shuff(pal);

/////////////////////////////////////////////////////////////////////////
//tool functions

function arcRing(x, y, wid, hei, wt) {
    baseAng = randomVal(0, 360)
    dens = randomVal(5, 100)
    angs = []
    for(let i = 0; i < dens; i++) {
      angs[i] = [randomVal(0, 360)]
    }
    angs.sort(function(a, b) {
      return a - b;
    });
    for(let i = 0; i < dens; i++) {
      p.strokeCap(SQUARE)
      p.stroke(randColor())
      p.strokeWeight(wt)
      // p.fill(randColor())
      p.noFill()
  
      startAng = angs[i]
      if(i < dens-1) {
        endAng = angs[i+1]
      } else {
        endAng = angs[0]
      }
      p.arc(x, y, wid, hei, startAng, endAng, OPEN)
    }
  }
  function arcRing2(x, y, wid, hei, wt) {
    baseAng = randomVal(0, 360)
    dens = randomVal(5, 100)
    angs = []
    for(let i = 0; i < dens; i++) {
      angs[i] = [randomVal(0, 360)]
    }
    angs.sort(function(a, b) {
      return a - b;
    });
    for(let i = 0; i < dens; i++) {
      l1.strokeCap(SQUARE)
      l1.stroke(randColor())
      l1.strokeWeight(wt)
      // p.fill(randColor())
      l1.noFill()
  
      startAng = angs[i]
      if(i < dens-1) {
        endAng = angs[i+1]
      } else {
        endAng = angs[0]
      }
      // console.log(startAng, endAng)
      l1.arc(x, y, wid, hei, startAng, endAng, OPEN)
    }
  }
  
  function blob(x, y, wid, hei) {
    p.ellipse(x, y, wid, hei)
    for(let i = 0; i < 360; i++) {
      
    }
  }
  
  function cutter(val) {
    num = randomInt(5, 10)
    cellH = (h-(marg*2))/num
    c.stroke(val)
    c.strokeWeight(cellH*randomVal(0.1, 0.4))
    for(let i = 0; i < num; i++) {
      c.line(0, marg+cellH*i+cellH/2, w, marg+cellH*i+cellH/2)
    }
  }
  
  function newSectionVert() {
    c.stroke('black')
    c.strokeWeight(lineWtC)
    //we've found no points yet
    ptFound = 0
    //run this while looking for a point
    tries = 0
    while(ptFound == 0) {
      
      //Find starting point
      xVal = randomVal(0, 1)
      yVal = randomVal(0, 1)
      x = map(pow(xVal, sectWeightX), 0, pow(1, sectWeightX), marg, w-marg)
      y = map(pow(yVal, sectWeightY), 0, pow(1, sectWeightY), marg, w-marg)
      here = createVector(x, y)    //Check that point isnt taken
      colCheck = c.get(here.x, here.y)
  
      //create left and right point
      leftDis = 0
      rightDis = 0
      leftCheck = colCheck
      rightCheck = colCheck
      // console.log(leftCheck[0])
  
      //move left over until it hits black
      while(leftCheck[0] == 255) {
        leftDis-=1
        leftCheck = c.get(here.x+leftDis, here.y)
        // console.log('left is', leftCheck[0])
      }
    
      //move right over until it hits black
      while(rightCheck[0] == 255) {
        rightDis++
        rightCheck = c.get(here.x+rightDis, here.y)
        // console.log('right is', leftCheck[0])
      }
        if(colCheck[0] > 250 && rightDis > padding && abs(leftDis) > padding) {
          //tell loop we've found it
        ptFound++
      }
      tries++
      if(tries > 100) {
        return
      }
    }
    
    //create bottom and top point
    topDis = 0
    botDis = 0
    topCheck = colCheck
    botCheck = colCheck
    // console.log(topCheck[0])
    //move top up until it hits black
    while(topCheck[0] != 0) {
      topDis-=1
      topCheck = c.get(here.x, here.y+topDis)
      // console.log('top is', topCheck[0])
    }
    
    //move bttom down until it hits black
    while(botCheck[0] != 0) {
      botDis++
      botCheck = c.get(here.x, here.y+botDis)
      // console.log('bot is', botCheck[0])
    }
    //create line from top to bottom points
    c.line(here.x, here.y+topDis, here.x, here.y+botDis)
  }
  
  function newSectionHor() {
    c.stroke('black')
    c.strokeWeight(lineWtC)
    //we've found no points yet, initalize as 0
    ptFound = 0
    //run this while looking for a point
    while(ptFound == 0) {
      //Find starting point
      xVal = randomVal(0, 1)
      yVal = randomVal(0, 1)
      x = map(pow(xVal, sectWeightX), 0, pow(1, sectWeightX), marg, w-marg)
      y = map(pow(yVal, sectWeightY), 0, pow(1, sectWeightY), marg, w-marg)
      here = createVector(x, y)
      //Check that point isnt taken
      colCheck = c.get(here.x, here.y)
  
      
      //check above and below with the same spreader
      //create top and bottom points
      topDis = 0
      botDis = 0
      topCheck = colCheck
      botCheck = colCheck
      // console.log(topCheck[0])
      //move top up until it hits black
      while(topCheck[0] == 255) {
        topDis-=1
        topCheck = c.get(here.x, here.y+topDis)
        // console.log('top is', topCheck[0])
      }
    
      //move bottom down until it hits black
      while(botCheck[0] == 255) {
        botDis++
        botCheck = c.get(here.x, here.y+botDis)
        // console.log('bot is', botCheck[0])
      }
      //check that space is white and there is space above and below
      if(colCheck[0] > 250 && botDis > padding && abs(topDis) > padding) {
        //tell loop we've found it
        ptFound++
      }
  
      tries++
      if(tries > 100) {
        return
      }
    }
    
    //create left and right point
    leftDis = 0
    rightDis = 0
    leftCheck = colCheck
    rightCheck = colCheck
    // console.log(leftCheck[0])
  
    //move left over until it hits black
    while(leftCheck[0] != 0) {
      leftDis-=1
      leftCheck = c.get(here.x+leftDis, here.y)
      // console.log('left is', leftCheck[0])
    }
    
    //move right over until it hits black
    while(rightCheck[0] != 0) {
      rightDis++
      rightCheck = c.get(here.x+rightDis, here.y)
      // console.log('right is', leftCheck[0])
    }
    //create line from left to right points
    c.line(here.x+leftDis, here.y, here.x+rightDis, here.y)
  }
  
  function ribbedVert(x, y, wid, hei) {
    numPanes = 10
    cellW = wid/numPanes 
    cellH = hei
    for(let i = 0; i < numPanes; i++) {
    }
  }
  
  function blockFinder() {
    blocksFound = 0
    tries = 0
    while (blocksFound < totalSects && tries < 100) {
      //find random point
      here = createVector(randomInt(0, w), randomInt(0, h))
      //check if that point is white
      //if it is, expand on all sides and add as Block object
      colCheck = c.get(here.x, here.y)
      if(colCheck[0] == 255) {
        //expand a bit
        topDis = 0
        botDis = 0
        leftDis = 0
        rightDis = 0
  
        topCheck = colCheck
        botCheck = colCheck
        leftCheck = colCheck
        rightCheck = colCheck
  
        while (topCheck[0] == 255) {
          topDis-=1
          topCheck = c.get(here.x, here.y+topDis)
        }
  
        while (botCheck[0] == 255) {
          botDis++
          botCheck = c.get(here.x, here.y+botDis)
        }
  
        while (leftCheck[0] == 255) {
          leftDis-=1
          leftCheck = c.get(here.x+leftDis, here.y)
        }
  
        while (rightCheck[0] == 255) {
          rightDis++
          rightCheck = c.get(here.x+rightDis, here.y)
        }
      
      //find exact midpoint
      midX = map(0.5, 0, 1, here.x+leftDis, here.x+rightDis)
      midY = map(0.5, 0, 1, here.y+topDis, here.y+botDis)
      //find width
      w1 = createVector(here.x+leftDis, 0)
      w2 = createVector(here.x+rightDis, 0)
      wid = w1.dist(w2)
      h1 = createVector(0, here.y+topDis)
      h2 = createVector(0, here.y+botDis)
      hei = h1.dist(h2)
      // console.log(wid)
      //create shape from midpoint
      blocks[blocksFound] = new Block(midX, midY, wid, hei)
      blocks[blocksFound].removeOption()
      
      blocksFound++
      
      //fill in with black to remove from options
      // c.rectMode(CORNER)
      // c.fill('black')
      // c.noStroke()
      // c.stroke('red')
      // c.strokeWeight(0.5)
      // c.stroke('red')
      // // c.noFill()
      // val = map(blocksFound, 0, totalSects, 255, 20)
      // c.fill(chroma(val, val, val).alpha(1).hex())
      // c.rect(midX, midY, wid, hei)
      // c.stroke('black')
      // c.strokeWeight(10)
      // c.point(here.x, here.y)
      } else {
        tries++
      }
    }
  
    blocks.sort(dynamicSort("-sz"))
  }
  
  function themeShape(x, y, r) {
    numSides = 10
    p.beginShape()
    for(let i = 0; i < 360; i+= 360/numSides) {
      p.vertex(xC, yC)
    }
    p.endShape(CLOSE)
  }
  
  function tri(x, y, r) {
    numSides = 3
    initAng = 90*randomInt(0, 4)
    p.beginShape()
    for(let i = 0; i < 360; i+= 360/numSides) {
      xC = cos(i+initAng)*r/2
      yC = sin(i+initAng)*r/2
      p.vertex(x+xC, y+yC)
    }
    p.endShape(CLOSE)
  }
  
  function bgTri(x, y, r) {
    numSides = 3
    initAng = 90*randomInt(0, 3)
    b.beginShape()
    for(let i = 0; i < 360; i+= 360/numSides) {
      xC = cos(i+initAng)*r/2
      yC = sin(i+initAng)*r/2
      b.vertex(x+xC, y+yC)
    }
    b.endShape(CLOSE)
  }
  
  function glyph(x, y, wid, hei, color) {
    // y+=hei/2
    sculpts = []
    cutout = randBool(0.35)
    avgSize = (wid+hei)/2
    morphAmt = 1//randomVal(0.1, 0.9)
    numAccents = randomInt(0, 6)
    accents = []
    accOffset = 15*randomInt(-1, 1)
    if (accOffset != 0) {
        numAccents = randomInt(1, 3)
    }
    sizes = [wid, hei]
    minSz = min(sizes)
    for(let i = 0; i < numAccents; i++) {
      accents[i] = (Math.round(randomInt(0, 360)/90)*90)+accOffset
    }
    //set up the color
    p.noStroke()
    p.fill(color)
    //base body
    p.rectMode(CENTER)
    ratio = abs(wid*cornerRatio)
    p.rect(x, y, wid, hei, ratio, ratio, ratio, ratio)
    if(cutout == true) {
      p.fill(bgc)
      p.rect(x, y, wid*lineWt, hei*lineWt, ratio, ratio, ratio, ratio)
    }
    for(let i = 0; i < 360; i++) {
      squareMod = min(1 / abs(cos(i)), 1 / abs(sin(i)))
      rMod = map(morphAmt, 0, 1, 1, squareMod)
      xC = (cos(i)*wid/2)*rMod
      yC = (sin(i)*hei/2)*rMod
      p.stroke(bgc)
  
      for(let j = 0; j < numAccents; j++) {
        if(accents[j] == i) {
          sculpt = new Sculptor(x, y, x+xC, y+yC, avgSize*sculptorStartRatio, 1.5)
          sculpt.show()
        }
      }
    }
    // p.stroke('green')
    // p.strokeWeight(30)
    // p.point(x, y)
  }
  
  function taperLine(xA, yA, xB, yB, startWt, endWt, ang) {
    expo = sculptExpo
    here = createVector(xA, yA)
    there = createVector(xB, yB)
    dens = here.dist(there)*5
    
    for(let i = 0; i < dens; i++) {
      xHere = map(i, 0, dens, here.x, there.x)
      yHere = map(i, 0, dens, here.y, there.y)
      wt = map(pow(i, expo), 0, pow(dens, expo), startWt, endWt)
      ptA = ptFromAng(xHere, yHere, ang+90, wt/2)
      ptB = ptFromAng(xHere, yHere, ang-90, wt/2)
      p.strokeWeight(2)
      // f.point(xHere, yHere)
      // s.point(xHere, yHere)
      p.line(ptA.x, ptA.y, ptB.x, ptB.y)
    }
  }
  
  function textBox(xC, yC, wid, hei, numRows, spacing, textDens, color, edgePad) {
    adjHei = hei-(edgePad*2)
    adjWid = wid-(edgePad*2)
    boxW = wid/numRows 
    boxH = hei/numRows
    fontSz = adjHei/numRows
    shapeRatio = randomVal(0.25, 0.7)
    fontW = fontSz*shapeRatio
    p.push()
    p.translate(xC+(fontW/2), yC)
    pad = 1//1 - spacing
    cellH = fontSz
    cellW = fontSz*shapeRatio
    rows = Math.floor((adjHei/cellH))
    cols = Math.floor((adjWid/cellW))
    
    
    for(let y = 0; y < rows; y++) {
      for(let x = 0; x < cols; x++) {
        if(prng() < textDens) {
          posX = (-wid/2)+(edgePad)+(cellW*x)//map(x, 0, cols, -wid/2+edgePad, (wid/2)-edgePad)
          posY = (-hei/2)+(edgePad)+(cellH*y)//map(y, 0, rows, -hei/2+edgePad, (hei/2)-edgePad) //+ (((cellH*pad)/4))
          // p.strokeWeight(10)
          // p.stroke(frameCol)
          // p.noFill()
          // p.rect(posX, posY+cellH/2, cellW*pad, cellH*pad)
          // p.point(posX, posY+cellH/2)
          glyph(posX, posY+(cellH/2), cellW*pad, cellH*pad, color)
        }
        
      }
    }
    p.pop()
  }
  
  function textBoxNew(xC, yC, wid, hei, numRows, spacing, textDens, color, edgePad) {
    newW = wid-(edgePad*2)
    newH = hei-(edgePad*2)
    fontSz = newH/numRows
    shapeRatio = randomVal(0.6, 1)
    fontW = fontSz*shapeRatio
    rows = numRows 
    cols = constrain(Math.round(numRows*shapeRatio), 1, 100)
    fontW = newW/cols 
    pad = 1 - spacing
    
    cellH = fontSz
    cellW = fontW 
    console.log(cols, rows)
  
    for(let y = 0; y < rows; y++) {
      for(let x = 0; x < cols; x++) {
        posX = xC+(-wid/2)+edgePad+(cellW*x)+(cellW/2)
        posY = yC+(-hei/2)+edgePad+(cellH*y)
        
          obj = new Glyph(posX, posY+(cellH/2), cellW*pad, min([fontW, fontSz])*pad, color, edgePad/2)
          numStrokes = randomInt(3, 10)
          for(let i = 0; i < numStrokes; i++) {
            if(glyphType == 1) {
              obj.showLineGlyph()
            } else {
              obj.showBlockGlyph()
            }
            
          }
          // glyph(posX, posY+(cellH/2), cellW*pad, cellH*pad, color)
        // scriptGlyph(posX, posY+(cellH/2), cellW*pad, cellH*pad, 10, 0.2, 1, frameCol, 0.1)
        //   p.strokeWeight(30)
        // p.rectMode(CENTER)
        //   p.stroke(frameCol)
        //   p.noFill()
        //   p.rect(posX, posY+cellH/2, cellW*pad, cellH*pad)
        //   p.point(posX, posY+cellH/2)
          
  
      }
    }
  }
  
  function shapeGrad(xC, yC, wid, hei, numRows, spacing, textDens, color, edgePad) {
    adjHei = hei-(edgePad*2)
    adjWid = wid-(edgePad*2)
    fontSz = adjHei/numRows
    fontW = fontSz
    posNotNeg = randBool(0.5)
    xNotY = randBool(0.5)
    p.push()
    p.translate(xC+(fontW/2), yC)
    pad = 1 - spacing
    cellH = fontSz
    cellW = fontSz
    rows = Math.floor((adjHei/fontSz))
    cols = Math.floor((adjWid/(fontSz)))
    for(let y = 0; y < rows; y++) {
      for(let x = 0; x < cols; x++) {
        if(posNotNeg == true) {
          start = 0
          end = 1
        } else {
          start = 1
          end = 0
        }
  
        if(xNotY == true) {
          thisAxis = x 
          target = cols
        } else {
          thisAxis = y
          target = rows
        }
  
  
        changeAmt = map(thisAxis, 0, target, start, end)
        if(noise(x, y) < textDens) {
          posX = map(x, 0, cols, -wid/2+edgePad, wid/2-edgePad)
          posY = map(y, 0, rows, -hei/2+edgePad, hei/2-edgePad) + (((cellH*pad)/4))
          gradShape(posX, posY, cellW*pad, cellH*pad, changeAmt)
        }
        
      }
    }
    p.pop()
  }
  
  function gradShape(x, y, wid, hei, changeAmt) {
    p.beginShape()
    for(let i = 0; i < 360; i++) {
      squareMod = min(1 / abs(cos(i)), 1 / abs(sin(i)))
      radMod = map(changeAmt, 0, 1, 1, squareMod)
      newWid = (wid/2)*radMod
      newHei = (hei/2)*radMod
      xC = cos(i)*newWid
      yC = sin(i)*newHei
      p.vertex(x+xC, y+yC)
    }
    p.endShape(CLOSE)
  }
  
  function meetLineH(xA, yA, xB, yB, wt) {
    gap = wt*randomVal(0.5, 3)
    centerX = map(prng(), 0, 1, xA, xB)
    xAB = constrain(centerX - wt + gap, xA, xB)
    xBB = constrain(centerX + wt + gap, xA, xB)
  
    p.strokeWeight(wt)
    p.line(xA, yA, xAB, yA)
    p.line(xB, yB, xBB, yB)
  
  }
  
  function scatterGrid(xC, yC, wid, hei, numRows, spacing, textDens, color, edgePad) {
    adjHei = hei-(edgePad*2)
    adjWid = wid-(edgePad*2)
    fontSz = adjHei/numRows
    fontW = fontSz
    posNotNeg = randBool(0.5)
    xNotY = randBool(0.5)
    p.push()
    p.translate(xC+(fontW/2), yC)
    pad = 1 - spacing
    cellH = fontSz
    cellW = fontSz
    rows = Math.floor((adjHei/fontSz))
    cols = Math.floor((adjWid/(fontSz)))
    for(let y = 0; y < rows; y++) {
      for(let x = 0; x < cols; x++) {
        if(posNotNeg == true) {
          start = 0
          end = 1
        } else {
          start = 1
          end = 0
        }
  
        if(xNotY == true) {
          thisAxis = x 
          target = cols
        } else {
          thisAxis = y
          target = rows
        }
  
  
        changeAmt = map(thisAxis, 0, target, start, end)
        if(noise(x, y) < textDens) {
          posX = map(x, 0, cols, -wid/2+edgePad, wid/2-edgePad)
          posY = map(y, 0, rows, -hei/2+edgePad, hei/2-edgePad) + (((cellH*pad)/4))
          p.rect(posX, posY, cellW*pad, cellH*pad)
        }
        
      }
    }
    p.pop()
  }
  
  function meetLineV(xA, yA, xB, yB, wt) {
    gap = wt*randomVal(0.5, 3)
    centerY = map(prng(), 0, 1, yA, yB)
    yAB = constrain(centerY - wt + gap, yA, yB)
    yBB = constrain(centerY + wt + gap, yA, yB)
  
    p.strokeWeight(wt)
    p.line(xA, yA, xA, yAB)
    p.line(xB, yB, xB, yBB)
  
  }
  
  function flower(x, y, r) {
    numPetals = flowerPetals
    expo = flowerExpo
    midPt = flowerMidPt
    initAng = randomVal(0, 360)
    p.beginShape()
    for(let i = 0; i < 361; i+=2) {
      rMod = map(sin(i*numPetals), -1, 1, 0, 1)
      rModMod = map(pow(rMod, expo), 0, pow(1, expo), midPt, 1)
      xC = cos(i+initAng)*r/2*rModMod
      yC = sin(i+initAng)*r/2*rModMod
      p.curveVertex(x+xC, y+yC)
    }
    p.endShape(CLOSE)
  }
  
  function starburst(x, y, r) {
    numPts = randomInt(5, 20)
    inc = (360/numPts)/2
    expo = flowerExpo
    midPt = randomVal(0.2, 0.7)
    initAng = randomVal(0, 360)
    p.beginShape()
    for(let i = 0; i < 360; i+=inc) {
      rMod = map(sin((i+initAng)*numPts), -1, 1, 0, 1)
      rModMod = map(rMod, 0, 1, midPt, 1)
      xC = cos(i+initAng)*r/2*rModMod
      yC = sin(i+initAng)*r/2*rModMod
      p.vertex(x+xC, y+yC)
    }
    p.endShape(CLOSE)
  }
  
  function asterisk(x, y, r) {
    circ = TWO_PI*r 
    numPts = flowerPetals
    wt = (circ/numPts)/6
    inc = (360/numPts)
    expo = flowerExpo
    midPt = randomVal(0.2, 0.7)
    initAng = randomVal(0, 360)
  
    p.noFill()
    p.stroke(randTwoTone()) 
    p.strokeWeight(wt)
    p.strokeCap(SQUARE)
    for(let i = 0; i < 360; i+=inc) {
      rMod = map(sin((i+initAng)*numPts), -1, 1, 0, 1)
      rModMod = map(rMod, 0, 1, midPt, 1)
      xC = cos(i+initAng)*r/2
      yC = sin(i+initAng)*r/2
      p.line(x, y, x+xC, y+yC)
    }
  }
  
  function concentricCirc(x, y, r, col) {
    p.noStroke()
    numRings = randomInt(3, 8)
    for(let i = 0; i < numRings; i++) {
      if(i%2 ==0) {
        p.fill(col)
      } else {
        p.fill(bgc)
      }
      rad = map(i, 0, numRings, r, r/numRings)
      p.circle(x, y, rad)
    }
  }
  
  function bgFlower(x, y, r, petalCount) {
    if(petalCount == undefined) {
      numPetals = flowerPetals
    } else {
      numPetals = petalCount
    }
    
    expo = flowerExpo
    midPt = flowerMidPt
    initAng = randomVal(0, 360)
    b.beginShape()
    for(let i = 0; i < 361; i++) {
      rMod = map(sin(i*numPetals), -1, 1, 0, 1)
      rModMod = map(pow(rMod, expo), 0, pow(1, expo), midPt, 1)
      xC = cos(i+initAng)*r/2*rModMod
      yC = sin(i+initAng)*r/2*rModMod
      b.curveVertex(x+xC, y+yC)
    }
    b.endShape(CLOSE)
  }
  
  function textCirc(x, y, r, textDens) {
    circ = TWO_PI*(r*0.9) 
    startAng = randomVal(0, 360)
    letterH = r*randomVal(0.4, 0.1)/2
    letterW = letterH*randomVal(1, 0.4)
    numLetters = Math.floor((circ/letterW)/4)
    midPt = r-letterH*3
    col = colA
  
    filled = randBool(0.5)
    if(filled == true) {
      p.fill(randTwoTone())
      p.noStroke()
    } else {
      p.noFill()
      p.stroke(randTwoTone()) 
      p.strokeWeight(randomVal(3, 5))
    }
    randShape(x, y, randomVal(r*0.2, midPt))
    
    // letterW = (circ/numLetters)/6
    // letterH = letterW * randomVal(1, 2)
    for(let i = 0; i < 360; i+= 360/numLetters) {
      decide = prng()
      if(decide < textDens) {
        p.push()
        xC = cos(i+startAng)*((r/2)-(letterH/2))
        yC = sin(i+startAng)*((r/2)-(letterH/2))
        p.translate(x+xC, y+yC)
        p.rotate(i+90+startAng)
        glyph(0, 0, letterW, letterH, col)
        p.pop()
      }
    }
  }
  
  function orgFlower(x, y, wid, hei) {
    stretch = randomVal(0, 0.1)
    startAng = randomInt(0, 360)
    expo = flowerExpo
    numPetals = randomInt(4, 10)
    numWiggles = randomInt(numPetals*1.5, numPetals*3)
    midPt = randomVal(0.1, 0.3)
    p.beginShape()
    for(let i = startAng; i < startAng+361; i++) {
      petalBase = map(sin((i+startAng)*numPetals), -1, 1, 0, 1)
      petalMod = map(pow(petalBase, expo), 0, pow(1, expo), midPt, 1+stretch)
      wiggleMod = map(sin(i*numWiggles), -1, 1, -3, 3)
      squareMod = min(1 / abs(cos(i)), 1 / abs(sin(i)))
      xC = cos(i+wiggleMod)*(wid/2)*squareMod*petalMod
      yC = sin(i+wiggleMod)*(hei/2)*squareMod*petalMod
      p.vertex(constrain(x+xC, x-wid/2, x+wid/2), constrain(y+yC, y-hei/2, y+hei/2))
    }
    p.endShape(CLOSE)
  
  }
  
  function bgOrgFlower(x, y, wid, hei) {
    stretch = randomVal(0, 0.1)
    startAng = randomInt(0, 360)
    numPetals = randomInt(4, 10)
    expo = flowerExpo
    numWiggles = randomInt(numPetals*1.5, numPetals*3)
    midPt = randomVal(0.1, 0.3)
    b.beginShape()
    for(let i = startAng; i < startAng+361; i++) {
      petalBase = map(sin((i+startAng)*numPetals), -1, 1, 0, 1)
      petalMod = map(pow(petalBase, expo), 0, pow(1, expo), midPt, 1+stretch)
      wiggleMod = map(sin(i*numWiggles), -1, 1, -3, 3)
      squareMod = min(1 / abs(cos(i)), 1 / abs(sin(i)))
      xC = cos(i+wiggleMod)*(wid/2)*squareMod*petalMod
      yC = sin(i+wiggleMod)*(hei/2)*squareMod*petalMod
      p.vertex(constrain(x+xC, x-wid/2, x+wid/2), constrain(y+yC, y-hei/2, y+hei/2))
    }
    b.endShape(CLOSE)
  
  }
  
  function spiral(x, y, r) {
    numSpins = randomVal(2, 5)
    startAng = randomVal(0, 360)
    p.noFill()
    p.strokeWeight((r/numSpins)/10)
    p.stroke(colNow)
    p.beginShape()
    for(let i = 0; i < 360*numSpins; i+=10) {
      rad = map(i, 0, 360*numSpins, 0, r/2)
      xC = cos(i+startAng)*rad 
      yC = sin(i+startAng)*rad
      p.vertex(x+xC, y+yC)
    }
    p.endShape()
  
  }
  
  function randShape(x, y, r, decider, col) {
    if(decider < 1) {
      decider = randomInt(1, 9)
    }
  
    if(decider == 1) {
      p.circle(x, y, r)
    } else if(decider == 2) {
      starburst(x, y, r)
    } else if(decider == 3) {
      flower(x, y, r)
    } else if(decider == 4) {
      asterisk(x, y, r)
    } else if(decider == 5) {
      tri(x, y, r)
    } else if(decider == 6) {
      p.rectMode(CENTER)
      p.rect(x, y, r, r)
    } else if(decider == 7) {
      orgFlower(x, y, r, r)
    } else if(decider == 8) {
      concentricCirc(x, y, r, colNow)
    } else if(decider == 9) {
      spiral(x, y, r)
    } 
  }
  
  function mandalaBG() {
    x = blocks[0].pos.x 
    y = blocks[0].pos.y
    dens = randomInt(3, 20)
    expo = randomVal(0.1, 10)
    minPetals = randomInt(3, 5)
    maxPetals = randomInt(5, 50)
    petalCount = flowerPetals
    for(let i = 0; i < dens; i++) {
      if(i % 2 == 0) {
        b.fill('white')
      } else {
        b.fill('black')
      }
      rad = map(pow(i, expo), 1, pow(dens, expo), h*2, 100)
      petalCount = Math.round(map(i, 0, dens, maxPetals, minPetals))
      bgFlower(x, y, rad, petalCount)
    }
  }
  
  function concentricBG() {
    x = blocks[0].pos.x 
    y = blocks[0].pos.y
    dens = randomInt(5, 50)
    expo = randomVal(0.1, 10)
    for(let i = 0; i < dens; i++) {
      if(i % 2 == 0) {
        b.fill('white')
      } else {
        b.fill('black')
      }
      rad = map(pow(i, expo), 1, pow(dens, expo), h*2, 100)
      b.circle(x, y, rad)
    }
  }
  
  function slatFilter(x, y, wid, hei) {
    vert = randBool()
    dens = 10//randomInt(10, 100)//200
    if(vert == true) {
      wt = constrain((hei/dens)/4, 0.25, 100)
      b.stroke(bgc)
      b.strokeWeight(wt)
      b.strokeCap(SQUARE)
      for(let i = 0; i < dens; i++) {
        yC = map(i, 0, dens, y-hei/2, y+hei/2)
        b.line(x-wid/2, yC, x+wid/2, yC)
      }
    }
    if(vert == false) {
      wt = (wid/dens)/4
      b.stroke(bgc)
      b.strokeWeight(wt)
      b.strokeCap(SQUARE)
      for(let i = 0; i < dens; i++) {
        xC = map(i, 0, dens, x-wid/2, x+wid/2)
        b.line(xC, y-hei/2, xC, y+hei/2)
      }
    }
    
  }
  
  function rayBG() {
    r = h*1.25
    x = blocks[0].pos.x 
    y = blocks[0].pos.y
    ns = randomVal(0.001, 0.1)
    centerW = randomVal(0, w/2)
    b.beginShape()
    for(let i = 0; i < 360; i++) {
      n = map(noise(i*ns), 0, 1, -1, 1)
      if(n > 0.0) {
        rad = r 
      } else {
        rad = centerW
      }
      xC = cos(i)*rad
      yC = sin(i)*rad
      b.vertex(x+xC, y+yC)
    }
    b.endShape(CLOSE)
  }
  
  function splitBG() {
    r = h*1.25
    startAng = randomVal(0, 360)
    limitAng = randomVal(0, 270)
    x = blocks[0].pos.x 
    y = blocks[0].pos.y
    ns = randomVal(0.001, 0.1)
    centerW = randomVal(0, w/2)
    b.beginShape()
    for(let i = startAng; i < startAng+360; i++) {
      n = map(noise(i*ns), 0, 1, -1, 1)
      if(i-startAng < limitAng) {
        rad = r 
      } else {
        rad = 0
      }
      xC = cos(i)*rad
      yC = sin(i)*rad
      b.vertex(x+xC, y+yC)
    }
    b.endShape(CLOSE)
  }
  
  function scatterBG() {
    center = blocks[0].pos 
    dens = 600
    b.stroke('black')
    b.strokeCap(SQUARE)
    b.strokeWeight(3)
    for(let i = 0; i < dens; i++) {
      ptA = createVector(randomVal(0, w), randomVal(0, h))
      ptB = ptFromAng(ptA.x, ptA.y, angBetween(center.x, center.y, ptA.x, ptA.y)+randomVal(-1, 1), randomVal(10, 500))
      b.line(ptA.x, ptA.y, ptB.x, ptB.y)
    }
  }
  
  function checkerBG() {
    dens = randomInt(8, 30)
    off = randomInt(0, 1)
    cellW = w/dens
    cellH = h/dens
    b.rectMode(CENTER)
    b.noFill()
    for(let y = 0; y < dens; y++) {
      if((y+off)%2 == 0) {
        xMod = 1
      } else {
        xMod = 0
      }
      for(let x = 0; x < dens; x++) {
        if((x+xMod)%2 == 0) {
          b.noFill()
        } else {
          b.fill('black')
        }
        b.rect(x*cellW+(cellW/2), y*cellH+(cellH/2), cellW, cellH)
      }
    }
  }
  
  function gridBG() {
    dens = randomInt(8, 35)
    cellW = w/dens
    cellH = h/dens
    b.rectMode(CENTER)
    b.noFill()
    b.stroke('black')
    b.strokeWeight(3)
    for(let y = 0; y < dens; y++) {
      for(let x = 0; x < dens; x++) {
        b.rect(x*cellW+(cellW/2), y*cellH+(cellH/2), cellW, cellH)
    }
  }
  }
  
  function dotBG() {
    dens = 1000
    sz = randomVal(100, 800)
    b.noStroke()
    for(let i = 0; i < dens; i++) {
      filled = randBool(0.5) 
      here = createVector(randomVal(0, w), randomVal(0, h))
      if(filled == true) {
        b.fill('black')
      } else {
        b.fill('white')
      }
  
      bgBlob(here.x, here.y, sz)
    }
  }
  
  function bgBlob(x, y, r) {
    noiseMax = 1
    b.beginShape()
    for(let i = 0; i < 360; i++) {
      xOff = (map(cos(i), -1, 1, 0, noiseMax))
      yOff = (map(sin(i), -1, 1, 0, noiseMax))
      n = noise(xOff, yOff)
      rad= map(n, 0, 1, r*0.5, r)
      xC = cos(i)*rad 
      yC = sin(i)*rad 
      b.vertex(x+xC, y+yC)
    }
    b.endShape(CLOSE)
  }
  function blob(x, y, r, inside) {
    noiseMax = 1
    p.beginShape()
    for(let i = 0; i < 360; i++) {
      xOff = (map(cos(i), -1, 1, 0, noiseMax))
      yOff = (map(sin(i), -1, 1, 0, noiseMax))
      n = noise(xOff, yOff)
      rad= map(n, 0, 1, inside, r)
      xC = cos(i)*rad 
      yC = sin(i)*rad 
      p.vertex(x+xC, y+yC)
    }
    p.endShape(CLOSE)
  }
  
  function cave(x, y, wid, hei) {
    p.noFill()
    p.stroke(colArray[randomInt(0, 1)])
    p.strokeCap(SQUARE)
    noiseMax = randomVal(2, 4)
    numLayers = randomInt(3, 6)
    rInc = 1/numLayers
    p.strokeWeight((wid/numLayers)/20)
    phase = 0
    
    for(j = 0; j < numLayers; j++) {
      
      thisR = map(j, 0, numLayers, 1, 0)
      inside = map(j, 0, numLayers, 1-rInc, 0)
      p.beginShape()
      for(let i = 0; i < 360; i++) {
        xOff = (map(cos(i), -1, 1, 0, noiseMax))
        yOff = (map(sin(i), -1, 1, 0, noiseMax))
        n = noise(xOff, yOff, phase)
        rad= map(n, 0, 1, inside, thisR)/2
        xC = cos(i)*wid*rad
        yC = sin(i)*hei*rad
        p.vertex(x+xC, y+yC)
      }
      p.endShape(CLOSE)
      phase += 10
    }
    
  }
  
  function caveBG(x, y, wid, hei) {
    b.noFill()
    b.stroke(colArray[randomInt(0, 1)])
    b.strokeCap(SQUARE)
    noiseMax = randomVal(2, 4)
    numLayers = randomInt(5, 20)
    rInc = 2/numLayers
    p.strokeWeight((wid/numLayers)/20)
    phase = 0
    
    for(j = 0; j < numLayers; j++) {
      
      thisR = map(j, 0, numLayers, 1, 0)
      inside = map(j, 0, numLayers, 1-rInc, 0)
      p.beginShape()
      for(let i = 0; i < 360; i++) {
        xOff = (map(cos(i), -1, 1, 0, noiseMax))
        yOff = (map(sin(i), -1, 1, 0, noiseMax))
        n = noise(xOff, yOff, phase)
        rad= map(n, 0, 1, inside, thisR)/2
        xC = cos(i)*wid*rad
        yC = sin(i)*hei*rad
        b.vertex(x+xC, y+yC)
      }
      b.endShape(CLOSE)
      phase += 10
    }
    
  }
  
  function arrowLine(xA, yA, xB, yB, wt) {
    dens = randomVal(3, 20)
    
    dir = randomInt(0, 1)
    here = createVector(xA, yA)
    there = createVector(xB, yB)
    length = here.dist(there)
    p.strokeWeight((length/dens)/10)
    ang = angBetween(here.x, here.y, there.x, there.y)+(dir*180)
    arrowLength = length/20
    for(let i = 1-dir; i < dens-(1-dir); i++) {
      spawned = randBool(0.8)
      if(spawned == true) {
        x = map(i, 0, dens, xA, xB)
        y = map(i, 0, dens, yA, yB)
  
        p.push()
        p.translate(x, y)
        p.rotate(ang)
        p.noFill()
        p.beginShape()
        p.vertex(-arrowLength/4, -(wt/2))
        p.vertex(arrowLength/4, 0)
        p.vertex(-arrowLength/4, wt/2)
        p.endShape()
        p.pop()
      }
      
  
    }
  }
  
  function firstRect() {
    c.rectMode(CENTER)
    wid = w/2//randomVal(w/2, w*0.66)
    hei = h/2//randomVal(h/2, h*0.66)
    here = createVector(randomVal(wid/2, w-(wid/2)), randomVal(hei/2, h-(hei/2)))
    c.fill(200)
    c.strokeWeight(3)
    c.stroke('black')
    c.rect(here.x, here.y, wid, hei)
    blocks[0] = new Block(here.x, here.y, wid, hei)
    // blocks[0].removeOption()
  }
////////////////////////////////////////////////////////
//Blocks.js
class Block {
    constructor(x, y, wid, hei) {
        this.pos = createVector(x, y)
        this.wid = wid
        this.hei = hei
        this.sz = hei*wid
        this.colorChance = prng()
        this.colNum = randomInt(0, 1)
        this.colA = colArray[this.colNum]
        this.colB = colArray[1-this.colNum]
        if(this.colorChance < 0) {
            this.col = this.colB
            this.oppCol = this.colA
        } else {
            this.col = this.colA
            this.oppCol = this.colB
        }
        this.bgChoiceOff = randomInt(0, 1)
        this.aspects = [this.wid, this.hei]
        this.shortSide = min(this.aspects)
        this.longSide = max(this.aspects)
        this.ratio = this.longSide/this.shortSide
        if(this.ratio > 2) {
            this.bar = true
            this.block = false
        } else {
            this.block = true 
            this.bar = false
        } 
        this.corner = this.shortSide*cornerRatio
        this.decider = randomInt(1, 9)

        //for the corner ornaments
        this.cornerR = randomVal(this.shortSide*0.1, this.shortSide*0.3)
        this.cornAdj = this.cornerR*randomVal(0.5, 1)
        this.tl = createVector(x-wid/2+this.cornAdj, y-hei/2+this.cornAdj)
        this.tr = createVector(x+wid/2-this.cornAdj, y-hei/2+this.cornAdj)
        this.br = createVector(x+wid/2-this.cornAdj, y+hei/2-this.cornAdj)
        this.bl = createVector(x-wid/2+this.cornAdj, y+hei/2-this.cornAdj)
        this.corners = [this.tr, this.tl, this.br, this.bl]
        this.theCorner = this.corners[randomInt(0, 3)]
    }

    removeOption() {
        c.rectMode(CENTER)
        this.bgLayer = randBool(0.3)
        if(blocksFound < Math.floor(totalSects*0.5)) {
            c.fill(randomVal(255/2, 255))
        } else {
            c.fill(randomVal(0, 255/2))
        }
        c.stroke(255/2)
        c.rect(this.pos.x, this.pos.y, this.wid, this.hei)
    }

    debugShow() {
        c.rectMode(CENTER)
        c.strokeWeight(0.5)
        c.stroke('red')
        // c.noFill()
        this.val = randomVal(0, 255)
        c.fill(chroma(this.val, this.val, this.val).alpha(1).hex())
        c.rect(this.pos.x, this.pos.y, this.wid, this.hei)
        c.stroke('black')
        c.strokeWeight(10)
        c.point(here.x, here.y)
    }

    showRect() {
        p.rectMode(CENTER)
        p.noStroke()
        p.fill(this.col)
        p.rect(this.pos.x, this.pos.y, this.wid-padding, this.hei-padding, this.corner)
    }

    showLines() {
        p.rectMode(CENTER)
        p.noFill()
        p.stroke('black')
        p.rect(this.pos.x, this.pos.y, this.wid, this.hei)
    }

    showTextBox() {
        textBoxNew(this.pos.x, this.pos.y, this.wid, this.hei, randomInt(1, 10), randomVal(0.1, 0.4), randomVal(0.5, 0.8), this.col, padding*0.3)
    }

    showHeader() {
        
        textBoxNew(this.pos.x, this.pos.y, this.wid, this.hei, randomInt(1, 3), randomVal(0.1, 0.4), 0.8, this.col, padding*0.3)
    }

    showCircRow() {
        this.padding = randomVal(0.1, 0.3)
        
        if(this.wid > this.hei) {
            this.r = this.hei
            this.pad = this.r*randomVal(0.1, 0.3)
            this.rad = this.r-this.pad
            this.num = Math.floor((this.wid-this.rad-(this.pad*2))/this.hei)
            // this.startX = 
            for(let i = 0; i < this.num+1; i++) {
                this.fillChance = prng()
                if(this.fillChance < 0.5) {
                    p.fill(this.col)
                    p.noStroke()
                } else {
                    p.stroke(this.col)
                    p.strokeWeight(2)
                    p.noFill()
                }
                this.xPos = map(i, 0, this.num, this.pos.x-(this.wid/2)+this.rad/2+this.pad, this.pos.x+(this.wid/2)-this.rad/2-this.pad)
                this.yPos = this.pos.y
                
                randShape(this.xPos, this.yPos, this.rad, this.decider, this.col)
            }
        } else if(this.hei > this.wid) {
            this.r = this.wid
            this.pad = this.r*randomVal(0.1, 0.3)
            this.rad = this.r-this.pad
            this.num = Math.floor((this.hei-this.rad-(this.pad*2))/this.wid)
            
            // this.startX = 
            for(let i = 0; i < this.num+1; i++) {
                this.yPos = map(i, 0, this.num, this.pos.y-(this.hei/2)+this.rad/2+this.pad, this.pos.y+(this.hei/2)-this.rad/2-this.pad)
                this.xPos = this.pos.x

                this.bgChance = prng()
                if(this.bgChance < 0.1) {
                    p.fill(this.oppCol)
                    p.noStroke()
                    p.rectMode(CENTER)
                    p.rect(this.xPos, this.yPos, this.rad*1.1, this.rad*1.1)
                }
                this.fillChance = prng()
                if(this.fillChance < 0.5) {
                    p.fill(this.col)
                    p.noStroke()
                } else {
                    p.stroke(this.col)
                    p.strokeWeight(2)
                    p.noFill()
                }
                
                
                randShape(this.xPos, this.yPos, this.rad, this.decider, this.col)
            }
        }
    }
    
    showLinesMeet() {
        this.dir = 2
        this.wt = randomVal(5, (this.shortSide-padding)/5)
        if(cornerRatio < 0.25) {
            p.strokeCap(SQUARE)
        } else {
            p.strokeCap(ROUND)
        }
        
        
        
        if (this.dir == 1) {
            this.numLines = ((this.hei-padding)/(this.wt)/2)
            this.xA = this.pos.x-this.wid/2+padding/2
            this.xB = this.pos.x+this.wid/2-padding/2
            for(let i = 0; i < this.numLines; i++) {
                p.stroke(this.col)
                this.yPos = map(i, 0, this.numLines, this.pos.y-this.hei/2+padding/4, this.pos.y+this.hei/2-padding/4)
                meetLineH(this.xA, this.yPos, this.xB, this.yPos, this.wt)
            }
            
        } else if(this.dir == 2) {
            this.numLines = ((this.wid-padding)/(this.wt)/2)
            this.yA = this.pos.y-this.hei/2+padding/2
            this.yB = this.pos.y+this.hei/2-padding/2
            for(let i = 0; i < this.numLines; i++) {
                p.stroke(this.col)
                this.xPos = map(i, 0, this.numLines, this.pos.x-this.wid/2+padding/4, this.pos.x+this.wid/2-padding/4)
                meetLineV(this.xPos, this.yA, this.xPos, this.yB, this.wt)
            }
        }
    }

    showTextCirc() {
        textCirc(this.pos.x, this.pos.y, this.shortSide, randomVal(0.5, 0.8))
    }

    showShapeGrad() {
        this.filled = randBool()
        if(this.filled == true) {
            p.fill(this.col)
            p.noStroke()
        } else {
            p.stroke(this.col)
            p.strokeWeight(randomVal(3, 6))
            p.noFill()
        }

        shapeGrad(this.pos.x, this.pos.y, this.wid, this.hei, randomInt(2, 10), randomVal(0.1, 0.4), randomVal(0.5, 0.8), this.col, padding*0.4)
    }

    showOrgFlower() {
        this.filled = randBool()
        if(this.filled == true) {
            p.fill(this.col)
            p.noStroke()
        } else {
            p.stroke(this.col)
            p.strokeWeight(randomVal(3, 6))
            p.noFill()
        }
        orgFlower(this.pos.x, this.pos.y, this.wid-(padding/2), this.hei-(padding/2))
    }

    cornerOrnament() {
        this.filled = randBool()
        this.bgChance = prng()
        if(this.bgChance < 0.1) {
            p.fill(this.oppCol)
            p.noStroke()
            p.rectMode(CENTER)
            p.rect(this.theCorner.x, this.theCorner.y, this.cornerR)
        }
        if(this.filled == true) {
            p.fill(this.col)
            p.noStroke()
        } else {
            p.stroke(this.col)
            p.strokeWeight(randomVal(3, 6))
            p.noFill()
        }
        randShape(this.theCorner.x, this.theCorner.y, this.cornerR, this.decider)
    }

    arrowLine() {
        p.stroke(this.col)
        p.strokeWeight(10)
        if(this.wid > this.hei) {
            this.vert = false
        } else {
            this.vert = true
        }
        if(this.vert = true) {
            arrowLine(this.pos.x, this.pos.y-(this.hei/2)+padding/2, this.pos.x, this.pos.y+(this.hei/2)-padding/2, this.wid-(padding/2))
        } else {
            arrowLine(this.pos.x-(this.wid/2)+padding/2, this.pos.y, this.pos.x+(this.wid/2)-padding/2, this.pos.y, this.hei-(padding/2))
        }

    }

    showDashLine() {
        p.stroke(this.col)
        this.segs = randomInt(2, 20)
        p.push()
        p.strokeCap(SQUARE)
        if(this.wid > this.hei) {
            this.vert = false
        } else {
            this.vert = true
        }
        if(this.vert = true) {
            this.chunk = (this.hei-padding)/this.segs
            p.drawingContext.setLineDash([this.chunk, this.chunk])
            p.strokeWeight(this.wid-padding)
            p.line(this.pos.x, this.pos.y-(this.hei/2)+padding/2, this.pos.x, this.pos.y+(this.hei/2)-padding/2)
        } else {
            this.chunk = (this.wid-padding)/this.segs
            p.drawingContext.setLineDash([this.chunk, this.chunk])
            p.strokeWeight(this.hei-padding)
            p.line(this.pos.x-(this.wid/2)+padding/2, this.pos.y, this.pos.x+(this.wid/2)-padding/2, this.pos.y)
        }
        p.pop()
    }

    showBez() {
        this.numPts = randomInt(3, 15)
        this.numLayers = randomInt(1, 4)
        p.noStroke()
        
        for(let j = 0; j < this.numLayers; j++) {
            if(j%2==0) {
                p.fill(this.col)
            } else {
                p.fill(this.colB)
            }
            p.curveTightness(randomVal(0.0, 1.0))
            p.beginShape()
            for(let i = 0; i < this.numPts+2; i++) {
                p.curveVertex(randomVal(this.pos.x-this.wid/2+padding/2, this.pos.x+this.wid/2-padding/2), randomVal(this.pos.y-this.hei/2+padding/2, this.pos.y+this.hei/2-padding/2))
            }
            p.endShape(CLOSE)
        }
        
    }

    showCave() {
        p.push()
        this.chunk = randomInt(10, 300)
        p.drawingContext.setLineDash([this.chunk, this.chunk])
        cave(this.pos.x, this.pos.y, this.wid-padding/2, this.hei-padding/2)
        p.pop()
    }

    showScatterGrid() {
        this.filled = randBool()
        if(this.filled == true) {
            p.fill(this.col)
            p.noStroke()
        } else {
            p.stroke(this.col)
            p.strokeWeight(randomVal(3, 6))
            p.noFill()
        }
        scatterGrid(this.pos.x, this.pos.y, this.wid, this.hei, randomInt(2, 10), randomVal(0.1, 0.4), randomVal(0.2, 0.8), this.col, padding*0.4)
    }

    fillBlock() {
        p.push()
        p.rectMode(CENTER)
        p.fill(this.col)
        p.rect(this.pos.x, this.pos.y, this.wid, this.hei)
        p.pop()
    }
}

///////////////////////////////////////////////////////////////////
//sculptor
class Sculptor {
    constructor(centerX, centerY, xPos, yPos, wt, maxExtension) {
        this.pos = createVector(xPos, yPos)
        this.center = createVector(centerX, centerY)
        this.dis = this.center.dist(this.pos)
        this.ang = angBetween(this.center.x, this.center.y, this.pos.x, this.pos.y)+180
        this.correctAng = (Math.round(this.ang/90))*90
        this.dest = ptFromAng(this.pos.x, this.pos.y, this.correctAng, this.dis*randomVal(0.1, maxExtension))
        this.wt = wt
    }

    show() {
        // f.circle(this.pos.x, this.pos.y, 20)
        // f.fill(colB)
        p.fill(bgc)
        // f.rectMode(CENTER)
        p.rectMode(CENTER)
        taperLine(this.pos.x, this.pos.y, this.dest.x, this.dest.y, this.wt, 0, this.correctAng)
        // f.circle(this.pos.x, this.pos.y, 20)
        // s.circle(this.pos.x, this.pos.y, 20)
        // f.circle(this.center.x, this.center.y, 50)
        // s.line(this.pos.x, this.pos.y, this.dest.x, this.dest.y)
    }

}

///////////////////////////////////////////////////////////////////
//glyph.js
class Glyph {
    constructor(x, y, wid, hei, color, padding) {
        this.pos = createVector(x, y)
        this.wid = wid
        this.hei = hei 
        this.col = color
        this.padding = padding/2
        this.minSz = min([this.wid, this.hei])
        
    } 

    showBlockGlyph() {
        glyph(this.pos.x, this.pos.y, this.wid, this.hei, this.col)
    }

    showLineGlyph() {
        this.dens = 2//5//2//randomInt(2, 6)
        this.newW = this.wid-((this.padding)*2)
        this.newH = this.hei-(this.padding*2)
        this.fontSz = this.newH/this.dens
        this.fontW = this.newW/this.dens
        this.rows = this.dens 
        this.cols = this.dens
        
        this.pts = []
        this.cellH = this.fontSz
        this.cellW = this.fontW 
        // console.log(cols, rows)
        this.y = randomInt(0, this.rows)
        this.x = randomInt(0, this.cols)
        this.num = 3//randomInt(3, 4)
        p.stroke(this.col)
        p.noFill()
        p.strokeWeight(this.minSz/20)
        p.strokeCap(SQUARE)
        p.strokeJoin(BEVEL)
        p.curveTightness(1)
        p.beginShape()
        
        for(let i = 0; i < this.num; i++) {
          this.posX = this.pos.x+(-this.wid/2)+this.padding+(this.cellW*this.x)
          this.posY = this.pos.y+(-this.hei/2)+this.padding+(this.cellH*this.y)
          p.curveVertex(this.posX, this.posY)
          //pick a new coord for the next run
          this.foundEmpty = false
          this.tries = 0
          while(this.foundEmpty == false) {
            if(i%2 == 0) {
                this.y = randomInt(0, this.dens)
              } else {
                this.x = randomInt(0, this.dens)
              }
              //occasionally draw a diagonal
             this.diagChance = randBool(0.2)
            if(this.diagChance == true) {
                if(i%2 == 0) {
                    this.x = randomInt(0, this.dens) 
                } else {
                    this.y = randomInt(0, this.dens)
                }
            }
            this.here = createVector(this.x, this.y)
            //check against existing points
            this.triggered = false
            for(let j = 0; j < i; j++) {
                if(this.here == this.pts[j]) {
                    this.triggered = true 
                }
            }
            if(this.triggered == false) {
                this.pts[i] = this.here 
                this.foundEmpty = true
            } else {
                this.tries++
            }

            if(this.tries > 100) {
                return
            }



          }
          
          
          //track switching
        //   trackSwitch = randBool(0.5) 
        //   if(trackSwitch == true) {

        //   }
          
          
          if(i < this.num-1) {
            //use the next point to calculate two interpolated points just before and just after
          this.nextX = this.pos.x+(-this.wid/2)+this.padding+(this.cellW*this.x)
          this.nextY = this.pos.y+(-this.hei/2)+this.padding+(this.cellH*this.y)
          this.firstInt = pointInterp(this.posX, this.posY, this.nextX, this.nextY, 0.3)
          this.secondInt = pointInterp(this.posX, this.posY, this.nextX, this.nextY, 0.7)
          p.vertex(this.firstInt.x, this.firstInt.y)
          p.vertex(this.secondInt.x, this.secondInt.y)}

        }
        p.endShape()
        // p.rectMode(CENTER)
        // p.rect(this.pos.x, this.pos.y, this.wid, this.hei)
        
        
    }
}


//////////////////////////////////////////////////////////////////////////
//shader info
shaderVert = `// our vertex data
attribute vec3 aPosition;
attribute vec2 aTexCoord;

// lets get texcoords just for fun!
varying vec2 vTexCoord;

void main() {
  // copy the texcoords
  vTexCoord = aTexCoord;

  // copy the position data into a vec4, using 1.0 as the w component
  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;

  // send the vertex information on to the fragment shader
  gl_Position = positionVec4;
}
`

shaderFrag = `#ifdef GL_ES
precision highp float;
#endif

// grab texcoords from vert shader
varying vec2 vTexCoord;

//textures and uniforms from p5
uniform sampler2D p;
uniform sampler2D c;
uniform sampler2D b;
uniform float printMess;
uniform vec2 u_resolution;
uniform float pxSize;
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
  st.x += map(random(st.xy), 0.0, 1.0, -0.0004, 0.0004);
  st.y += map(random(seed+(st.xy)), 0.0, 1.0, -0.0004, 0.0004);

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
  //if the tile is above 0.5, its a tile we can draw to
  if(sampTexC.r < 0.5 && sampTexC.r != 0.0) {
    isTile = true;
  } else {
    isTile = false;
  }
  //if its a tile we can draw on and it's black on texB, the bg layer is accCol
  if(isTile == true && sampTexB.r != 1.0) {
    bg.rgb = accCol;
  }
  //sample and offset by p and b
  //offset is lessened on tiles with bg to reduce visual noise
  float offset = 0.0;
  float mess = 0.0;
  //0.0025;
  //offset by p color
  
  if(sampTexC.r > 0.5) {
    mess = map(sampTexC.r, 0.5, 1.0, 0.0, printMess);
    if(isTile == true) {
    offset = 0.0;//0.0005*mess;
  } else {
    offset = 0.002*mess;
  }
  } else if(sampTexC.r < 0.5) {
    offset = map(sampTexC.r, 0.5, 0.0, 0.0, 1.0);
  } 

  // mess = 0.0;

  
  st.x += map(sampTex.r, 0.0, 1.0, -offset, offset);
  st.y += map(sampTex.b, 0.0, 1.0, -offset, offset);
  st.xy += 0.5;
  st.xy *= rotate(map(sampTex.g, 0.0, 1.0, -0.00872665*mess, 0.00872665*mess));
  st.xy -= 0.5;

  //offset by b color
  st.x += map(sampTexB.r, 0.0, 1.0, -offset, offset);
  st.y += map(sampTexB.b, 0.0, 1.0, -offset, offset);
  st.xy += 0.5;
  st.xy *= rotate(map(sampTexB.g, 0.0, 1.0, -0.00872665*mess, 0.00872665*mess));
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
  } else if(color.rgb == vec3(1.0)) {
    // color = adjustContrast(color, -0.1);
  } else {
    // color = adjustContrast(color, 1.0);
    // color = adjustContrast(color, -0.5);
  }
  // color.rgb = bg.rgb;
  

  //Draw margin
  if(stB.x < 0.0|| stB.x > 1.0 || stB.y < 0.0 || stB.y > 1.0) {
    color = vec3(bgc.r, bgc.g, bgc.b);
  }

  if(color == vec3(0.0)) {
    color = adjustContrast(color, -0.3);
  } 
  
  float overpass = sin(stB.y*800.0);
  if(overpass < 0.0) {
    // color = bgc;
  }

  

  color = adjustSaturation(color, 0.3);
  color = adjustContrast(color, -0.1);
  
  color+= noiseGray;
  
  gl_FragColor = vec4(color, 1.0);
}
`
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//sketch


marg = 20//randomVal(10, 400)

willReadFrequently = true

let shade;
function preload() {
  
}
url = new URL(window.location.href)
urlParams = new URLSearchParams(url.search)
if(url.searchParams.has('size') == true) {
  pxSize = url.searchParams.get('size')
} else {
  url.searchParams.append('size', 2);
}
pxSize = url.searchParams.get('size')


//declarations
angs = []
blocks = []
colArray = [frameCol, truePal[0]]
colNum = randomInt(0, 1)
colA = colArray[colNum]
colB = colArray[1-colNum]
aspects = []
accNum = 1
accentCol = truePal[accNum]
tries = 0


//parameters
printMess = randomVal(-2, 2)//prng()*2

numDivisions = randomInt(5, 20)
totalSects = numDivisions+1
lineWtC = 2//randomVal(5, 20)

flowerExpo = randomVal(0.1, 0.5)
flowerMidPt = randomVal(0.1, 0.5)
flowerPetals = randomInt(4, 8)

glyphType = 2//randomInt(1, 2)
lineWt = 1 - randomVal(0.5, 0.1)
cornerRatio = randomVal(0.0, 0.5)//0.2
sculptorStartRatio = randomVal(0.1, 1)
sculptExpo = 0.5//randomVal(0.5, 5)
stretchMin = 200//randomInt(30, 70)

bgType = randomInt(1, 6)
doubleBG = randBool(0.1)

minColAng = randomVal(0, 360)
maxColAng = minColAng+145

//weighing one direction in x or y, under 1 is right/down, above is left/up
sectWeightX = 1//randomVal(0.1, 10)
sectWeightY = 1//randomVal(0.1, 10)

const aspectRatio = 4 / 5;
const height = width / aspectRatio;
h = height

function setup() {
    
  var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oraßn|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|verßi|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
    isMobile = true;
}

  createCanvas(width, height, WEBGL);
  if(pxSize == 1) {
    pixelDensity(1)
  } else if (pxSize == 2) {
    pixelDensity(2)
  } else if (pxSize == 3) {
    pixelDensity(3)
  }

  p = createGraphics(width, height)
  c = createGraphics(width, height)
  b = createGraphics(width, height)
  angleMode(DEGREES)
  p.angleMode(DEGREES)
  c.angleMode(DEGREES)
  noLoop()
  p.noLoop()
  c.noLoop()


  padding = 10//constrain((w/(numDivs+3))-(lineWt/2), 0, w/2)
  colorMode(HSB, 360, 1.0, 1.0)
  shade = createShader(shaderVert, shaderFrag);
  noiseSeed(randomInt(1, 10000000000000000000000000000))
}

function draw() {
  background(bgc)
  c.background('white')
  b.background('white')
  p.background(bgc)

  //Build our background Major Composition layer
  b.fill('black')
  b.stroke('white')
  b.strokeWeight(10)
  
  //Set the first Rect
  // firstRect()
  //Build the subdivided grid

  for(let i = 0; i < numDivisions; i++) {
    dir = prng()
    
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
  } else if(bgType == 6) {
    caveBG(w/2, h/2, w*1.5, h*1.5)
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
  for(let i = blocks.length-1; i > -1; i-=1) {
    // p.strokeWeight(3)
    // blocks[i].showLines()
    colNow = blocks[i].col
    //allow for overlap
    padding = randomVal(300, -200)
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


  //fine border
  p.rectMode(CENTER)
  p.noFill()
  p.stroke(frameCol)
  p.strokeWeight(10)
  p.rect(w/2, h/2, w, h)

  //Post processing
  //  copy(p, 0, 0, w, h, 0, 0, w, h)
   bgc = color(bgc)
   accCol = color(accentCol)
   shader(shade)
   shade.setUniform("u_resolution", [width, height]);
   shade.setUniform("p", p);
   shade.setUniform("c", c);
   shade.setUniform("b", b);
   shade.setUniform("pxSize", pxSize);
   shade.setUniform("printMess", printMess);
   shade.setUniform("seed", randomVal(0, 10));
   shade.setUniform("marg", map(marg, 0, width, 0, 1));
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
   window.alba.setMetadata({});
   window.alba.setComplete(true)
  //  save("blockBatchE.png")
  //  setTimeout(() => {
  //   window.location.reload();
  // }, "8000");
}
