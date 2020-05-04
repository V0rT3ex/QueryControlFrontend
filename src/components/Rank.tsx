import React, { Component } from "react";
import RankProps from "../interfaces/RankProps.interface";

class Rank extends Component<RankProps> {
  constructor(props: RankProps) {
    super(props);
  }

  render() {
    const { queryScore, conditions } = this.props;
    return (
      <div>
        <p>
          Query score: {queryScore}
          Conditions:{" "}
          {conditions.map((condition) => (
            <span>
              <p>
                name: {condition.name} percent: {condition.percent}
                details: {condition.details}
              </p>
            </span>
          ))}
        </p>
      </div>
    );
  }
}

export default Rank;
