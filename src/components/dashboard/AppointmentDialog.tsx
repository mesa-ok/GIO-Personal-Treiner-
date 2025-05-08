
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { DatePickerField } from "../form/DatePickerField";
import { TimePickerField } from "../form/TimePickerField";
import { appointmentSchema, type AppointmentFormValues } from "@/lib/schemas/appointmentSchema";
import { useAppointmentSubmit } from "@/hooks/useAppointmentSubmit";

type AppointmentDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AppointmentDialog({ open, onOpenChange }: AppointmentDialogProps) {
  const { submitAppointment } = useAppointmentSubmit();
  
  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      title: "",
      location: "",
      time: "09:00",
      description: "",
    },
  });

  async function onSubmit(values: AppointmentFormValues) {
    const success = await submitAppointment(values);
    if (success) {
      onOpenChange(false);
      form.reset();
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Prenota un appuntamento</DialogTitle>
          <DialogDescription>
            Compila il form per prenotare un nuovo appuntamento
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titolo</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrizione (opzionale)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DatePickerField form={form} />
            <TimePickerField form={form} />
            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Annulla
              </Button>
              <Button type="submit">Prenota</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
