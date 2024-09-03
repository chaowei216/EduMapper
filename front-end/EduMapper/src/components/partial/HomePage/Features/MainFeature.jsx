import styles from "./Features.module.css"
export default function MainFeature({ children }) {
  return (
    <div className={styles.container_all} style={{ background: "#3C7C63", height: "79rem" }}>{children}</div>
  );
}
