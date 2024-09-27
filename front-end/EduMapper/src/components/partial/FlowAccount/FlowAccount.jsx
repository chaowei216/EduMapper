import React, { useEffect, useState } from "react";
import styles from "./FlowAccount.module.css";
import useAuth from "../../../hooks/useAuth";

const FlowAccount = () => {
  const { user } = useAuth();
  const [rentInfo, setRentInfo] = useState({
    numOfHoursRent: 0,
    totalNumberOfTutorHiring: 0,
    totalAmountDeposited: 0,
  });

  useEffect(() => {
    // const fetchRentInfo = async () => {
    //   try {
    //     const userId = user?.userId; // Lấy userId từ user
    //     if (!userId) {
    //       throw new Error("User ID is required");
    //     }
    //     console.log("Fetching rent info for userId:", userId);
    //     const data = await GetRentInfoParent(userId);
    //     console.log("Rent info data:", data);
    //     setRentInfo(data.data);
    //   } catch (error) {
    //     console.error("Failed to fetch rent info:", error);
    //     toast.error("Failed to fetch rent info");
    //   }
    // };
    // if (user?.userId) {
    //   // Kiểm tra xem user đã được load chưa
    //   fetchRentInfo();
    // }
  }, [user]);
  return (
    <div className="container flex justify-around">
      <div className="col-sm-4">
        <div className={styles.flowItem}>
          <div className={styles.flowBoder}>
            <h3>SỐ PHẢN HỒI</h3>
            <h1>5 lượt</h1>
          </div>
        </div>
      </div>
      <div className="col-sm-4">
        <div className={styles.flowItem}>
          <div className={styles.flowBoder}>
            <h3>TỔNG SỐ LẦN LÀM BÀI</h3>
            <h1>5 lần</h1>
          </div>
        </div>
      </div>
      <div className="col-sm-4">
        <div className={styles.flowItem}>
          <div className={styles.flowBoder}>
            <h3>TỔNG SỐ TIỀN ĐÃ NẠP</h3>
            <h1>100.000 VND</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowAccount;
