import orginJSONP from 'jsonp'

export default function(url, data, option) {
  data = url.indexOf('?') === -1 ? '?' + param(data) : param(data)
  url += data

  return new Promise(function(resolve, reject) {
    orginJSONP(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

function param(data) {
  let tempStr = ''

  for (let key in data) {
    let val = data[key] !== undefined ? data[key] : ''
    tempStr += `&${key}=${encodeURIComponent(val)}`
  }

  return tempStr ? tempStr.substring(1) : ''
}
