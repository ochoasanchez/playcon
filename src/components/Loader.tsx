import ruletaMikia from "../assets/images/roulette.gif";

function Loader({ roulette }: { roulette?: boolean }) {

    if (roulette) {
        return (
            <main>
                <img src={ruletaMikia} className="w-6/12" />
            </main>
        )
    } 
    return (
        <main>
            <span className="loader"></span>
        </main>
    )
}

export default Loader;