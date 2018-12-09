
const expandGraph = graph => {
    graph.forEach(node => node.push(0))
    graph.push(Array.from({length:graph.length}).fill(0))
}

const addNode = (graph,nodes,type,inputs) => {
    expandGraph(graph)
    const node = graph[graph.length-1]
    inputs.forEach(input => node[input] = 1)
    nodes.push(type)
}

module.exports = {

    SRLatch(graph,nodes,inputs){
        const i1 = [inputs[1],graph.length+1]
        const i2 = [inputs[0],graph.length]
        addNode(graph,nodes,'NOR',i1)
        addNode(graph,nodes,'NOR',i2)
    }

}