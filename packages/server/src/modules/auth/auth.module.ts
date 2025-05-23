import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './strategies/jwt.strategy';
import { WorkspaceModule } from '../workspace/workspace.module';
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { User } from '../user/user.entity';
import { TypeORMModule } from 'src/database/typeorm/typeorm.module';
import { UserService } from '../user/user.service';
import { userAutoResolverOpts } from '../user/user.auto-resolver-opts';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([User,], 'core'),
        TypeORMModule,
        UserModule,
        WorkspaceModule,
        PassportModule,
        JwtModule.register({
          secret: 'secretKey',
          signOptions: { expiresIn: '7d' },
        }),
        WorkspaceModule,
      ],
      services: [UserService],
      resolvers: userAutoResolverOpts,
    }),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
