interface FormPickerProps {
    id: string;
    errors?:Record<string, string[] | undefined>;
}

export const FormPicker = ({
    id,
    errors
}: FormPickerProps) => {
    

    return (
        <div>
            Formpicker
        </div>
    )
}
