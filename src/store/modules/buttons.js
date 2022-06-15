const state = {
  buttons: [],
}

const mutations = {
  SET_BUTTONS (state, buttons) {
    state.buttons = buttons
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
