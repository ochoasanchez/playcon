import { useState } from "react";
import { Link } from "react-router-dom";
import RadioInput from "../components/RadioInput";

export function Trivia() {
    const [selectedOption, setSelectedOption] = useState("");

    const handleOptionChange = (id: string) => {
        setSelectedOption(id);
    };

    return (
        <div className="h-lvh w-full flex flex-col items-center justify-center">
            <div className="flex w-lvw gap-12 px-12">
                <div className="w-full bg-yellow-300 h-4 rounded-lg"></div>
                <div className="w-full bg-white h-4 rounded-lg"></div>
                <div className="w-full bg-white h-4 rounded-lg"></div>
                <div className="w-full bg-white h-4 rounded-lg"></div>
                <div className="w-full bg-white h-4 rounded-lg"></div>
            </div>
            
            <p className="text-yellow-300 font-bold mt-10 uppercase">Pregunta 1/X</p>
            <h1 className="text-6xl font-bold text-white mt-4">Trivia</h1>

            <div className="flex flex-col w-3/12 mt-4">
                <form className="flex flex-col">
                    <RadioInput id="option-1" label="Option #1" selectedOption={selectedOption} onChange={handleOptionChange} />

                    <RadioInput id="option-2" label="Option #2" selectedOption={selectedOption} onChange={handleOptionChange} />

                    <RadioInput id="option-3" label="Option #3" selectedOption={selectedOption} onChange={handleOptionChange} />

                    <RadioInput id="option-4" label="Option #4" selectedOption={selectedOption} onChange={handleOptionChange} />

                    <button className="bg-orange-500 rounded-md mt-4 py-4 font-bold uppercase">Siguiente</button>
                </form>

                <Link to="/" className="text-white mt-4">Home</Link>
            </div>
        </div>
    )
}
