import React, {Suspense} from "react";
import {Calendar} from "@/modules/calendar/components/calendar";
import {CalendarSkeleton} from "@/modules/calendar/components/skeletons/calendar-skeleton";
import Link from "next/link";
import {GithubIcon, LinkIcon} from "lucide-react";
import {ChangeBadgeVariantInput} from "@/modules/calendar/components/change-badge-variant-input";

export default function CalendarPage() {

    return (
        <main className="flex h-screen flex-col">
            <div className="container mx-auto">
                <div className='my-10'>
                    <h1 className="text-5xl font-bold">Calendar App</h1>
                    <p className="text-lg text-gray-600">Developed by Jeraidi Yassir

                    </p>
                    <div className="links flex gap-2 mt-4">
                        <Link href="https://github.com/yassir-jeraidi">
                            <GithubIcon className="w-4 h-4"/>
                        </Link>
                        <Link href="https://jeraidi.tech">
                            <LinkIcon className="w-4 h-4"/>
                        </Link>
                    </div>
                </div>
                <Suspense fallback={<CalendarSkeleton/>}>
                    <Calendar/>
                </Suspense>
                <div className="my-4">
                    <ChangeBadgeVariantInput/>
                </div>
            </div>
        </main>
    );
}


