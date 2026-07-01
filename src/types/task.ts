export type TaskStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type TaskCreateInput = {
  title: string;
  description: string;
};

export type TaskUpdateInput = {
  title?: string;
  description?: string;
};
