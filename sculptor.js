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