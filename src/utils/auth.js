
export const getHeaders = () => {
  const headers = {
    Authorization: 'bearer '+JSON.parse(localStorage.getItem('userInfo')).token
  }
  return headers
}

