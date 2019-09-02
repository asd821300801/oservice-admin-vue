import axios from '@/utils/httpRequest'

export default {
  /**
   * 获取配置列表
   * @param params
   * @returns {Promise.<data>|*}
   */
  getConfigList: (params) => {
    return axios({
      url: axios.adornUrl('/sys/config/list'),
      method: 'get',
      params: axios.adornParams(params)
    }).then(res => res.data);
  },

  /**
   * 获取单条配置信息
   * @param id
   * @returns {*|Promise.<data>}
   */
  getConfigInfo: (id) => {
    return axios({
      url: axios.adornUrl(`/sys/config/info/${id}`),
      method: 'get',
      params: axios.adornParams()
    }).then(res => res.data);
  },

  /**
   * 删除配置
   * @param params
   * @returns {*|Promise.<data>}
   */
  deleteConfig: (params) => {
    return axios({
      url: axios.adornUrl('/sys/config/delete'),
      method: 'post',
      data: axios.adornData(params, false)
    }).then(res => res.data);
  },

  /**
   * 保存或更新配置
   * @param id
   * @param params
   * @returns {*|Promise.<data>}
   */
  saveOrUpdateConfig: (id, params) => {
    return axios({
      url: axios.adornUrl(`/sys/config/${!id ? 'save' : 'update'}`),
      method: 'post',
      data: axios.adornData(params)
    }).then(res => res.data);
  }

}

