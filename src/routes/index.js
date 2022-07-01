
import Home from '~/features/Client/Home'
import adminRoutes from './adminRoutes'

const publicRoutes = [
    { path: '/', component: Home },
    ...adminRoutes,
]

const privateRoutes = []

export { publicRoutes, privateRoutes }

