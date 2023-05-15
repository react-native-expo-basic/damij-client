import React from "react";
import { View, Text } from "react-native";
import { InputProps, SignupFormValues } from "../screens/Signup";
import { Control } from "react-hook-form";

interface AddressInputProps {
  Input: React.FC<InputProps>;
  control: Control<SignupFormValues>;
}

const AddressInput: React.FC<AddressInputProps> = ({ Input, control }) => {
  return (
    <View>
      <Text>주소</Text>
      <Input name="address" control={control} />
    </View>
  );
};

export default AddressInput;
