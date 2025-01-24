const FormInput = ({
  error, label, ...restProps
}: React.InputHTMLAttributes<HTMLInputElement> & {
  error: string | undefined
  label: string
}) => {
  return (
    <div className="flex flex-col w-[100%]">
      <label>{label}</label>
      <input className={`px-1 bg-inherit border ${error ? 'border-red-500' : 'border-gray-500'}`} {...restProps} />
      <span className={`whitespace-pre ${error && 'text-red-500'}`}>{error || ' '}</span>
    </div>
  );
};

export default FormInput
