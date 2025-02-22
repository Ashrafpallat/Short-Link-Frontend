import React from "react";
import { IconButton, Typography } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

const CustomPagination = ({ count, page, rowsPerPage, onPageChange }) => {
    const handleBack = (event) => onPageChange(event, page - 1);
    const handleNext = (event) => onPageChange(event, page + 1);

    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
            <IconButton onClick={handleBack} disabled={page === 0} sx={{ color: "white" }}>
                <KeyboardArrowLeft />
            </IconButton>
            <Typography sx={{ color: "white", fontWeight: "bold" }}>{page + 1}</Typography>
            <IconButton onClick={handleNext} disabled={page >= Math.ceil(count / rowsPerPage) - 1} sx={{ color: "white" }}>
                <KeyboardArrowRight />
            </IconButton>
        </div>
    );
};

export default CustomPagination;
