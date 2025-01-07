import { combineReducers } from 'redux';
// reducer import
import customizationReducer from './customizationReducer';
import homeReducer from './homeReducer';
import authReducer from './authReducer';
// ==============================|| COMBINE REDUCER ||============================== //
const reducer = combineReducers({
    customization: customizationReducer,
    homeReducer: homeReducer,
    authReducer: authReducer,
});
export default reducer;
