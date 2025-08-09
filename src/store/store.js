import { compose, createStore, applyMiddleware } from 'redux';
import { rootReducer } from './root-reducer';

const loggerMiddleware = (store) => (next) => (action) => {
    if(!action.type) {
        return;
    }

    console.log('type: ', action.type);
    console.log('payload: ', action.payload);
    console.log('current state: ', store.getState());

    next(action);

    console.log('new state: ', store.getState());
}

const middleWares = [loggerMiddleware];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);