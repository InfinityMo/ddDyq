export const encodeUrl = (url, obj) => {
  Object.keys(obj).forEach((item, index) => {
    url = index === 0 ? `${url}?${item}=${obj[item]}` : `${url}&${item}=${obj[item]}`
  })
  return url
}