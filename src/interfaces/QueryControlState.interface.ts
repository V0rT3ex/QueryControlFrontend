import ResultsProps from "./ResultsProps.interface";

export default interface QueryControlState {
  index: string;
  indexError: string;
  environ: string;
  environError: string;
  query: string;
  queryError: string;
  results: ResultsProps;
}
