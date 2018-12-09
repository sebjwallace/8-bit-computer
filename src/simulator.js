
const components = require('./components')

module.exports = {

    compute: (graph,nodes,state) => {
        // For this to be a pure function then state needs to be immutable
        state = state.concat([])
        // Iterate over each node in the graph
        graph.forEach((node,i) => {
            // Define the input array
            const inputs = []
            node.forEach((edge,j) => {
                // For every edge/wire that is connected add the
                // output of the source to the inputs array.
                if(edge) inputs.push(state[j] || 0)
            })
            // Pass the inputs into the component and assign to the output.
            const output = components[nodes[i]].apply(this,inputs)
            // Update the state for the following target nodes.
            state[i] = output || 0
        })
        return state
    }

}