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
import { Plus } from "lucide-react";
import { api } from "@/lib/api";
import { CategoryData } from "@/types/category";



interface FormRowProps {
  label: string;
  id: string;
  children: React.ReactNode;
}

export function CategoryCreate() {
  const [categoryData, setCategoryData] = useState<CategoryData>({
    name: "",
    description: "",
  });

  const handleChange = (
    field: keyof CategoryData,
    value: string 
  ) => {
    setCategoryData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    try {
      const response = await api.post("/categories", categoryData, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        setCategoryData({ name: "", description: "" });
      }
    } catch (error) {
      console.error("Failed to create category", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus /> Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
          <DialogDescription>
            Fill in the form below to create a new category.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <FormRow label="Name" id="name">
              <Input
                id="name"
                required
                value={categoryData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </FormRow>

            <FormRow label="Description" id="description">
              <Textarea
                id="description"
                required
                value={categoryData.description}
                onChange={(e) => handleChange("description", e.target.value)}
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
