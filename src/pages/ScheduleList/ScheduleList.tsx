import { Delete, Edit } from '@mui/icons-material';
import {
    Grid,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { AxiosError } from 'axios';
import moment from 'moment';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DeleteModal } from '../../components/DeleteModal/DeleteModal';
import { GET_SCHEDULE_LIST_KEY, deleteSchedule, getScheduleList } from '../../services/Schedule/ScheduleService';
import { TimeSlotString } from '../../services/Schedule/ScheduleService.schema';
import { GET_WORKSTATION_LIST_KEY, getWorkstationList } from '../../services/Workstation/WorkstationService';

type DeleteModalIsOpen =
    | {
          isOpen: false;
          id: undefined;
      }
    | {
          isOpen: true;
          id: number;
      };

const sortDateFn = (a: string, b: string) => {
    const dateA = new Date(a).getTime();
    const dateB = new Date(b).getTime();
    return dateA - dateB;
};

export const ScheduleList = () => {
    const [deleteModalState, setDeleteModalState] = useState<DeleteModalIsOpen>({ isOpen: false, id: undefined });

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const scheduleListQuery = useQuery({
        queryKey: [GET_SCHEDULE_LIST_KEY],
        queryFn: async () => await getScheduleList(),
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
    const deleteScheduleMutation = useMutation({
        mutationFn: (id: number) => deleteSchedule(id),
        onSuccess: () => {
            queryClient.invalidateQueries(GET_SCHEDULE_LIST_KEY);
            toast.success('Agendamento removido!');
        },
        onError: () => {
            toast.error('Falha ao remover agendamento.');
        },
    });
    const scheduleSortedItems = scheduleListQuery.data?.data.sort((scheduleA, scheduleB) =>
        sortDateFn(scheduleA.schedule_date, scheduleB.schedule_date)
    );
    const workstationItems = workstationListQuery.data?.data;
    const smallTable = (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Data</TableCell>
                        <TableCell align="right">Funcionário</TableCell>
                        <TableCell align="right">Estação</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {scheduleSortedItems?.map((schedule) => (
                        <TableRow
                            key={schedule.schedule_id}
                            sx={(theme) => ({
                                cursor: 'pointer',
                                '&:last-child td, &:last-child th': { border: 0 },
                                ':hover': {
                                    backgroundColor: theme.palette.background.default,
                                    filter: 'brightness(95%)',
                                },
                            })}
                            onClick={() => {
                                navigate(`/schedule/${schedule.schedule_id}/edit`);
                            }}
                        >
                            <TableCell component="th" scope="row">
                                {moment(schedule.schedule_date).format('DD/MM/YYYY')} <br />
                                {TimeSlotString[schedule.time_slot]}
                            </TableCell>
                            <TableCell align="right">{schedule.employee_name}</TableCell>
                            <TableCell align="right">
                                {workstationItems?.find((workstation) => workstation.workstation_id === schedule.workstation_id)
                                    ?.workstation_name ?? schedule.workstation_id}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
    const table = (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Data</TableCell>
                        <TableCell align="right">Período</TableCell>
                        <TableCell align="right">Funcionário</TableCell>
                        <TableCell align="right" sx={{ minWidth: 120 }}>
                            Estação de trabalho
                        </TableCell>
                        <TableCell align="right" sx={{ minWidth: 120 }}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {scheduleSortedItems?.map((schedule) => (
                        <TableRow key={schedule.schedule_id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                {moment(schedule.schedule_date).format('DD/MM/YYYY')}
                            </TableCell>
                            <TableCell align="right">{TimeSlotString[schedule.time_slot]}</TableCell>
                            <TableCell align="right">{schedule.employee_name}</TableCell>
                            <TableCell align="right">
                                {workstationItems?.find((workstation) => workstation.workstation_id === schedule.workstation_id)
                                    ?.workstation_name ?? schedule.workstation_id}
                            </TableCell>
                            <TableCell align="right">
                                <IconButton
                                    aria-label="delete"
                                    color="info"
                                    onClick={() => {
                                        navigate(`/schedule/${schedule.schedule_id}/edit`);
                                    }}
                                >
                                    <Edit />
                                </IconButton>
                                <IconButton
                                    aria-label="delete"
                                    color="error"
                                    onClick={() => {
                                        setDeleteModalState({ isOpen: true, id: Number(schedule.schedule_id) });
                                    }}
                                >
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
    return scheduleSortedItems && workstationItems ? (
        <>
            <DeleteModal
                title="Apagar agendamento?"
                open={deleteModalState.isOpen}
                onClose={() => setDeleteModalState({ isOpen: false, id: undefined })}
                onDelete={() => {
                    deleteScheduleMutation.mutate(deleteModalState.id as number);
                    setDeleteModalState({ isOpen: false, id: undefined });
                }}
            />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h5" mb={2}>
                        Agendamentos
                    </Typography>
                    {isSmallScreen ? smallTable : table}
                </Grid>
            </Grid>
        </>
    ) : (
        <></>
    );
};
