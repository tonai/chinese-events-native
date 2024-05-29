declare module 'date-chinese' {
  export type IChineseDate = [number, number, number, boolean, number];
  export interface IGregorianDate {
    day: number;
    month: number;
    year: number;
  }

  export class CalendarChinese {
    fromJDE: (jdeYear: string) => void;
    get: () => IChineseDate;
    newYear: (gYear: number) => string;
    set: (cDate: IChineseDate) => void;
    toGregorian: () => IGregorianDate;
  }
}
