import * as actionTypes from './action';
const initialState={
    loggedIn:false
}

const reducer = (state=initialState,action)=>{
    switch(action.type){
        case actionTypes.ADD_CURRENT_USER:
        return{
            loggedIn:true
        };
        case actionTypes.REMOVE_CURRENT_USER:
        return{
            loggedIn:false
        }
        default:
        return{
            ...state
        }
    }
}
export default reducer;