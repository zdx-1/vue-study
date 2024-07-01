import axios from "axios";
import { baseURL, TIMEOUT } from "./config";
class HYRequest {
  constructor() {
    this.instance = axios.create({
      baseURL,
      timeout: TIMEOUT,
    })
    
    this.instance.interceptors.request.use(config => {
      const cookie = localStorage.getItem('cookie')
      if (cookie) {
        config.data = {
          ...config.data,
          // cookie
        }
      }
      if (config.method === 'get') {  
        // config.params = {
        //   ...config.params,
        //   timestamp: time,
        // }
      }
      return config
    }, err => {
      return err
    })
    this.instance.interceptors.response.use(res => {
      return res
    }, err => {
      return err
    })
  }

  request(config) {
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          console.log("request err:", err);
          reject(err);
        })
        .finally(() => {
        
        })
    })
  }

  get(config) {
    return this.request({ ...config, method: "get" })
  }

  post(config) {
    return this.request({ ...config, method: "post" })
  }
}

export default new HYRequest(baseURL);
