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
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DeleteModal } from '../../components/DeleteModal/DeleteModal';
import { GET_WORKSTATION_LIST_KEY, deleteWorkstation, getWorkstationList } from '../../services/Workstation/WorkstationService';
import { AvailabilityStatusString } from '../../services/Workstation/WorkstationService.schema';

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

export const WorkstationList = () => {
    const [deleteModalState, setDeleteModalState] = useState<DeleteModalIsOpen>({ isOpen: false, id: undefined });

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

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
    const deleteWorkstationMutation = useMutation({
        mutationFn: (id: number) => deleteWorkstation(id),
        onSuccess: () => {
            queryClient.invalidateQueries(GET_WORKSTATION_LIST_KEY);
            toast.success('Estação de trabalho removida!');
        },
        onError: () => {
            toast.error('Falha ao remover estação de trabalho.');
        },
    });
    const workstationSortedItems = workstationListQuery.data?.data.sort((a, b) => a.workstation_name.localeCompare(b.workstation_name));
    const smallTable = (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Estação de trabalho</TableCell>
                        <TableCell align="right">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {workstationSortedItems?.map((workstation) => (
                        <TableRow
                            key={workstation.workstation_id}
                            sx={(theme) => ({
                                cursor: 'pointer',
                                '&:last-child td, &:last-child th': { border: 0 },
                                ':hover': {
                                    backgroundColor: theme.palette.background.default,
                                    filter: 'brightness(95%)',
                                },
                            })}
                            onClick={() => {
                                navigate(`/workstation/${workstation.workstation_id}/edit`);
                            }}
                        >
                            <TableCell component="th" scope="row">
                                {workstation.workstation_name}
                            </TableCell>
                            <TableCell align="right">{AvailabilityStatusString[workstation.availability_status]}</TableCell>
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
                        <TableCell>Estação de trabalho</TableCell>
                        <TableCell align="right">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {workstationSortedItems?.map((workstation) => (
                        <TableRow key={workstation.workstation_id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                {workstation.workstation_name}
                            </TableCell>
                            <TableCell align="right">{AvailabilityStatusString[workstation.availability_status]}</TableCell>
                            <TableCell align="right">
                                <IconButton
                                    aria-label="delete"
                                    color="info"
                                    onClick={() => {
                                        navigate(`/workstation/${workstation.workstation_id}/edit`);
                                    }}
                                >
                                    <Edit />
                                </IconButton>
                                <IconButton
                                    aria-label="delete"
                                    color="error"
                                    onClick={() => {
                                        setDeleteModalState({ isOpen: true, id: Number(workstation.workstation_id) });
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
    return workstationSortedItems ? (
        <>
            <DeleteModal
                title="Apagar estação de trabalho?"
                open={deleteModalState.isOpen}
                onClose={() => setDeleteModalState({ isOpen: false, id: undefined })}
                onDelete={() => {
                    deleteWorkstationMutation.mutate(deleteModalState.id as number);
                    setDeleteModalState({ isOpen: false, id: undefined });
                }}
            />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h5" mb={2}>
                        Estações de trabalho
                    </Typography>
                    {isSmallScreen ? smallTable : table}
                </Grid>
            </Grid>
        </>
    ) : (
        <></>
    );
};
