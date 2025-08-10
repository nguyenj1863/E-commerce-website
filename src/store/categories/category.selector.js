import { createSelector } from "reselect";

const selectCartegoryReducer = (state) => {console.log(state.categories); return state.categories};

export const selectCategories = createSelector(
    [selectCartegoryReducer],
    (categoriesSlice) => categoriesSlice.categories ?? []
);

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => 
        categories.reduce((acc, category) => {
            const { title, items } = category;
            acc[title.toLowerCase()] = items;
            return acc;
    }, {})
);

export const selectCategoriesIsLoading = createSelector(
    [selectCartegoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
)