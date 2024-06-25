
import Cookies from 'js-cookie';

const makeRequest = (api, crud, task, callback)=>{
  const authCookie = Cookies.get('Authorization')
  let error = null
  if(authCookie === undefined || authCookie === null) error = "Please Login first"
  const reqObj = {
    method: crud,
    url: api,
    headers:{
      'Content-Type': 'application/json',
      'Authorization': authCookie
    },
    data: task
  }
  callback(error, reqObj)
}

export default makeRequest