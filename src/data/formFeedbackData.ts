const requiredMessage = 'Campo obrigatório';
const invalidMessage = 'Campo inválido';
const invalidatePercentage = 'Porcentagem inválida';
const invalidDateFormatMessage = 'Insira a data no formato DD/MM/YYYY';
const invalidDateMessage = 'Data inválida';

export const formFeedback = {
    general: {
        required: requiredMessage,
        invalid: invalidMessage,
        percentage: invalidatePercentage,
    },
    date: {
        invalidFormat: invalidDateFormatMessage,
        invalid: invalidDateMessage,
    },
};
