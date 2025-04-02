import Calendar from "@/modules/calendar/calendar";
import { GithubIcon, LinkIcon} from "lucide-react";
import Link from "next/link";

export default function Page() {
    return (
        <div className="h-screen">
            <div className="info mx-8 md:mx-40 my-10">
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
            <Calendar/>
        </div>

    );
}
