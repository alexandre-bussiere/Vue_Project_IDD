import { createStore } from 'vuex';

const store = createStore({
    state: {
        user: null,
        connection: null,
        accessToken: null,
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
            console.log('User set:', user);
        },
        setConversationTextId(state, id) {
            state.conversationTextId = id;
        },
        setConnection(state, connection) {
            state.connection = connection;
            console.log('Connection set:', connection);
        },
        setAccessToken(state, accessToken) {
            state.accessToken = accessToken;
        }
    },
    actions: {
        updateUser({ commit }, user) {
            commit('setUser', user);
        },
        updateAccessToken({ commit }, accessToken) {
            commit('setAccessToken', accessToken);
        },
    },
    getters: {
        isAuthenticated: (state) => !!state.user,
        getUser: (state) => state.user,
        getConnection: (state) => state.connection,
        getAccessToken: (state) => state.accessToken,
    },
});

export default store;
