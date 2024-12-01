export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}
export interface LoginProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
  onForgotPassword?: () => void;
  onSignUp?: () => void;
  loading?: boolean;
  error?: string;
  logo?: string;
  theme?: {
    colors?: {
      primary?: string;
      primaryHover?: string;
      background?: string;
      text?: string;
      error?: string;
      border?: string;
    };
  };
}
export interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}
export interface SignupProps {
  onSubmit: (data: SignupFormData) => Promise<void>;
  onLogin?: () => void;
  loading?: boolean;
  error?: string;
  logo?: string;
  theme?: {
    colors?: {
      primary?: string;
      primaryHover?: string;
      background?: string;
      text?: string;
      error?: string;
      border?: string;
    };
  };
}
export interface ResetPasswordFormData {
  email: string;
  password: string;
  confirmPassword: string;
}
export interface ResetPasswordProps {
  onSubmit: (data: ResetPasswordFormData) => Promise<void>;
  onBackToLogin?: () => void;
  loading?: boolean;
  error?: string;
  token?: string;
  logo?: string;
  theme?: {
    colors?: {
      primary?: string;
      primaryHover?: string;
      background?: string;
      text?: string;
      error?: string;
      border?: string;
    };
  };
}
