import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { CartEntity } from './entities/carts.entity';
import { CartItemEntity } from './entities/cart-items.entity';
import { UserEntity } from './entities/users.entity';
import { OrderEntity } from './entities/order.entity';
import { ProductEntity } from './entities/product.entity';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.DATABASE_HOST,
			port: +process.env.DATABASE_PORT,
			username: process.env.DATABASE_USERNAME,
			password: process.env.DATABASE_PASSWORD,
			database: process.env.DATABASE_NAME,
			entities: [ CartEntity, CartItemEntity, UserEntity, OrderEntity, ProductEntity ],
			ssl: {
		    rejectUnauthorized: false,
	    },
		  namingStrategy: new SnakeNamingStrategy(),
			logging: false
		}),
		TypeOrmModule.forFeature([ CartEntity, CartItemEntity, UserEntity, OrderEntity, ProductEntity ]),
	],
	exports: [ TypeOrmModule ]
})
export class DatabaseModule {}
