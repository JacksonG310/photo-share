export default {
    categoryData: (state) => state.category.categories,
    themeType: (state) => state.theme.themeType,
    currentCategory: (state) => state.app.currentCategory,
    currentCategoryIndex: (state, getters) => {
        return getters.categoryData.findIndex((item) => item.id === getters.currentCategory.id);
    },
    history: (state) => state.search.history,
    searchText: (state) => state.app.searchText
}