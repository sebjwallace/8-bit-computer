
const {compute} = require('./src/simulator')
const {SRLatch} = require('./src/factories')

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

for(var i = 0; i < 8; i++){
    state = compute(graph,nodes,state)
    console.log(state)
    if(i == 2) state[0] = 1
    if(i == 5) state[0] = 0
    if(i == 5) state[1] = 1
}