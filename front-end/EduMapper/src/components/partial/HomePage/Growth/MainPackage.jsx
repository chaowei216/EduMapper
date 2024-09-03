import styles from "./Growth.module.css"
export default function MainPackage({ children }) {
  return (
    <div>
      <div
      className={styles.top_package}
        style={{ height: "15rem", background: "white", width: "100%" }}
      ></div>
      <div style={{ height: "40rem", background: "#3C7C63", width: "100%" }}>
        {children}
      </div>
      <div
        style={{ height: "15rem", background: "white", width: "100%" }}
      ></div>
    </div>
  );
}
