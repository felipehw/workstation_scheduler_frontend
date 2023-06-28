import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { WorkstationForm } from '../../forms/WorkstationForm/WorkstationForm';
import { GET_WORKSTATION_LIST_KEY, createWorkstation } from '../../services/Workstation/WorkstationService';
import { CreateWorkstationParamsSchema } from '../../services/Workstation/WorkstationService.schema';

export const WorkstationCreate = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const createWorkstationMutation = useMutation({
        mutationFn: (params: CreateWorkstationParamsSchema) => createWorkstation(params),
        onSuccess: () => {
            queryClient.invalidateQueries(GET_WORKSTATION_LIST_KEY);
            navigate('/workstation');
            toast.success('Estação de traballho cadastrada!');
        },
        onError: () => {
            toast.error('Falha ao cadastrar estação de trabalho.');
        },
    });

    return <WorkstationForm onSubmit={(params) => createWorkstationMutation.mutate(params)} />;
};
