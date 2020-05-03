import React, { Component } from "react";
import StatisticsProps from "../interfaces/StatisticsProps.interface";

class Statistics extends Component<StatisticsProps> {
  constructor(props: StatisticsProps) {
    super(props);
  }

  render() {
    const { dataSize, numOfIndices, queryRange } = this.props;
    return (
      <div>
        <p>
          Data size: {dataSize}
          Number of Indices: {numOfIndices}
          Query Range: Years: {queryRange.years}, Months: {queryRange.months}
        </p>
      </div>
    );
  }
}

export default Statistics;
