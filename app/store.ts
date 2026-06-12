import favoriteReducer from '../features/favorites/favoriteSlice';
import recipeReducer from '../features/recipes/recipesSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    favorite: favoriteReducer,
    recipe: recipeReducer
});

const persisted = persistReducer(
    { key: 'root', storage: AsyncStorage, whitelist: ['favorite'] },
    rootReducer,
);

export const store = configureStore({
    reducer: persisted,
    middleware: (getDefault) =>
        getDefault({ serializableCheck: false }),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;