import { combineReducers, createStore } from 'redux';
import { playerReducer } from './reducers/playerReducer';

const rootReducer = combineReducers({
  player: playerReducer,
});

const store = createStore(rootReducer);

export default store;
