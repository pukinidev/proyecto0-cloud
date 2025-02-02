interface Task {
  id: number;
  title: string;
  description: string;
  creation_date: string;
  finish_date: string;
  status: string;
  category_id: number;
  user_id: number;
}

interface TaskData {
  title: string;
  description: string;
  category_id: number | string;
  status: string;
  finish_date: Date | undefined;
}

interface UpdateTask {
  title: string;
  description: string;
  status: string;
}

export type { Task, TaskData, UpdateTask };
