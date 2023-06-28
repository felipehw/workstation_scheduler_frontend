import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { WorkstationForm } from '../../forms/WorkstationForm/WorkstationForm';
import { WorkstationFormInputsSchema } from '../../forms/WorkstationForm/WorkstationForm.schema';
import {
    GET_WORKSTATION_DETAIL_KEY,
    GET_WORKSTATION_LIST_KEY,
    deleteWorkstation,
    getWorkstationDetail,
    updateWorkstation,
} from '../../services/Workstation/WorkstationService';
import { CreateWorkstationParamsSchema } from '../../services/Workstation/WorkstationService.schema';

export const WorkstationEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const workstationDetailQuery = useQuery({
        cacheTime: 0,
        queryKey: [GET_WORKSTATION_DETAIL_KEY, id],
        queryFn: async () => await getWorkstationDetail(Number(id)),
        onError: (error: AxiosError) => {
            navigate('/workstation');
            const message = (
                <div style={{ whiteSpace: 'pre-line' }}>
                    {`Ocorreu um erro:
                    ${error.message}`}
                </div>
            );
            toast.error(message);
        },
    });
    const updateWorkstationMutation = useMutation({
        mutationFn: (params: CreateWorkstationParamsSchema) => updateWorkstation(Number(id), params),
        onSuccess: () => {
            queryClient.invalidateQueries(GET_WORKSTATION_LIST_KEY);
            navigate('/workstation');
            toast.success('Estação de trabalho editada!');
        },
        onError: () => {
            toast.error('Falha ao editar estação de trabalho.');
        },
    });
    const deleteWorkstationMutation = useMutation({
        mutationFn: (id: number) => deleteWorkstation(id),
        onSuccess: () => {
            queryClient.invalidateQueries(GET_WORKSTATION_LIST_KEY);
            navigate('/workstation');
            toast.success('Estação de trabalho removida!');
        },
        onError: () => {
            toast.error('Falha ao remover estação de trabalho.');
        },
    });
    const defaultValues: WorkstationFormInputsSchema | undefined = workstationDetailQuery.data?.data
        ? {
              workstation_name: workstationDetailQuery.data?.data.workstation_name,
              availability_status: workstationDetailQuery.data?.data.availability_status,
          }
        : undefined;

    return defaultValues ? (
        <WorkstationForm
            defaultValues={defaultValues}
            onSubmit={(params) => updateWorkstationMutation.mutate(params)}
            onDelete={() => deleteWorkstationMutation.mutate(Number(id))}
        />
    ) : (
        <></>
    );
};
