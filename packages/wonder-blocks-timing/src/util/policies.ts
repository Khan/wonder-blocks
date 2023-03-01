export const SchedulePolicy = {
    Immediately: "schedule-immediately",
    OnDemand: "schedule-on-demand",
} as const;

export const ClearPolicy = {
    Resolve: "resolve-on-clear",
    Cancel: "cancel-on-clear",
} as const;
