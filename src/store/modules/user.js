import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  SET_NAME({ commit }, name) {
    console.log(name)
    commit('SET_NAME', name)
  },
  SET_ROLES({ commit }, name) {
    commit('SET_ROLES', name)
  },
  SET_INTRODUCTION({ commit }, name) {
    console.log(name)
    commit('SET_INTRODUCTION', name)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
