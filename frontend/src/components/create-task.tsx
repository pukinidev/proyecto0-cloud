import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SelectCategory } from "./category-select";
import { DatePicker } from "./date-picker";
import { SelectStatus } from "./status-select";
import { Plus } from "lucide-react";

interface TaskData {
  title: string;
  description: string;
  category: string;
  status: string;
  finishDate: Date | undefined;
}

interface FormRowProps {
  label: string;
  id: string;
  children: React.ReactNode;
}

export function TaskCreate() {
  const [taskData, setTaskData] = useState<TaskData>({
    title: "",
    description: "",
    category: "",
    status: "",
    finishDate: undefined,
  });

  const handleChange = (
    field: keyof TaskData,
    value: string | Date | undefined
  ) => {
    setTaskData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const creationDate = new Date().toISOString();
    const finishDate = taskData.finishDate?.toISOString();
    console.log({
      ...taskData,
      creationDate,
      finishDate,
    });
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
                setCategory={(value: string) => handleChange("category", value)}
              />
            </FormRow>

            <FormRow label="Status" id="status">
              <SelectStatus
                setStatus={(value: string) => handleChange("status", value)}
              />
            </FormRow>

            <FormRow label="Finish Date" id="finish-date">
              <DatePicker
                date={taskData.finishDate}
                setDate={(value: Date | undefined) =>
                  handleChange("finishDate", value)
                }
              />
            </FormRow>

            <Button type="submit" onClick={handleSubmit}>
              Create
            </Button>
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
