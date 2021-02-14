import React, {useState, useEffect, Fragment, useCallback } from 'react';
import initialElements from './initial-elements';
import ReactFlow, {removeElements,addEdge, Background, Controls, MiniMap} from 'react-flow-renderer';
import Per_action from './Per_action';

// For click event on Elements    
const onElementClick = (event, element) => {
  // if (event.id === "2") {
  //   alert ("I was the test")
  // }
}

const nodeTypes = {
    customNode: Per_action,
  };
const BioMed = () => {

    const [reactflowInstance, setReactflowInstance] = useState(null);
    //Getting all the node elements
    const [elements, setElements] = useState([]);
    // New node
    const [name, setName] = useState("")

    
    //Adding new node to the graph
    const addNode = () => {
        setElements(e => e.concat({
            id: (e.length+1).toString(),
            data: {label: `${name}` },
            position: {x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight}
        }));
    };
    // To remove a particular element
    const onElementsRemove = useCallback(
        (elementsToRemove) =>
          setElements((els) => removeElements(elementsToRemove, els)),
        []
      );
   
    //To bring the operation in effect
     useEffect(() => {
        if (reactflowInstance && elements.length > 0) {
        reactflowInstance.fitView();
        }
    }, [reactflowInstance, elements.length]);
     
    const onConnect = (params) => setElements(e => addEdge(params,e));

    // const onLoad = (reactFlowInstance) =>  {
    //     reactFlowInstance.fitView();
    // }
    const onLoad = useCallback(
        (rfi) => {
          // initialElements.data.map((item) => (item.id === "1") ? item.data.onChange = handleEntryChange() : item.data.onChange = handleExitChange())
          setElements(initialElements)
          if (!reactflowInstance) {
            setReactflowInstance(rfi);
            console.log('flow loaded:', rfi);
          }
        },
        [reactflowInstance]
      );
    
    return(
        <Fragment>
            <ReactFlow
            elements={elements}
            onElementsRemove={onElementsRemove}
            onElementClick ={onElementClick}
            onLoad={onLoad}
            nodeTypes={nodeTypes}
            style={{width:'100%',height: '90vh'}}
            onConnect = {onConnect}
            connectionLineStyle={{stroke: "#ddd", strokeWidth: 2}}
            connectionLineType = "bezier"
            snapToGrid = {true}
            snapGrid={[16,16]}
            defaultZoom={1.5}
            >
                <Background
                color="#888"
                gap={16}
                />
                <MiniMap />
                <Controls />
                </ReactFlow>

            <div>
                <input type="text"
                onChange={e => setName(e.target.value)}
                name="title"/>
                <button 
                type="button"
                onClick={addNode}
                >Add Node</button>
            </div>
        </Fragment>
    )
}

export default BioMed;