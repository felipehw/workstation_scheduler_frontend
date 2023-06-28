import { Delete } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';
import { Modal } from '../Modal/Modal';

type DeleteScheduleModalPropsSchema = {
    open: boolean;
    title: string;
    onClose: () => void;
    onDelete: () => void;
};

export const DeleteModal = ({ open, title, onClose, onDelete }: DeleteScheduleModalPropsSchema) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            title={title}
            content={
                <Stack direction={'row'} gap={2} justifyContent={'space-between'}>
                    <Button variant="outlined" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button variant="outlined" color="error" startIcon={<Delete />} onClick={onDelete}>
                        Apagar
                    </Button>
                </Stack>
            }
        />
    );
};
