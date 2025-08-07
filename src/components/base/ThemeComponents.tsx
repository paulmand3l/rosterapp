import { createBox, createText } from "@shopify/restyle";
import { Theme } from "../../theme/themes";
import { TouchableOpacity, DimensionValue } from "react-native";
import React from "react";

const Box = createBox<Theme>();
const Text = createText<Theme>();

interface ButtonProps {
  onPress: () => void;
  label: string;
  variant?: "primary" | "secondary";
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: keyof Theme["borderRadii"];
}

const Button = ({
  onPress,
  label,
  variant = "primary",
  width,
  height,
  borderRadius = "m",
}: ButtonProps): JSX.Element => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Box
        backgroundColor={variant === "primary" ? "primary" : "cardBackground"}
        paddingVertical="s"
        paddingHorizontal="m"
        borderRadius={borderRadius}
        width={width}
        height={height}
        justifyContent="center"
        alignItems="center"
      >
        <Text
          variant="button"
          color={variant === "primary" ? "white" : "primary"}
        >
          {label}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

export { Box, Text, Button };