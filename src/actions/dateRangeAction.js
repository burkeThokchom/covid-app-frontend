const getCasesForGraph = async (dispatch, toDate)=>{
    console.log('data: ', toDate)
    const fromDate = new Date(toDate.getFullYear(), toDate.getMonth(), 1);
    const getCaseCount = ()=>{
        let requestBody = {
            query: `
                query{
                    getCasesForGraph(fromDate: "${fromDate}", toDate: "${toDate}")
                }
            `
        };
    
        fetch('http://localhost:3003/graphql',{
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res=>{
            if(res.status!==200 && res.status !==201){
                console.log("Bad request ",res);
                throw new Error('Failed Here');
            }
            return res.json();
        })
        .then(respData=>{
            console.log('Response data current', respData)
            if(!respData.errors){
                dispatch({
                    type: "GET_GRAPH_SUCCESS",  //type
                    graphData: {
                        Hospitalized: respData.data.getCasesForGraph[0],
                        Recovered: respData.data.getCasesForGraph[1],
                        Deceased: respData.data.getCasesForGraph[2],
                    }
                })
            }
            else{
                dispatch({
                    type: "GET_GRAPH_FAIL",
                    graphData: {
                        Hospitalized: 0,
                        Recovered: 0,
                        Deceased: 0
                    }
                })
            }
            
        })
        .catch(err=>{
            dispatch({
                type: "GET_GRAPH_FAIL",
                graphData: {
                    Hospitalized: 0,
                    Recovered: 0,
                    Deceased: 0
                }
            })
        })
    }
    getCaseCount();
} 
export { getCasesForGraph }