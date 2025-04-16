import React, {Suspense} from "react";
import {Calendar} from "@/modules/calendar/components/calendar";
import {CalendarSkeleton} from "@/modules/calendar/components/skeletons/calendar-skeleton";
import Link from "next/link";
import {ArrowUpRight, CalendarIcon, GithubIcon, LinkIcon} from "lucide-react";

export default function CalendarPage() {

    return (
        <main className="flex h-screen m-4 flex-col">
            <div className="container mx-auto">
                <div className="flex items-center justify-between">
                    <div className='my-10'>
                        <div className="flex items-center gap-2">
                            <div className="flex size-12 items-center justify-center rounded-full border p-3">
                                <CalendarIcon className="size-6 text-t-secondary" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-lg font-medium leading-6">Full calendar</p>
                                <div className="text-sm text-t-secondary">
                                    Built with Next.js and Shadcn UI/Tailwind css by{" "}
                                    <Link href="https://github.com/yassir-jeraidi" target="_blank" className="inline-flex items-center gap-0.5 text-sm underline">
                                        yassir-jeraidi
                                        <ArrowUpRight size={12} className="mx-1 text-t-tertiary" />
                                    </Link>
                                    <Link href="https://jeraidi.tech" target="_blank" className="block gap-0.5 text-sm underline">
                                        <div className="inline-flex items-center underline">
                                            Portfolio <LinkIcon size={12} className="mx-1 text-t-tertiary"/>
                                        </div>
                                    </Link>
                                </div>
                        </div>
                        </div>
                    </div>
                    <div>
                        <Link href="" className='flex justify-center items-center gap-2 underline'>
                            View on Github
                            <span>
                                <GithubIcon className="w-4 h-4"/>
                            </span>
                        </Link>
                    </div>
                </div>
                <Suspense fallback={<CalendarSkeleton/>}>
                    <Calendar/>
                </Suspense>
            </div>
        </main>
    );
}


