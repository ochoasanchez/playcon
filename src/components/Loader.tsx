import ruletaMikia from "../assets/images/roulette.gif";

function Loader({
  roulette,
  participants,
  type,
}: {
  roulette?: boolean;
  participants?: any;
  type?: "main" | "memory" | "trivia";
}) {
  debugger;
  if (roulette && type === "main") {
    const names = participants.map(
      (participant: any) => participant.name,
    );
    debugger;
    return (
      <main>
        <img src={ruletaMikia} className="w-8/12" />

        <div className="scrolling-names-container">
          <div className="scrolling-names">
            {names
              .concat(names)
              .concat(names)
              .concat(names)
              .concat(names)
              .concat(names)
              .concat(names)
              .concat(names)
              .concat(names)
              .concat(names)
              .concat(names)
              .map((name: any, index: any) => (
                <div key={index} className="scrolling-name text-7xl">
                  {name}
                </div>
              ))}
          </div>
        </div>
      </main>
    );
  }
  if ((roulette && type === "memory") || type === "trivia") {
    const names = participants.map(
      (participant: any) => participant.playerName,
    );
    debugger;
    return (
      <main>
        <img src={ruletaMikia} className="w-8/12" />

        <div className="scrolling-names-container">
          <div className="scrolling-names">
            {names
              .concat(names)
              .concat(names)
              .concat(names)
              .concat(names)
              .concat(names)
              .concat(names)
              .concat(names)
              .concat(names)
              .concat(names)
              .concat(names)
              .map((name: any, index: any) => (
                <div key={index} className="scrolling-name text-7xl">
                  {name}
                </div>
              ))}
          </div>
        </div>
      </main>
    );
  }
  return (
    <main>
      <span className="loader"></span>
    </main>
  );
}

export default Loader;
