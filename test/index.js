
const {assert,expect,should} = require('chai')
const {compute} = require('../src/simulator')
const {OR,AND,NOR,NAND,XOR} = require('../src/components')
const {SRLatch,DLatch} = require('../src/factories')

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
        // [PIN,PIN,NOR,NOR]
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

describe('DLatch',() => {

    const graph = [
        [1,0,0,0],
        [0,1,0,0]
    ]
    
    const nodes = [
        ['PIN'],
        ['PIN']
    ]
    
    DLatch(graph,nodes,[0,1])
    
    let state = Array.from({length:nodes.length}).fill(0)

    it('Is 0 by default',() => {
        state = compute(graph,nodes,state)
        expect(state).to.eql([
            0, // first pin off
            0, // second pin (enable) off
            1, // inverter on
            0, // first AND off
            0, // second AND off
            1, // first XOR on by default
            0, // second AND off by default
        ])
    })

    it('Continues to hold a stable state',() => {
        state = compute(graph,nodes,state)
        expect(state).to.eql([0,0,1,0,0,1,0])
    })

    it('Does not set new state when enable is off',() => {
        state[0] = 1 // d
        state[1] = 0 // en
        state = compute(graph,nodes,state)
        expect(state).to.eql([
            1, // d is on
            0, // enable is off
            0, // inverter is off (inverts d)
            0, // first AND is off
            0, // second AND is off
            1, // first NOR on by default
            0 // second NOR off by default
        ])
    })

    it('Does set new state when enable is on',() => {
        state[0] = 1 // d
        state[1] = 1 // en
        state = compute(graph,nodes,state)
        expect(state).to.eql([
            1, // d is on
            1, // enable is on
            0, // inverter is off (inverts d)
            0, // first AND is off
            1, // second AND is on as d and enable are on
            0, // first NOR off
            1 // second NOR on
        ])
    })

    it('Does not set new state when enable is off and DLatch remains stable',() => {
        state[0] = 0 // d
        state[1] = 0 // en
        state = compute(graph,nodes,state)
        expect(state).to.eql([0,0,1,0,0,0,1])
    })

    it('Does set new state when enable is on',() => {
        state[0] = 0 // d
        state[1] = 1 // en
        state = compute(graph,nodes,state)
        // Skip a step to allow for SRLatch to stabilize from transition
        state = compute(graph,nodes,state)
        expect(state).to.eql([
            0, // d is off
            1, // enable is on
            1, // inverter is on (inverts d)
            1, // first AND is on as inverter and enable are on
            0, // second AND is off
            1, // first NOR on
            0 // second NOR off
        ])
    })

})