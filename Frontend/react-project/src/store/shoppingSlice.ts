import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ShoppingState {
    checkedIds: number[];
}

const savedCheckedIds = localStorage.getItem('checked_ingredients');
const initialState: ShoppingState = {
    checkedIds: savedCheckedIds ? JSON.parse(savedCheckedIds) : [],
};

const shoppingSlice = createSlice({
    name: 'shopping',
    initialState,
    reducers: {
        toggleIngredient: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            if (state.checkedIds.includes(id)) {
                state.checkedIds = state.checkedIds.filter(item => item !== id);
            } else {
                state.checkedIds.push(id);
            }
            localStorage.setItem('checked_ingredients', JSON.stringify(state.checkedIds));
        },
        clearChecked: (state) => {
            state.checkedIds = [];
            localStorage.removeItem('checked_ingredients');
        }
    },
});

export const { toggleIngredient, clearChecked } = shoppingSlice.actions;
export default shoppingSlice.reducer;