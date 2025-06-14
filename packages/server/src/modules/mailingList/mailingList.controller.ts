import { Body, Controller, Get, Post, UseGuards, UseInterceptors, UploadedFile, Req } from '@nestjs/common';
import { FileInterceptor, } from '@nestjs/platform-express';
import { MailingListService } from './mailingList.service';
import * as XLSX from 'xlsx';
import { AuthGuard } from '@nestjs/passport';
import { MailingListInputDto } from './DTO/MailingListReqDto';
import { Request } from 'express';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';

@Controller('uploadExcel')
export class MailingListController {
    constructor(
        private readonly mailingListService: MailingListService,
    ) { }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(GqlAuthGuard)    
    async uploadExcel(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {

        const workbook = XLSX.read(file.buffer, { type: 'buffer' });
        console.log(workbook,"workbookworkbookworkbookworkbook");
        
        const sheetName = workbook.SheetNames[0];
        console.log(sheetName, "sheetNamesheetNamesheetNamesheetName");
        
        const worksheet = workbook.Sheets[sheetName];
        console.log(worksheet,"worksheetworksheetworksheetworksheet");
        
        const mailingListData: any = XLSX.utils.sheet_to_json(worksheet);
        const workspaceId : any = req.headers['x-workspace-id'];
        console.log(workspaceId,".................");
        
        return this.mailingListService.CreateMailingList({ mailingContacts: mailingListData }, workspaceId);
    }
}