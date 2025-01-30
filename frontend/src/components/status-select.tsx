import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectStatusProps {
  setStatus: (status: string) => void;
}

export function SelectStatus({setStatus}: Readonly<SelectStatusProps>) {
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
    <Select onValueChange={(value) => setStatus(value)}>
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
