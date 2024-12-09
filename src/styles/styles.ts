import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors?.background || "#f5f5f5"};
`;
export const FormCard = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  font-size: 24px;
  color: ${({ theme }) => theme.colors?.text || "#333"};
  text-align: center;
  margin-bottom: 24px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const InputGroup = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Label = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.colors?.text || "#333"};
  margin-bottom: 4px;
`;

export const Input = styled.input<{ error?: boolean }>`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid
    ${({ error, theme }) =>
      error
        ? theme.colors?.error || "#ff4d4f"
        : theme.colors?.border || "#d9d9d9"};
  border-radius: 4px;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors?.primary || "#1890ff"};
    box-shadow: 0 0 0 2px
      ${({ theme }) => `${theme.colors?.primary}33` || "#1890ff33"};
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

export const PasswordWrapper = styled.div`
  position: relative;
`;

export const PasswordToggle = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors?.text || "#333"};
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }
`;

export const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors?.error || "#ff4d4f"};
  font-size: 12px;
  margin-top: 4px;
`;

export const RememberMeLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors?.text || "#333"};
  cursor: pointer;
`;

export const Button = styled.button<{ loading?: boolean }>`
  padding: 12px;
  background-color: ${({ theme }) => theme.colors?.primary || "#1890ff"};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: ${({ loading }) => (loading ? "not-allowed" : "pointer")};
  transition: all 0.3s ease;
  opacity: ${({ loading }) => (loading ? 0.7 : 1)};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors?.primaryHover || "#40a9ff"};
  }

  &:disabled {
    background-color: #d9d9d9;
    cursor: not-allowed;
  }
`;

export const LinkGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;

export const StyledLink = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors?.primary || "#1890ff"};
  font-size: 14px;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  width: 100%;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const Checkbox = styled.input`
  margin-right: 8px;
  cursor: pointer;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: flex-start;
  font-size: 14px;
  color: ${({ theme }) => theme.colors?.text || "#333"};
  cursor: pointer;
  margin-top: 8px;

  ${ErrorMessage} {
    margin-left: 8px;
  }
`;
export const PasswordStrengthMeter = styled.div<{ score: number }>`
  height: 4px;
  background: #e8e8e8;
  border-radius: 2px;
  margin: 8px 0;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${({ score }) => score * 20}%;
    background: ${({ score, theme }) => {
      if (score <= 2) return theme.colors?.error;
      if (score <= 3) return theme.colors?.warning;
      return theme.colors?.success;
    }};
    transition: all 0.3s ease;
  }
`;

export const PasswordRequirements = styled.div`
  margin: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const RequirementItem = styled.div<{ met: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: ${({ met, theme }) =>
    met ? theme.colors?.success : theme.colors?.text};
  opacity: ${({ met }) => (met ? 1 : 0.7)};

  svg {
    width: 16px;
    height: 16px;
    color: ${({ met, theme }) =>
      met ? theme.colors?.success : theme.colors?.text};
  }
`;
export const Subtitle = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors?.text || "#666"};
  text-align: center;
  margin-bottom: 24px;
  opacity: 0.8;
  line-height: 1.5;
`;
export const LogoLink = styled.a`
  display: block;
  margin-bottom: 20px;
`;

export const LogoImage = styled.img`
  width: 100px;
`;
