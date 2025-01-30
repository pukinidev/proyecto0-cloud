import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


interface SelectCategoryProps {
  setCategory: (category: string) => void;
}

export function SelectCategory({ setCategory }: Readonly<SelectCategoryProps>) {

    
  // fetch categories from the API

  const categories = [
    {
      id: 1,
      name: "Work",
    },
    {
      id: 2,
      name: "Personal",
    },
  ];

  return (
    <Select onValueChange={(value) => setCategory(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.name}>
              {category.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
