import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Breadcrumbs,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";

export const CustomBreadcrumbs = ({
  isBusy = false,
  breadcrumbs = [],
  headerActions,
  sticky = false,
}) => {
  return (
    <>
      <Paper
        elevation={0}
        variant="outlined"
        style={{ ...(sticky && { position: "sticky", top: 56, zIndex: 1 }) }}
      >
        <Box
          paddingX={2}
          paddingY={1.5}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Breadcrumbs aria-label="breadcrumb">
            {breadcrumbs?.map((el) => (
              <div key={el?.label}>
                {el?.link ? (
                  <Link
                    to={el?.link}
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    {el?.label}
                  </Link>
                ) : (
                  <Typography color="textPrimary">{el?.label}</Typography>
                )}
              </div>
            ))}
          </Breadcrumbs>

          {isBusy ? (
            <CircularProgress color="primary" size={26} />
          ) : (
            !!headerActions && headerActions
          )}
        </Box>
      </Paper>

      <br />
    </>
  );
};
