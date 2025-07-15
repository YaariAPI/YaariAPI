import {
  AutoResolverOpts,
  ReadResolverOpts,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { WhatsAppAccount } from '../whatsapp/entities/whatsapp-account.entity';


export const whatappinstanstsAutoResolverOpts: AutoResolverOpts<
  any,
  any,
  unknown,
  unknown,
  ReadResolverOpts<any>,
  PagingStrategies
>[] = [
    {
      EntityClass: WhatsAppAccount,
      DTOClass: WhatsAppAccount,
      enableTotalCount: true,
      pagingStrategy: PagingStrategies.CURSOR,
      read: {
        many: { disabled: true },
        one: { disabled: true },
      },
      create: {
        many: { disabled: true },
        one: { disabled: true },
      },
      update: {
        many: { disabled: true },
        one: { disabled: true },
      },
      delete: { many: { disabled: true }, one: { disabled: true } },
    },
  ];