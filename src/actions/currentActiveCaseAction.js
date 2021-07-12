const fetchCurrentMothActiveCases = async (dispatch, currentStatus, toDate)=>{
    console.log('data: ', currentStatus, toDate)
    const fromDate = new Date(toDate.getFullYear(), toDate.getMonth(), 1);
    const getCaseCount = ()=>{
        let requestBody = {
            query: `
                query{
                    getCaseCount(fromDate: "${fromDate}", toDate: "${toDate}", status: "${currentStatus}")
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
                    type: "GET_CURRENT_CASES_SUCCESS",  //type
                    currentActiveCount: respData.data.getCaseCount
                })
            }
            else{
                dispatch({
                    type: "GET_CURRENT_CASES_FAIL",
                    currentActiveCount: 0
                })
            }
            
        })
        .catch(err=>{
            dispatch({
                type: "GET_CURRENT_CASES_FAIL",
                currentActiveCount: 0
            })
        })
    }
    getCaseCount();
} 

function getLastDay(year,month){
    return  new Date(year, month +1, 0).getDate();
}
    
const fetchPastMothActiveCases = async (dispatch, currentStatus, toDate)=>{
    
    const fromDate = new Date(toDate.getFullYear(), toDate.getMonth()-1, 1);
    const tillDate = new Date(toDate.getFullYear(), toDate.getMonth()-1, getLastDay(fromDate.getFullYear(), fromDate.getMonth()));
    const getCaseCount = ()=>{
        let requestBody = {
            query: `
                query{
                    getCaseCount(fromDate: "${fromDate}", toDate: "${tillDate}", status: "${currentStatus}")
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
            console.log('Response data previous', respData)
            if(!respData.errors){
                dispatch({
                    type: "GET_PREVIOUS_CASES_SUCCESS",  //type
                    previousActiveCount: respData.data.getCaseCount
                })
            }
            else{
                dispatch({
                    type: "GET_PREVIOUS_CASES_FAIL",
                    previousActiveCount: 0
                })
            }
            
        })
        .catch(err=>{
            dispatch({
                type: "GET_PREVIOUS_CASES_FAIL",
                previousActiveCount: 0
            })
        })
    }
    getCaseCount();
} 

const fetchEstimateMonthEndCases = async (dispatch, currentStatus, toDate)=>{

    const fromDate = new Date(toDate.getFullYear(), toDate.getMonth(), 1);
    const getCaseCount = ()=>{
        let requestBody = {
            query: `
                query{
                    getCaseCount(fromDate: "${fromDate}", toDate: "${toDate}", status: "${currentStatus}")
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
            console.log('Response data estimate', respData)
            if(!respData.errors){

                var currentDate = toDate.getDate();
                var extimatedCasesCount = Math.floor((respData.data.getCaseCount / currentDate) * 30);
                console.log('CALCULATED est: ', extimatedCasesCount)
                dispatch({
                    type: "GET_ESTIMATE_CASES_SUCCESS", 
                    estimateCount: extimatedCasesCount
                })
            }
            else{
                dispatch({
                    type: "GET_ESTIMATE_CASES_FAIL",
                    estimateCount: 0
                })
            }
            
        })
        .catch(err=>{
            dispatch({
                type: "GET_ESTIMATE_CASES_FAIL",
                estimateCount: 0
            })
        })
    }
    getCaseCount();
} 

export { fetchCurrentMothActiveCases, fetchPastMothActiveCases, fetchEstimateMonthEndCases };