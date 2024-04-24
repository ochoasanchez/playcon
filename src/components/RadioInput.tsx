type RadioInputProps = {
  id: string,
  label: string,
  selectedOption: string,
  onChange: (id: string) => void,
}

const RadioInput = ({ id, label, selectedOption, onChange }: RadioInputProps) => {
  const isSelected = selectedOption === id;

  const handleClick = () => {
    onChange(id);
  };

  return (
    <div 
      className={`bg-white border-4 ${isSelected ? 'border-orange-500' : 'border-white'} text-lg rounded-md px-3 py-4 mt-4 transition duration-300 hover:border-orange-500 focus-within:border-orange-500 cursor-pointer`} 
      onClick={handleClick}
    >
      <input 
        type="radio" 
        id={id} 
        name="option" 
        checked={isSelected} 
        onChange={() => {}}
      />
      <label htmlFor={id} className="text-black ml-3">{label}</label>
    </div>
  );
}

export default RadioInput;
