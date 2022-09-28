import { codeAPI } from '@/api/code'

import { loginAPI } from '@/api/login'
export default {
  namespaced: true,
  state: {
    code: '',
    token: '',
    message: ''
  },
  mutations: {
    SET_CODE(state, code) {
      state.code = code
    },
    SET_LOGIN(state, token) {
      state.token = token
    },
    SET_MESSAGE(state, message) {
      state.message = message
    },
    REMOVE_TOKEN(state) {
      state.token = null
    }
  },
  actions: {
    /* 验证码 */
    async setCode({ commit }, Num) {
      const code = await codeAPI(Num)
      // console.log(code.data)
      commit('SET_CODE', code)
    },
    async setlogin(context, loginFrom) {
      const data = await loginAPI(loginFrom)
      console.log(data)
      context.commit('SET_LOGIN', data.token)
      context.commit('SET_MESSAGE', data)
    },
    logout({ commit }) {
      commit('REMOVE_TOKEN')
    }

  }
}

