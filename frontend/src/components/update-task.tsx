import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SelectUpdateStatus } from "./select-update-task";
import { Pencil } from "lucide-react";
import { api } from "@/lib/api";
import { Task, TaskData, UpdateTask } from "@/types/task";



interface FormRowProps {
  label: string;
  id: string;
  children: React.ReactNode;
}

interface TaskUpdateProps {
  fetchTasks: () => void;
  task: Task;
}

export function UpdateTasks({ fetchTasks,  task }: Readonly<TaskUpdateProps>) {
  const [taskData, setTaskData] = useState<UpdateTask>({
    title: "",
    description: "",
    status: "",
  });

  const handleChange = (
    field: keyof TaskData,
    value: string 
  ) => {
    setTaskData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.put("/tasks/" + task.id, 
        taskData, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        fetchTasks();
        setTaskData({
            title: "",
            description: "",
            status: "",
            });
      }
    } catch (error) {
      console.error("Failed to create task", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
        <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Task</DialogTitle>
          <DialogDescription>
            Fill out the form below to update your current task.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <FormRow label="Title" id="title">
              <Input
                id="title"
                required
                value={taskData.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </FormRow>

            <FormRow label="Description" id="description">
              <Textarea
                id="description"
                required
                value={taskData.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </FormRow>


            <FormRow label="Status" id="status">
              <SelectUpdateStatus
                setStatus={(value: string) => handleChange("status", value)} currentStatus={task.status}
              />
            </FormRow>

            <DialogClose asChild>
              <Button type="submit">Update</Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function FormRow({ label, id, children }: Readonly<FormRowProps>) {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor={id} className="text-right">
        {label}
      </Label>
      <div className="col-span-3">{children}</div>
    </div>
  );
}
