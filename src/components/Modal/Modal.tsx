import { Close } from '@mui/icons-material';
import { Box, Modal as MuiModal, ModalProps as MuiModalProps, SxProps, Typography } from '@mui/material';
import { ReactNode, forwardRef } from 'react';
import { ModalHeaderButton, ModalStyledBox } from './Modal.styled';

type ModalPropsSchema = Omit<MuiModalProps, 'children' | 'content'> & {
    onClose: () => void;
    title: string;
    content: ReactNode;
    sx?: SxProps;
};
export const Modal = forwardRef<HTMLDivElement, ModalPropsSchema>(({ onClose, content, title, sx, ...ModalPropsRest }, ref) => {
    return (
        <MuiModal {...ModalPropsRest}>
            <ModalStyledBox sx={sx}>
                <Box component={'header'}>
                    <ModalHeaderButton onClick={onClose}>
                        <Close />
                    </ModalHeaderButton>
                    <Typography variant="h5" mt={2}>
                        {title}
                    </Typography>
                </Box>
                <Box sx={{ minHeight: '0px' }}>{content}</Box>
            </ModalStyledBox>
        </MuiModal>
    );
});
