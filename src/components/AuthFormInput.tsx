import { useState } from "react";
import { TextInput, TextInputProps } from "react-native";
import {
  useController,
  Control,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import styled from "styled-components/native";

type FormValues = {
  email: string;
  password: string;
  passwordConfirm?: string;
};

interface InputProps<T extends FieldValues> extends TextInputProps {
  name: keyof FormValues;
  control: Control<T>;
  errors: FieldErrors<FormValues>;
}
interface InputType {
  isInputFocused: boolean;
  hasError: FieldErrors<FormValues>[keyof FormValues] | undefined;
}

// control > 패키지의 폼 관리를 위한 컨트롤러 객체 , name > email,password 등의 이름
export default function AuthFormInput<T extends FormValues>({
  name,
  control,
  errors,
  children,
  ...textInputProps
}: InputProps<T>) {
  const { field } = useController({ control, name: name as Path<T> });
  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <InputWrapper>
      <InputContainer isInputFocused={isInputFocused} hasError={errors[name]}>
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
