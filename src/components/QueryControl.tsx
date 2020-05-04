import React, { Component } from "react";
import QueryControlState from "../interfaces/QueryControlState.interface";

class QueryControl extends Component<{}, QueryControlState> {
  state: QueryControlState;

  constructor(props: {}) {
    super(props);
    this.state = {
      error: false,
      errorMessage: "",
      rank: null,
      statistics: null,
    };
  }

  render() {
    return <div></div>;
  }
}

export default QueryControl;
