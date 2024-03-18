import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
export default defineConfig({
  server: {
    hmr: {
    
    },
  },
   plugins: [react()],
});
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:5173/', // Thay đổi thành máy chủ thực tế của bạn
  //       changeOrigin: true,
  //       // Tùy chỉnh kích thước trường tiêu đề tại đây
  //       headers: {
  //         'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  //         'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  //         'Access-Control-Allow-Origin': '*',
  //         'Max-Field-Size': 'Infinity', // Đặt giới hạn kích thước trường tiêu đề
  //       },
  //     },
  //   },
  // },
  // plugins: [react()],

