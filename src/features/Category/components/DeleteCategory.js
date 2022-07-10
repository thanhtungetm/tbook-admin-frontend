import { Box, Button, Paper, Typography } from '@mui/material'
import Modal from '~/components/Modal'
import Notification from '~/components/Notification'
import useGetApi from '~/customizes/useGetApi'
import CategoryService from '~/services/CategoryService'

export default function DeleteCategory({ category, close }) {
    const {
        callApi: deleteCategory,
        message,
        openNotice,
        disableNotice,
    } = useGetApi(CategoryService.delete, 'Đã xóa!')
    //Remove
    const handleRemove = async () => {
        // setOpenNotice(true)
        deleteCategory(category.idCategory)
    }

    return (
        <Modal>
            <Paper>
                <Paper
                    sx={{
                        bgcolor: 'primary.light',
                        color: '#fff',
                        padding: '5px 0',
                        position: 'relative',
                    }}
                >
                    <Typography align="center" variant="h5">
                        Delete Category
                    </Typography>
                    {/* Close Buton */}
                </Paper>
                <Box
                    sx={{
                        padding: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                    }}
                >
                    <Typography variant="h5" align="center">
                        Ban chắc chắn muốn xóa?
                    </Typography>
                    <Box mt={1}>
                        <Button variant="outlined" sx={{ mr: 2 }} onClick={handleRemove}>
                            Delete
                        </Button>
                        <Button variant="contained" onClick={() => close(false)}>
                            Close
                        </Button>
                    </Box>
                </Box>

                {openNotice && (
                    <Notification
                        secondary
                        {...message}
                        close={() => {
                            disableNotice()
                            if (!message.err) close(true)
                        }}
                    />
                )}
            </Paper>
        </Modal>
    )
}
