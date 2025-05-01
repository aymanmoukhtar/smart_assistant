import {
  Button as HeroUiButton,
  ButtonProps as HeroUiButtonProps,
} from '@heroui/button';
import { forwardRef } from 'react';
import { Tooltip, TooltipPlacement } from './Tooltip';
export { ButtonGroup } from '@heroui/button';

export type ButtonProps = HeroUiButtonProps & {
  tooltip?: string;
  tooltipPlacement?: TooltipPlacement;
};

export const Button = forwardRef<HTMLButtonElement | null, ButtonProps>(
  (props: ButtonProps, ref) => {
    if (props.tooltip) {
      return (
        <Tooltip content={props.tooltip} placement={props.tooltipPlacement}>
          <HeroUiButton
            ref={ref}
            aria-label={props['aria-label'] || props.name}
            {...props}
          />
        </Tooltip>
      );
    }

    return (
      <HeroUiButton
        {...props}
        aria-label={props['aria-label'] || props.name}
        ref={ref}
      />
    );
  }
);
