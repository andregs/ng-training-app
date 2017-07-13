import { autoserialize as a, autoserializeAs as aas } from 'cerialize';

export class User {
  @a id: number;
  @a email: string;
  @a firstName: string;
  @a lastName: string;
  @aas(Date) birthdate: Date | null;
  @a admin = false;
  @a authenticated: boolean;

  constructor(data?: Partial<User>) {
    Object.assign(this, data);
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  /**
   * HTML5 `input[type=date]` works with a string in the `yyyy-MM-dd` format.
   * Angular isn't able to bind a `Date` value yet.
   * @see https://github.com/angular/angular/issues/8203
   */
  get birthdateYMD() {
    if (! this.birthdate) return '';
    return this.birthdate.toISOString().slice(0, 10);
  }

  set birthdateYMD(birthdate: string) {
    // The field gives us '' when the user types an invalid date
    this.birthdate = birthdate ? new Date(birthdate) : null;
  }

}

export class Product {
  @a id: number;
  @a name: string;
  @a color: string;
  @a price: number;
  @a categoryId: number;

  constructor(data?: Partial<Product>) {
    Object.assign(this, data);
  }
}

export class Category {
  @a id: number;
  @a name: string;
  @aas(Product) products: Product[];

  constructor(data?: Partial<Category>) {
    Object.assign(this, data);
  }

  add(product: Product) {
    product.categoryId = this.id;
    const found = this.products.find(p => p.id === product.id);
    if (! found) {
      this.products.push(product);
    }
  }
}

export class OrderItem {
  @a id: number;
  @a orderId: number;
  @aas(Product) product: Product;
  @a quantity: number;

  constructor(data?: Partial<OrderItem>) {
    Object.assign(this, data);
  }
}

export class Order {
  @a id: number;
  @aas(OrderItem) items: OrderItem[];
  @aas(User) customer: User;
  @aas(Date) orderDate: Date;

  constructor(data?: Partial<Order>) {
    Object.assign(this, data);
  }
}
