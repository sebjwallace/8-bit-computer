
module.exports = {

    OR(i1,i2){
        return i1 == 1 || i2 == 1 ? 1 : 0
    },

    AND(i1,i2){
        return i1 == 1 && i2 == 1 ? 1 : 0
    },

    NOR(i1,i2){
        return i1 == 1 || i2 == 1 ? 0 : 1
    },

    NAND(i1,i2){
        return i1 == 1 && i2 == 1 ? 0 : 1
    },

    XOR(i1,i2){
        return i1 != i2 ? 1 : 0
    }

}