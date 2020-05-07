import RankProps from "./RankProps.interface";
import StatisticsProps from "./StatisticsProps.interface";

export default interface QueryControlState {
  index: string;
  indexError: string;
  environ: string;
  environError: string;
  query: string;
  queryError: string;
  error: boolean;
  errorMessage: string;
  rank: RankProps;
  statistics: StatisticsProps;
}
