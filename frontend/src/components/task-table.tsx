import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Task } from "@/types/task";
import { Category } from "@/types/category";
import status from "@/data/status";



interface TaskTableProps {
  tasks: Task[];
  fetchTasks: () => void;
}

export function TaskTable({ tasks, fetchTasks }: Readonly<TaskTableProps>) {
  
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const getStatusCustomName = (statusName: string) => {
      return status.find((state) => state.name === statusName)?.custom_name;
  }

  
  const getTaskName = (id: number) => {
    return categories.find((category) => category.id === id)?.name;
  };

  const deleteTask = async (id: number) => {
    try {
      const response = await api.delete(`/tasks/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        fetchTasks();
      }
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (tasks.length === 0) {
    return <div>No tasks found</div>;
  }

  return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="w-[200px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell className="font-medium">{task.title}</TableCell>
              <TableCell>{getStatusCustomName(task.status)}</TableCell>
              <TableCell>{getTaskName(task.category_id)}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline">View</Button>
                  <Button variant="outline">
                    <Pencil />
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => deleteTask(task.id)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  );
}
