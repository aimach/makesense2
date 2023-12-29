export type CategoryType = {
  id?: number;
  name: string;
  color: string;
};

export type CommentType = {
  id?: number;
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
  firstDeadline: Date;
  firstDecision?: Date;
  secondDeadline?: Date;
  finalDecision: Date;
  statusId: number;
  userId: number;
  categories: {
    create: {
      category: {
        connect: {
          id: number;
        };
      };
    }[];
  };
  users: {
    create: {
      type: string;
      user: {
        connect: {
          id: number;
        };
      };
    }[];
  };
  groups: {
    create: {
      type: string;
      group: {
        connect: {
          id: number;
        };
      };
    }[];
  };
};

export type GroupType = {
  id?: number;
  name: string;
  users?: {
    create: {
      user: {
        connect: {
          id: number;
        };
      };
    }[];
  };
};

export type ServiceType = {
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
  avatar: string | null;
  admin: boolean;
  position: string;
  serviceId: number;
  createdAt?: Date;
  updatedAt?: Date;
};
