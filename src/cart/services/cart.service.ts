import { Injectable } from '@nestjs/common';

import { Cart } from '../models';
import { CartEntity } from 'src/database/entities/carts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CartItemEntity } from 'src/database/entities/cart-items.entity';
import { StatusType } from 'src/shared';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    @InjectRepository(CartItemEntity)
    private readonly cartItemRepository: Repository<CartItemEntity>
  ) {}

  async findByUserId(userId: string): Promise<CartEntity> {
    return this.cartRepository.findOne({
      where: { userId },
      relations: ['items', 'items.product'],
    });
  }

  async createByUserId(userId: string): Promise<CartEntity> {
    const userCart = {
      userId,
      items: [],
      status: StatusType.OPEN
    };
    const cart = this.cartRepository.create(userCart);

    return this.cartRepository.save(cart);
  }

  async findOrCreateByUserId(userId: string): Promise<CartEntity> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }
    return this.createByUserId(userId);
  }

  async updateByUserId(userId: string, { items }: Cart): Promise<Cart> {
    const { id } = await this.findOrCreateByUserId(userId);

    await this.cartItemRepository.delete({
      cartId: id,
    });

    for (const { product, count } of items) {
      const newCartItem: CartItemEntity = this.cartItemRepository.create({
        productId: product.id,
        count,
        cartId: id,
      });

      await this.cartItemRepository.save(newCartItem);
    }

    const updatedAt = new Date();

    await this.cartRepository.update({ id }, { updatedAt });

    return this.findByUserId(userId);
  }


  async removeByUserId(userId: string): Promise<DeleteResult> {
    return this.cartRepository.delete({ userId })
  }
}
