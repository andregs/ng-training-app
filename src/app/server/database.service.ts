import { Injectable } from '@angular/core';
import { User, Category, Product, Order, OrderItem } from '../entity/customer.1';

@Injectable()
export class DatabaseService {

  readonly user: User[] = [];

  readonly category: Category[] = [];

  readonly product: Product[] = [];

  readonly order: Order[] = [];

  readonly orderItem: OrderItem[] = [];

  constructor() {
  }

}
