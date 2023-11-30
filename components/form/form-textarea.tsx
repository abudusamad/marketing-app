"use client";

import { KeyboardEventHandler, forwardRef } from "react";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import FormError from "./form-error";
import { useFormStatus } from "react-dom";

interface FormTextareaProps{
    id: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
    className?: string;
    disabled?: boolean;
    errors?: Record<string, string[] | undefined>;
    onBlur?: () => void;
    onClick?: () => void;
    defaultValue?: string;
    onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(({
    id,
    label,
    placeholder,
    required,
    className,
    disabled,
    errors,
    onBlur,
    onClick,
    defaultValue,
    onKeyDown
}, ref) => {
    const { pending } = useFormStatus();
    return (
        <div className="space-y-2 w-full">
            <div className="space-y-1 w-full">
                {label ? (
                    <Label
                        htmlFor={id}
                        className="text-xs font-medium text-neutral-700"
                    
                    >
                        {label}
                       
                    </Label>
                    
                ): null
                }
                <textarea
                    ref={ref}
                    id={id}
                    placeholder={placeholder}
                    required={required}
                    onBlur={onBlur}
                    onClick={onClick}
                    defaultValue={defaultValue}
                    onKeyDown={onKeyDown}
                    disabled={pending || disabled}
                    name={id}
                    className={cn(
                        "resize-none focus-visible:ring-offset-0 focus-visible:ring-0 focus:ring-0 outline-none shadow-sm",
                        className
                    )}
                  aria-describedby={`${id}-error`}
                />

            </div>
            <FormError errors={errors} id={id} />

        </div>
       
)})

FormTextarea.displayName = "FormTextarea";
