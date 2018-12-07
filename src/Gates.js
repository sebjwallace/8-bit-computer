
module.exports = {

    OR(i1,i2){
        return i1 == true || i2 == true
    },

    AND(i1,i2){
        return i1 == true && i2 == true
    },

    NOR(i1,i2){
        return i1 == false && i2 == false
    },

    NAND(i1,i2){
        return !(i1 == true && i2 == true)
    },

    XOR(i1,i2){
        return i1 != i2
    }

}