"use client";

import { useForm } from "react-hook-form";
import { format, addMinutes, set } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { toast } from "sonner";

import { useDisclosure } from "@/modules/calendar/hooks";
import { useCalendar } from "@/modules/calendar/contexts/calendar-context";
import { eventSchema, TEventFormData } from "@/modules/calendar/schemas";
import { COLORS } from "@/modules/calendar/constants";
import { ICustomEvent } from "@/types/custom-event";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTrigger,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DateTimePicker } from "@/components/ui/date-time-picker";

interface IProps {
    children: ReactNode;
    startDate?: Date;
    startTime?: { hour: number; minute: number };
    event?: ICustomEvent;
}

export function AddEditEventDialog({ children, startDate, startTime, event }: IProps) {
    const { isOpen, onClose, onToggle } = useDisclosure();
    const { addEvent, updateEvent } = useCalendar();
    const isEditing = !!event;

    const getInitialDates = () => {
        if (!startDate) return { startDate: new Date(), endDate: addMinutes(new Date(), 30) };
        const start = startTime
            ? set(new Date(startDate), {
                hours: startTime.hour,
                minutes: startTime.minute,
                seconds: 0,
            })
            : new Date(startDate);
        const end = addMinutes(start, 30);
        return { startDate: start, endDate: end };
    };

    const initialDates = getInitialDates();

    const parseEventDates = () => {
        if (!event) return null;
        return {
            startDate: new Date(event.startDate),
            endDate: new Date(event.endDate),
        };
    };

    const eventDates = parseEventDates();

    const form = useForm<TEventFormData>({
        resolver: zodResolver(eventSchema),
        defaultValues: isEditing
            ? {
                title: event.title,
                description: event.description ?? "",
                startDate: eventDates?.startDate,
                endDate: eventDates?.endDate,
                color: (event.color ?? "blue") as TEventFormData["color"],
            }
            : {
                title: "",
                description: "",
                startDate: initialDates.startDate,
                endDate: initialDates.endDate,
                color: "blue",
            },
    });

    const onSubmit = (values: TEventFormData) => {
        try {
            const formattedEvent: ICustomEvent = {
                ...values,
                id: isEditing ? event!.id : Math.floor(Math.random() * 1000000),
                provider: isEditing ? event!.provider : undefined,
                location: isEditing ? event!.location : undefined,
                patient: isEditing ? event!.patient : undefined,
                startDate: format(values.startDate, "yyyy-MM-dd'T'HH:mm:ss"),
                endDate: format(values.endDate, "yyyy-MM-dd'T'HH:mm:ss"),
            };

            if (isEditing) {
                updateEvent(formattedEvent);
                toast.success("Event updated successfully");
            } else {
                addEvent(formattedEvent);
                toast.success("Event created successfully");
            }

            onClose();
            form.reset();
        } catch (error) {
            console.error(`Error ${isEditing ? "editing" : "adding"} event:`, error);
            toast.error(`Failed to ${isEditing ? "edit" : "add"} event`);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onToggle} modal={false}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isEditing ? "Edit Event" : "Add New Event"}</DialogTitle>
                    <DialogDescription>
                        {isEditing ? "Modify your existing event." : "Create a new event for your calendar."}
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form id="event-form" onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel className="required">Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Enter a title"
                                            className={fieldState.invalid ? "border-red-500" : ""}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="startDate"
                            render={({ field }) => <DateTimePicker form={form} field={field} />}
                        />
                        <FormField
                            control={form.control}
                            name="endDate"
                            render={({ field }) => <DateTimePicker form={form} field={field} />}
                        />
                        <FormField
                            control={form.control}
                            name="color"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel className="required">Variant</FormLabel>
                                    <FormControl>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className={`w-full ${fieldState.invalid ? "border-red-500" : ""}`}>
                                                <SelectValue placeholder="Select a variant" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {COLORS.map((color) => (
                                                    <SelectItem value={color} key={color}>
                                                        <div className="flex items-center gap-2">
                                                            <div className={`size-3.5 rounded-full bg-${color}-600 dark:bg-${color}-700`} />
                                                            {color}
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel className="required">Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            placeholder="Enter a description"
                                            className={fieldState.invalid ? "border-red-500" : ""}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="outline">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button form="event-form" type="submit">
                        {isEditing ? "Save Changes" : "Create Event"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
