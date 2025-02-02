import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import status from "@/data/status";
  
  interface SelectStatusProps {
    setStatus: (status: string) => void;
    currentStatus: string;
  }
  
  export function SelectUpdateStatus({ setStatus, currentStatus }: Readonly<SelectStatusProps>) {
    return (
      <Select onValueChange={(value) => setStatus(value)} defaultValue={currentStatus}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a task status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Status</SelectLabel>
            {status.map((state) => (
              <SelectItem key={state.id} value={state.name}>
                {state.custom_name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }
  