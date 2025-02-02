import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { api } from "@/lib/api";
import { Category } from "@/types/category";
import { Task } from "@/types/task";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import status from "@/data/status";

const labels = {
    title: "Title",
    description: "Description",
    status: "Status",
    creation_date: "Created At",
    finish_date: "Finish Date",
    category: "Category"
};

interface TaskShowProps {
    task: Task;
}

export function ShowTasks({ task }: Readonly<TaskShowProps>) {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await api.get(`/categories/`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (response.status === 200) {
                setCategories(response.data);
            }
        };
        fetchCategories();
    }, []);

    const category = categories.find((category) => category.id === task.category_id)?.name;
    const statusName = status.find((state) => state.name === task.status)?.custom_name;

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">View</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Task View</DialogTitle>
                    <DialogDescription>View task details</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {Object.entries(labels).map(([key, label]) => (
                        <div key={key} className="mb-2">
                            <Label htmlFor={key} className="text-left font-bold">
                                {label}
                            </Label>
                            {(() => {
                                if (key === "title" || key === "description") {
                                    return (
                                        <Textarea
                                            id={key}
                                            value={task[key as keyof Task] as string}
                                            readOnly={true}
                                            className="w-full resize-none mt-2"
                                            style={{ height: "auto" }}
                                            tabIndex={-1}
                                        />
                                    );
                                }
                                if (key === "creation_date" || key === "finish_date") {
                                    return (
                                        <div className="text-left">
                                            {new Date(task[key as keyof Task] as string).toLocaleDateString()}
                                        </div>

                                    );
                                }
                                if (key === "category") {
                                    return <div className="text-left">{category}</div>;
                                }
                                if (key === "status") {
                                    return <div className="text-left">{statusName}</div>;
                                }
                                return <div className="text-left">{task[key as keyof Task]}</div>;
                            })()}
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
}

