// store/searchSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchParams } from '../entities/SearchParams';


const initialState: SearchParams = {
    searchTerm: '',
    label: '',
    sortBy: '',
    sortOrder: '',
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setKeyword(state, action: PayloadAction<string>) {
            state.searchTerm = action.payload;
        },
        setBrandName(state, action: PayloadAction<string>) {
            state.label = action.payload;
        },
        setSortBy(state, action: PayloadAction<string>) {
            state.sortBy = action.payload;
        },
        setSortOrder(state, action: PayloadAction<string>) {
            state.sortOrder = action.payload;
        },
        resetSearch(state) {
            state.searchTerm = initialState.searchTerm;
            state.label = initialState.label;
            state.sortBy = initialState.sortBy;
            state.sortOrder = initialState.sortOrder;
        }
    },
});

export const { setKeyword, setBrandName, setSortBy, setSortOrder, resetSearch } = searchSlice.actions;
export default searchSlice.reducer;
