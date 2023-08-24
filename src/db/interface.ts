export interface IdbConfig {
  test: IdbConfigOptions;
  development: IdbConfigOptions;
}

interface IdbConfigOptions {
  dialect: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  define: {
    underscored: boolean;
  };
  autoLoadModels: boolean;
  seederStorage: string;
  seederStorageTableName: string;
  storage?: string;
}
