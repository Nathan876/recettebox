import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RecipeState {
    meals: any[];
}

const initialState: RecipeState = {
    meals: []
};

const recipeSlice = createSlice({
    name: 'recipe',
    initialState,
    reducers: {
        setMealsCache: (state, action: PayloadAction<any[]>) => {
            state.meals = action.payload;
        }
    },
});

export const { setMealsCache } = recipeSlice.actions;
export default recipeSlice.reducer;