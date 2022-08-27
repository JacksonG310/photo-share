export default {
    namespaced: true,
    state: () => ({
        history: [],
    }),
    mutations: {
        addHistory(state, payload) {
            const index = state.history.findIndex(item => item === payload);
            if (index != -1) {
                state.history.splice(index, 1);
            }
            state.history.unshift(payload);
        },
        deleteHistory(state, payload) {
            state.history.splice(payload, 1);
        },
        deleteAllHistory(state, payload) {
            state.history = [];
        }
    },
    actions: {
        //  新增
        useAddHistory(context, payload) {
            context.commit('addHistory', payload);
        },
        // 删除
        useDeleteHistory(context, payload) {
            context.commit('deleteHistory', payload);
        },
        // 全部删除
        useDeleteAllHistory(context, payload) {
            context.commit('deleteAllHistory', payload);
        }

    }
}