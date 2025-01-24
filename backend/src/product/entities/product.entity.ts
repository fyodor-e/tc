import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import MoneyTransformer from './moneyTransformer';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    transformer: new MoneyTransformer(),
  })
  price: number;

  @Column({
    transformer: new MoneyTransformer(),
  })
  priceWithDiscount: number;

  @Column()
  sku: string;
}
