import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import md5 from 'js-md5'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, captcha } = userInfo;

    const data = {
      "userName": username.trim(),
      "password": password
    }
    // const f = new FormData()
    // f.append('username', username.trim())
    // f.append('password', password)

    // { username: username.trim(), password: password, captcha: captcha }
    return new Promise((resolve, reject) => {
      //   commit('SET_TOKEN', '333cbae2eaa60a5ab19929f9fa3f3aea')
      // setToken('333cbae2eaa60a5ab19929f9fa3f3aea')
      // resolve();
      login(data).then(response => {

        // if (response.entity) {
        //   const t = md5(response.entity.token + '_star')
        //   commit('SET_TOKEN', t)
          setToken('12333')
        //   sessionStorage.setItem('curUserInfo', JSON.stringify(response.entity.user))
        // }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // getInfo(state.token).then(response => {
      //   const { data } = response

      //   if (!data) {
      //     reject('Verification failed, please Login again.')
      //   }

      //   const { name, avatar } = data

      commit('SET_NAME', 'admin')
      commit('SET_AVATAR', '')
      resolve()
    }).catch(error => {
      reject(error)
    })
    // })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

