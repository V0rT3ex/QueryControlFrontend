import React, { Component } from "react";
import axios from "axios";
import QueryControlState from "../interfaces/QueryControlState.interface";
import { stat } from "fs";

const serverUrl = "http://localhost:8080/";

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

  submit = async () => {
    const indexValue = this.index.current.value;
    const environValue = this.environ.current.value;
    const queryValue = this.query.current.value;
    const requestdata = {
      index: indexValue,
      env: environValue,
      query: queryValue,
    };

    try {
      const statisticRequest = await axios.post(
        serverUrl + "search_statistics",
        requestdata
      );
      const queryRequest = await axios.post(
        serverUrl + "query_score",
        requestdata
      );
      const statisticsData = statisticRequest.data;
      const queryData = queryRequest.data;

      this.setState({
        error: false,
        statistics: {
          dataSize: statisticsData["data size"],
          numOfIndices: statisticsData["number of indices"],
          queryRange: statisticsData["longest time range"],
        },
        rank: {
          queryScore: queryData["score"],
          conditions: queryData["conditions"],
        },
      });
    } catch (error) {
      this.setState({
        error: true,
        errorMessage:
          "Could not make a request to the server. Please contact the maintaining team.",
      });
      return;
    }
  };

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
        <button onClick={this.submit}>Submit</button>
      </div>
    );
  }
}

export default QueryControl;
