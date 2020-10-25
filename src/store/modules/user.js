import { login , logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

import { asyncRoutes, constantRoutes } from '@/router'
import { hasPermission } from '@/store/modules/permission'

const user = {
  state: {
    token: getToken(),
    name: '',
    menu: {},
    avatar: '',
    realName:'',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_REALNAME: (state, realName) =>{
      state.realName = realName
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_MENU: (state, menu) => {
      state.menu = menu
    },
    SET_BUTTON_MAP: (state, buttonMap) => {
      state.buttonMap = buttonMap
    },


  },
  actions: {

    // 登录
    Login({ commit }, userInfo) {

      const username = userInfo.username.trim()
      const password = userInfo.password.trim()
      return new Promise((resolve, reject) => {

        var params = new URLSearchParams()
        params.append('username', username)
        params.append('password', password)
        login(params).then(response => {

          const data = response.data
          setToken(data.token)
          commit('SET_TOKEN', data.token)

          if (response.code == 'error') {

            commit('SET_TOKEN', '')
            removeToken()
          }

          resolve(response)
        }).catch(error => {

          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          if (data.roles && data.roles.length > 0) {
          //if (response.code == 'success') {

            // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('登录已过期，请重新登录!')
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_REALNAME', data.realName)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_NAME', '')
          commit('SET_ROLES', [])
          commit('SET_REALNAME', '')
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_NAME', '')
        commit('SET_ROLES', [])
        commit('SET_REALNAME', '')
        removeToken()
        resolve()
      })
    }

  }
}




export default user

