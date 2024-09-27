import React, { useState, useEffect } from "react";
import styles from "./HistoryTransaction.module.css";
import useAuth from "../../../hooks/useAuth";
import PageNavigation from "../../global/PageNavigation";
import PageSize from "../../global/PageSize";
import { GetTransactionByUser } from "../../../api/TransactionApi";
import { toast } from "react-toastify";
import {
  MDBBadge,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { formatPrice } from "../../../utils/FormatPrice";

const HistoryTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [status, setStatus] = useState(""); // State to store selected status
  const { user } = useAuth();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await GetTransactionByUser(
          page,
          pageSize,
          user?.id,
          status // Pass status to API call
        );
        const dataJson = await data.json();
        console.log(dataJson);
        if (data) {
          setTransactions(dataJson.metaData.data);
          setTotalPages(dataJson.metaData.totalPages);
        }
      } catch (error) {
        toast.error("Lỗi khi lấy dữ liệu giao dịch.");
      }
    };
    fetchTransactions();
  }, [user?.id, page, pageSize, status]); // Add status to dependencies

  const getStatusBadge = (transactionStatus) => {
    switch (transactionStatus) {
      case "Đã thanh toán":
        return <MDBBadge color="success">Đã thanh toán</MDBBadge>;
      case "Success":
        return <MDBBadge color="primary">Thành công</MDBBadge>;
      case "Fail":
        return <MDBBadge color="danger">Thất bại</MDBBadge>;
      default:
        return <MDBBadge color="secondary">Chưa rõ</MDBBadge>;
    }
  };
  return (
    <div className={styles.historyTransactionContainer}>
      <h2>Lịch sử giao dịch</h2>

      {/* Dropdown for status filter */}
      <div className={styles.filterContainer}>
        <FormControl sx={{ mb: 3, mt: 2, width: "200px" }}>
          <InputLabel id="status-label">Lọc theo trạng thái</InputLabel>
          <Select
            labelId="status-label"
            id="status"
            value={status}
            label="Lọc theo trạng thái"
            onChange={(e) => setStatus(e.target.value)} // Update selected status
          >
            <MenuItem value="">Tất cả</MenuItem>
            <MenuItem value="Paid">Đã thanh toán</MenuItem>
            <MenuItem value="Success">Thành công</MenuItem>
            <MenuItem value="Fail">Thất bại</MenuItem>
          </Select>
        </FormControl>
      </div>

      <MDBTable striped hover>
        <MDBTableHead style={{fontSize: "medium"}}>
          <tr>
            <th>Ngày</th>
            <th>Hình thức</th>
            <th>Thông tin</th>
            <th>Giá</th>
            <th>Trạng thái</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <tr key={transaction.transactionId}>
                <td>{transaction.transactionDate.split("T")[0]}</td>
                <td>{transaction.paymentMethod}</td>
                <td>{transaction.transactionInfo}</td>
                <td>{formatPrice(transaction.amount)}</td>
                <td>{getStatusBadge(transaction.status)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Không có giao dịch nào.</td>
            </tr>
          )}
        </MDBTableBody>
      </MDBTable>

      {transactions && transactions.length > 0 && (
        <>
          <div style={{ position: "relative", minHeight: "80px" }}>
            <ul
              style={{
                marginTop: "28px",
                marginBottom: "10px",
                position: "absolute",
                left: "50%",
                transform: "translate(-50%)",
              }}
            >
              <PageNavigation
                page={page}
                setPage={setPage}
                totalPages={totalPages}
              />
            </ul>
            <ul style={{ float: "right", marginTop: "12px" }}>
              <PageSize pageSize={pageSize} setPageSize={setPageSize} />
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default HistoryTransaction;
