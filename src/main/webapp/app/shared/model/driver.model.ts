export interface IDriver {
  id?: number;
  name?: string;
  surName?: string;
  license?: string;
}

export const defaultValue: Readonly<IDriver> = {};
