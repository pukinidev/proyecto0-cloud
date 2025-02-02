import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { api } from "@/lib/api";
import { Task } from "@/types/task";
import status from "@/data/status";
import { UpdateTasks } from "./update-task";

interface TaskTableProps {
  tasks: Task[];
  fetchTasks: () => void;
}

export function TaskTable({ tasks, fetchTasks }: Readonly<TaskTableProps>) {
  const getStatusCustomName = (statusName: string) => {
    return status.find((state) => state.name === statusName)?.custom_name;
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

  if (tasks.length === 0) {
    return <div>No tasks found</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-[200px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell className="font-medium">{task.title}</TableCell>
            <TableCell>{getStatusCustomName(task.status)}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button variant="outline">View</Button>
                <UpdateTasks fetchTasks={fetchTasks} task={task} />
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
