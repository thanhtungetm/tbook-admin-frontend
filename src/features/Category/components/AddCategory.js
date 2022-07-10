import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { IconButton, Paper, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import Modal from '~/components/Modal'
import useGetApi from '~/customizes/useGetApi'
import CategoryService from '~/services/CategoryService'
import FormCategory from './FormCategory'
import Notification from './Notification'

// const schema = yup.object({
//     nameCategory: yup.string().required('Please input name of category!'),
//     idParent: yup.string(),
// })

function AddCategoryModal({ close }) {
    const {
        res: categoriesList,
        message,
        openNotice,
        disableNotice,
        callApi: getCategoriesList,
    } = useGetApi(CategoryService.getAll)

    const {
        message: addMessage,
        openNotice: addOpenNotice,
        disableNotice: disableAddOpenNotice,
        callApi: addCategory,
    } = useGetApi(CategoryService.create, 'Thêm thành công!')

    const [isAdd, setIsAdd] = useState(false)

    const inputRef = useRef(null)

    useEffect(() => {
        getCategoriesList()
    }, [])

    const onSubmit = (data) => {
        console.log('Form data', data)
        addCategory(data)
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
                        Add Category
                    </Typography>
                    {/* Close Buton */}
                    <IconButton
                        sx={{ position: 'absolute', top: 0, right: 0 }}
                        color="inherit"
                        onClick={() => {

                            close(isAdd)
                        }}
                    >
                        <CloseOutlinedIcon />
                    </IconButton>
                </Paper>

                <FormCategory
                    labelBtn={'Add'}
                    onSubmit={onSubmit}
                    // control={control}
                    categoriesList={categoriesList}
                    inputRef={inputRef}
                />

                {openNotice && <Notification {...message} close={() => disableNotice()} />}
                {addOpenNotice && (
                    <Notification
                        {...addMessage}
                        close={() => {
                            if(!addMessage.err)
                            setIsAdd(true)
                            disableAddOpenNotice()
                            inputRef.current.focus()
                        }}
                    />
                )}
            </Paper>
        </Modal>
    )
}

export default AddCategoryModal
