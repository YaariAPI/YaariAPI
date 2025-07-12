import { Inject, Injectable } from "@nestjs/common";
import { Attachment } from "./attachment.entity";
import { CreateAttachmentDto } from "./dto/createAttachmentDto";
import { CONNECTION } from 'src/modules/workspace-manager/workspace.manager.symbols';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class AttachmentService {
    private attachmentRepository: Repository<Attachment>

    constructor(
         @Inject(CONNECTION) connection: Connection,
    ) { 
        this.attachmentRepository = connection.getRepository(Attachment);
    }

    // async findOneAttachment(senderId: number) {
    //     return await this.attachmentRepository.findOne({ where: { phoneNo: senderId }})
    // }

    async createOneAttachment(createAttachmentDto: CreateAttachmentDto) {
        const attachment = this.attachmentRepository.create({
            name : createAttachmentDto.name,
            type : createAttachmentDto.type,
            fullPath : createAttachmentDto.fullPath,
        });        
        await this.attachmentRepository.save(attachment);
        return attachment
    }

    // async DeleteContact(contactId : string){
    //     const deleteContact = await this.contactsRepository.findOne({ where : { id : contactId }});
    //     if (deleteContact)
    //         return  await this.contactsRepository.remove(deleteContact)
    //     else
    //         return null

    // }


}