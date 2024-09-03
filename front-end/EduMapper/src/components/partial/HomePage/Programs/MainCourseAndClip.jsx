import React from "react";
import styles from "./Programs.module.css"
export default function MainCourseAndClip({ children }) {
  return <div className={styles.main} style={{background: "#62CCA3"}}>{children}</div>;
}
