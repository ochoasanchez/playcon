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
  index,
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
        isSelected ? "border-orange-500" : "border-white"
      } flex text-lg rounded-md px-6 py-6 transition duration-300 hover:border-orange-500 focus-within:border-orange-500 cursor-pointer animate-slide-in-${
        index + 1
      }`}
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
      <label htmlFor={id} className="text-5xl ml-6">
        {label}
      </label>
    </div>
  );
};

export default RadioInput;
