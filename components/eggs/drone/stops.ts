// The sections Byte knows, top to bottom. Each id is a section on the home page; Byte has one line per stop
// (dict.drone) and one web summary per stop (dict.web). Shared by the drone and the web-shooter.
export const DRONE_STOPS = ['top', 'ch01', 'ch02', 'ch03', 'work', 'skills', 'offscreen', 'ch04', 'credits'] as const
export type Stop = (typeof DRONE_STOPS)[number]

// closest() with this finds the innermost stop around any element (credits wins over ch04, which contains it).
export const STOP_SELECTOR = DRONE_STOPS.map((id) => `#${id}`).join(',')
