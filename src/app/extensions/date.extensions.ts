export { }

declare global {
    interface Date {
        addDays(days: Number): Date;
    }
}

Date.prototype.addDays = function(days: Number) : Date {
    if (!days) {
        return this;
    }
    let date = this;
    date.setDate(date.getDate() + days);
    return date;
};
