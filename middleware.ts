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

// run only on homepage
export const config = {
    matcher: "/",
};

export async function middleware(req: NextRequest) {
    const { nextUrl: url, geo } = req;
    const country = geo.country || "US";
    const city = geo.city || "Boston";
    const region = geo.region || "MA";

    const countryInfo = [].find((x) => x.cca2 === country);

    const currencyCode = Object.keys(countryInfo.currencies)?.[0];
    const currency = countryInfo.currencies?.[currencyCode];
    const languages = Object.values(countryInfo.languages).join(", ");
    const greeting = countryInfo.greeting ?? "Hello";

    url.searchParams.set("country", country);
    url.searchParams.set("city", city);
    url.searchParams.set("region", region);
    url.searchParams.set("currencyCode", currencyCode);
    url.searchParams.set("currencySymbol", currency.symbol);
    url.searchParams.set("name", currency.name);
    url.searchParams.set("languages", languages);
    url.searchParams.set("greeting", greeting);

    return NextResponse.rewrite(url);
}
