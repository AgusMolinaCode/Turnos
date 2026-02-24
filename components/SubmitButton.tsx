import React from "react";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

interface SubmitButtonProps {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
  loadingText?: string;
}

const SubmitButton = ({ 
  isLoading, 
  className, 
  children,
  loadingText = "Enviando..."
}: SubmitButtonProps) => {
  return (
    <Button 
      type="submit" 
      className={className} 
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
