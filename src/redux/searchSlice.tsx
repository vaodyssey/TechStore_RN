// store/searchSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchParams } from '../entities/SearchParams';


const initialState: SearchParams = {
    keyword: ''
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setKeyword(state, action: PayloadAction<string>) {
            state.keyword = action.payload;
        },
        resetSearch(state) {
            state.keyword = initialState.keyword;
        }
    },
});

export const { setKeyword, resetSearch } = searchSlice.actions;
export default searchSlice.reducer;
