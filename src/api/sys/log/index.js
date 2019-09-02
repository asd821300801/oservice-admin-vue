import axios from '@/utils/httpRequest'

export default {
  /**
   * 获取日志列表
   * @param params
   * @returns {Promise.<data>|*}
   */
  getLogList: (params) => {
    return axios({
      url: axios.adornUrl('/sys/log/list'),
      method: 'get',
      params: axios.adornParams(params)
    }).then(res => res.data);
  },

}

