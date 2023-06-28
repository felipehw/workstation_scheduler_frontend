export enum AvailabilityStatusString {
    available = 'Disponível',
    scheduled = 'Indisponível',
}
export type AvailabilityStatus = keyof typeof AvailabilityStatusString;

export interface WorkstationResponseSchema {
    workstation_id: number;
    workstation_name: string;
    availability_status: AvailabilityStatus;
}

export type CreateWorkstationParamsSchema = Omit<WorkstationResponseSchema, 'workstation_id'>;
export interface CreateWorkstationResponseSchema {
    message: string;
    workstation_id: number;
}

export type UpdateWorkstationParamsSchema = Partial<CreateWorkstationParamsSchema>;
export type UpdateWorkstationeResponseSchema = CreateWorkstationResponseSchema;

export interface DeleteWorkstationResponseSchema {
    message: string;
}
