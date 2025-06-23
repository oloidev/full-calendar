"use client";

import { useForm } from "react-hook-form";
import { format, addMinutes, set } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { toast } from "sonner";

import { useDisclosure } from "@/modules/calendar/hooks";
import { useCalendar } from "@/modules/calendar/contexts/calendar-context";
import { eventSchema, TEventFormData } from "@/modules/calendar/schemas";
import { ICustomEvent } from "@/types/custom-event";
import { TLocation } from "@/modules/calendar/mocks/types";
// import { TProvider, TPatient } from "@/modules/calendar/mocks/types";
import { mockLocations, mockProviders, mockPatients } from "@/modules/calendar/mocks/mock-data";

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
    location?: TLocation;
}

export function AddEditEventDialog({ children, startDate, startTime, event, location }: IProps) {
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

    const eventDates = event
        ? {
            startDate: new Date(event.startDate),
            endDate: new Date(event.endDate),
        }
        : null;

    const form = useForm<TEventFormData>({
        resolver: zodResolver(eventSchema),
        defaultValues: isEditing
            ? {
                title: event.title,
                description: event.description ?? "",
                startDate: eventDates?.startDate ?? new Date(),
                endDate: eventDates?.endDate ?? addMinutes(new Date(), 30),
                providerId: event.provider?.id ?? "",
                patientId: event.patient?.id ?? "",
                locationId: event.location?.id ?? "",
            }
            : {
                title: "",
                description: "",
                startDate: initialDates.startDate,
                endDate: initialDates.endDate,
                providerId: "",
                patientId: "",
                locationId: location?.id ?? "",
            },
    });


    const onSubmit = (values: TEventFormData) => {
        try {
            const formattedEvent: ICustomEvent = {
                ...values,
                id: isEditing ? event!.id : Math.floor(Math.random() * 1000000),
                location: location ?? mockLocations.find((loc) => loc.id === values.locationId)!,
                provider: mockProviders.find((p) => p.id === values.providerId)!,
                patient: mockPatients.find((p) => p.id === values.patientId)!,
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

            toast.success(isEditing ? "Event updated successfully" : "Event created successfully");

            onClose();
            form.reset();
        } catch (error) {
            console.error("Error saving event:", error);
            toast.error("Failed to save event");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onToggle} modal={false}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isEditing ? "Edit Event" : "Add New Event"}</DialogTitle>
                    <DialogDescription>
                        {isEditing ? "Modify your existing event." : "Create a new event."}
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

                        {/* Fecha/hora */}
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

                        {/* Select de provider */}
                        <FormField
                            control={form.control}
                            name="providerId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Doctor</FormLabel>
                                    <FormControl>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a doctor" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {mockProviders.map((provider) => (
                                                    <SelectItem key={provider.id} value={provider.id}>
                                                        {provider.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Select de patient */}
                        <FormField
                            control={form.control}
                            name="patientId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Patient</FormLabel>
                                    <FormControl>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a patient" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {mockPatients.map((patient) => (
                                                    <SelectItem key={patient.id} value={patient.id}>
                                                        {patient.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Select de location (si no viene como prop) */}
                        {!location && (
                            <FormField
                                control={form.control}
                                name="locationId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Room</FormLabel>
                                        <FormControl>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select a room" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {mockLocations.map((loc) => (
                                                        <SelectItem key={loc.id} value={loc.id}>
                                                            {loc.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
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
                        <Button type="button" variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button form="event-form" type="submit">
                        {isEditing ? "Save Changes" : "Create Event"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
