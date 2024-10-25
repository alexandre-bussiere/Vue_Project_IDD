import { createStore } from 'vuex';

const store = createStore({
    state: {
        user: null,
        conversationTextId: null
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
            console.log('User set:', user);
        },
        setConversationTextId(state, id) {
            state.conversationTextId = id;
        }

    },
    getters: {
        isAuthenticated: (state) => !!state.user,
        getUser: (state) => state.user,
        getConversationTextId: (state) => state.conversationTextId
    },
});

export default store;
