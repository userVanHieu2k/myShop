import React from "react";
import "./style.scss";
import { Button } from "antd";

interface Props {
  children?: string | any;
  mode?: "dark" | "light" | "blue";
  htmlType?: "submit" | "reset" | "button" | undefined;
  onClick?: (e?: any) => void | undefined;
  icon?: any;
}
const ButtonCustom = (props: Props) => {
  const { children, mode, htmlType, onClick, icon } = props;
  return (
    <Button
      icon={icon}
      onClick={onClick}
      htmlType={htmlType}
      className={`${mode} btn-default`}
    >
      {children}
    </Button>
  );
};
export default ButtonCustom;
