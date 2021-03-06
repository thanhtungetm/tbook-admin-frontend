import { Box } from "@mui/material";
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { useEffect } from "react";

export default function Modal({secondary,children}) {
    useEffect(()=>{
        if(!secondary){
            disableBodyScroll(document)
            return ()=>{
                enableBodyScroll(document)
            }
        }
        
    },[])
    return (
        <Box sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
            bgcolor: '#42a5f53d',
            display: 'flex', alignItems: ' center',
            justifyContent:'center'
        }}>
            {children}

        </Box>
    );
}