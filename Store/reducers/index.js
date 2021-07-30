import {combineReducers} from 'redux';
import slots from './slots';

const rootReducer = combineReducers({
  SLOTS: slots,
});

export default rootReducer;
