import { createPinia } from 'pinia'
import persis from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(persis)
export default pinia 
export * from './modules/user'
export * from './modules/consult'