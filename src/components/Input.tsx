import React, { forwardRef } from "react";
import { KeyboardTypeOptions, TextInput } from "react-native";
import styled from "styled-components/native";

interface TextInputType {
  value: string;
  placeholder: string;
  onChange: (text: string) => void;
  name?: string;
  type?: KeyboardTypeOptions;
  fontSize?: number;
}
// 첫번째: ref의 타입, 두번째: 컴포넌트에 전달되는 속성들의 타입
const Input = forwardRef<TextInput, TextInputType>(
  ({ value, type, name, placeholder, fontSize, onChange }, ref) => {
    return (
      <TextInput
        defaultValue={value}
        placeholder={placeholder}
        ref={ref}
        keyboardType={type}
        onChangeText={(text) => onChange(text)}
        style={{ fontSize: fontSize }}
        autoFocus
      />
    );
  }
);

export default Input;
