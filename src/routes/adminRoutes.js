import AdminLayout from "~/components/Layout/AdminLayout"
import Home from "~/features/Admin/Home"
import Book from "~/features/Admin/Book"
import Category from "~/features/Admin/Category"
import Order from "~/features/Admin/Order"

const adminRoutes = [
    { path: '/admin', component: Home, layout: AdminLayout },
    { path: '/admin/book', component: Book, layout: AdminLayout },
    { path: '/admin/category', component: Category, layout: AdminLayout },
    { path: '/admin/order', component: Order, layout: AdminLayout },
]

export default adminRoutes
