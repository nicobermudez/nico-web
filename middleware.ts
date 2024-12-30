import { NextRequest, NextResponse } from "next/server";
import { countries } from "@app/lib";
import { getTimes } from "suncalc";

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

export type NextQuery = {
    theme: string;
} & UserGeolocationData;

// run only on homepage
export const config = {
    matcher: "/",
};

export function middleware(req: NextRequest): NextResponse {
    // Set Geolocation
    const { nextUrl: url, geo } = req;
    const country = geo?.country || "CH";
    const city = geo?.city || "Zurich";
    const region = geo?.region || "Switzerland";
    const latitude = geo?.latitude ?? "0";
    const longitude = geo?.longitude ?? "0";

    const countryInfo = countries.find((x: any) => x.cca2 === country);

    const currencyCode = Object.keys(countryInfo.currencies)?.[0];
    const currency = countryInfo.currencies?.[currencyCode];
    const languages = Object.values(countryInfo.languages).join(", ");
    const greeting = countryInfo.greeting ?? "Hallo";

    url.searchParams.set("country", country);
    url.searchParams.set("city", city);
    url.searchParams.set("region", region);
    url.searchParams.set("currencyCode", currencyCode);
    url.searchParams.set("currencySymbol", currency.symbol);
    url.searchParams.set("name", currency.name);
    url.searchParams.set("languages", languages);
    url.searchParams.set("greeting", greeting);

    // Set theme
    const now = new Date();
    const { sunrise, sunset } = getTimes(
        now,
        Number(longitude),
        Number(latitude),
    );
    const theme = now < sunrise || now > sunset ? "dark" : "light";
    url.searchParams.set("theme", theme);

    return NextResponse.rewrite(url);
}
