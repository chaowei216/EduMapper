import React, { useState, useEffect } from "react";
import styles from "./HistoryTransaction.module.css";
import useAuth from "../../../hooks/useAuth";
import PageNavigation from "../../global/PageNavigation";
import PageSize from "../../global/PageSize";

const HistoryTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const { user } = useAuth();

  useEffect(() => {
    // const fetchTransactions = async () => {
    //   try {
    //     const data = await GetAllTransaction(user?.userId, page, pageSize);
    //     if (data) {
    //       setTransactions(data.data.data);
    //       setTotalPages(data.data.totalPages);
    //     }
    //   } catch (error) {
    //     toast.error('Lỗi khi lấy dữ liệu giao dịch.');
    //   }
    // };
    // fetchTransactions();
  }, [user?.userId, page, pageSize]);
  const transactionsFake = [
    {
      transactionId: 1,
      transactionDate: "2024-09-01T10:00:00Z",
      amount: 100,
      paymentMethod: "Thẻ tín dụng",
      transactionInfo: "Nạp tiền",
      status: "Paid",
    },
    {
      transactionId: 2,
      transactionDate: "2024-09-02T10:00:00Z",
      amount: 50,
      paymentMethod: "Ví điện tử",
      transactionInfo: "Rút tiền",
      status: "Paid",
    },
    {
      transactionId: 3,
      transactionDate: "2024-09-03T10:00:00Z",
      amount: 200,
      paymentMethod: "Ngân hàng",
      transactionInfo: "Nạp tiền",
      status: "Pending",
    },
    {
      transactionId: 4,
      transactionDate: "2024-09-04T10:00:00Z",
      amount: 150,
      paymentMethod: "Mua hàng trực tuyến",
      transactionInfo: "Mua hàng",
      status: "Paid",
    },
    {
      transactionId: 5,
      transactionDate: "2024-09-05T10:00:00Z",
      amount: 300,
      paymentMethod: "Rút tiền mặt",
      transactionInfo: "Rút tiền",
      status: "Paid",
    },
    {
      transactionId: 6,
      transactionDate: "2024-09-06T10:00:00Z",
      amount: 75,
      paymentMethod: "Ứng dụng",
      transactionInfo: "Nạp tiền",
      status: "Paid",
    },
    {
      transactionId: 7,
      transactionDate: "2024-09-07T10:00:00Z",
      amount: 120,
      paymentMethod: "Mua game",
      transactionInfo: "Mua hàng",
      status: "Paid",
    },
  ];

  return (
    <div className={styles.historyTransactionContainer}>
      <h2>Lịch sử giao dịch</h2>
      <table className={styles.transactionTable}>
        <thead>
          <tr>
            <th>Ngày</th>
            <th>Xu</th>
            <th>Loại giao dịch</th>
            <th>Thông tin</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {transactionsFake.length > 0 ? (
            transactionsFake.map((transaction) => (
              <tr key={transaction.transactionId}>
                <td>{transaction.transactionDate.split("T")[0]}</td>
                <td>{transaction.amount} xu</td>
                <td>{transaction.paymentMethod}</td>
                <td>{transaction.transactionInfo}</td>
                <td>
                  {transaction.status == "Paid" ? "Đã thanh toán" : "Đang chờ"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Không có giao dịch nào.</td>
            </tr>
          )}
        </tbody>
      </table>
      {transactionsFake && transactionsFake.length > 0 && (
        <>
          <div
            style={{
              position: "relative",
              minHeight: "80px",
            }}
          >
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
