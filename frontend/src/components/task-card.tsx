import {
  Card,
  TaskCardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TaskTable } from "./task-table";
import { TaskCreate } from "./create-task";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Task } from "@/types/task";
import { CategoryCreate } from "./create-category";

export function TaskCard() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    try {
      const response = await api.get("/tasks", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        setTasks(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Card className="w-[1050px] h-[750px]">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <CardTitle>Tasks</CardTitle>
        </div>
        <div className="border-t-2 border-black-200">
          <div className="flex mt-4 mb-4">
            <CardDescription>Create tasks with categories</CardDescription>
            <div className="ml-auto space-x-2">
              <CategoryCreate />
              <TaskCreate fetchTasks={fetchTasks} />
            </div>
          </div>
          <TaskCardContent>
            <TaskTable fetchTasks={fetchTasks} tasks={tasks} />
          </TaskCardContent>
        </div>
      </CardHeader>
    </Card>
  );
}
