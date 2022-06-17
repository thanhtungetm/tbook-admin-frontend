import Header from './Header'

function Defaultlayout({ children }) {
    return (
        <>
            <Header />
            <h3>Content</h3>
            <div>{children}</div>
            <Header />
        </>
    )
}

export default Defaultlayout
