import { ALL_CATEGORY_ITEM, CATRGORY_NOMAL_DATA } from '@/constants';
import { getCategory } from '@/api/category';

export default {
    namespaced: true,
    state: () => ({
        categories: CATRGORY_NOMAL_DATA
    }),
    mutations: {
        setCategories(state, paload) {
            state.categories = [ALL_CATEGORY_ITEM, ...paload];
        }
    },
    actions: {
        async useCategoryData(context) {
            const { categories } = await getCategory();
            context.commit('setCategories', categories);
        }
    }
}