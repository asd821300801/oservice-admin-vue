import axios from '@/utils/httpRequest'

export default {
  /**
   * 获取文件列表
   * @param params
   * @returns {Promise.<data>|*}
   */
  getOssList: (params) => {
    return axios({
      url: axios.adornUrl('/sys/oss/list'),
      method: 'get',
      params: axios.adornParams(params)
    }).then(res => res.data);
  },

  /**
   * 获取单条配置信息
   * @returns {*|Promise.<data>}
   */
  getOssConfig: () => {
    return axios({
      url: axios.adornUrl('/sys/oss/config'),
      method: 'get',
      params: axios.adornParams()
    }).then(res => res.data);
  },

  /**
   * 删除文件
   * @param ids
   * @returns {*|Promise.<data>}
   */
  deleteFile: (ids) => {
    return axios({
      url: axios.adornUrl('/sys/oss/delete'),
      method: 'post',
      data: axios.adornData(ids, false)
    }).then(res => res.data);
  },

  /**
   * 保存或更新配置
   * @param params
   * @returns {*|Promise.<data>}
   */
  saveConfig: (params) => {
    return axios({
      url: axios.adornUrl('/sys/oss/saveConfig'),
      method: 'post',
      data: axios.adornData(params)
    }).then(res => res.data);
  },

  /**
   * 获取上传Url
   * @param token
   */
  getUploadUrl: (token) => {
    return axios.adornUrl(`/sys/oss/upload?token=${token}`);
  }

}

