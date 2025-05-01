import {
  DatePickerProps,
  DatePicker as HeroUiDatePicker,
} from '@heroui/date-picker';
import { forwardRef } from 'react';

// Ugly hack to make the DatePicker component work with the CalendarDate
export const DatePicker = forwardRef<HTMLElement | null, DatePickerProps<any>>(
  (props, ref) => {
    return <HeroUiDatePicker ref={ref} {...props} />;
  }
);
