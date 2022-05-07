"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const submit_feedback_use_case_1 = require("./submit-feedback-use-case");
const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();
const submitFeedback = new submit_feedback_use_case_1.SubmitFeedbackUseCase({ create: createFeedbackSpy }, { sendMail: sendMailSpy });
describe('Submit Feedback', () => {
    it('should be able to submit a feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'bug',
            comment: 'teste',
            screenshot: 'data:image/jpeg;base64,sdasdasdasdad'
        })).resolves.not.toThrow();
        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });
    it('should throw an error if type is not provided', async () => {
        await expect(submitFeedback.execute({
            type: "",
            comment: 'teste',
            screenshot: 'data:image/jpeg;base64,sdasdasdasdad'
        })).rejects.toThrow();
    });
    it('should throw an error if type is not provided', async () => {
        await expect(submitFeedback.execute({
            type: "BUG",
            comment: '',
            screenshot: 'data:image/jpeg;base64,sdasdasdasdad'
        })).rejects.toThrow();
    });
    it('should throw an error if screenshot is not base64img', async () => {
        await expect(submitFeedback.execute({
            type: "BUG",
            comment: 'teste',
            screenshot: 'teste.jpg'
        })).rejects.toThrow();
    });
});
