import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Alert } from "../../../uikit/Alert";
import { AppIcon } from "../../../uikit/AppIcon";
import { Button } from "../../../uikit/Button";
import { Form } from "../../../uikit/Form";
import { Input } from "../../../uikit/Input";
import { Link } from "../../../uikit/Link";
import { useShallowAppStore } from "../../app.store";
import { useUserActions } from "../user.store";

export const Login = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [isLoggedIn, loginError] = useShallowAppStore((state) => [
    state.isUserLoggedIn,
    state.loginError,
  ]);

  const { login } = useUserActions();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/chat", { replace: true });
    }
  }, [isLoggedIn]);

  return (
    <div className="flex h-dvh w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
        <div className="flex flex-col gap-1">
          <h1 className="text-large font-medium">Sign in</h1>
        </div>

        {loginError && (
          <Alert className="text-sm" color="danger">
            {loginError}
          </Alert>
        )}

        <Form
          className="flex flex-col gap-3"
          validationBehavior="native"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const data = Object.fromEntries(new FormData(e.currentTarget));

            setIsLoading(true);
            login(data.email as string, data.password as string).finally(() =>
              setIsLoading(false),
            );
          }}
        >
          <Input
            isRequired
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Enter your email"
            type="email"
            variant="bordered"
          />
          <Input
            isRequired
            endContent={
              <button type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <AppIcon icon="eye-slash" />
                ) : (
                  <AppIcon icon="eye" />
                )}
              </button>
            }
            label="Password"
            labelPlacement="outside"
            name="password"
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
            variant="bordered"
          />
          <Button
            className="w-full"
            color="primary"
            isLoading={isLoading}
            type="submit"
          >
            Sign In
          </Button>
        </Form>

        <p className="text-center text-small">
          Need to create an account?&nbsp;
          <Link href="/user/signup" size="sm">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
