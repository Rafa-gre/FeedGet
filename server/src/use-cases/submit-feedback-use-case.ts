import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repo";
import { PrismaFeedbacksRepository } from "../repositories/prisma/prisma-feedbacks-repository";

export interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase{
 constructor(
   private feedbacksRepository: FeedbacksRepository,
   private mailAdapter: MailAdapter
 ){}
 

  async execute(request: SubmitFeedbackUseCaseRequest){
    const { type, comment, screenshot} = request;

    if(!type){
      throw new Error('type is required');
    }

    if(!comment){
      throw new Error('comment is required');
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64,')){
      throw new Error('Screenshot must be a base64 encoded string');
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    })

    await this.mailAdapter.sendMail({
      subject:'Novo feedback no FeedGet',
      body:[
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<p>Tipo de feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot ?
        `<p>Screenshot: <img src="${screenshot}" alt="Screenshot do feedback" /></p>`
        : 
        '',
        `</div>`
      ].join('\n')

    })
  }
} 
