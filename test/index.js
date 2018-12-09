
const {assert,expect,should} = require('chai')
const {compute} = require('../src/simulator')
const {OR,AND,NOR,NAND,XOR} = require('../src/components')
const {SRLatch} = require('../src/factories')

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

    const graph = [
        [1,0,0,0],
        [0,1,0,0]
    ]
    
    const nodes = [
        ['PIN'],
        ['PIN']
    ]
    
    SRLatch(graph,nodes,[0,1])
    
    let state = Array.from({length:nodes.length}).fill(0)
    
    it('The first NOR is on by default',() => {
        state = compute(graph,nodes,state)
        expect(state).to.eql([0,0,1,0])
    })

    it('The state remains unchanged',() => {
        state = compute(graph,nodes,state)
        expect(state).to.eql([0,0,1,0])
    })

    it('The second NOR is switched on and first NOR is off',() => {
        // Turn pin 1 on
        state[1] = 1
        state = compute(graph,nodes,state)
        expect(state).to.eql([0,1,0,1])
    })
    
    it('The SRLatch state remains stable',() => {
        // Turn pin 1 off
        state[1] = 0
        state = compute(graph,nodes,state)
        expect(state).to.eql([0,0,0,1])
    })

    it('The SRLatch goes into an unstable state',() => {
        // Turn pin 0 back on
        state[0] = 1
        state = compute(graph,nodes,state)
        expect(state).to.eql([1,0,0,0])
    })

    it('The SRLatch returns to a stable state',() => {
        state = compute(graph,nodes,state)
        expect(state).to.eql([1,0,1,0])
    })

    it('The SRLatch remains in a stable state',() => {
        state[0] = 0
        state = compute(graph,nodes,state)
        expect(state).to.eql([0,0,1,0])
    })

})