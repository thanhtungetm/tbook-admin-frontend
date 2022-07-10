import { Container, Grid } from '@mui/material'
import { useState } from 'react'
import Header from './Header'
import Nav from './Nav'

function DefaultLayout({ children }) {
    const [titlePage, setTitlePage] = useState('Home')
    return (
        // <ThemeProvider>
        <Container >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                    <Nav setTitlePage={setTitlePage}/>
                </Grid>
                <Grid item xs={12} sm={6} md={9}>
                    <Header titlePage={titlePage} />
                    {children}
                </Grid>
            </Grid>
         </Container>
        // </ThemeProvider>
    )
}
export default DefaultLayout
