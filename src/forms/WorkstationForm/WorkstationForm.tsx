import { Delete } from '@mui/icons-material';
import {
    Button,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { DeleteModal } from '../../components/DeleteModal/DeleteModal';
import { formFeedback } from '../../data/formFeedbackData';
import {
    AvailabilityStatus,
    AvailabilityStatusString,
    CreateWorkstationParamsSchema,
} from '../../services/Workstation/WorkstationService.schema';
import { WorkstationFormInputsSchema } from './WorkstationForm.schema';

const defaultValues: WorkstationFormInputsSchema = {
    workstation_name: '',
    availability_status: '',
};
type WorkstationFormPropsSchema = {
    onSubmit: (params: CreateWorkstationParamsSchema) => void;
    onDelete?: () => void;
    defaultValues?: WorkstationFormInputsSchema;
};

export const WorkstationForm = (props: WorkstationFormPropsSchema) => {
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<WorkstationFormInputsSchema>({ defaultValues: props.defaultValues ?? defaultValues });

    const onSubmit = (inputs: WorkstationFormInputsSchema) => {
        const formattedInputs: CreateWorkstationParamsSchema = {
            ...inputs,
            availability_status: inputs.availability_status as AvailabilityStatus,
        };
        props.onSubmit(formattedInputs);
    };
    return (
        <>
            <DeleteModal
                title="Apagar estação de trabalho?"
                open={deleteModalIsOpen}
                onClose={() => setDeleteModalIsOpen(false)}
                onDelete={() => props.onDelete && props.onDelete()}
            />

            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h5" mb={2}>
                            {props.defaultValues ? 'Editar Estação de trabalho' : 'Criar Estação de trabalho'}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="workstation_name"
                            control={control}
                            rules={{
                                required: formFeedback.general.required,
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    id="workstation_name"
                                    label="Nome da Estação de trabalho *"
                                    variant="outlined"
                                    error={!!errors?.workstation_name}
                                    helperText={errors?.workstation_name?.message}
                                    fullWidth
                                    sx={{ maxWidth: { sm: '20rem' } }}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="availability_status"
                            control={control}
                            rules={{
                                required: formFeedback.general.required,
                            }}
                            render={({ field }) => (
                                <FormControl error={!!errors?.availability_status}>
                                    <FormLabel>Status</FormLabel>
                                    <RadioGroup row {...field}>
                                        <FormControlLabel
                                            value={'available'}
                                            control={<Radio />}
                                            label={AvailabilityStatusString['available']}
                                        />
                                        <FormControlLabel
                                            value={'scheduled'}
                                            control={<Radio />}
                                            label={AvailabilityStatusString['scheduled']}
                                        />
                                    </RadioGroup>
                                    <FormHelperText sx={{ color: (theme) => theme.palette.error.main }}>
                                        {errors?.availability_status?.message}
                                    </FormHelperText>
                                </FormControl>
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {props.defaultValues ? (
                            <Stack direction={'row'} gap={2} justifyContent={'space-between'} sx={{ maxWidth: { sm: '20rem' } }}>
                                {props.onDelete ? (
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        startIcon={<Delete />}
                                        onClick={() => setDeleteModalIsOpen(true)}
                                        fullWidth
                                    >
                                        Apagar
                                    </Button>
                                ) : (
                                    ''
                                )}
                                <Button variant="outlined" type="submit" fullWidth>
                                    Salvar
                                </Button>
                            </Stack>
                        ) : (
                            <Button variant="outlined" type="submit" fullWidth sx={{ maxWidth: { sm: '20rem' } }}>
                                Criar
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </form>
        </>
    );
};
