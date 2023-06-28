import { CreateScheduleParamsSchema, TimeSlot } from '../../services/Schedule/ScheduleService.schema';

export type ScheduleFormInputsSchema = Omit<CreateScheduleParamsSchema, 'time_slot' | 'workstation'> & {
    time_slot: TimeSlot | '';
    workstation: string;
};
