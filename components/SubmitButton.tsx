import React from "react";
import { Button } from "./ui/button";

interface ButtonProps {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
}

const SubmitButton = ({ isLoading, className, children }: ButtonProps) => {
  return (
    <div>
      <Button type="submit" className={className} disabled={isLoading}>
        {isLoading ? "Enviando..." : children}
      </Button>
    </div>
  );
};

export default SubmitButton;
