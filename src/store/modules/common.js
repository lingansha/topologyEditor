
const common = {

  state: {
    topology: {},
  },
  actions:{
    setTopology({commit}, data){
      commit('SET_TOPOLOGY', data);
    }
  },
  mutations: {
    SET_TOPOLOGY: (state, data) => {
      state.topology = data
    },
  }
}
export default common
