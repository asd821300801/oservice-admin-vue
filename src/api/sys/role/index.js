import axios from '@/utils/httpRequest'

export default {

  /**
   * 获取角色列表
   * @param params
   * @returns {Promise.<data>|*}
   */
  getRoleList: (params) => {
    return axios({
      url: axios.adornUrl('/sys/role/list'),
      method: 'get',
      params: axios.adornParams(params)
    }).then(res => res.data);
  },

  /**
   * 查询角色
   * @returns {Promise.<data>|*}
   */
  selectRole:()=>{
    return axios({
      url: axios.adornUrl('/sys/role/select'),
      method: 'get',
      params: axios.adornParams()
    }).then(res => res.data);
  },


  /**
   * 获取单条角色信息
   * @param id
   * @returns {*|Promise.<data>}
   */
  getRoleInfo: (id) => {
    return axios({
      url: axios.adornUrl(`/sys/role/info/${id}`),
      method: 'get',
      params: axios.adornParams()
    }).then(res => res.data);
  },

  /**
   * 删除多个角色
   * @returns {*|Promise.<data>}
   * @param ids
   */
  deleteRoleByIds: (ids) => {
    return axios({
      url: axios.adornUrl("/sys/role/delete"),
      method: 'post',
      data: axios.adornData(ids, false)
    }).then(res => res.data);
  },

  /**
   * 保存或更新角色
   * @param id
   * @param params
   * @returns {*|Promise.<data>}
   */
  saveOrUpdateRole: (id, params) => {
    return axios({
      url: axios.adornUrl(`/sys/role/${!id ? 'save' : 'update'}`),
      method: 'post',
      data: axios.adornData(params)
    }).then(res => res.data);
  }

}

