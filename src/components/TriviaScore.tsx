import escudoFeliz from "../assets/images/escudo-feliz.gif";
import escudoTriste from "../assets/images/escudo-triste.gif";
import escudoBurla from "../assets/images/escudo-burla.gif";
import { Link } from 'react-router-dom';

function getResultMessage(score: number) {
    if (score < 3) {
        return {
            image: escudoTriste,
            message: "Hoy como que no es tu día de suerte",
        };
    } else if (score < 5) {
        return {
            image: escudoBurla,
            message: "Parece que estás en entrando en granjas desconocidas",
        };
    } else {
        return {
            image: escudoFeliz,
            message: "Estamos en una academia de genios y  tú pareces el líder",
        };
    }
}

const TriviaScore = ({ score, totalQuestions }: { score: number, totalQuestions: number }) => {
    const { image, message } = getResultMessage(score);

    return (        
        <div className="h-lvh w-full flex flex-col items-center justify-center mt-4 px-4 md:px-0 text-center">
            <img src={image} className="w-96" />
            <p className="text-2xl">Respondiste {score} de {totalQuestions} preguntas correctamente</p>
            <div className="orange-circle mt-12">
                <p className="font-bold text-4xl">{message}</p>
                <Link to="/" className="text-white bg-orange-500 rounded-full mt-16 p-4 font-bold uppercase text-2xl">Volver</Link>
            </div>
        </div>
    );
};

export default TriviaScore;
