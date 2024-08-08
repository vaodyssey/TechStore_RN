// store/searchSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchParams } from '../entities/SearchParams';


const initialState: SearchParams = {
    keyword: '',
    brandName:'',
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setKeyword(state, action: PayloadAction<string>) {
            state.keyword = action.payload;
        },
        setBrandName(state, action: PayloadAction<string>) {
            state.brandName = action.payload;
        },
        resetSearch(state) {
            state.keyword = initialState.keyword;
            state.brandName = initialState.brandName;
        }
    },
});

export const { setKeyword, setBrandName,resetSearch } = searchSlice.actions;
export default searchSlice.reducer;
