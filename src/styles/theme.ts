import { createTheme } from '@mui/material';
import { ptBR } from '@mui/material/locale';

export const theme = createTheme(
    {
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
