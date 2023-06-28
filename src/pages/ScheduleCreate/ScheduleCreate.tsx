import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ScheduleForm } from '../../forms/ScheduleForm/ScheduleForm';
import { GET_SCHEDULE_LIST_KEY, createSchedule } from '../../services/Schedule/ScheduleService';
import { CreateScheduleParamsSchema } from '../../services/Schedule/ScheduleService.schema';

export const ScheduleCreate = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const createScheduleMutation = useMutation({
        mutationFn: (params: CreateScheduleParamsSchema) => createSchedule(params),
        onSuccess: () => {
            queryClient.invalidateQueries(GET_SCHEDULE_LIST_KEY);
            navigate('/schedule');
            toast.success('Agendamento criado!');
        },
        onError: () => {
            toast.error('Falha ao criar agendamento.');
        },
    });

    return <ScheduleForm onSubmit={(params) => createScheduleMutation.mutate(params)} />;
};
