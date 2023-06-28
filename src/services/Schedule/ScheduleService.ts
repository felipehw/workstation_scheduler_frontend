import { api } from '../../lib/api';
import {
    CreateScheduleParamsSchema,
    CreateScheduleResponseSchema,
    DeleteScheduleResponseSchema,
    ScheduleResponseSchema,
    UpdateScheduleParamsSchema,
    UpdateScheduleeResponseSchema,
} from './ScheduleService.schema';

export const GET_SCHEDULE_LIST_KEY = 'getScheduleList';
export const getScheduleList = () => api.get<ScheduleResponseSchema[]>('/schedules/');
export const GET_SCHEDULE_DETAIL_KEY = 'getScheduleDetail';
export const getScheduleDetail = (id: number) => api.get<ScheduleResponseSchema>(`/schedules/${id}/`);

export const createSchedule = (params: CreateScheduleParamsSchema) => api.post<CreateScheduleResponseSchema>('/schedules/create/', params);
export const updateSchedule = (id: number, params: UpdateScheduleParamsSchema) =>
    api.put<UpdateScheduleeResponseSchema>(`/schedules/${id}/update/`, params);
export const deleteSchedule = (id: number) => api.delete<DeleteScheduleResponseSchema>(`/schedules/${id}/delete/`);
