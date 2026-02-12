export const pages = ['manage', 'calendar', 'reports', 'budget'] as const

export type Page = (typeof pages)[number]
