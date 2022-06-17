import { Fragment } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import '~/App.css'
import { DefaultLayout } from '~/components/Layout'
import NotFound from './pages/NotFound'
import { publicRoutes } from './routes'

function App() {
    return (
        // <Container >
        <BrowserRouter>
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.component
                    let Layout = route.layout
                        ? route.layout
                        : route.layout === null
                        ? Fragment
                        : DefaultLayout

                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                    <div>Hello</div>
                                </Layout>
                            }
                        />
                    )
                })}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
        // </Container>
    )
}

export default App
