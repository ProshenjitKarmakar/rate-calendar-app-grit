'use client';
import React, {useEffect} from "react";
import {Box} from "@mui/material";

const RootLayoutFallback = () => {
    useEffect(() => {
        window.location.reload();
    }, []);

    return(
        <Box textAlign={'center'} mt={5}>
            <h1>Loading...</h1>
        </Box>

    )
}
export default RootLayoutFallback;