import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";

import { Alert } from "../../../uikit/Alert";
import { AppIcon } from "../../../uikit/AppIcon";
import { Button } from "../../../uikit/Button";
import { Form } from "../../../uikit/Form";
import { Input } from "../../../uikit/Input";
import { Link } from "../../../uikit/Link";
import { useShallowAppStore } from "../../app.store";
import { useUserActions } from "../user.store";

const schema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .test("not-empty", "Name is required", (value) => value.trim() !== ""),
  email: Yup.string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
      "Password must have 8 characters, one upper, one lower, one number, and one special character",
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password and Confirm Password didn't match")
    .required("Password confirmation is required"),
});

export const Signup = () => {
  const [signUpError] = useShallowAppStore((state) => [state.signUpError]);
  const { signup } = useUserActions();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Yup.InferType<typeof schema>> = async (
    data,
  ) => {
    setIsLoading(true);
    signup({
      id: uuidv4(),
      name: data.name,
      email: data.email,
      password: data.password,
    })
      .then(() => navigate("/chat"))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="flex h-dvh w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large px-8 pb-10 pt-6 bg-default-100">
        <p className="pb-4 text-left text-3xl font-semibold">
          Sign Up
          <span aria-label="emoji" className="ml-2" role="img">
            👋
          </span>
        </p>
        <Form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          {signUpError && (
            <Alert className="text-sm" color="danger">
              {signUpError}
            </Alert>
          )}

          <Controller
            control={control}
            name="name"
            render={({
              field: { name, value, onChange, onBlur, ref },
              fieldState: { invalid, error },
            }) => (
              <Input
                ref={ref}
                isRequired
                errorMessage={error?.message}
                isDisabled={isLoading}
                isInvalid={invalid}
                label="Name"
                labelPlacement="outside"
                name={name}
                placeholder="Enter your name"
                value={value}
                variant="bordered"
                onBlur={onBlur}
                onChange={onChange}
              />
            )}
            rules={{ required: "Name is required." }}
          />
          <Controller
            control={control}
            name="email"
            render={({
              field: { name, value, onChange, onBlur, ref },
              fieldState: { invalid, error },
            }) => (
              <Input
                ref={ref}
                isRequired
                errorMessage={error?.message}
                isDisabled={isLoading}
                isInvalid={invalid}
                label="Email"
                labelPlacement="outside"
                name={name}
                placeholder="Enter your email"
                value={value}
                variant="bordered"
                onBlur={onBlur}
                onChange={onChange}
              />
            )}
            rules={{ required: "Email is required." }}
          />
          <Controller
            control={control}
            name="password"
            render={({
              field: { name, value, onChange, onBlur, ref },
              fieldState: { invalid, error },
            }) => (
              <Input
                ref={ref}
                isRequired
                endContent={
                  <button type="button" onClick={toggleVisibility}>
                    {isVisible ? (
                      <AppIcon
                        className="pointer-events-none text-2xl text-default-400"
                        icon="eye-slash"
                        size="sm"
                      />
                    ) : (
                      <AppIcon
                        className="pointer-events-none text-2xl text-default-400"
                        icon="eye"
                        size="sm"
                      />
                    )}
                  </button>
                }
                errorMessage={error?.message}
                isDisabled={isLoading}
                isInvalid={invalid}
                label="Password"
                labelPlacement="outside"
                name={name}
                placeholder="Enter your password"
                type={isVisible ? "text" : "password"}
                value={value}
                variant="bordered"
                onBlur={onBlur}
                onChange={onChange}
              />
            )}
            rules={{ required: "Password is required." }}
          />
          <Controller
            control={control}
            name="confirmPassword"
            render={({
              field: { name, value, onChange, onBlur, ref },
              fieldState: { invalid, error },
            }) => (
              <Input
                ref={ref}
                isRequired
                endContent={
                  <button type="button" onClick={toggleConfirmVisibility}>
                    {isVisible ? (
                      <AppIcon
                        className="pointer-events-none text-2xl text-default-400"
                        icon="eye-slash"
                        size="sm"
                      />
                    ) : (
                      <AppIcon
                        className="pointer-events-none text-2xl text-default-400"
                        icon="eye"
                        size="sm"
                      />
                    )}
                  </button>
                }
                errorMessage={error?.message}
                isDisabled={isLoading}
                isInvalid={invalid}
                label="Password Confirmation"
                labelPlacement="outside"
                name={name}
                placeholder="Confirm your password"
                type={isConfirmVisible ? "text" : "password"}
                value={value}
                variant="bordered"
                onBlur={onBlur}
                onChange={onChange}
              />
            )}
            rules={{ required: "Password confirmation is required." }}
          />

          <Button fullWidth color="primary" isLoading={isLoading} type="submit">
            Sign Up
          </Button>
        </Form>
        <p className="text-center text-small">
          <Link href="/user/login" size="sm">
            Already have an account? Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
