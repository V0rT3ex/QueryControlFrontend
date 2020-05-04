import React, { Component } from "react";
import QueryControlState from "../interfaces/QueryControlState.interface";

class QueryControl extends Component<{}, QueryControlState> {
  state: QueryControlState;
  index: React.RefObject<HTMLInputElement>;
  environ: React.RefObject<HTMLInputElement>;
  query: React.RefObject<HTMLInputElement>;

  constructor(props: {}) {
    super(props);
    this.state = {
      error: false,
      errorMessage: "",
      rank: null,
      statistics: null,
    };
    this.index = React.createRef();
    this.environ = React.createRef();
    this.query = React.createRef();
  }

  render() {
    return (
      <div>
        <label>
          Index:
          <input type="text" ref={this.index} />
        </label>
        <label>
          Environment:
          <input type="text" ref={this.environ} />
        </label>
        <label>
          Query:
          <input type="text" ref={this.query} />
        </label>
      </div>
    );
  }
}

export default QueryControl;
