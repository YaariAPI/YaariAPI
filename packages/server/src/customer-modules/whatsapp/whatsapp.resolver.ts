import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UseGuards } from '@nestjs/common';
import graphqlTypeJson from 'graphql-type-json';


import { WhatsAppAccount } from './entities/whatsapp-account.entity';
import { WhatsAppTemplate } from './entities/whatsapp-template.entity';
import { WhatsAppAccountService } from './services/whatsapp-account.service';
import { WhatsAppSDKService } from './services/whatsapp-api.service'
import { TemplateService } from './services/whatsapp-template.service';
import { instantsService } from "src/customer-modules/instants/instants.service";
import { WhatsappInstants } from 'src/customer-modules/instants/Instants.entity';
import { GqlAuthGuard } from 'src/modules/auth/guards/gql-auth.guard';
import { WaTemplateRequestInput } from 'src/customer-modules/whatsapp/dtos/whatsapp.template.dto';
import { WaTemplateResponseDto } from 'src/customer-modules/whatsapp/dtos/whatsapp.response.dto';

@Resolver(() => WhatsappInstants)
export class WhatsAppResolver {
  // constructor(
  //   private readonly whatsAppApiService: WhatsAppSDKService,
  //   private readonly instantsService: instantsService) { }

  constructor(
    private readonly whatsAppAccountService: WhatsAppAccountService,
    private readonly whatsAppApiService: WhatsAppSDKService,
    private readonly instantsService: instantsService,
    private readonly waTemplateService: TemplateService
  ) { }


  // @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  async testConnection(
    @Context('req') req,
  ): Promise<String> {
    const findTrueInstants = await this.instantsService.FindSelectedInstants()

    if (!findTrueInstants)
      throw new Error("Not found whatsappaccount")

    const wa_api = this.whatsAppApiService.getWhatsApp(findTrueInstants)

    try {
      wa_api._test_connection()
    }
    catch (err) {
      return "{'status': 401, 'error': 'Credentials not look good!'}"
    }

    return "{'status': 200, 'message': 'Credentials look good!'}"
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [WhatsAppAccount])
  async findAllWhatsAppAccounts(): Promise<WhatsAppAccount[]> {
    return await this.whatsAppAccountService.findAllAccounts();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => graphqlTypeJson)
  async getAllWhatsAppTemplates() {
    const wa_api = await this.getWhatsAppApi()
    const data = await wa_api.getAllTemplate();
    return data;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => graphqlTypeJson)
  async getWaTemplatesDetails(@Args('waTemplateId') waTemplateId: string) {
    const findTrueInstants = await this.instantsService.FindSelectedInstants()

    if (!findTrueInstants)
      throw new Error("Not found whatsappaccount")

    const wa_api = this.whatsAppApiService.getWhatsApp(findTrueInstants)
    const data = await wa_api.getTemplateData(waTemplateId);
    return data;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => WaTemplateResponseDto)
  async submitWaTemplate(
    @Context('req') req, @Args('templateData') templateData: WaTemplateRequestInput,
    @Args('dbTemplateId', { nullable: true }) dbTemplateId?: string
  ): Promise<WaTemplateResponseDto> {
    const wa_api = await this.getWhatsAppApi(templateData.account)
    const payload = await this.waTemplateService.generatePayload(templateData);
    const payload_json = JSON.stringify({ ...payload });

    let response;
    if (dbTemplateId) {
      const template =  await this.waTemplateService.updateTemplate(payload, dbTemplateId)
      console.log(template,'....................');
      console.log(template.templateId,'....................');
      console.log(dbTemplateId,'......dbTemplateId..............');
      
      response = await wa_api.submitTemplateUpdate(payload_json, template.templateId);
      await this.waTemplateService.updateTemplate(JSON.parse(response.data), template.id)
      
    } else {
    const savedTemplate = await this.waTemplateService.saveTemplate(payload,templateData.account)
      response = await wa_api.submitTemplateNew(payload_json);
      await this.waTemplateService.updateTemplate(JSON.parse(response.data), savedTemplate.id)
    }
    return response
  }

  async getWhatsAppApi(instantsId?: string) {
    if (instantsId) {
      const instants = await this.instantsService.findInstantsByInstantsId(instantsId)
      if (!instants)
        throw new Error("Not found whatsappaccount")
      return this.whatsAppApiService.getWhatsApp(instants)
    } else {
      const findTrueInstants = await this.instantsService.FindSelectedInstants()
      if (!findTrueInstants)
        throw new Error("Not found whatsappaccount")

      return this.whatsAppApiService.getWhatsApp(findTrueInstants)
    }
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => WaTemplateResponseDto)
  async sendWaTemplate(
    @Context('req') req,
    @Args('waTemplateId') waTemplateId: string
  ) {
    const wa_api = await this.getWhatsAppApi()

  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [WhatsAppTemplate])
  async findAllTemplate(@Context('req') req): Promise<WhatsAppTemplate[]> {
    const data = await this.waTemplateService.findAllTemplate();
    return data
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => WaTemplateResponseDto)
  async submitTemplate(
    @Context('req') req, @Args('templateData') templateData: WaTemplateRequestInput,
  ): Promise<WaTemplateResponseDto> {
    const result = await this.waTemplateService.submitTemplate(templateData);
    // return {
    //     success: result.success,
    //     data: result.data ? JSON.stringify(result.data) : undefined,
    //     error: result.error ? JSON.stringify(result.error) : undefined,
    // };
    return result
  }

}