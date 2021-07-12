export const initialState = {
    user: null,
    currentActiveCount: 0,
    previousActiveCount: 0,
    estimateCount: 0,
    graphData: {
        Hospitalized: 0,
        Recovered: 0,
        Deceased: 0
    }

}

function reducer(state, action){
    switch(action.type){
        case "SET_AUTH_USER":
        return {
            ...state, user:action.user
        }
        break;

        case "LOGIN_SUCCESS":
        return {
            ...state, user:{name:action.user.name, userId: action.user.userId}
        }
        break;

        case "LOGIN_FAIL":
        return {
            ...state, user:{}
        }
        break;

        case "LOGOUT":
        return {
            ...state, user:{}, token: null
        }
        break;

        case "GET_CURRENT_CASES_SUCCESS":
        return {
            ...state, currentActiveCount: action.currentActiveCount
        }
        break;

        case "GET_CURRENT_CASES_FAIL":
        return {
            ...state, currentActiveCount: 0
        }
        break;

        case "GET_PREVIOUS_CASES_SUCCESS":
        return {
            ...state, previousActiveCount: action.previousActiveCount
        }
        break;

        case "GET_PREVIOUS_CASES_FAIL":
        return {
            ...state, previousActiveCount: 0
        }
        break;

        case "GET_ESTIMATE_CASES_SUCCESS":
        return {
            ...state, estimateCount: action.estimateCount
        }
        break;

        case "GET_ESTIMATE_CASES_FAIL":
        return {
            ...state, estimateCount: 0
        }
        break;
        case "GET_GRAPH_SUCCESS":
        return {
            ...state, graphData: action.graphData
        }
        break;
        case "GET_GRAPH_FAIL":
            return {
                ...state, graphData: initialState.graphData
            }
            break;
        default: return state;
    }

}

export default reducer;
