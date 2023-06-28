import { Delete } from '@mui/icons-material';
import {
    Button,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Grid,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { AxiosError } from 'axios';
import moment from 'moment';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { DeleteModal } from '../../components/DeleteModal/DeleteModal';
import { formFeedback } from '../../data/formFeedbackData';
import { CreateScheduleParamsSchema, TimeSlot, TimeSlotString } from '../../services/Schedule/ScheduleService.schema';
import { GET_WORKSTATION_LIST_KEY, getWorkstationList } from '../../services/Workstation/WorkstationService';
import { ScheduleFormInputsSchema } from './ScheduleForm.schema';

const defaultValues: ScheduleFormInputsSchema = {
    employee_name: '',
    time_slot: '',
    schedule_date: moment().format('YYYY-MM-DD'),
    workstation: '',
};
type ScheduleFormPropsSchema = {
    onSubmit: (params: CreateScheduleParamsSchema) => void;
    onDelete?: () => void;
    defaultValues?: ScheduleFormInputsSchema;
};

export const ScheduleForm = (props: ScheduleFormPropsSchema) => {
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ScheduleFormInputsSchema>({ defaultValues: props.defaultValues ?? defaultValues });

    const workstationListQuery = useQuery({
        queryKey: [GET_WORKSTATION_LIST_KEY],
        queryFn: async () => await getWorkstationList(),
        onError: (error: AxiosError) => {
            const message = (
                <div style={{ whiteSpace: 'pre-line' }}>
                    {`Ocorreu um erro:
                    ${error.message}`}
                </div>
            );
            toast.error(message);
        },
    });
    const sortedWorkstations = workstationListQuery.data?.data
        .filter((workstation) => workstation.availability_status === 'available')
        .sort();
    const onSubmit = (inputs: ScheduleFormInputsSchema) => {
        const formattedInputs: CreateScheduleParamsSchema = {
            ...inputs,
            time_slot: inputs.time_slot as TimeSlot,
            workstation: Number(inputs.workstation),
        };
        props.onSubmit(formattedInputs);
    };
    return !sortedWorkstations ? (
        <></>
    ) : (
        <>
            <DeleteModal
                title="Apagar agendamento?"
                open={deleteModalIsOpen}
                onClose={() => setDeleteModalIsOpen(false)}
                onDelete={() => props.onDelete && props.onDelete()}
            />

            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h5" mb={2}>
                            {props.defaultValues ? 'Editar Agendamento' : 'Criar Agendamento'}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="employee_name"
                            control={control}
                            rules={{
                                required: formFeedback.general.required,
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    id="employee_name"
                                    label="Nome do funcionário *"
                                    variant="outlined"
                                    error={!!errors?.employee_name}
                                    helperText={errors?.employee_name?.message}
                                    fullWidth
                                    sx={{ maxWidth: { sm: '20rem' } }}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="schedule_date"
                            control={control}
                            rules={{
                                required: formFeedback.general.required,
                                min: 'Arara',
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    id="schedule_date"
                                    label="Data *"
                                    type="date"
                                    variant="outlined"
                                    error={!!errors?.schedule_date}
                                    helperText={errors?.schedule_date?.message}
                                    fullWidth
                                    inputProps={{ min: moment().format('YYYY-MM-DD') }}
                                    sx={{ maxWidth: { sm: '20rem' } }}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="time_slot"
                            control={control}
                            rules={{
                                required: formFeedback.general.required,
                            }}
                            render={({ field }) => (
                                <FormControl error={!!errors?.time_slot}>
                                    <FormLabel>Período</FormLabel>
                                    <RadioGroup row {...field}>
                                        <FormControlLabel value={'morning'} control={<Radio />} label={TimeSlotString['morning']} />
                                        <FormControlLabel value={'afternoon'} control={<Radio />} label={TimeSlotString['afternoon']} />
                                        <FormControlLabel value={'night'} control={<Radio />} label={TimeSlotString['night']} />
                                    </RadioGroup>
                                    <FormHelperText sx={{ color: (theme) => theme.palette.error.main }}>
                                        {errors?.time_slot?.message}
                                    </FormHelperText>
                                </FormControl>
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="workstation"
                            control={control}
                            rules={{
                                required: formFeedback.general.required,
                            }}
                            render={({ field }) => (
                                <FormControl fullWidth error={!!errors?.workstation}>
                                    <InputLabel id="demo-simple-select-label">Estação de trabalho</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Estação de trabalho"
                                        {...field}
                                        onChange={(event, child) => {
                                            field.onChange(event.target.value);
                                        }}
                                        sx={{ maxWidth: { sm: '20rem' } }}
                                    >
                                        {sortedWorkstations?.map((workstation) => (
                                            <MenuItem key={workstation.workstation_id} value={workstation.workstation_id}>
                                                {workstation.workstation_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
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
