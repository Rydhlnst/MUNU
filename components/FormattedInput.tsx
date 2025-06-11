import { Input } from "@/components/ui/input";

interface FormattedInputProps {
  id: string;
  value: string;
  onValueChange: (numericValue: string) => void;
  placeholder?: string;
}

export function FormattedInput({ id, value, onValueChange, placeholder }: FormattedInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    onValueChange(raw); // simpan angka murni
  };

  const displayValue = value ? value.replace(/\B(?=(\d{3})+(?!\d))/g, ".") : "";

  return (
    <Input
      id={id}
      inputMode="numeric"
      value={displayValue}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
}
