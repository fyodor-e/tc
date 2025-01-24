import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product/entities/product.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PhotoModule } from './photo/photo.module';
import EnvironmentVariables from './environment-variables';

@Module({
  imports: [
    ProductModule,
    PhotoModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvironmentVariables>) => {
        return {
          type: 'postgres',
          url: configService.get('POSTGRESS_URI'),
          entities: [Product],
          schema: 'public',
        };
      },
    }),
  ],
})
export class AppModule {}
