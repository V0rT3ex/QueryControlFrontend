import RankProps from "./RankProps.interface";
import StatisticsProps from "./StatisticsProps.interface";

export default interface ResultsProps {
  error: boolean;
  errorMessage: string;
  rank: RankProps;
  statistics: StatisticsProps;
}
