/**
 *  クッキーの値を取得する
 */
const getCookieValue = (searchKey: string | undefined) => {
  if (typeof searchKey === 'undefined') {
    return ''
  }
  let val: string = ''
  document.cookie.split(';').forEach( cookie => {
    const [key, value]: Array<string> = cookie.split('=')
    if (key === searchKey) {
      return val = value
    }
  })
  return val
}

export { getCookieValue }
