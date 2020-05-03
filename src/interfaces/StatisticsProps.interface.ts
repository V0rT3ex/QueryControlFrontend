import QueryRange from "./queryRange.interface";

export default interface StatisticsProps {
  dataSize: string;
  numOfIndices: number;
  queryRange: QueryRange;
}
