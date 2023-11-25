export type CategoryType = {
  id?: number;
  name: string;
  color: string;
};

export type CommentType = {
  id?: number;
  title: string;
  content: string;
  userId: number;
  decisionId: number;
  date?: Date;
};

export type DecisionType = {
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

export type GroupType = {
  id?: number;
  name: string;
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
