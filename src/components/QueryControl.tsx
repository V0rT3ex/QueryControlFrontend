import React, { Component } from "react";
import axios from "axios";
import QueryControlState from "../interfaces/QueryControlState.interface";
import Statistics from "./Statistics";
import Rank from "./Rank";

const serverUrl = "http://localhost:5000/";

class QueryControl extends Component<{}, QueryControlState> {
  state: QueryControlState;
  index: React.RefObject<HTMLInputElement>;
  environ: React.RefObject<HTMLInputElement>;
  query: React.RefObject<HTMLInputElement>;

  constructor(props: {}) {
    super(props);
    this.state = {
      index: "",
      indexError: "",
      environ: "",
      environError: "",
      query: "",
      queryError: "",
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
      console.log(error);
      return;
    }
  };

  render() {
    const { error, errorMessage, rank, statistics } = this.state;

    let resultMarkup;

    if (error) {
      resultMarkup = <p>{errorMessage}</p>;
    } else if (rank && statistics) {
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
        {resultMarkup}
      </div>
    );
  }
}

export default QueryControl;
