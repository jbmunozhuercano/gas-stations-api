const DAY_MAP: Record<string, number> = {
  L: 1,
  M: 2,
  X: 3,
  J: 4,
  V: 5,
  S: 6,
  D: 0,
};

const DAY_RANGES: Record<string, number[]> = {
  L: [1],
  M: [2],
  X: [3],
  J: [4],
  V: [5],
  S: [6],
  D: [0],
  'L-V': [1, 2, 3, 4, 5],
  'L-S': [1, 2, 3, 4, 5, 6],
  'L-D': [0, 1, 2, 3, 4, 5, 6],
  'S-D': [0, 6],
};

function parseDayRange(range: string): number[] | null {
  const trimmed = range.trim();
  if (DAY_RANGES[trimmed]) return DAY_RANGES[trimmed];

  const match = trimmed.match(/^(\w+)\s*-\s*(\w+)$/);
  if (match) {
    const start = DAY_MAP[match[1].trim()];
    const end = DAY_MAP[match[2].trim()];
    if (start !== undefined && end !== undefined) {
      const days: number[] = [];
      let d = start;
      while (true) {
        days.push(d);
        if (d === end) break;
        d = (d + 1) % 7;
      }
      return days;
    }
  }

  return null;
}

function parseTime(time: string): number | null {
  const match = time.trim().match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;
  const hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  return hours * 60 + minutes;
}

function parseSchedule(horario: string): Map<number, [number, number][]> | null {
  const schedule = new Map<number, [number, number][]>();
  const parts = horario.split(';').map((s) => s.trim());

  for (const part of parts) {
    const colonIdx = part.indexOf(':');
    if (colonIdx === -1) continue;

    const dayPart = part.substring(0, colonIdx).trim();
    const timePart = part.substring(colonIdx + 1).trim();

    const days = parseDayRange(dayPart);
    if (!days) continue;

    const timeMatches = timePart.matchAll(/(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})/g);
    for (const tm of timeMatches) {
      const open = parseTime(tm[1]);
      const close = parseTime(tm[2]);
      if (open !== null && close !== null) {
        for (const day of days) {
          if (!schedule.has(day)) schedule.set(day, []);
          schedule.get(day)!.push([open, close]);
        }
      }
    }
  }

  return schedule.size > 0 ? schedule : null;
}

export function isStationOpen(horario: string | null | undefined): boolean | null {
  if (!horario) return null;

  const trimmed = horario.trim();
  if (!trimmed) return null;
  if (/^24\s*h$/i.test(trimmed)) return true;

  const now = new Date();
  const spainTime = new Date(
    now.toLocaleString('en-US', { timeZone: 'Europe/Madrid' }),
  );
  const currentDay = spainTime.getDay();
  const currentTime = spainTime.getHours() * 60 + spainTime.getMinutes();

  const schedule = parseSchedule(trimmed);
  if (!schedule) return null;

  const todayRanges = schedule.get(currentDay);
  if (!todayRanges || todayRanges.length === 0) return false;

  for (const [open, close] of todayRanges) {
    if (open < close) {
      if (currentTime >= open && currentTime < close) return true;
    } else {
      if (currentTime >= open || currentTime < close) return true;
    }
  }

  return false;
}
