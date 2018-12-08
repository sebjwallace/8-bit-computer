
const {assert,expect,should} = require('chai')
const {OR,AND,NOR,NAND,XOR} = require('../src/Gates')
const SRLatch = require('../src/memory/SRLatch')

describe('OR',() => {

    it('0 OR 0 = 0', () => {
        expect(OR(0,0)).to.eq(0)
    })

    it('1 OR 0 = 1', () => {
        expect(OR(1,0)).to.eq(1)
    })

    it('0 OR 1 = 1', () => {
        expect(OR(0,1)).to.eq(1)
    })

    it('1 OR 1 = 1', () => {
        expect(OR(1,1)).to.eq(1)
    })

})

describe('AND',() => {

    it('0 AND 0 = 0', () => {
        expect(AND(0,0)).to.eq(0)
    })

    it('1 AND 0 = 0', () => {
        expect(AND(1,0)).to.eq(0)
    })

    it('0 AND 1 = 0', () => {
        expect(AND(0,1)).to.eq(0)
    })

    it('1 AND 1 = 1', () => {
        expect(AND(1,1)).to.eq(1)
    })

})

describe('NOR',() => {

    it('0 NOR 0 = 1', () => {
        expect(NOR(0,0)).to.eq(1)
    })

    it('1 NOR 0 = 0', () => {
        expect(NOR(1,0)).to.eq(0)
    })

    it('0 NOR 1 = 0', () => {
        expect(NOR(0,1)).to.eq(0)
    })

    it('1 NOR 1 = 0', () => {
        expect(NOR(1,1)).to.eq(0)
    })

})

describe('NAND',() => {

    it('0 NAND 0 = 1', () => {
        expect(NAND(0,0)).to.eq(1)
    })

    it('1 NAND 0 = 1', () => {
        expect(NAND(1,0)).to.eq(1)
    })

    it('0 NAND 1 = 1', () => {
        expect(NAND(0,1)).to.eq(1)
    })

    it('1 NAND 1 = 0', () => {
        expect(NAND(1,1)).to.eq(0)
    })

})

describe('XOR',() => {

    it('0 XOR 0 = 0', () => {
        expect(XOR(0,0)).to.eq(0)
    })

    it('1 XOR 0 = 1', () => {
        expect(XOR(1,0)).to.eq(1)
    })

    it('0 XOR 1 = 1', () => {
        expect(XOR(0,1)).to.eq(1)
    })

    it('1 XOR 1 = 0', () => {
        expect(XOR(1,1)).to.eq(0)
    })

})

describe('SRLatch',() => {

    it('will output [0,0] after reset', () => {
        const srl = new SRLatch()
        expect(srl.compute(1,1)).to.eql([0,0])
    })
    
    it('will maintain state after reset', () => {
        const srl = new SRLatch()
        expect(srl.compute(1,1)).to.eql([0,0])
        expect(srl.compute(0,0)).to.eql([0,0])
    })

})