"use client";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {format, set} from "date-fns";

import {useDisclosure} from "@/modules/calendar/hooks";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {TimeInput} from "@/components/ui/time-input";
import {cn} from "@/lib/utils";
import {Calendar} from "@/components/ui/calendar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {CalendarIcon} from "lucide-react";
import {eventSchema, TEventFormData} from "@/modules/calendar/schemas";
import {useCalendar} from "@/modules/calendar/contexts/calendar-context";
import {ReactNode} from "react";

interface IProps {
    children: ReactNode;
    startDate?: Date;
    startTime?: { hour: number; minute: number };
}

export function AddEventDialog({children, startDate, startTime}: IProps) {
    const {isOpen, onClose, onToggle} = useDisclosure();
    const {addEvent} = useCalendar();
    const colors = ["blue", "green", "red", "yellow", "purple", "orange"]
    const form = useForm<TEventFormData>({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            title: "",
            description: "",
            startDate: startDate ?? undefined,
            startTime: startTime ?? undefined,
            endDate: undefined,
            endTime: undefined,
            color: undefined,
        },
    });

    const onSubmit = (values: TEventFormData) => {
        try {
            // Combine startDate and startTime
            const startDateTime = values.startDate && values.startTime
                ? set(values.startDate, {
                    hours: values.startTime.hour,
                    minutes: values.startTime.minute,
                })
                : values.startDate || new Date(); // Fallback to current date if incomplete

            // Combine endDate and endTime (optional, fallback to startDateTime if not provided)
            const endDateTime = values.endDate && values.endTime
                ? set(values.endDate, {
                    hours: values.endTime.hour,
                    minutes: values.endTime.minute,
                })
                : values.endDate || startDateTime;

            addEvent({
                ...values,
                startDate: format(startDateTime, "yyyy-MM-dd'T'HH:mm:ss"),
                endDate: format(endDateTime, "yyyy-MM-dd'T'HH:mm:ss"),
                id: Math.floor(Math.random() * 1000000),
                user: {
                    id: Math.floor(Math.random() * 1000000).toString(),
                    name: "John Doe",
                    picturePath: null,
                },
            });

            onClose();
            form.reset();
        } catch (error) {
            console.error("Error adding event:", error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onToggle}>
            <DialogTrigger asChild>{children}</DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Event</DialogTitle>
                    <DialogDescription>
                        Create a new event for your calendar.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        id="event-form"
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid gap-4 py-4"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({field, fieldState}) => (
                                <FormItem>
                                    <FormLabel htmlFor="title" className="required">
                                        Title
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="title"
                                            placeholder="Enter a title"
                                            {...field}
                                            className={fieldState.invalid ? "border-red-500" : ""}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <div className="flex items-start gap-2">
                            <FormField
                                control={form.control}
                                name="startDate"
                                render={({field}) => (
                                    <FormItem className="flex-1">
                                        <FormLabel className="required">Start Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? format(field.value, "PPP") :
                                                            <span>Pick a date</span>}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) => date < new Date("1900-01-01")}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="startTime"
                                render={({field, fieldState}) => (
                                    <FormItem className="flex-1">
                                        <FormLabel className="required">Start Time</FormLabel>
                                        <FormControl>
                                            <TimeInput
                                                value={field.value}
                                                onChange={field.onChange}
                                                className={fieldState.invalid ? "border-red-500" : ""}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex items-start gap-2">
                            <FormField
                                control={form.control}
                                name="endDate"
                                render={({field}) => (
                                    <FormItem className="flex-1">
                                        <FormLabel className="required">End Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? format(field.value, "PPP") :
                                                            <span>Pick a date</span>}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) => startDate ? date < startDate : date < new Date()}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="endTime"
                                render={({field, fieldState}) => (
                                    <FormItem className="flex-1">
                                        <FormLabel className="required">End Time</FormLabel>
                                        <FormControl>
                                            <TimeInput
                                                value={field.value}
                                                onChange={field.onChange}
                                                className={fieldState.invalid ? "border-red-500" : ""}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="color"
                            render={({field, fieldState}) => (
                                <FormItem>
                                    <FormLabel className="required">Variant</FormLabel>
                                    <FormControl>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger
                                                className={`w-full ${fieldState.invalid ? "border-red-500" : ""}`}
                                            >
                                                <SelectValue placeholder="Select a variant"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    colors.map(color => (
                                                        <SelectItem value={color} key={color}>
                                                            <div className="flex items-center gap-2">
                                                                <div
                                                                    className={`size-3.5 rounded-full bg-${color}-600 dark:bg-${color}-700`}/>
                                                                {color}
                                                            </div>
                                                        </SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({field, fieldState}) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            className={fieldState.invalid ? "border-red-500" : ""}
                                        />
                                    </FormControl>
                                    <FormMessage/>
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
                        Create Event
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}