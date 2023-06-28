import { AvailabilityStatus, CreateWorkstationParamsSchema } from '../../services/Workstation/WorkstationService.schema';

export type WorkstationFormInputsSchema = Omit<CreateWorkstationParamsSchema, 'availability_status'> & {
    availability_status: AvailabilityStatus | '';
};
