import React from "react";
import { Skeleton } from "@mui/material";

export const GenericListSkeleton = ({ number = 5, gap = 10, height = 100 }) => {
  return Array.from(Array(number).keys()).map((x) => (
    <Skeleton
      key={`skeleton-${x}`}
      width="100%"
      variant="rect"
      height={height}
      style={{
        marginBottom: gap,
      }}
    />
  ));
};
