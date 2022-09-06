import { Point } from './point';
import { Address } from './address';

export interface Place {
  id: number;
  name: string;
  description: string;
  address_id: number;
  point: Point;
  created_at: Date;
  updated_at: Date;
  address: Address;
}
