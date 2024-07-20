import ruletaMikia from "../assets/images/roulette.gif";

function Loader({ roulette, participants, type }: { roulette?: boolean, participants?: any, type?: 'main' | 'memory' | 'trivia' }) {

    if (roulette && type === 'main') {
      const names = participants.data.map((participant: any) => participant.attributes.name);
        
      return (
            <main>
                <img src={ruletaMikia} className="w-3/12" />
                
                <div className="scrolling-names-container">
                  <div className="scrolling-names">
                    {names.concat(names).concat(names).concat(names).concat(names).concat(names).concat(names).concat(names).concat(names).concat(names).concat(names).map((name: any, index: any) => (
                      <div key={index} className="scrolling-name text-4xl">
                        {name}
                      </div>
                    ))}
                  </div>
                </div>
            </main>
        )
    } 
    if (roulette && type === 'memory' || type === 'trivia') {
      const names = participants.data.map((participant: any) => participant.attributes.playerName);
        
      return (
            <main>
                <img src={ruletaMikia} className="w-8/12" />
                
                <div className="scrolling-names-container">
                  <div className="scrolling-names">
                    {names.concat(names).concat(names).concat(names).concat(names).concat(names).concat(names).concat(names).concat(names).concat(names).concat(names).map((name: any, index: any) => (
                      <div key={index} className="scrolling-name text-7xl">
                        {name}
                      </div>
                    ))}
                  </div>
                </div>
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