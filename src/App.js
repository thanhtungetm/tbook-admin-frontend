import '~/App.css'
import { Container } from '@material-ui/core'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { publicRoutes } from './routes'
import { DefaultLayout } from '~/components/Layout'
import { Fragment } from 'react'
import NotFound from './pages/NotFound'

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
