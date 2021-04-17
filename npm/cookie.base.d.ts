
export function getCookie (
    name: string,
    cookie?: string
): string

export function setCookie (
    name: string,
    value: string | null,
    expires?: number, // days
    path?: string
): string;

export function removeCookie (name: string): string;