
const expandGraph = graph => {
    graph.forEach(node => node.push(0))
    graph.push(Array.from({length:graph.length}).fill(0))
}

const addNode = (graph,nodes,type,inputs) => {
    expandGraph(graph)
    const node = graph[graph.length-1]
    inputs.forEach(input => node[input] = 1)
    nodes.push(type)
    return nodes.length-1
}

const factories = {

    SRLatch(graph,nodes,inputs){
        // Inputs for the first NOR is the second input along with the
        // output of the second NOR
        const i1 = [inputs[1],graph.length+1]
        // Inputs for the second NOR is the first input along with the
        // output of the first NOR
        const i2 = [inputs[0],graph.length]
        return [
            addNode(graph,nodes,'NOR',i1),
            addNode(graph,nodes,'NOR',i2)
        ]
    },

    DLatch(graph,nodes,inputs){
        const d = inputs[0]
        const en = inputs[1]
        const inv = addNode(graph,nodes,'INVERTER',[d])
        const and1 = addNode(graph,nodes,'AND',[inv,en])
        const and2 = addNode(graph,nodes,'AND',[d,en])
        const srlatch = factories.SRLatch(graph,nodes,[and1,and2])
        return srlatch[1]
    }

}

module.exports = factories