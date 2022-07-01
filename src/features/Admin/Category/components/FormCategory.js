import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

function FormCategory({onSubmit, control, labelBtn, categoriesList}) {
    return (<Box
        component="form"
        mt={2}
        sx={{ padding: '10px' }}
        onSubmit={onSubmit}
    >
        <Box>
            <Controller
                name="nameCategory"
                control={control}
                render={({ field, formState: {errors}}) => (
                    <TextField
                        {...field}
                        size="small"
                        id="outlined-basic1"
                        label="Name Category"
                        variant="outlined"
                        error = {!!errors.nameCategory}
                        helperText={errors.nameCategory?.message}
                        sx={{ mr: 2 }}
                    />
                )}
            />

            <FormControl size="small">
                <InputLabel id="parent-label">Parent</InputLabel>
                <Controller
                    name='idParent'
                    control={control}
                    render={({field})=>(
                    <Select
                        {...field}
                        labelId="parent-label"
                        id="demo-simple-select"
                        // value={age}
                        label="Parent"
                        // onChange={handleChange}
                        sx={{ width: 210 }}
                    >
                        <MenuItem value="">
                            <em>root</em>
                        </MenuItem>
                        {categoriesList.map((cate)=>(
                            <MenuItem key={cate.idCategory} value={cate.idCategory}>{cate.nameCategory}</MenuItem>
                        ))}
                    </Select>
                    )}
                />
                
            </FormControl>
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
    </Box>);
}

export default FormCategory