import { api } from '../../lib/api';
import {
    CreateWorkstationParamsSchema,
    CreateWorkstationResponseSchema,
    DeleteWorkstationResponseSchema,
    UpdateWorkstationParamsSchema,
    UpdateWorkstationeResponseSchema,
    WorkstationResponseSchema,
} from './WorkstationService.schema';

export const GET_WORKSTATION_LIST_KEY = 'getWorkstationList';
export const getWorkstationList = () => api.get<WorkstationResponseSchema[]>('/workstations/');
export const GET_WORKSTATION_DETAIL_KEY = 'getWorkstationDetail';
export const getWorkstationDetail = (id: number) => api.get<WorkstationResponseSchema>(`/workstations/${id}/`);

export const createWorkstation = (params: CreateWorkstationParamsSchema) =>
    api.post<CreateWorkstationResponseSchema>('/workstations/create/', params);
export const updateWorkstation = (id: number, params: UpdateWorkstationParamsSchema) =>
    api.put<UpdateWorkstationeResponseSchema>(`/workstations/${id}/update/`, params);
export const deleteWorkstation = (id: number) => api.delete<DeleteWorkstationResponseSchema>(`/workstations/${id}/delete/`);
