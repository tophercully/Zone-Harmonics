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

function setLineDash(list) {
  drawingContext.setLineDash(list);
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

function angBetween(x1, y1, x2, y2) {
  return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
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
    // console.log(startAng, endAng)
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

function sectioning() {
  for(let i = 0; i < 1; i++) {
    here = createVector(randomVal(0, w), randomVal(0, h))
    col = c.get(here.x, here.y)
    console.log(col[0])
    topTrig = 0
    botTrig = 0
    while (topTrig == 0 || botTrig == 0) {
      if(col[0] == 0) {
        top = here 
        bottom = here 

        colTop = c.get(top.x, top.y)
        colBottom = c.get(bottom.x, bottom.y)
  
        if(colTop[0] == 0) {
          top.y-=1
        } else {
          topTrig++
        }

        if(colBottom[0] == 0) {
          bottom.y++
        } else {
          botTrig++
        }
        
      }
    }
    c.line(top.x, top.y, bottom.x, bottom.y)
    console.log('did it')
  }
}

function newSection() {
  c.stroke('black')
  c.strokeWeight(40)
  //find a starting point
  here = createVector(randomInt(0, w), randomInt(0, h))
  //make sure the starting point isn't too close to another line and is white
  colCheck = c.get(here.x, here.y)
  //make sure the colCheck is showing the right value
  console.log("initial check", colCheck[0])

  //create a top and bottom point
  top = 0
  bottom = 0
  topCol = [255, 255, 255]//c.get(here.x, here.y+top)
  console.log("topCol preCheck", topCol)
  botCol = 255//c.get(bottom.x, bottom.y+bottom)
  //move top up from the starting point until the color is black
  while(topCol[0] > 250) {
    topCol = c.get(here.x, here.y+top)
    console.log("topCol duringCheck", topCol[0])
    if(topCol == 255) {
      top-=1
    }
  } 
  //move bottom down from the starting point until the color is black
  while(botCol[0] > 250) {
    botCol = c.get(here.x, here.y+bottom)
    if(botCol == 255) {
      bottom++
    }
  } 
  //create line from top to bottom
  c.line(top.x, top.y, bottom.x, bottom.y)
}

function newSectionVert() {
  c.stroke('black')
  c.strokeWeight(20)
  //we've found no points yet
  ptFound = 0
  //run this while looking for a point
  while(ptFound == 0) {
    //Find starting point
    here = createVector(randomInt(0, w), randomInt(0, h))
    //Check that point isnt taken
    colCheck = c.get(here.x, here.y)
    if(colCheck[0] > 250) {
      //tell loop we've found it
      ptFound++
    }
  }
  
  //create bottom and top point
  topDis = 0
  botDis = 0
  topCheck = colCheck
  botCheck = colCheck
  console.log(topCheck[0])
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
  c.strokeWeight(20)
  //we've found no points yet
  ptFound = 0
  //run this while looking for a point
  while(ptFound == 0) {
    //Find starting point
    here = createVector(randomInt(0, w), randomInt(0, h))
    //Check that point isnt taken
    colCheck = c.get(here.x, here.y)
    if(colCheck[0] > 250) {
      //tell loop we've found it
      ptFound++
    }
  }
  
  //create bottom and top point
  leftDis = 0
  rightDis = 0
  leftCheck = colCheck
  rightCheck = colCheck
  console.log(leftCheck[0])
  //move top up until it hits black
  while(leftCheck[0] != 0) {
    leftDis-=1
    leftCheck = c.get(here.x+leftDis, here.y)
    // console.log('left is', leftCheck[0])
  }
  
  //move bttom down until it hits black
  while(rightCheck[0] != 0) {
    rightDis++
    rightCheck = c.get(here.x+rightDis, here.y)
    // console.log('right is', leftCheck[0])
  }
  //create line from top to bottom points
  c.line(here.x+leftDis, here.y, here.x+rightDis, here.y)
}