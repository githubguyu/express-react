import { createStore, applyMiddleware } from 'redux'
import getUserRegister from './../reducer'
import thunk from 'redux-thunk'
// const configureStore = () => createStore( reducer);
// export default configureStore
const store = createStore(
    getUserRegister,
    applyMiddleware(thunk)
    )
export default store
//applyMiddleware