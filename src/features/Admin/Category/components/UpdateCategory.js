import { yupResolver } from '@hookform/resolvers/yup'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import {
    IconButton, Paper, Typography
} from '@mui/material'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from "yup"
import Modal from '~/components/Modal'
import CategoryService from '~/services/CategoryService'
import handle from '~/utils/handle'
import FormCategory from './FormCategory'
import Notification from './Notification'

const schema = yup.object({
    nameCategory: yup.string().required("Please input name of category!"),
    idParent: yup.string(),
  });



function UpdateCategoryModal({ category, close }) {

    const [isUpdate, setIsUpdate] = useState(false)
    const [openNotice, setOpenNotice] = useState(false)
    const [message, setMessage] = useState({})

    
    const [categoriesList, setCategories] = useState([])
    

    const { control, handleSubmit } = useForm({
        defaultValues:{
            nameCategory: category.nameCategory || '',
            idParent:category.idParent || ''
        },
        resolver: yupResolver(schema)
    })



    //Call API
    const getCategories = async (filter) => {
        const res = await handle(CategoryService.getAll(filter))
        console.log('list Category:', res)
        if (res.err) {
            console.log(res.err)
            return
        }
        setCategories(res.data)
    }

    useEffect(() => {
        getCategories()
    }, [])

    const onSubmit = async(data) => {
        console.log('Form update data', data)

        let updateData = {}
        if(data.nameCategory===category.nameCategory){
            updateData = {
                idParent: data.idParent
            }
        }else{
            updateData = data
        }
        
        const res = await handle(CategoryService.update(category.idCategory,updateData))
        if(res.err){
            console.log('err', res)
            setOpenNotice(true)
            setMessage({err:true, message:'Cập nhật không thành công!'})
            return
        }
        setOpenNotice(true)
        setMessage({message:'Cập nhật thành công!'})
        setIsUpdate(true)
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
                        onClick={()=>close(isUpdate)}
                    >
                        <CloseOutlinedIcon />
                    </IconButton>
                </Paper>

                    <FormCategory labelBtn={'Update'} categoriesList={categoriesList.filter((cate)=>cate.idCategory!=category.idCategory)} onSubmit={handleSubmit(onSubmit)} control={control} />
                

                {openNotice && (
                    <Notification {...message} close={() => setOpenNotice(false)} />
                )}
            </Paper>
        </Modal>
    )
}

UpdateCategoryModal.propTypes = {
    category: PropTypes.object.isRequired,
    categoriesList: PropTypes.array.isRequired,
    close: PropTypes.func.isRequired
};

export default UpdateCategoryModal
