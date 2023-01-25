import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Relation,
} from 'typeorm';
import { CoreEntity } from '../../database/database.util.js';
import { User } from '../users/user.entity.js';

@Entity('order_statuses')
export class OrderStatus extends CoreEntity {
  /**
   * 생성됨
   * 처리중
   * 실패
   * 성공
   * 취소
   * 환불
   */
  @Column({ unique: true })
  enName: string;

  /**
   * CREATED,
   * ON_PROCESS,
   * FAILED,
   * SUCCESS,
   * CANCELED,
   * REFUNDED,
   */
  @Column({ unique: true })
  krName: string;

  @OneToMany((type) => Order, (order) => order.orderStatus)
  orders: Order[];
}

@Entity('order_types')
export class OrderType extends CoreEntity {
  /**
   * 구매
   * 판매
   * 취소
   */
  @Column({
    unique: true,
  })
  krName: string;

  /**
   * SELL,
   * BUY,
   * CANCEL,
   */
  @Column({
    unique: true,
  })
  enName: string;

  @OneToMany((type) => Order, (order) => order.orderType)
  orders: Order[];
}

@Entity('orders')
export class Order extends CoreEntity {
  @ManyToOne((type) => OrderStatus, (orderStatus) => orderStatus.orders, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({
    name: 'order_type_id',
    referencedColumnName: 'id',
  })
  orderType: OrderType;

  @ManyToOne((type) => OrderStatus, (orderStatus) => orderStatus.orders, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({
    name: 'order_status_id',
    referencedColumnName: 'id',
  })
  orderStatus: OrderStatus;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: Relation<User>;

  @Column()
  amount: number;
}
