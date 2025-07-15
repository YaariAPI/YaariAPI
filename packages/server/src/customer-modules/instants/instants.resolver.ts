import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { instantsService } from './instants.service';
import { CreateFormDataInput } from './DTO/create-form-data.input';
import { UseGuards } from '@nestjs/common';
import { UpdatedInstantsDTO } from './DTO/updated-instants';
import { DeleteInstantsDTO } from './DTO/Delete-instants';
import { GqlAuthGuard } from 'src/modules/auth/guards/gql-auth.guard';
import { WhatsAppAccount } from '../whatsapp/entities/whatsapp-account.entity';

@Resolver(() => WhatsAppAccount)
export class instantsResolver {
    constructor(
        private readonly instantsservice: instantsService,
    ) { }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => WhatsAppAccount)
    async CreateInstants(@Context('req') req, @Args('InstantsData'
    ) WhatsappInstantsData: CreateFormDataInput): Promise<WhatsAppAccount | null | string> {
        return await this.instantsservice.CreateInstants(WhatsappInstantsData);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => WhatsAppAccount)
    async SyncAndSaveInstants(
        @Args('InstantsData') WhatsappInstantsData: CreateFormDataInput): Promise<WhatsAppAccount | null | string> {
        const instants = await this.instantsservice.CreateInstants(WhatsappInstantsData);
        if (instants && typeof instants !== 'string') {
            const syncTemplate = await this.instantsservice.SyncTemplate(instants, instants?.businessAccountId, instants?.accessToken)

        }
        return instants;
    }
    @UseGuards(GqlAuthGuard)
    @Mutation(() => WhatsAppAccount)
    async TestAndSaveInstants(@Args('InstantsData') WhatsappInstantsData: CreateFormDataInput): Promise<WhatsAppAccount | null | string> {
        const instants = await this.instantsservice.CreateInstants(WhatsappInstantsData);
        if (instants && typeof instants !== 'string') {
            const syncTemplate = await this.instantsservice.TestInstants(instants?.businessAccountId, instants?.accessToken)
        }
        return instants;
    }


    @UseGuards(GqlAuthGuard)
    @Query(() => [WhatsAppAccount])
    async findAllInstants(): Promise<WhatsAppAccount[]> {
        return await this.instantsservice.findAllInstants();
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => WhatsAppAccount)
    async findDefaultSelectedInstants(): Promise<WhatsAppAccount | null> {
        return await this.instantsservice.FindSelectedInstants();
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => WhatsAppAccount)
    async updateInstants(@Args('updateInstants') UpdatedInstants: UpdatedInstantsDTO): Promise<WhatsAppAccount | null> {
        return this.instantsservice.UpdateInstants(UpdatedInstants.id, UpdatedInstants)
    }

        @UseGuards(GqlAuthGuard)
    @Mutation(() => WhatsAppAccount)
    async SyncAndUpdateInstants(
        @Args('updateInstants') UpdatedInstants: UpdatedInstantsDTO): Promise<WhatsAppAccount | null | string> {
        const instants = await this.instantsservice.UpdateInstants(UpdatedInstants.id, UpdatedInstants);
        if (instants && typeof instants !== 'string') {
            const syncTemplate = await this.instantsservice.SyncTemplate(instants, instants?.businessAccountId, instants?.accessToken)

        }
        return instants;
    }
    @UseGuards(GqlAuthGuard)
    @Mutation(() => WhatsAppAccount)
    async TestAndUpdateInstants(@Args('updateInstants') UpdatedInstants: UpdatedInstantsDTO): Promise<WhatsAppAccount | null | string> {
        const instants = await this.instantsservice.UpdateInstants(UpdatedInstants.id, UpdatedInstants);
        if (instants && typeof instants !== 'string') {
            const syncTemplate = await this.instantsservice.TestInstants(instants?.businessAccountId, instants?.accessToken)
        }
        return instants;
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => WhatsAppAccount)
    async DeleteInstants(@Args('DeleteInstants') DeleteInstants: DeleteInstantsDTO): Promise<WhatsAppAccount | null> {
        return this.instantsservice.DeleteInstants(DeleteInstants.id)
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => [WhatsAppAccount])
    async InstantsSelection(@Args('instantsId') instantsId: string): Promise<WhatsAppAccount[]> {
        return await this.instantsservice.InstantsSelection(instantsId);
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => String)
    async sendTemplateMessage () {
        return this.instantsservice.sendTemplateMessage();
    }

}
