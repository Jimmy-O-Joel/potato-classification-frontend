import React from 'react'
import { Box } from '@mui/system'
import { AppBar, Typography } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings';
import {useMediaQuery} from '@mui/material';


function Navbar() {

    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)")
    return (
        <AppBar
            sx={{
                backgroundColor: "#FAD3E7",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center"
            }}
            
        >
            <Box
                display="flex"
                alignItems="center"
                m="0 20px"
                color="#3D1766"
            >

            {isNonMobileScreen && <SettingsIcon sx={{fontSize:"3rem", display: "inline"}}/>}
            <Typography
                variant='h3'
                sx={{
                    p: "10px 20px 0",
                    alignItems: "center",
                    display: "inline",
                    fontSize: "3rem"
                }}
            >
                
                POTATO DISEASES
            </Typography>

            </Box>
            
            

        </AppBar>

        
    )
}

export default Navbar
