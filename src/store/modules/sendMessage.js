const state = {
  ADD_IDS: []
}

const mutations = {
  UPDATE_WRITE_ADD_IDS(state, data) {
    state.ADD_IDS = [...new Set([...state.ADD_IDS, ...data])]
  },
  DELETE_WRITE_ADD_IDS(state, data) {
    // 数组删除多余
    let arr1 = state.ADD_IDS
    let arr2 = data
    for (let i = 0; i < arr2.length; i++) {
        for (let j = 0; j < arr1.length; j++) {
            if (arr2[i] == arr1[j]) {
                arr1.splice(j, 1);
            }
        }
    }
    state.ADD_IDS = arr1
  },
  FORMATE_WRITE_ADD_IDS(state){
    state.ADD_IDS = []
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}