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

interface Category {
  id: number;
  name: string;
  description: string;
}

export function TaskTable() {
  const [tasks, setTasks] = useState<Task[]>([]);
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
    fetchTasks();
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
            <TableHead>Finish date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell className="font-medium">{task.title}</TableCell>
              <TableCell>{task.status}</TableCell>
              <TableCell>{getTaskName(task.category_id)}</TableCell>
              <TableCell>{new Date(task.finish_date).toLocaleDateString()}</TableCell>
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
