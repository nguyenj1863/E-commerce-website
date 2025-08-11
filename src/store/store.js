// import { compose, createStore, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

// const persistConfig = {
//     key: 'root',
//     storage,
//     whitelist: ['cart'],
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const middleWares = [
//     process.env.NODE_ENV !== 'production' && logger,
// ].filter(Boolean);

// const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = configureStore({
    reducer: rootReducer,
    // middleware: middleWares,
});


// export const persistor = persistStore(store);