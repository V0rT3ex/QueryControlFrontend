import QueryRange from "./QueryRange.interface";

export default interface StatisticsProps {
  dataSize: string;
  numOfIndices: number;
  queryRange: QueryRange;
}
