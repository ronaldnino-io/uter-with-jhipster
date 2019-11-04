export interface IVehicle {
  id?: number;
  brand?: string;
  model?: string;
  plate?: string;
  licenseRequired?: string;
}

export const defaultValue: Readonly<IVehicle> = {};
