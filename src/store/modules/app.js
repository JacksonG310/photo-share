import { ALL_CATEGORY_ITEM } from "@/constants"
export default {
    namespaced: true,
    state: () => ({
        currentCategory: ALL_CATEGORY_ITEM,
        // 搜素关键词
        searchText: ''
    }),
    mutations: {
        setCurrentCategory(state, payload) {
            state.currentCategory = payload;
        },
        setSearchText(state, payload) {
            state.searchText = payload
        }
    },
    actions: {
        useCurrentCategory(context, payload) {
            context.commit('setCurrentCategory', payload);
        },
        useSearchText(context, payload) {
            context.commit('setSearchText', payload);
        }
    }
}