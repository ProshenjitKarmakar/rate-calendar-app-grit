import React, {Suspense} from "react";
import Calendar from "@/components/calendar/Calendar";

function Page() {
    return (
        <Suspense fallback={<h1>Loading...</h1>}>
            <Calendar/>
        </Suspense>
    );
}

export default Page;