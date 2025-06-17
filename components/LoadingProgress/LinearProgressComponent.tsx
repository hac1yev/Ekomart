import { Stack, LinearProgress } from '@mui/material';
import React from 'react'

const LinearProgressComponent = () => {
    return (
        <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
            <LinearProgress color="success" />
        </Stack>
    );
};

export default LinearProgressComponent;