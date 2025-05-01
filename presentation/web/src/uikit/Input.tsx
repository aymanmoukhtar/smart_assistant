import {
  Input as HeroUiInput,
  Textarea as HeroUiTextArea,
  InputProps,
  TextAreaProps,
} from '@heroui/input';
import { forwardRef } from 'react';

export const Input = forwardRef<HTMLInputElement | null, InputProps>(
  (props, ref) => {
    return (
      <HeroUiInput
        classNames={{
          input: `placeholder:text-2sm text-2sm`,
        }}
        {...props}
        ref={ref}
      />
    );
  }
);

export const Textarea = forwardRef<HTMLTextAreaElement | null, TextAreaProps>(
  (props, ref) => {
    return (
      <HeroUiTextArea
        classNames={{
          input: `placeholder:text-${props.size || 'xs'} text-${props.size || 'xs'}`,
        }}
        {...props}
        ref={ref}
      />
    );
  }
);
