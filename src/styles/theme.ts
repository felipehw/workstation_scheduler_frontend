import { createTheme } from '@mui/material';
import { ptBR } from '@mui/material/locale';

export const theme = createTheme(
    {
        palette: {
            text: {
                primary: '#333333',
            },
            primary: {
                main: '#6482f8',
            },
        },
        typography: {
            // fontFamily: 'Inter',
        },
        components: {
            MuiTableRow: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        /* '&:nth-of-type(odd)': {
                            backgroundColor: Colors.white,
                        },
                        '&:nth-of-type(even)': {
                            backgroundColor: Colors.beluga,
                        }, */
                        /* ':hover': {
                            backgroundColor: theme.palette.background.default,
                            filter: 'brightness(95%)',
                        }, */
                    }),
                },
            },
        },
    },
    ptBR
);
