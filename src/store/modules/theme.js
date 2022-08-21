import { THEME_LIGHT, THEME_DARK, THEME_SYSTEM } from '@/constants'
export default {
    namespaced: true,
    state: () => ({
        themeType: THEME_LIGHT
    }),
    mutations: {
        changeThemeType(state, paload) {
            state.themeType = paload;
        }
    },
    actions: {
        useThemeType(context, paload) {
            context.commit('changeThemeType', paload);
        }
    }
}