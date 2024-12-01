import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import {
  Container,
  FormCard,
  Title,
  Subtitle,
  Form,
  InputGroup,
  Label,
  Input,
  PasswordWrapper,
  PasswordToggle,
  ErrorMessage,
  Button,
  LinkGroup,
  StyledLink,
  PasswordStrengthMeter,
  PasswordRequirements,
  RequirementItem,
  LogoLink,
  LogoImage,
} from "../styles/styles";
import { ResetPasswordFormData, ResetPasswordProps } from "../types";
import { CheckIcon, EyeIcon, EyeOffIcon, XIcon } from "styles/icons/icons";

const defaultTheme = {
  colors: {
    primary: "#1890ff",
    primaryHover: "#40a9ff",
    background: "#f5f5f5",
    text: "#333",
    error: "#ff4d4f",
    border: "#d9d9d9",
    success: "#52c41a",
    warning: "#faad14",
  },
};

const ResetPassword: React.FC<ResetPasswordProps> = ({
  onSubmit,
  onBackToLogin,
  loading = false,
  error,
  logo,
  theme = defaultTheme,
}) => {
  const [formData, setFormData] = useState<ResetPasswordFormData>({
    email: "",
    token: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<ResetPasswordFormData>>({});
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  const updatePasswordStrength = (password: string) => {
    const strength = {
      hasMinLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    const score = Object.values(strength).filter(Boolean).length;

    setPasswordStrength({
      ...strength,
      score: score,
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ResetPasswordFormData> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate Email
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.token) {
      newErrors.token = "Token is required";
    }

    // Validate password strength
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (passwordStrength.score < 4) {
      newErrors.password = "Password does not meet all requirements";
    }

    // Validate password match
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
        console.error("Reset password error:", err);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password") {
      updatePasswordStrength(value);
    }

    if (errors[name as keyof ResetPasswordFormData]) {
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
          {logo && (
            <LogoLink href="/" rel="noopener noreferrer">
              <LogoImage src={logo} alt="App Logo" />
            </LogoLink>
          )}
          <Title>Reset Password</Title>
          <Subtitle>Enter your new password below</Subtitle>

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
              <Label htmlFor="token">Token</Label>
              <Input
                id="token"
                type="text"
                name="token"
                value={formData.token}
                onChange={handleChange}
                error={!!errors.token}
                disabled={loading}
                placeholder="Enter token from email"
              />
              {errors.token && <ErrorMessage>{errors.token}</ErrorMessage>}
            </InputGroup>
            <InputGroup>
              <Label htmlFor="password">New Password</Label>
              <PasswordWrapper>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  disabled={loading}
                  placeholder="Enter new password"
                />
                <PasswordToggle
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </PasswordToggle>
              </PasswordWrapper>
              {errors.password && (
                <ErrorMessage>{errors.password}</ErrorMessage>
              )}
            </InputGroup>

            <PasswordStrengthMeter score={passwordStrength.score} />

            <PasswordRequirements>
              <RequirementItem met={passwordStrength.hasMinLength}>
                {passwordStrength.hasMinLength ? <CheckIcon /> : <XIcon />}
                At least 8 characters
              </RequirementItem>
              <RequirementItem met={passwordStrength.hasUpperCase}>
                {passwordStrength.hasUpperCase ? <CheckIcon /> : <XIcon />}
                One uppercase letter
              </RequirementItem>
              <RequirementItem met={passwordStrength.hasLowerCase}>
                {passwordStrength.hasLowerCase ? <CheckIcon /> : <XIcon />}
                One lowercase letter
              </RequirementItem>
              <RequirementItem met={passwordStrength.hasNumber}>
                {passwordStrength.hasNumber ? <CheckIcon /> : <XIcon />}
                One number
              </RequirementItem>
              <RequirementItem met={passwordStrength.hasSpecialChar}>
                {passwordStrength.hasSpecialChar ? <CheckIcon /> : <XIcon />}
                One special character
              </RequirementItem>
            </PasswordRequirements>

            <InputGroup>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <PasswordWrapper>
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={!!errors.confirmPassword}
                  disabled={loading}
                  placeholder="Confirm new password"
                />
                <PasswordToggle
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                </PasswordToggle>
              </PasswordWrapper>
              {errors.confirmPassword && (
                <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
              )}
            </InputGroup>

            <Button type="submit" disabled={loading} loading={loading}>
              {loading ? "Resetting Password..." : "Reset Password"}
            </Button>

            {onBackToLogin && (
              <LinkGroup>
                <StyledLink
                  type="button"
                  onClick={onBackToLogin}
                  disabled={loading}
                >
                  Back to Login
                </StyledLink>
              </LinkGroup>
            )}
          </Form>
        </FormCard>
      </Container>
    </ThemeProvider>
  );
};

export default ResetPassword;
