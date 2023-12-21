export type CategoryType = {
  category: {
    id: number;
    name: string;
    color: string;
  };
};

export type CommentType = {
  id: number;
  title: string;
  content: string;
  userId: number;
  decisionId: number;
  date: string;
  user: UserType;
  decision: DecisionType;
};

export type DecisionType = {
  id: number;
  title: string;
  firstContent: string;
  secondContent: string;
  utility: string;
  context: string;
  pros: string;
  cons: string;
  createdAt: Date;
  updatedAt: Date | string;
  statusId: number;
  status: StatusType;
  userId: number;
  user: UserType;
  categories: CategoryType[];
  users: { user: UserType; type: string }[];
  groups: GroupType[];
  comments: CommentType[];
};

export type GroupType = {
  id: number;
  name: string;
  users: UserType[];
};

export type ServiceType = {
  id: number;
  name: string;
};

export type StatusType = {
  id: number;
  name: string;
};

export type UserType = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  avatar: string | null;
  admin: boolean;
  position: string;
  serviceId: number;
  createdAt: Date;
  updatedAt: Date;
};
