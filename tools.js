function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(fxrand() * (max - min + 1) + min); // The maximum is exclusive and the minimum is inclusive
}
function randomVal(min, max) {
  return fxrand() * (max - min) + min;
}
function map_range(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

function shuff(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(fxrand() * currentIndex);
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
  return chroma(truePal[randomInt(0, truePal.length-1)]).hex()
}

function randBool(chanceTrue) {
  if(chanceTrue != "undefined") {
    chanceTrue = chanceTrue
  } else {
    chanceTrue = 0.5
  }
  rand = fxrand()
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

////////////////////////////////////////

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
      if(colCheck[0] > 250 && rightDis > padding && abs(leftDis) > padding) {
        //tell loop we've found it
      ptFound++
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
    while(topCheck[0] != 0) {
      topDis-=1
      topCheck = c.get(here.x, here.y+topDis)
      // console.log('top is', topCheck[0])
    }
  
    //move bottom down until it hits black
    while(botCheck[0] != 0) {
      botDis++
      botCheck = c.get(here.x, here.y+botDis)
      // console.log('bot is', botCheck[0])
    }
    //check that space is white and there is space above and below
    if(colCheck[0] > 250 && botDis > padding && abs(topDis) > padding) {
      //tell loop we've found it
      ptFound++
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

      while (topCheck[0] != 0) {
        topDis-=1
        topCheck = c.get(here.x, here.y+topDis)
      }

      while (botCheck[0] != 0) {
        botDis++
        botCheck = c.get(here.x, here.y+botDis)
      }

      while (leftCheck[0] != 0) {
        leftDis-=1
        leftCheck = c.get(here.x+leftDis, here.y)
      }

      while (rightCheck[0] != 0) {
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
  ratio = wid*cornerRatio
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
      if(fxrand() < textDens) {
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
  centerX = map(fxrand(), 0, 1, xA, xB)
  xAB = constrain(centerX - wt + gap, xA, xB)
  xBB = constrain(centerX + wt + gap, xA, xB)

  p.strokeWeight(wt)
  p.line(xA, yA, xAB, yA)
  p.line(xB, yB, xBB, yB)

}

function meetLineV(xA, yA, xB, yB, wt) {
  gap = wt*randomVal(0.5, 3)
  centerY = map(fxrand(), 0, 1, yA, yB)
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
    p.vertex(x+xC, y+yC)
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

function semiCirc() {

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
    b.vertex(x+xC, y+yC)
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
    decide = fxrand() 
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

function randShape(x, y, r, decider) {
  if(decider < 1) {
    decider = randomInt(1, 7)
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
  vert = true//randBool()
  dens = 200//randomInt(10, 100)
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