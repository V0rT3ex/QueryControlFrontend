import React, { Component } from "react";
import Statistics from "./components/Statistics";

class App extends Component {
  render() {
    return (
      <div>
        <Statistics
          dataSize="10KB"
          numOfIndices={12}
          queryRange={{ years: 1, months: 4 }}
        />
      </div>
    );
  }
}

export default App;
