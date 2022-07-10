import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { IconButton, Paper, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import Modal from '~/components/Modal'
import useGetApi from '~/customizes/useGetApi'
import CategoryService from '~/services/CategoryService'
import { shallowEqual } from '~/utils/func'
import FormCategory from './FormCategory'
import Notification from './Notification'


function UpdateCategoryModal({ category, close }) {

    const {
        res: categoriesList,
        message,
        openNotice,
        disableNotice,
        callApi: getCategoriesList,
    } = useGetApi(CategoryService.getAll)

    const {
        message: updateMessage,
        openNotice: updateNotice,
        callApi: updateCategory,
    } = useGetApi(CategoryService.update, 'Cập nhật thành công')


    //Call API
    useEffect(() => {
        getCategoriesList()
    }, [])

    const onSubmit = (data) => {
        console.log('Form update data', data)
        console.log('category', category)

        if(data.idParent==='')
            data.idParent = null

        if(shallowEqual({...category, ...data},category)){
            close(false)
            return
        }
            
        let updateData = {}
        if(data.nameCategory===category.nameCategory){
            updateData = {
                idParent: data.idParent
            }
        }else{
            updateData = data
        }

        
        updateCategory(category.idCategory,updateData)
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
                        Update Category
                    </Typography>
                    {/* Close Buton */}
                    <IconButton
                        sx={{ position: 'absolute', top: 0, right: 0 }}
                        color="inherit"
                        onClick={() => close(false)}
                    >
                        <CloseOutlinedIcon />
                    </IconButton>
                </Paper>

                <FormCategory
                    labelBtn={'Update'}
                    categoriesList={categoriesList?.filter(
                        (cate) => cate.idCategory !== category.idCategory
                    )}
                    onSubmit={onSubmit}
                    category={category}
                />
                

                {openNotice && (
                    <Notification secondary {...message} close={() => disableNotice} />
                )}
                {updateNotice && (
                    <Notification secondary {...updateMessage} close={() => close(true)} />
                )}
            </Paper>
        </Modal>
    )
}

UpdateCategoryModal.propTypes = {
    category: PropTypes.object.isRequired,
    categoriesList: PropTypes.array.isRequired,
    close: PropTypes.func.isRequired,
}

export default UpdateCategoryModal
