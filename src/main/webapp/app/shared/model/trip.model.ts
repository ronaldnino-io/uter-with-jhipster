import { Moment } from 'moment';
import { IDriver } from 'app/shared/model/driver.model';
import { IVehicle } from 'app/shared/model/vehicle.model';

export interface ITrip {
  id?: number;
  date?: Moment;
  driver?: IDriver;
  vehicle?: IVehicle;
}

export const defaultValue: Readonly<ITrip> = {};
