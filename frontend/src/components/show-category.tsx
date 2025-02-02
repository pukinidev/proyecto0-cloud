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
import { useState } from "react";
import { CategoryTable } from "./category-table";
import { Eye } from "lucide-react";



export function ShowCategory() {
    const [categories, setCategories] = useState<Category[]>([]);

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


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline"
                onClick={fetchCategories}
                ><Eye />View Categories</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Category List</DialogTitle>
                    <DialogDescription>View all categories</DialogDescription>
                </DialogHeader>
                <CategoryTable data={categories} fetchCategories={fetchCategories}/>
            </DialogContent>
        </Dialog>
    );
}

