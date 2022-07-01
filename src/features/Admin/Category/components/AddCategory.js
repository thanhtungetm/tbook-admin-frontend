import { yupResolver } from '@hookform/resolvers/yup'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { IconButton, Paper, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import Modal from '~/components/Modal'
import CategoryService from '~/services/CategoryService'
import handle from '~/utils/handle'
import FormCategory from './FormCategory'
import Notification from './Notification'

const schema = yup.object({
    nameCategory: yup.string().required('Please input name of category!'),
    idParent: yup.string(),
})

function AddCategoryModal({ close }) {

    const [isAdd, setIsAdd] = useState(false)
    const [openNotice, setOpenNotice] = useState(false)
    const [message, setMessage] = useState({})

    const [categoriesList, setCategories] = useState([])

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            nameCategory: '',
            idParent: '',
        },
        resolver: yupResolver(schema),
    })

    const [isLoading, setIsLoading] = useState(true)

    //Call API
    const getCategories = async (filter) => {
        setIsLoading(true)
        const res = await handle(CategoryService.getAll(filter))
        setIsLoading(false)
        console.log('list Category:', res)
        if (res.err) {
            setOpenNotice(true)
            return
        }
        setCategories(res.data)
    }

    useEffect(() => {
        getCategories()
    }, [])

    const onSubmit = async(data) => {
        console.log('Form data', data)
        const res = await handle(CategoryService.create(data))
        setOpenNotice(true)
        if(res.err){
            setMessage({err:true, message:"Không thể thêm danh mục!"})
        }else{
            setMessage({message:'Thêm thành công!'})
            setIsAdd(true)
            reset()
        }
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
                        onClick={()=>close(isAdd)}
                    >
                        <CloseOutlinedIcon />
                    </IconButton>
                </Paper>

                <FormCategory labelBtn={'Add'} onSubmit={handleSubmit(onSubmit)} control={control} categoriesList={categoriesList} />

                {openNotice && (
                    <Notification
                        isLoading={isLoading}
                        {...message}
                        close={() => setOpenNotice(false)}
                    />
                )}
            </Paper>
        </Modal>
    )
}

export default AddCategoryModal
