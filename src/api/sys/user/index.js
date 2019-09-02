import axios from '@/utils/httpRequest'

export default {

  /**
   * 获取用户列表
   * @param params
   * @returns {Promise.<data>|*}
   */
  getUserList: (params) => {
    return axios({
      url: axios.adornUrl('/sys/user/list'),
      method: 'get',
      params: axios.adornParams(params)
    }).then(res => res.data);
  },

  /**
   * 获取单条角色信息
   * @param id
   * @returns {*|Promise.<data>}
   */
  getUserInfo: (id) => {
    return axios({
      url: axios.adornUrl(`/sys/user/info/${id}`),
      method: 'get',
      params: axios.adornParams()
    }).then(res => res.data);
  },

  /**
   * 获取当前登陆用户的信息
   * @returns {*|Promise.<data>}
   */
  getLoginUserInfo: () => {
    return axios({
      url: axios.adornUrl('/sys/user/info'),
      method: 'get',
      params: axios.adornParams()
    }).then(res => res.data);
  },


  /**
   * 删除多个用户
   * @returns {*|Promise.<data>}
   * @param ids
   */
  deleteUserByIds: (ids) => {
    return axios({
      url: axios.adornUrl("/sys/user/delete"),
      method: 'post',
      data: axios.adornData(ids, false)
    }).then(res => res.data);
  },

  /**
   * 保存或更新用户
   * @param id
   * @param params
   * @returns {*|Promise.<data>}
   */
  saveOrUpdateUser: (id, params) => {
    return axios({
      url: axios.adornUrl(`/sys/user/${!id ? 'save' : 'update'}`),
      method: 'post',
      data: axios.adornData(params)
    }).then(res => res.data);
  },

  /**
   * 修改用户密码
   * @param id
   * @param params
   * @returns {Promise.<data>|*}
   */
  resetUserPassword: (params) => {
    return axios({
      url: axios.adornUrl('/sys/user/password'),
      method: 'post',
      data: axios.adornData(params)
    }).then(res => res.data);
  }

}

