
const {compute} = require('./src/simulator')

const graph = [
    [0,1,1,0],
    [1,0,0,1],
    [0,0,0,0],
    [0,0,0,0]
]

const nodes = [
    ['NOR'],
    ['NOR'],
    ['PIN'],
    ['PIN']
]

let state = Array.from({length:nodes.length}).fill(0)

for(var i = 0; i < 8; i++){
    state = compute(graph,nodes,state)
    console.log(state)
    if(i == 5) state[2] = 1
}