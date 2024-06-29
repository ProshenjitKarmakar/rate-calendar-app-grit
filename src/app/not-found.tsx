'use client';
import {Box, lighten, Stack, styled, Typography} from "@mui/material";

const WrapperBox = styled(Box)(() => ({
    width: '100vw',
    height: '100vh',
    display: 'grid',
    placeItems: 'center',
}));
const ErrorBox = styled(Stack)(({ theme }) => ({
    position: 'relative',
    '&:before': {
        content: '"404"',
        position: 'absolute',
        backgroundColor: 'transparent',
        fontSize: '12rem',
        top: '0',
        left: '100%',
        color: lighten(theme.palette.secondary.main, 0.7),
        transform: 'rotate(13deg)',
    },
    '&:after': {
        content: '"404"',
        position: 'absolute',
        backgroundColor: 'transparent',
        fontSize: '12rem',
        bottom: '-80px',
        right: '100%',
        color: lighten(theme.palette.secondary.main, 0.7),
        transform: 'rotate(-13deg)',
    },
}));
export default function NotFound() {
    return (
        <WrapperBox>
            <ErrorBox direction='column' alignItems='center' spacing={1}>
                <Typography variant='h1' color='secondary.main' sx={{ fontSize: '14rem', lineHeight: 'normal' }}>
                    404
                </Typography>
                <Typography variant='h5' color='secondary.main' sx={{ display: 'inline-flex', gap: '5px' }}>
                    Page Not Found <span>{/*<SentimentDissatisfiedIcon />*/}</span>
                </Typography>
            </ErrorBox>
        </WrapperBox>
    );
}