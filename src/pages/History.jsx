import React, { useEffect, useState } from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress,
    TablePagination, TableSortLabel, TextField,
    Box
} from "@mui/material";
import api from '../services/axiosInstance';
import Header from "../components/Header";
import CustomPagination from "../components/CustomPagination";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import toast from "react-hot-toast";

const History = () => {
    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("createdAt");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await api.get("/url/history");
                setUrls(response.data.urls);
            } catch (error) {
                console.error("Error fetching history:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    // Sorting function
    const handleSort = (property) => {
        const isAscending = orderBy === property && order === "asc";
        setOrder(isAscending ? "desc" : "asc");
        setOrderBy(property);
    };

    // Sorting logic
    const sortedData = [...urls].sort((a, b) => {
        if (order === "asc") {
            return a[orderBy] > b[orderBy] ? 1 : -1;
        } else {
            return a[orderBy] < b[orderBy] ? 1 : -1;
        }
    });

    // Search filter logic
    const filteredData = sortedData.filter((url) =>
        url.originalUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
        url.shortUrl.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle pagination
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard!"); // You can replace this with a toast notification
      };
    return (
        <div>
            <Header />
            <div style={{ backgroundColor: "#1F2937", minHeight: "100vh", padding: "20px" }}>
                <Paper sx={{ backgroundColor: "#2D3748", padding: 2, color: "white" }}>
                    <Typography variant="h5" align="center" gutterBottom>
                        URL Shortening History
                    </Typography>

                    {/* Search Box */}
                    <TextField
                        label="Search URL"
                        variant="outlined"
                        fullWidth
                        sx={{
                            backgroundColor: "", // Slightly transparent background
                            marginBottom: "10px",
                            borderRadius: "5px",
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "#1F2937" }, // Border color white
                                "&:hover fieldset": { borderColor: "#1F2937" }, // Border color on hover
                                "&.Mui-focused fieldset": { borderColor: "#1F2937" }, // Border color on focus
                            },
                            "& .MuiInputLabel-root": { color: "white" }, // Label color
                            "& .MuiInputLabel-root.Mui-focused": { color: "#90caf9" }, // Label color on focus
                            "& input": { color: "white" }, // Text color
                            "& input::placeholder": { color: "rgba(255, 255, 255, 0.7)" }, // Placeholder color
                        }}
                        InputProps={{
                            style: { color: "white" },
                        }}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />


                    {loading ? (
                        <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
                            <CircularProgress />
                        </div>
                    ) : filteredData.length === 0 ? (
                        <Typography align="center" color="gray">
                            No URL history found.
                        </Typography>
                    ) : (
                        <>
                            <TableContainer component={Paper} sx={{ backgroundColor: "#374151" }}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{
                                                color: "white",
                                                "& .MuiTableSortLabel-root": { color: "white" },  // Default sort label color
                                                "& .MuiTableSortLabel-root.Mui-active": { color: "white" }, // Active state color
                                                "& .MuiTableSortLabel-icon": { color: "white" }  // Sort arrow color
                                            }}>
                                                <TableSortLabel
                                                    active={orderBy === "createdAt"}
                                                    direction={orderBy === "createdAt" ? order : "asc"}
                                                    onClick={() => handleSort("createdAt")}
                                                >
                                                    Date
                                                </TableSortLabel>
                                            </TableCell>
                                            <TableCell sx={{
                                                color: "white",
                                                "& .MuiTableSortLabel-root": { color: "white" },  // Default sort label color
                                                "& .MuiTableSortLabel-root.Mui-active": { color: "white" }, // Active state color
                                                "& .MuiTableSortLabel-icon": { color: "white" }  // Sort arrow color
                                            }}>                                                <TableSortLabel
                                                active={orderBy === "originalUrl"}
                                                direction={orderBy === "originalUrl" ? order : "asc"}
                                                onClick={() => handleSort("originalUrl")}
                                            >
                                                    Original URL
                                                </TableSortLabel>
                                            </TableCell>
                                            <TableCell sx={{
                                                color: "white",
                                                "& .MuiTableSortLabel-root": { color: "white" },  // Default sort label color
                                                "& .MuiTableSortLabel-root.Mui-active": { color: "white" }, // Active state color
                                                "& .MuiTableSortLabel-icon": { color: "white" }  // Sort arrow color
                                            }}>                                                <TableSortLabel
                                                active={orderBy === "shortUrl"}
                                                direction={orderBy === "shortUrl" ? order : "asc"}
                                                onClick={() => handleSort("shortUrl")}
                                            >
                                                    Short URL
                                                </TableSortLabel>
                                            </TableCell>
                                            <TableCell sx={{
                                                color: "white",
                                                "& .MuiTableSortLabel-root": { color: "white" },  // Default sort label color
                                                "& .MuiTableSortLabel-root.Mui-active": { color: "white" }, // Active state color
                                                "& .MuiTableSortLabel-icon": { color: "white" }  // Sort arrow color
                                            }}>                                                <TableSortLabel
                                                active={orderBy === "clicks"}
                                                direction={orderBy === "clicks" ? order : "asc"}
                                                onClick={() => handleSort("clicks")}
                                            >
                                                    Clicks
                                                </TableSortLabel>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((url) => (
                                            <TableRow key={url._id}>
                                                <TableCell sx={{ color: "white" }}>
                                                    {new Date(url.createdAt).toLocaleDateString()}
                                                </TableCell>
                                                <TableCell>
                                                    <a href={url.originalUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#90caf9", textDecoration: "underline" }}>
                                                        {url.originalUrl}
                                                    </a>
                                                </TableCell>
                                                <TableCell>
                                                    <a href={`http://localhost:5000/${url.shortUrl}`} target="_blank" rel="noopener noreferrer" style={{ color: "#66bb6a", textDecoration: "underline" }}>
                                                        {`http://localhost:5000/${url.shortUrl}`}
                                                    </a>

                                                    <ContentCopyIcon
                                                        fontSize="small"
                                                        className="text-white ml-2 cursor-pointer hover:text-gray-300 transition-colors"
                                                        onClick={() => handleCopy(`http://localhost:5000/${url.shortUrl}`)}
                                                    />
                                                </TableCell>
                                                <TableCell sx={{ color: "white", textAlign: "center" }}>{url.clicks}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            {/* Pagination */}
                            <Box sx={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "10px" }}>
                                <TablePagination
                                    component="div"
                                    count={filteredData.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    ActionsComponent={CustomPagination}  // Use custom pagination
                                    sx={{ color: "white", display: "flex", justifyContent: "center" }} // Center pagination
                                    rowsPerPageOptions={[]} // Hides "Rows per page"
                                    labelDisplayedRows={() => ""} // Hides "1-2 of 2" text
                                />

                            </Box>
                        </>
                    )}
                </Paper>
            </div>
        </div>
    );
};

export default History;
