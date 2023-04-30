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
        this.dens = 5//2//randomInt(2, 6)
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