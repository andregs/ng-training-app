
class User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  birthdate: Date;
  admin = false;
}

class Product {
  id: number;
  name: string;
  color: string;
  price: number;
  categoryId: number;
}

class Category {
  id: number;
  name: string;
  products: Product[];
}

class Order {
  id: number;
  items: OrderItem[];
  customer: User;
  orderDate: Date;
}

class OrderItem {
  id: number;
  orderId: number;
  product: Product;
  quantity: number;
}
