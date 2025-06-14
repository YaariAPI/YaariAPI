import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Channel } from 'src/modules/channel/channel.entity';
import { Message } from 'src/modules/channel/message.entity';

import { Contacts } from 'src/modules/contacts/contacts.entity';
import { Template } from 'src/modules/template/template.entity';
import { User } from 'src/modules/user/user.entity';
import { WhatsappInstants } from 'src/modules/whatsapp/Instants.entity';
import { Workspace } from 'src/modules/workspace/workspace.entity';
import { WorkspaceMember } from 'src/modules/workspace/workspaceMember.entity';



import { DataSource } from 'typeorm';

// import { EnvironmentService } from 'src/constro/integrations/environment/environment.service';
// import { DataSourceEntity } from 'src/constro/metadata-modules/data-source/data-source.entity';
// import { User } from 'src/constro/modules/user/user.entity';

// import { Workspace } from 'src/engine/core-modules/workspace/workspace.entity';
// import { AppToken } from 'src/engine/core-modules/app-token/app-token.entity';
// import { FeatureFlagEntity } from 'src/engine/core-modules/feature-flag/feature-flag.entity';
// import { BillingSubscription } from 'src/engine/core-modules/billing/entities/billing-subscription.entity';
// import { BillingSubscriptionItem } from 'src/engine/core-modules/billing/entities/billing-subscription-item.entity';
// import { UserWorkspace } from 'src/engine/core-modules/user-workspace/user-workspace.entity';

@Injectable()
export class TypeORMService implements OnModuleInit, OnModuleDestroy {
  private mainDataSource: DataSource;
  private dataSources: Map<string, DataSource> = new Map();
  private isDatasourceInitializing: Map<string, boolean> = new Map();

//   constructor(private readonly environmentService: EnvironmentService) {
 constructor () {
    this.mainDataSource = new DataSource({
      url: process.env.PG_DATABASE_URL,
      type: 'postgres',
      logging: false,
      schema: 'core',
      entities: [
        User,
        WhatsappInstants,
        Contacts,
        Channel,
        Message,
        Workspace,
        WorkspaceMember,
        Template
        // Workspace,
        // UserWorkspace,
        // AppToken,
        // FeatureFlagEntity,
        // BillingSubscription,
        // BillingSubscriptionItem,
      ],
      // synchronize: true,
      // ssl: environmentService.get('PG_SSL_ALLOW_SELF_SIGNED')
      //   ? {
      //       rejectUnauthorized: false,
      //     }
      //   : undefined,
      ssl: undefined,
    });
  }

  public getMainDataSource(): DataSource {
    return this.mainDataSource;
  }

//   public async connectToDataSource(
//     dataSource: DataSourceEntity,
//   ): Promise<DataSource | undefined> {
//     const isMultiDatasourceEnabled = false;

//     if (isMultiDatasourceEnabled) {
//       // Wait for a bit before trying again if another initialization is in progress
//       while (this.isDatasourceInitializing.get(dataSource.id)) {
//         await new Promise((resolve) => setTimeout(resolve, 10));
//       }

//       if (this.dataSources.has(dataSource.id)) {
//         return this.dataSources.get(dataSource.id);
//       }

//       this.isDatasourceInitializing.set(dataSource.id, true);

//       try {
//         const dataSourceInstance =
//           await this.createAndInitializeDataSource(dataSource);

//         this.dataSources.set(dataSource.id, dataSourceInstance);

//         return dataSourceInstance;
//       } finally {
//         this.isDatasourceInitializing.delete(dataSource.id);
//       }
//     }

//     return this.mainDataSource;
//   }

//   private async createAndInitializeDataSource(
//     dataSource: DataSourceEntity,
//   ): Promise<DataSource> {
//     const schema = dataSource.schema;

//     const workspaceDataSource = new DataSource({
//       url: dataSource.url ?? 'postgres://vipul-patel:123@localhost:5433/default',
//       type: 'postgres',
//       // logging: this.environmentService.get('DEBUG_MODE')
//       //   ? ['query', 'error']
//       //   : ['error'],
//       schema,
//       // ssl: this.environmentService.get('PG_SSL_ALLOW_SELF_SIGNED')
//       //   ? {
//       //       rejectUnauthorized: false,
//       //     }
//       //   : undefined,
//       ssl: undefined,
//     });

//     await workspaceDataSource.initialize();

//     return workspaceDataSource;
//   }

  public async disconnectFromDataSource(dataSourceId: string) {
    if (!this.dataSources.has(dataSourceId)) {
      return;
    }

    const dataSource = this.dataSources.get(dataSourceId);

    await dataSource?.destroy();

    this.dataSources.delete(dataSourceId);
  }

  public async createSchema(schemaName: string): Promise<string> {
    const queryRunner = this.mainDataSource.createQueryRunner();

    await queryRunner.createSchema(schemaName, true);

    await queryRunner.release();

    return schemaName;
  }

  public async deleteSchema(schemaName: string) {
    const queryRunner = this.mainDataSource.createQueryRunner();

    await queryRunner.dropSchema(schemaName, true, true);

    await queryRunner.release();
  }

  async onModuleInit() {
    // Init main data source "default" schema
    await this.mainDataSource.initialize();
  }

  async onModuleDestroy() {
    // Destroy main data source "default" schema
    await this.mainDataSource.destroy();

    // // Destroy all workspace data sources
    for (const [, dataSource] of this.dataSources) {
      await dataSource.destroy();
    }
  }
}
