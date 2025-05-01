import { Select as HeroUiSelect, SelectProps } from '@heroui/select';
import { forwardRef } from 'react';
export { SelectItem } from '@heroui/select';

export const Select = forwardRef<HTMLSelectElement | null, SelectProps>(
  (props, ref) => {
    return (
      <HeroUiSelect
        classNames={{
          value: `placeholder:text-xs text-xs`,
        }}
        {...props}
        ref={ref}
      />
    );
  }
);
