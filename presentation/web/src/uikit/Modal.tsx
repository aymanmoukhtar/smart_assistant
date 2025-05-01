import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@heroui/modal';
import { useState } from 'react';
import { Button } from './Button';

interface ConfirmationDialogProps {
  title?: string;
  message: string;
  buttonText?: string;
  variant?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | undefined;
  open: boolean;
  close: () => void;
  submit: () => Promise<void>;
}

const ConfirmationDialog = ({
  title,
  message,
  variant,
  buttonText,
  open,
  close,
  submit,
}: ConfirmationDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const confirm = async () => {
    setIsLoading(true);
    submit().finally(() => {
      setIsLoading(false);
      close();
    });
  };

  return (
    <Modal backdrop="blur" isOpen={open} onOpenChange={close}>
      <ModalContent className="container-fixed p-0 min-w-[750px]">
        <ModalHeader className="flex flex-col items-start gap-1">
          <span className="text-base leading-6 font-semibold">
            {title || 'Confirm'}
          </span>
        </ModalHeader>
        <ModalBody className="py-0 mb-5 ps-6 pe-3 me-3 mt-4 grid gap-4">
          <span className="text-sm">{message}</span>
        </ModalBody>
        <ModalFooter className="justify-end">
          <Button color="default" onPress={close} isDisabled={isLoading}>
            Cancel
          </Button>
          <Button
            isLoading={isLoading}
            color={variant}
            onPress={confirm}
            isDisabled={isLoading}
          >
            {buttonText || 'Confirm'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export {
  ConfirmationDialog,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
};
