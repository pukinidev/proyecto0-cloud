import { Button } from "@/components/ui/button";
import {
  Card,
  TaskCardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TaskTable } from "./task-table";
import { TaskCreate } from "./create-task";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

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
              <Button variant="outline">
                {" "}
                <Plus />
                Create Category
              </Button>
              <TaskCreate/>
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
