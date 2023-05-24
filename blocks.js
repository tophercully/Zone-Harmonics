class Block {
    constructor(x, y, wid, hei) {
        this.pos = createVector(x, y)
        this.wid = wid 
        this.hei = hei 
        this.sz = hei*wid
        this.colorChance = fxrand()
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
        this.bgLayer = randBool(0.5)
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
                this.fillChance = fxrand()
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

                this.bgChance = fxrand()
                if(this.bgChance < 0.1) {
                    p.fill(this.oppCol)
                    p.noStroke()
                    p.rectMode(CENTER)
                    p.rect(this.xPos, this.yPos, this.rad*1.1, this.rad*1.1)
                }
                this.fillChance = fxrand()
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
        this.bgChance = fxrand()
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
        p.rect(this.pos.x, this.pos.y, this.wid, this.hei)
        p.pop()
    }
}