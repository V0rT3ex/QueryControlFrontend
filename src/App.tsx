import React, { Component } from "react";
import Statistics from "./components/Statistics";
import Rank from "./components/Rank";

class App extends Component {
  render() {
    return (
      <div>
        <Statistics
          dataSize="10KB"
          numOfIndices={12}
          queryRange={{ years: 1, months: 4 }}
        />
        <Rank
          queryScore={9}
          conditions={[
            {
              name: "Size too big",
              percent: 7,
              details: "What is wrong?!",
            },
            {
              name: "Too many aggergations",
              percent: 712,
              details: "Cannot you see?!",
            },
          ]}
        />
      </div>
    );
  }
}

export default App;
