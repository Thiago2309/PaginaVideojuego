import React from 'react';
import { Box, Typography } from '@mui/material';


const FooterView = () => {
    return (
        <Box sx={{ padding: '23px' }}>
            <br />
            <Typography variant="body2" color="inherit" align="center" sx={{ mt: 4 }}>
                © 2024 Destiny. Thiago Ramirez Soberano.
            </Typography>
        </Box>
    );
};

export default FooterView;