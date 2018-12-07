
const {NAND} = require('../Gates')

module.exports = class SRLatch {

    constructor(){
        this.o = [0,0]
    }

    compute(s,r){
        return this.o = [
            NAND(r,this.o[1]),
            NAND(s,this.o[0])
        ]
    }

}