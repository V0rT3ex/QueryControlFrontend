import React, { Component, ChangeEvent } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import QueryControlState from "../interfaces/QueryControlState.interface";
import Statistics from "./Statistics";
import Rank from "./Rank";

const serverUrl = "http://localhost:5000/";

class QueryControl extends Component<{}, QueryControlState> {
  state: QueryControlState;

  constructor(props: {}) {
    super(props);
    this.state = {
      index: "",
      indexError: "",
      environ: "",
      environError: "",
      query: "",
      queryError: "",
      results: null,
    };
  }

  private changeIndex = (e: React.FormEvent<HTMLInputElement>) => {
    const index: string = e.currentTarget.value;
    this.setState({ index: index }, () => {
      this.validateIndex();
    });
  };

  private validateIndex = () => {
    const { index } = this.state;
    if (index.length < 5) {
      this.setState({
        indexError: "index field must contain at least 5 characters",
      });
      return false;
    } else {
      this.setState({
        indexError: "",
      });
      return true;
    }
  };

  private changeEnviron = (e: React.FormEvent<HTMLInputElement>) => {
    const environ: string = e.currentTarget.value;
    this.setState({ environ: environ }, () => {
      this.validateEnviron();
    });
  };

  private validateEnviron = () => {
    const { environ } = this.state;
    if (!environ || environ.includes(" ")) {
      this.setState({
        environError: "Environment is only one word!",
      });
      return false;
    } else {
      this.setState({
        environError: "",
      });
      return true;
    }
  };

  private changeQuery = (e: React.FormEvent<HTMLInputElement>) => {
    const query: string = e.currentTarget.value;
    this.setState({ query: query }, () => {
      this.validateQuery();
    });
  };

  private validateQuery = () => {
    const { query } = this.state;
    if (!query.endsWith("}") || !query.startsWith("{")) {
      this.setState({
        queryError: "Query must start and end with { }",
      });
      return false;
    } else {
      this.setState({
        queryError: "",
      });
      return true;
    }
  };

  private submit = async () => {
    const { index, environ, query } = this.state;
    const requestdata = {
      index: index,
      env: environ,
      query: query,
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
        results: {
          error: false,
          errorMessage: "",
          statistics: {
            dataSize: statisticsData["data size"],
            numOfIndices: statisticsData["number of indices"],
            queryRange: statisticsData["longest time range"],
          },
          rank: {
            queryScore: queryData["score"],
            conditions: queryData["conditions"],
          },
        },
      });
    } catch (error) {
      this.setState({
        results: {
          error: true,
          errorMessage:
            "Could not make a request to the server. Please contact the maintaining team.",
          statistics: null,
          rank: null,
        },
      });
      console.log(error);
      return;
    }
  };

  render() {
    const { indexError, environError, queryError, results } = this.state;

    let resultMarkup;

    if (results) {
      const { error, errorMessage, statistics, rank } = results;
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
    }

    return (
      <React.Fragment>
        <div className="App">
          <form>
            <TextField
              name="index"
              value={this.state.index}
              placeholder="Index"
              label="Index"
              multiline
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                this.changeIndex(e);
              }}
              error={indexError !== ""}
              helperText={indexError !== "" ? indexError : ""}
            />
            <br />
            <br />
            <TextField
              name="environ"
              value={this.state.environ}
              placeholder="Environ"
              label="Environ"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                this.changeEnviron(e);
              }}
              error={environError !== ""}
              helperText={environError !== "" ? environError : ""}
            />
            <br />
            <br />
            <TextField
              name="query"
              value={this.state.query}
              placeholder="Query"
              label="Query"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                this.changeQuery(e);
              }}
              error={queryError !== ""}
              helperText={queryError !== "" ? queryError : ""}
            />
            <br />
            <br />
            <Button variant="contained" color="primary" onClick={this.submit}>
              Send
            </Button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default QueryControl;
