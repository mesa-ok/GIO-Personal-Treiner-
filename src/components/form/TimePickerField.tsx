
import { Clock } from "lucide-react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { UseFormReturn } from "react-hook-form";
import { AppointmentFormValues } from "@/lib/schemas/appointmentSchema";

interface TimePickerFieldProps {
  form: UseFormReturn<AppointmentFormValues>;
}

export function TimePickerField({ form }: TimePickerFieldProps) {
  return (
    <FormField
      control={form.control}
      name="time"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Orario</FormLabel>
          <FormControl>
            <div className="flex items-center">
              <Input
                type="time"
                {...field}
                className="w-full"
              />
              <Clock className="ml-2 h-4 w-4 opacity-50" />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
