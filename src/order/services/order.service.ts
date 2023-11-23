import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

import { Order } from '../models';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Entity, EntityManager, Repository } from 'typeorm';
import { OrderEntity } from 'src/database/entities/order.entity';
import { CartEntity } from 'src/database/entities/carts.entity';
import { StatusType } from 'src/shared';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async findById(id: string): Promise<OrderEntity> {
    return this.orderRepository.findOneBy({ id });
  }

  async create(data: Order): Promise<OrderEntity> {
    const order = {
      ...data,
      status: StatusType.OPEN
    };
    const newOrder = this.orderRepository.create(order);

    await this.entityManager.transaction(async () => {
      await this.orderRepository.save(newOrder);
      await this.cartRepository.update(
        { id: data.cartId },
        { status: StatusType.ORDERED }
      );
    });

    return newOrder;
  }

  async update(orderId: string, data): Promise<OrderEntity> {
    try {
      const order = await this.findById(orderId);

      if (!order) {
        throw new Error('Order does not exist.');
      }

      const updatedOrder = {
        ...data,
        id: orderId,
      };

      await this.entityManager.transaction(async () => {
        await this.orderRepository.update({ id: orderId }, updatedOrder);
        await this.cartRepository.update(
          { id: data.cartId },
          { status: StatusType.ORDERED }
        );
      });

      return updatedOrder;
    } catch (error) {
      return error;
    }
  }
}
