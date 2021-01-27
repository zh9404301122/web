import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const env = window['$env'] ? window['$env'] : process.env.NODE_ENV

let projectAddrass = window.location.host;
let projectAddrassNoPort = window.location.hostname;

let protocol = document.location.protocol;

const PACKNAME = '';

const URL = 'http://123.57.74.6:9999' + PACKNAME;

const interfaceIp = `${protocol}//${projectAddrass}${PACKNAME}`;

let BASEURL = env === 'development' ? URL : interfaceIp;


const service = axios.create({
  baseURL: BASEURL,
  timeout: 30000 // request timeout
})

service.interceptors.request.use(
  config => {

    if (store.getters.token) {
      config.headers['token'] = getToken()
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    const name = response.headers["content-disposition"]
    if (!name) {
      return res
    } else {
      return response
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
