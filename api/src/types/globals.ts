export {};
declare global {
    interface Date {
        addDays(days: number): Date;
        formateToDate(date: Date): Date;
        getDaysBetween(date: Date): number;
    }
}
