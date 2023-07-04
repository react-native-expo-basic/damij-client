import { TextInput, TextInputProps } from "react-native";
import { useController, Control } from "react-hook-form";
import { SignupFormValues } from "./Signup";

interface InputProps extends TextInputProps {
  name: keyof SignupFormValues;
  control: Control<SignupFormValues>;
}
// control >  패키지의 폼 관리를 위한 컨트롤러 객체 , name > eamil,password 등의 이름
const SignupInput: React.FC<InputProps> = ({
  name,
  control,
  ...textInputProps
}) => {
  const { field } = useController({ control, defaultValue: "", name });
  return (
    <TextInput
      value={field.value?.toString()}
      onChangeText={field.onChange}
      {...textInputProps}
    />
  );
};

export default SignupInput;
