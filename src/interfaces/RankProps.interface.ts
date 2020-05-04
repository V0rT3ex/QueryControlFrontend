import Condition from "./Condition.interface";

export default interface RankProps {
  queryScore: number;
  conditions: Array<Condition>;
}
