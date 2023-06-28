import { Box, IconButton, styled } from '@mui/material';

export const ModalStyledBox = styled(Box)({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    maxWidth: '800px',
});
export const ModalHeaderButton = styled(IconButton)({
    position: 'absolute',
    top: '4px',
    right: '4px',
});
