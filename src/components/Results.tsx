import React, { Component } from "react";
import ResultsProps from "../interfaces/ResultsProps.interface";
import Statistics from "./Statistics";
import Rank from "./Rank";

class Results extends Component<ResultsProps> {
  constructor(props: ResultsProps) {
    super(props);
  }

  render() {
    const { error, errorMessage, statistics, rank } = this.props;
    let resultMarkup;
    if (error) {
      resultMarkup = <p>{errorMessage}</p>;
    } else if (statistics && rank) {
      resultMarkup = (
        <div>
          <Statistics
            dataSize={statistics.dataSize}
            numOfIndices={statistics.numOfIndices}
            queryRange={statistics.queryRange}
          />
          <Rank queryScore={rank.queryScore} conditions={rank.conditions} />
        </div>
      );
    }

    return <div>{resultMarkup}</div>;
  }
}

export default Results;
