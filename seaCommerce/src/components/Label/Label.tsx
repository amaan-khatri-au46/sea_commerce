export const Label = ({ text, required }: { text: string; required?: boolean }) => {
  return (
    <label className="text-gray-400">
    {text}
    {required && <span className="text-red-500">*</span>}
  </label>
  )
}
