export enum TimeSlotString {
    morning = 'Matutino',
    afternoon = 'Vespertino',
    night = 'Noturno',
}
export type TimeSlot = keyof typeof TimeSlotString;

export interface ScheduleResponseSchema {
    schedule_id: number;
    employee_name: string;
    workstation_id: number;
    schedule_date: string;
    time_slot: TimeSlot;
}

export type CreateScheduleParamsSchema = Omit<ScheduleResponseSchema, 'schedule_id' | 'workstation_id'> & {
    workstation: number;
};
export interface CreateScheduleResponseSchema {
    message: string;
    schedule_id: number;
}

export type UpdateScheduleParamsSchema = Partial<CreateScheduleParamsSchema>;
export type UpdateScheduleeResponseSchema = CreateScheduleResponseSchema;

export interface DeleteScheduleResponseSchema {
    message: string;
}
