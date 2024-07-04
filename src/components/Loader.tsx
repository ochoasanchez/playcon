import ruletaMikia from "../assets/images/roulette.gif";

const ScrollingNames = () => {
    const names = [
      "John Doe", "Jane Smith", "Alice Johnson", "Bob Brown", "Carol White",
      "David Green", "Eve Black", "Frank Blue", "Grace Red", "Hank Yellow",
      "Ivy Purple", "Jack Orange", "Kara Pink", "Leo Gold", "Mona Silver",
      "Nina Bronze", "Oscar Platinum", "Paula Diamond", "Quinn Emerald", "Ray Ruby"
    ];
  
    return (
      <div className="scrolling-names-container">
        <div className="scrolling-names">
          {names.concat(names).concat(names).concat(names).concat(names).concat(names).concat(names).concat(names).concat(names).concat(names).concat(names).map((name, index) => (
            <div key={index} className="scrolling-name text-7xl">
              {name}
            </div>
          ))}
        </div>
      </div>
    );
  };

// const ScrollingNames = () => {
//     const names = [
//       "John Doe", "Jane Smith", "Alice Johnson", "Bob Brown", "Carol White",
//       "David Green", "Eve Black", "Frank Blue", "Grace Red", "Hank Yellow",
//       "Ivy Purple", "Jack Orange", "Kara Pink", "Leo Gold", "Mona Silver",
//       "Nina Bronze", "Oscar Platinum", "Paula Diamond", "Quinn Emerald", "Ray Ruby"
//     ];
  
//     return (
//       <div className="scrolling-names-container">
//         <div className="scrolling-names">
//           {names.map((name, index) => (
//             <div key={index} className="scrolling-name">
//               {name}
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

function Loader({ roulette }: { roulette?: boolean }) {

    if (roulette) {
        return (
            <main>
                <img src={ruletaMikia} className="w-6/12" />
                <ScrollingNames />
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