class gameOfLife {

    constructor(width, height, boxSize) {

        this.width   = width;
        this.height  = height;
        this.cols    = floor(width/boxSize);
        this.rows    = floor(height/boxSize);
        this.boxSize = boxSize;        
        this.boxes   = [];
    }

    create() {

        let maxSpots             = (this.rows*this.cols);
        let onePercentOfMaxSpots = (maxSpots/100);
        let randomSpots          = int(random((onePercentOfMaxSpots*2), onePercentOfMaxSpots*25));

        stroke(0);
        fill(255);

        for (let r = 0; r <= this.rows-1; r++) {


            if (typeof this.boxes[r] === "undefined") {
                this.boxes[r] = [];
            }

            for (let c = 0; c <= this.cols-1; c++) {
                // console.info(c, 'row: '+r);
                if (randomSpots > 0 && int(random(0,4)) === 3) {
                    randomSpots--;
                    this.boxes[r][c] = true;
                } else {
                    this.boxes[r][c] = false;
                }
            }
        }
    }

    countNeighbors(r, c) {
        let totalNeighbors = 0;

        // Top Left
        if (typeof this.boxes[r-1] !== "undefined" && typeof this.boxes[r-1][c-1] !== "undefined" && this.boxes[r-1][c-1]) {
            ++totalNeighbors;
        }
        // Top Middle
        if (typeof this.boxes[r-1] !== "undefined" && typeof this.boxes[r-1][c] !== "undefined" && this.boxes[r-1][c]) {
            ++totalNeighbors;
        }
        // Top Right
        if (typeof this.boxes[r-1] !== "undefined" && typeof this.boxes[r-1][c+1] !== "undefined" && this.boxes[r-1][c+1]) {
            ++totalNeighbors;
        }

        // Middle Left
        if (typeof this.boxes[r] !== "undefined" && typeof this.boxes[r][c-1] !== "undefined" && this.boxes[r][c-1]) {
            ++totalNeighbors;
        }
        // Middle Right
        if (typeof this.boxes[r] !== "undefined" && typeof this.boxes[r][c+1] !== "undefined" && this.boxes[r][c+1]) {
            ++totalNeighbors;
        }

        // Bottom Left
        if (typeof this.boxes[r+1] !== "undefined" && typeof this.boxes[r+1][c-1] !== "undefined" && this.boxes[r+1][c-1]) {
            ++totalNeighbors;
        }
        // Bottom Middle
        if (typeof this.boxes[r+1] !== "undefined" && typeof this.boxes[r+1][c] !== "undefined" && this.boxes[r+1][c]) {
            ++totalNeighbors;
        }
        // Bottom Right
        if (typeof this.boxes[r+1] !== "undefined" && typeof this.boxes[r+1][c+1] !== "undefined" && this.boxes[r+1][c+1]) {
            ++totalNeighbors;
        }

        return totalNeighbors;
    }

    applyRules() {


        for (let r = 0; r <= this.boxes.length-1; r++) {

            for (let c = 0; c <= this.boxes[r].length-1; c++) {

                let totalNeighbors = this.countNeighbors(r, c);

                if (this.boxes[r][c] && [2,3].indexOf(totalNeighbors) !== -1) {
                    this.boxes[r][c] = true;
                } else if (this.boxes[r][c] && (totalNeighbors >= 4 || totalNeighbors < 2)) {
                    this.boxes[r][c] = false;
                } else if (!this.boxes[r][c] && totalNeighbors === 3) {
                    this.boxes[r][c] = true;
                } else {
                    this.boxes[r][c] = false;
                }
            }
        }
    }

    showPopulation() {

        stroke(0);
        fill(255);

        for (let r = 0; r <= this.boxes.length-1; r++) {

            for (let c = 0; c <= this.boxes[r].length-1; c++) {
                rect(c*this.boxSize, r*this.boxSize, this.boxSize-1, this.boxSize-1);
                if (this.boxes[r][c]) {
                    fill(0);
                } else {
                    fill(255);
                }
            }
        }
    }

    play() {

        clear();
        this.showPopulation();
        this.applyRules();
    }
}