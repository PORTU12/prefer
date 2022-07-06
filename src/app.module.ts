import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({/*Import ConfigModule into the root AppModule and control its behavior 
using the .forRoot() static method*/
  imports: [ConfigModule.forRoot({ isGlobal:true}),
    /*Creer une relation avec notre base de données, lien avec .env file*/
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POST_HOST,
      port: parseInt(<string>process.env.POST_PORT),
      username : process.env.POST_USER,
      password : process.env.POST_PASSWORD,
      database : process.env.POST_DATABASE,
      autoLoadEntities: true,
      
      synchronize: true,
    }), UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
