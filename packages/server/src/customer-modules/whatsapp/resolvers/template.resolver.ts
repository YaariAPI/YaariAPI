import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "src/modules/auth/guards/gql-auth.guard";
import { WhatsAppTemplate } from "../entities/whatsapp-template.entity";
import { WaTemplateResponseDto } from "../dtos/whatsapp.response.dto";
import { WaTemplateRequestInput } from "../dtos/whatsapp.template.dto";
import { TemplateService } from "../services/whatsapp-template.service";
import { TemplateResponseDto } from "src/customer-modules/template/dto/TemplateResponseDto";

@Resolver(() => WhatsAppTemplate)
export class TemplateResolver {
    constructor(
        private readonly templateService: TemplateService,
    ) { }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => WhatsAppTemplate)
    async saveTemplate(@Args('templateData') templateData: WaTemplateRequestInput) : Promise<WhatsAppTemplate> {
        const payload = await this.templateService.generatePayload(templateData)
        return await this.templateService.saveTemplate(payload, templateData.account);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => WhatsAppTemplate)
    async updateTemplate(@Args('templateData') templateData: WaTemplateRequestInput, 
                         @Args('dbTemplateId') dbTemplateId: string) : Promise<WhatsAppTemplate> {
          try {
    const payload = await this.templateService.generatePayload(templateData);
    return await this.templateService.updateTemplate(payload, dbTemplateId);
  } catch (err) {
    console.error("UpdateTemplate Resolver Error:", err);
    throw err;
  }
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => TemplateResponseDto)
    async getTemplateStatus(@Args('templateId') templateId: string): Promise<TemplateResponseDto> {
        const result = await this.templateService.getTemplateStatusByCron(templateId);
        if (!result) throw new Error("result doesnt found in resolver templateResolver")

        return {
            success: result.success,
            data: result.data ? JSON.stringify(result.data) : undefined,
            error: result.error ? JSON.stringify(result.error) : undefined,
        };
    }

}

