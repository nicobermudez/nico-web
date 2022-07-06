import { NextRequest, NextResponse } from "next/server";

export type UserGeolocationData = {
    country?: string;
    city?: string;
    region?: string;
    currencyCode?: string;
    currencySymbol?: string;
    name?: string;
    languages?: string;
    greeting?: string;
};

export async function middleware(req: NextRequest) {
    console.log("Middleware ran");
    return NextResponse.next();
}
