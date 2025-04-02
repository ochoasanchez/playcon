type RadioInputProps = {
  id: string;
  index: number;
  label: string;
  selectedOption: string;
  onChange: (id: string) => void;
  showFeedback: boolean;
  isCorrect: boolean;
};

const RadioInput = ({
  id,
  label,
  selectedOption,
  onChange,
  showFeedback,
  isCorrect,
}: RadioInputProps) => {
  const isSelected = selectedOption === id;

  const handleClick = () => {
    onChange(id);
  };

  let backgroundColor = "bg-white text-black";
  if (showFeedback) {
    if (isCorrect) {
      backgroundColor = "bg-green-500 text-white";
    } else if (isSelected) {
      backgroundColor = "bg-red-500 text-white";
    }
  }

  return (
    <div
      className={`${backgroundColor} border-4 ${
        isSelected ? "border-green-500" : "border-white"
      } flex cursor-pointer rounded-full p-2 sm:p-4 text-lg transition duration-300 focus-within:border-green-500 hover:border-green-500`}
      onClick={handleClick}
    >
      <input
        type="radio"
        id={id}
        name="option"
        checked={isSelected}
        onChange={() => {}}
        disabled={showFeedback}
      />
      <label htmlFor={id} className="ml-6 text-2xl sm:text-4xl">
        {label}
      </label>
    </div>
  );
};

export default RadioInput;
