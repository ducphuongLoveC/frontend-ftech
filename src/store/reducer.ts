import { combineReducers } from 'redux';

// reducer import
import mainReducer from './mainReducer';
import authReducer from './authReducer';

// ==============================|| COMBINE REDUCER ||============================== //
const reducer = combineReducers({
  mainReducer: mainReducer,
  authReducer: authReducer,
});

export type RootState = ReturnType<typeof reducer>;
export default reducer;
