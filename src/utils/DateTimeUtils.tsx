export function GetCurrentDateTimeString(): string {
    const currentDateTime = new Date().toISOString();
    return currentDateTime
}