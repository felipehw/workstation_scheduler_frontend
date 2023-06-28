import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ScheduleForm } from '../../forms/ScheduleForm/ScheduleForm';
import { ScheduleFormInputsSchema } from '../../forms/ScheduleForm/ScheduleForm.schema';
import {
    GET_SCHEDULE_DETAIL_KEY,
    GET_SCHEDULE_LIST_KEY,
    deleteSchedule,
    getScheduleDetail,
    updateSchedule,
} from '../../services/Schedule/ScheduleService';
import { CreateScheduleParamsSchema } from '../../services/Schedule/ScheduleService.schema';

export const ScheduleEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const scheduleDetailQuery = useQuery({
        cacheTime: 0,
        queryKey: [GET_SCHEDULE_DETAIL_KEY, id],
        queryFn: async () => await getScheduleDetail(Number(id)),
        onError: (error: AxiosError) => {
            navigate('/schedule');
            const message = (
                <div style={{ whiteSpace: 'pre-line' }}>
                    {`Ocorreu um erro:
                    ${error.message}`}
                </div>
            );
            toast.error(message);
        },
    });
    const updateScheduleMutation = useMutation({
        mutationFn: (params: CreateScheduleParamsSchema) => updateSchedule(Number(id), params),
        onSuccess: () => {
            queryClient.invalidateQueries(GET_SCHEDULE_LIST_KEY);
            navigate('/schedule');
            toast.success('Agendamento editado!');
        },
        onError: () => {
            toast.error('Falha ao editar agendamento.');
        },
    });
    const deleteScheduleMutation = useMutation({
        mutationFn: (id: number) => deleteSchedule(id),
        onSuccess: () => {
            queryClient.invalidateQueries(GET_SCHEDULE_LIST_KEY);
            navigate('/schedule');
            toast.success('Agendamento removido!');
        },
        onError: () => {
            toast.error('Falha ao remover agendamento.');
        },
    });
    const defaultValues: ScheduleFormInputsSchema | undefined = scheduleDetailQuery.data?.data
        ? {
              employee_name: scheduleDetailQuery.data?.data.employee_name,
              time_slot: scheduleDetailQuery.data?.data.time_slot,
              schedule_date: scheduleDetailQuery.data?.data.schedule_date,
              workstation: String(scheduleDetailQuery.data?.data.workstation_id),
          }
        : undefined;

    return defaultValues ? (
        <ScheduleForm
            defaultValues={defaultValues}
            onSubmit={(params) => updateScheduleMutation.mutate(params)}
            onDelete={() => deleteScheduleMutation.mutate(Number(id))}
        />
    ) : (
        <></>
    );
};
