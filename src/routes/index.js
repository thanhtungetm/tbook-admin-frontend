import AdminLayout from '~/components/Layout/AdminLayout'
import BookAdmin from '~/pages/Admin/Book'
import CategoryAdmin from '~/pages/Admin/Category'
import HomeAdmin from '~/pages/Admin/Home'
import Home from '~/pages/Home'
import ProductDetail from '~/pages/ProductDetail'

const adminRoutes = [
    { path: '/admin', component: HomeAdmin, layout: AdminLayout },
    { path: '/admin/category', component: CategoryAdmin, layout: AdminLayout },
    { path: '/admin/book', component: BookAdmin, layout: AdminLayout },
]

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/productDetail', component: ProductDetail },
    ...adminRoutes,
]

const privateRoutes = []

export { publicRoutes, privateRoutes }
