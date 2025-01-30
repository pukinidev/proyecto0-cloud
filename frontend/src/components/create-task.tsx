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
import { SelectCategory } from "./category-select";
import { DatePicker } from "./date-picker";
import { SelectStatus } from "./status-select";
import { Plus } from "lucide-react";
import { api } from "@/lib/api";

interface TaskData {
  title: string;
  description: string;
  category_id: number | string;
  status: string;
  finish_date: Date | undefined;
}

interface FormRowProps {
  label: string;
  id: string;
  children: React.ReactNode;
}

interface TaskCreateProps {
  fetchTasks: () => void;
}

export function TaskCreate({ fetchTasks }: Readonly<TaskCreateProps>) {
  const [taskData, setTaskData] = useState<TaskData>({
    title: "",
    description: "",
    category_id: 0,
    status: "",
    finish_date: undefined,
  });

  const handleChange = (
    field: keyof TaskData,
    value: string | Date | undefined | number
  ) => {
    setTaskData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const creationDate = new Date().toISOString();
    const formattedDate = taskData.finish_date?.toISOString();

    const data = {
      ...taskData,
      creation_date: creationDate,
      finish_date: formattedDate,
    };


    try {
      const response = await api.post("/tasks", data, {
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
          category_id: 0,
          status: "",
          finish_date: undefined,
        });
      }
    } catch (error) {
      console.error("Failed to create task", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="create">
          <Plus /> Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new task.
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

            <FormRow label="Category" id="category">
              <SelectCategory
                setCategory={(value: string) =>
                  handleChange("category_id", Number(value))
                }
              />
            </FormRow>

            <FormRow label="Status" id="status">
              <SelectStatus
                setStatus={(value: string) => handleChange("status", value)}
              />
            </FormRow>

            <FormRow label="Finish Date" id="finish-date">
              <DatePicker
                date={taskData.finish_date}
                setDate={(value: Date | undefined) =>
                  handleChange("finish_date", value)
                }
              />
            </FormRow>

            <DialogClose asChild>
              <Button type="submit">Create</Button>
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
