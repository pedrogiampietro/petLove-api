"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertMinutesToHourString = exports.convertHourStringToMinutes = void 0;
function convertHourStringToMinutes(hourString) {
    const [hours, minutes] = hourString.split(":").map(Number);
    const minutesAmount = hours * 60 + minutes;
    return minutesAmount;
}
exports.convertHourStringToMinutes = convertHourStringToMinutes;
function convertMinutesToHourString(minutesAmount) {
    const hours = Math.floor(minutesAmount / 60);
    const minutes = minutesAmount & 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}
exports.convertMinutesToHourString = convertMinutesToHourString;
