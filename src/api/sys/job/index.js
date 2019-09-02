import axios from '@/utils/httpRequest'

export default {
  /**
   * 获取定时任务列表
   * @param params
   * @returns {Promise.<data>|*}
   */
  getScheduleTaskList: (params) => {
    return axios({
      url: axios.adornUrl('/sys/schedule/list'),
      method: 'get',
      params: axios.adornParams(params)
    }).then(res => res.data);
  },

  /**
   * 获取单条任务信息
   * @returns {*|Promise.<data>}
   */
  getScheduleInfo: (id) => {
    return axios({
      url: axios.adornUrl(`/sys/schedule/info/${id}`),
      method: 'get',
      params: axios.adornParams()
    }).then(res => res.data);
  },

  /**
   * 删除任务
   * @param ids
   * @returns {*|Promise.<data>}
   */
  deleteSchedule: (ids) => {
    return axios({
      url: axios.adornUrl('/sys/schedule/delete'),
      method: 'post',
      data: axios.adornData(ids, false)
    }).then(res => res.data);
  },

  /**
   * 暂停任务
   * @param ids
   * @returns {*|Promise.<data>}
   */
  pauseSchedule: (ids) => {
    return axios({
      url: axios.adornUrl('/sys/schedule/pause'),
      method: 'post',
      data: axios.adornData(ids, false)
    }).then(res => res.data);
  },

  /**
   * 恢复任务
   * @param ids
   * @returns {*|Promise.<data>}
   */
  resumeSchedule: (ids) => {
    return axios({
      url: axios.adornUrl('/sys/schedule/resume'),
      method: 'post',
      data: axios.adornData(ids, false)
    }).then(res => res.data);
  },

  /**
   * 立即执行任务
   * @param ids
   * @returns {*|Promise.<data>}
   */
  runSchedule: (ids) => {
    return axios({
      url: axios.adornUrl('/sys/schedule/run'),
      method: 'post',
      data: axios.adornData(ids, false)
    }).then(res => res.data);
  },

  /**
   * 保存或更新任务
   * @param id
   * @param params
   * @returns {*|Promise.<data>}
   */
  saveOrUpdateSchedule: (id,params) => {
    return axios({
      url: axios.adornUrl(`/sys/schedule/${!id ? 'save' : 'update'}`),
      method: 'post',
      data: axios.adornData(params)
    }).then(res => res.data);
  },


  // ===== 定时器 log ===== //


  /**
   * 获取定时任务日志列表
   * @param params
   * @returns {Promise.<data>|*}
   */
  getScheduleTaskLogList: (params) => {
    return axios({
      url: axios.adornUrl('/sys/scheduleLog/list'),
      method: 'get',
      params: axios.adornParams(params)
    }).then(res => res.data);
  },

  /**
   * 获取单条定时任务日志信息
   * @returns {*|Promise.<data>}
   */
  getScheduleTaskLogInfo: (id) => {
    return axios({
      url: axios.adornUrl(`/sys/scheduleLog/info/${id}`),
      method: 'get',
      params: axios.adornParams()
    }).then(res => res.data);
  },

}

