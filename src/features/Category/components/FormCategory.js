import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Skeleton, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object({
    nameCategory: yup.string().required('Please input name of category!'),
    idParent: yup.string(),
})

function FormCategory({ category, onSubmit, inputRef, labelBtn, categoriesList }) {
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            nameCategory: category?.nameCategory || '',
            idParent: category?.idParent || '',
        },
        resolver: yupResolver(schema),
    })

    const handleOnSubmit = (data) => {
        onSubmit(data)
        reset()
    }

    return (
        <Box
            component="form"
            mt={2}
            sx={{ padding: '10px' }}
            onSubmit={handleSubmit(handleOnSubmit)}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap:'wrap'}}>
                <Controller
                    name="nameCategory"
                    control={control}
                    render={({ field, formState: { errors } }) => (
                        <TextField
                            autoFocus
                            inputRef={inputRef}
                            {...field}
                            size="small"
                            id="outlined-basic1"
                            label="Name Category"
                            variant="outlined"
                            error={!!errors.nameCategory}
                            helperText={errors.nameCategory?.message}
                            sx={{ mr: 2 }}
                            inputProps={{ spellCheck: 'false' }}
                        />
                    )}
                />
                {categoriesList ? (
                    <FormControl size="small">
                        <InputLabel id="parent-label">Parent</InputLabel>
                        <Controller
                            name="idParent"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    labelId="parent-label"
                                    id="demo-simple-select"
                                    // value={age}
                                    label="Parent"
                                    // onChange={handleChange}
                                    sx={{ width: 210 }}

                                    // renderValue= {}
                                >
                                    <MenuItem value="">root</MenuItem>
                                    {categoriesList?.map((cate) => (
                                        <MenuItem key={cate.idCategory} value={cate.idCategory}>
                                            {cate.nameCategory}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                    </FormControl>
                ) : (
                    <Skeleton variant="rectangular"  sx={{display:'inline-block', borderRadius: '8px'}} width={210} height={40} />
                )}
            </Box>
            <Box
                mt={1}
                sx={{
                    display: 'flex',
                    alignItems: ' center',
                    justifyContent: 'center',
                }}
            >
                <Button
                    variant="outlined"
                    // onClick={()=>setOpenNotice(true)}
                    type="submit"
                >
                    {labelBtn}
                </Button>
            </Box>
        </Box>
    )
}

export default FormCategory
