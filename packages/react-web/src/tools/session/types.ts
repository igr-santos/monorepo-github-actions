export interface BaseUser {
  name: string;
  email: string;
}

export interface Session<T extends BaseUser = BaseUser> {
  data?: T;
  token?: string;
  permissions?: string[];
}
