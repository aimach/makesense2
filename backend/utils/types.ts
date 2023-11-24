export type Decision = {
  id?: number;
  title: string;
  firstContent: string;
  secondContent: string;
  utility: string;
  context: string;
  pros: string;
  cons: string;
  createdAt?: Date;
  updatedAt?: Date;
  statusId: number;
  userId: number;
};

export type StatusType = {
  id?: number;
  name: string;
};

export type UserType = {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  avatar?: string;
  admin: boolean;
  position: string;
  serviceId: number;
  createdAt?: Date;
  updatedAt?: Date;
};
