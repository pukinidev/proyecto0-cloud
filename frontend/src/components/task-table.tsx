import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


const tasks = [
  {
    id: 1,
    title: "Task 1",
    description: "Do something",
    creation_date: "2021-10-01",
    finish_date: "2021-10-10",
    status: "In progress",
    category: "Work",
  },
];

export function TaskTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead >Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Finish date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell className="font-medium">{task.title}</TableCell>
            <TableCell>{task.status}</TableCell>
            <TableCell>{task.category}</TableCell>
            <TableCell>{task.finish_date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
