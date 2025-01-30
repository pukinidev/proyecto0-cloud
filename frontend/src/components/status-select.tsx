import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectStatus() {
  const status = [
    {
      id: 1,
      name: "pending",
    },
    {
      id: 2,
      name: "in_progress",
    },
    {
      id: 3,
      name: "completed",
    },
    {
      id: 4,
      name: "done",
    },
  ];

  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a task status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status</SelectLabel>
          {status.map((state) => (
            <SelectItem key={state.id} value={state.name}>
              {state.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
