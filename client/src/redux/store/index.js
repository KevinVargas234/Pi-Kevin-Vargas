import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import root_reducer from '../reducer';
const store = createStore(root_reducer, applyMiddleware(thunk))
export default  store