import { Button } from "@/components/ui/button";
import {
  Card,
  TaskCardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ModeToggle } from "./mode-toggle";
import { TaskTable } from "./task-table";
import { TaskCreate } from "./create-task";

export function TaskCard() {
  return (
      <Card className="w-[1050px] h-[750px]">
        <CardHeader>
          <div className="flex justify-between mb-2">
            <CardTitle>Tasks</CardTitle>
            <ModeToggle />
          </div>
          <div className="border-t-2 border-black-200">
            <div className="flex mt-4 mb-4">
              <CardDescription>Create tasks with categories</CardDescription>
              <div className="ml-auto space-x-2">
                <Button variant="outline">Create Category</Button>
                <TaskCreate />
              </div>
            </div>
            <TaskCardContent>
              <TaskTable />
            </TaskCardContent>
          </div>
        </CardHeader>
      </Card>
  );
}
