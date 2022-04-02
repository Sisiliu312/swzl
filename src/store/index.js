import Vue from 'vue'
import Vuex from 'vuex'
import {login} from '@/api/login'
import {getUserInfo} from '@/api/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    date: '',
    campus: '',
    categoryId: '',
    token: localStorage.token,
    userInfo: JSON.parse(sessionStorage.getItem("userInfo"))
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      localStorage.setItem("token", token)
    },
    SET_CAMPUS: (state, campus) => {
      state.categoryId = ''
      state.date = ''
      state.campus = campus;
    },
    SET_DATE: (state, date) => {
      state.campus = ''
      state.categoryId = ''
      state.date = date;
    },
    SET_CATEGORYID: (state, categoryId) => {
      state.campus = ''
      state.date = ''
      state.categoryId = categoryId;
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
      sessionStorage.setItem("userInfo", JSON.stringify(userInfo))
    }
  },

  actions: {
    login({commit}, user) {
      return new Promise((resolve, reject) => {
        login(user).then(res => {
          if(res.data.state==200){
            commit('SET_TOKEN', res.data.data.token)
            commit("SET_USERINFO", res.data.data)
            resolve()
          }else{
            reject(res.data.msg)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    getUserInfo({commit},jwt) {
      return new Promise((resolve, reject) => {
        getUserInfo(jwt).then((res) => {
          if(res.data.state==200){
            
            commit('SET_USERINFO', res.data.data);
            resolve(res.data)
          }else{
            
        localStorage.removeItem("token");
            reject(res.data.msg)
          }
        }).catch((error) => {
          commit('SET_USERINFO', "");
        localStorage.removeItem("token");
          reject(error)
        })
      })
    },
    updateUserInfo({commit},user){
      console.log(user)
      let userInfo;
      userInfo.username=user.username
      userInfo.avatar=user.avatar
      userInfo.id=user.id
      console.log(userInfo)
      commit('SET_USERINFO',userInfo)
    }
  },
  getters: {
    // get
    getUser: state => {
      return state.userInfo
    }
  },
  modules: {
  }
})
