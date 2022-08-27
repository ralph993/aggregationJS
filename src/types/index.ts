export type MainOperators =
  | "$match"
  | "$format"
  | "$groupBy"
  | "$sort"
  | "$limit"
  | "$skip"
  | "$unwind"
  | "$math"
  | "$remove"
  | "$concatArrays"
  | "$push";

export type Pipeline = {
  [key in MainOperators]: object;
};
