Date.prototype.addDays = function (days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

Date.prototype.formateToDate = function (date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

Date.prototype.getDaysBetween = function (date: Date) {
    return Math.round((this.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
};
