import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import { Box, Button, Paper, Skeleton, Typography } from '@mui/material'
import Modal from '~/components/Modal'
export default function Notification({ message, close, err }) {
    return (
        <Modal>
            <Paper
                sx={{
                    bgcolor: '#fff',
                    display: 'flex',
                    alignItems: ' center',
                    flexDirection: 'column',
                    padding: '20px 30px',
                }}
            >
                {message ? (
                    <>
                        <Box sx={{ display: 'flex', alignItems: ' center', paddingBottom: '10px' }}>
                            {err ? (
                                <ErrorOutlineOutlinedIcon
                                    color="error"
                                    sx={{ fontSize: '30px', paddingRight: '5px' }}
                                />
                            ) : (
                                <CheckCircleOutlineOutlinedIcon
                                    color="success"
                                    sx={{ fontSize: '30px', paddingRight: '5px' }}
                                />
                            )}

                            <Typography variant="h5">{message}</Typography>
                        </Box>
                        <Button variant="outlined" onClick={close}>
                            OK
                        </Button>
                    </>
                ) : (
                    <Skeleton variant="rect" width={350} height={90} />
                )}
            </Paper>
        </Modal>
    )
}
