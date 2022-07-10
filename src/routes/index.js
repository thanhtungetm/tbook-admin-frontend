
import DefaultLayout from "~/components/Layout/DefaultLayout"
import Book from "~/features/Book"
import CreateBook from '~/features/Book/pages/CreateBook'
import UpdateBook from '~/features/Book/pages/UpdateBook'
import Category from "~/features/Category"
import Home from "~/features/Home"
import Order from "~/features/Order"

const publicRoutes = [
    { path: '/', component: Home, layout: DefaultLayout },
    { path: '/book', component: Book, layout: DefaultLayout },
    { path: '/book/new', component: CreateBook, layout: DefaultLayout },
    { path: '/book/:id', component: UpdateBook, layout: DefaultLayout },
    { path: '/category', component: Category, layout: DefaultLayout },
    { path: '/order', component: Order, layout: DefaultLayout },
]

const privateRoutes = []

export { publicRoutes, privateRoutes }

