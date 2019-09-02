import axios from '@/utils/httpRequest'

export default {

  /**
   * 获取所有菜单列表
   * @returns {*|Promise.<data>}
   */
  getMenuList: () => {
    return axios({
      url: axios.adornUrl('/sys/menu/list'),
      method: 'get',
      params: axios.adornParams()
    }).then(res => res.data);
  },

  /**
   * 查询菜单
   * @returns {Promise.<data>|*}
   */
  selectMenu:()=>{
    return axios({
      url: axios.adornUrl('/sys/menu/select'),
      method: 'get',
      params: axios.adornParams()
    }).then(res => res.data);
  },

  /**
   * 获取单条菜单信息
   * @param id
   * @returns {*|Promise.<data>}
   */
  getMenuInfo: (id) => {
    return axios({
      url: axios.adornUrl(`/sys/menu/info/${id}`),
      method: 'get',
      params: axios.adornParams()
    }).then(res => res.data);
  },

  /**
   * 删除单个菜单
   * @param id
   * @returns {*|Promise.<data>}
   */
  deleteMenuById: (id) => {
    return axios({
      url: axios.adornUrl(`/sys/menu/delete/${id}`),
      method: 'post',
      data: axios.adornData(id, false)
    }).then(res => res.data);
  },

  /**
   * 保存或更新菜单
   * @param id
   * @param params
   * @returns {*|Promise.<data>}
   */
  saveOrUpdateMenu: (id, params) => {
    return axios({
      url: axios.adornUrl(`/sys/menu/${!id ? 'save' : 'update'}`),
      method: 'post',
      data: axios.adornData(params)
    }).then(res => res.data);
  }

}

