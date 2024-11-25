import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import {
  Container,
  FormCard,
  Title,
  Form,
  InputGroup,
  Label,
  Input,
  PasswordWrapper,
  PasswordToggle,
  ErrorMessage,
  RememberMeLabel,
  Button,
  LinkGroup,
  StyledLink,
} from "../styles/styles";
import { LoginFormData, LoginProps } from "types";
import { EyeIcon, EyeOffIcon } from "styles/icons/icons";
const defaultTheme = {
  colors: {
    primary: "#1890ff",
    primaryHover: "#40a9ff",
    background: "#f5f5f5",
    text: "#333",
    error: "#ff4d4f",
    border: "#d9d9d9",
  },
};
const Login: React.FC<LoginProps> = ({
  onSubmit,
  onForgotPassword,
  onSignUp,
  loading = false,
  error,
  theme = defaultTheme,
}) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginFormData> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await onSubmit(formData);
      } catch (err) {
        console.error("Login error:", err);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name as keyof LoginFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <FormCard>
          <Title>Sign In</Title>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                disabled={loading}
                placeholder="Enter your email"
              />
              {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </InputGroup>

            <InputGroup>
              <Label htmlFor="password">Password</Label>
              <PasswordWrapper>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  disabled={loading}
                  placeholder="Enter your password"
                />
                <PasswordToggle
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                </PasswordToggle>
              </PasswordWrapper>
              {errors.password && (
                <ErrorMessage>{errors.password}</ErrorMessage>
              )}
            </InputGroup>

            <RememberMeLabel>
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                disabled={loading}
              />
              Remember me
            </RememberMeLabel>

            <Button type="submit" disabled={loading} loading={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            <LinkGroup>
              {onForgotPassword && (
                <StyledLink
                  type="button"
                  onClick={onForgotPassword}
                  disabled={loading}
                >
                  Forgot password?
                </StyledLink>
              )}
              {onSignUp && (
                <StyledLink type="button" onClick={onSignUp} disabled={loading}>
                  Don't have an account? Sign Up
                </StyledLink>
              )}
            </LinkGroup>
          </Form>
        </FormCard>
      </Container>
    </ThemeProvider>
  );
};
export default Login;
