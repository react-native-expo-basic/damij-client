import { useState } from "react";
import { TextInput, TextInputProps } from "react-native";
import { useController, Control, FieldErrors } from "react-hook-form";
import { SignupFormValues } from "./SignupForm";
import styled from "styled-components/native";
interface InputProps extends TextInputProps {
  name: keyof SignupFormValues;
  control: Control<SignupFormValues>;
  errors: FieldErrors<SignupFormValues>;
}
interface InputType {
  isInputFocused: boolean;
  hasError: FieldErrors<SignupFormValues>[keyof SignupFormValues] | undefined;
}

// control >  패키지의 폼 관리를 위한 컨트롤러 객체 , name > eamil,password 등의 이름
export default function SignupInput({
  name,
  control,
  errors,
  children,
  ...textInputProps
}: InputProps) {
  const { field } = useController({ control, defaultValue: "", name });
  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <InputWrapper>
      <InputContainer
        isInputFocused={isInputFocused}
        hasError={errors[field.name]}
      >
        {children}
        <InputBox>
          <TextInput
            placeholderTextColor="#a0a0a0"
            value={field.value?.toString()}
            onChangeText={field.onChange}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            {...textInputProps}
          />
        </InputBox>
      </InputContainer>
      {errors[name]?.message && <ErrorText>{errors[name]?.message}</ErrorText>}
    </InputWrapper>
  );
}
const InputWrapper = styled.View`
  display: flex;
  flex-direction: column;
  margin: 5px 0 4px;
`;
const InputBox = styled.View`
  margin-left: 10px;
  width: 100%;
`;
const InputContainer = styled.View<InputType>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 15px;
  border-radius: 3px;
  border-width: 1px;
  border-color: ${(props) =>
    props.isInputFocused ? "#6cacf5" : props.hasError ? "#c84040" : "#e8e8e8"};
  margin-bottom: 6px;
  ${(props) => props.hasError && `border-color: #c84040 !important;`}
`;
const ErrorText = styled.Text`
  margin-left: 10px;
  font-size: 12px;
  color: #c84040;
`;
