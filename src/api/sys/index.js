import axios from '@/utils/httpRequest'

export default {


  /**
   * 退出登陆
   * @returns {*|Promise.<data>}
   */
  login: (params) => {
    return axios({
      url: axios.adornUrl('/sys/login'),
      method: 'post',
      data: axios.adornData(params)
    }).then(res => res.data);
  },

  /**
   * 退出登陆
   * @returns {*|Promise.<data>}
   */
  logout: () => {
    return axios({
      url: axios.adornUrl('/sys/logout'),
      method: 'post',
      data: axios.adornData()
    }).then(res => res.data);
  },

  /**
   * 获取验证码
   * @param uuid
   * @returns image url
   */
  getCaptcha: (uuid) => {
    return axios.adornUrl(`/captcha.jpg?uuid=${uuid}`);
  }


}

