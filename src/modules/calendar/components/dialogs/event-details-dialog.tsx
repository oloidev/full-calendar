"use client";

import {format, parseISO} from "date-fns";
import {Calendar, Clock, Text, User} from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import {ScrollArea} from "@/components/ui/scroll-area";

import type {IEvent} from "@/modules/calendar/interfaces";
import {ReactNode} from "react";

interface IProps {
    event: IEvent;
    children: ReactNode;
}

export function EventDetailsDialog({event, children}: IProps) {
    const startDate = parseISO(event.startDate);
    const endDate = parseISO(event.endDate);

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{event.title}</DialogTitle>
                </DialogHeader>

                <ScrollArea className="max-h-[80vh]">
                    <div className="space-y-4 p-4">
                        <div className="flex items-start gap-2">
                            <User className="mt-1 size-4 shrink-0 text-muted-foreground"/>
                            <div>
                                <p className="text-sm font-medium">Responsible</p>
                                <p className="text-sm text-muted-foreground">
                                    {event.user.name}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <Calendar className="mt-1 size-4 shrink-0 text-muted-foreground"/>
                            <div>
                                <p className="text-sm font-medium">Start Date</p>
                                <p className="text-sm text-muted-foreground">
                                    {format(startDate, "MMM d, yyyy h:mm a")}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <Clock className="mt-1 size-4 shrink-0 text-muted-foreground"/>
                            <div>
                                <p className="text-sm font-medium">End Date</p>
                                <p className="text-sm text-muted-foreground">
                                    {format(endDate, "MMM d, yyyy h:mm a")}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <Text className="mt-1 size-4 shrink-0 text-muted-foreground"/>
                            <div>
                                <p className="text-sm font-medium">Description</p>
                                <p className="text-sm text-muted-foreground">
                                    {event.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </ScrollArea>
                <DialogClose/>
            </DialogContent>
        </Dialog>
    );
}
