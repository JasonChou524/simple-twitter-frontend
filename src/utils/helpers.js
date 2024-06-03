import dayjs from 'dayjs'
import 'dayjs/locale/zh-tw'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import axios from 'axios'
import Swal from 'sweetalert2'

// dayjs
dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)
dayjs.locale('zh-tw')
export { dayjs }

// axios
// const baseURL = 'http://localhost:3000/api'
const baseURL = 'https://young-lowlands-32546-721f3910d233.herokuapp.com/api'

export const apiHelper = axios.create({
  baseURL
})

// SweetAlert2
export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})
