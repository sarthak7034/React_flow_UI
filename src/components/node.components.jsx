import React, {useState, useEffect, Fragment, useCallback } from 'react';
import initialElements from './initial-elements';
import ReactFlow, {removeElements,addEdge, Background, Controls, MiniMap} from 'react-flow-renderer';



const BioMed = () => {

    const [reactflowInstance, setReactflowInstance] = useState(null);
    //Getting all the node elements
    const [elements, setElements] = useState(initialElements);
    // New node
    const [name, setName] = useState("")
    //for performing action
    const [sum,newsum] = useState(null)
    
    //Adding new node to the graph
    const addNode = () => {
        setElements(e => e.concat({
            id: (e.length+1).toString(),
            data: {label: `${name}`},
            position: {x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight}
        }));
    };
    // To remove a particular element
    const onElementsRemove = useCallback(
        (elementsToRemove) =>
          setElements((els) => removeElements(elementsToRemove, els)),
        []
      );

    // For click event on Elements    
    const onElementClick = (event, element) => console.log('click', element) 
     
    //To bring the add operation in effect
     useEffect (()=>{
         const onChange = (event) =>{
             setElements((els)=>els.map((e)=>{
             if(e.id === '1'){
                 console.log("Working !!!")
                 return e
             }
             const perform = event.target.values
             newsum(perform)
             console.log('Prb 1')
             newsum(console.log('GGGGGGGG'))

             return {
                ...e,
                data: {
                  ...e.data,
                  perform,
                },
            }
            }))
         }
     })

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
                <MiniMap
                nodeColor={n=>{
                    if(n.type === 'input') return 'blue';
                    
                    return '#FFCC00'
                }} />
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