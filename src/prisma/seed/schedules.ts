import { Prisma } from "@prisma/client";

const schedules: Prisma.ScheduleCreateManyInput[] = [
    {
        name: "Morning shift",
        fromHours: 8,
        toHours: 16,
        fromWeekDay: 1,
        toWeekDay: 5
    },
    {
        name: "Day shift",
        fromHours: 12,
        toHours: 20,
        fromWeekDay: 1,
        toWeekDay: 5
    },
    {
        name: "Night shift",
        fromHours: 22,
        toHours: 6,
        fromWeekDay: 1,
        toWeekDay: 5
    }
];

export { schedules };