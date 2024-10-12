import { IconButton } from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

export default function ExpandContent({ features, numberLines }) {
  const [expanded, setExpanded] = useState(false);

  // Lấy phần các dòng sẽ hiển thị khi chưa mở rộng
  const visibleFeatures = expanded ? features : features?.slice(0, numberLines);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {visibleFeatures && visibleFeatures.length > 0 && visibleFeatures.map((feature, index) => (
        <div key={index} style={{ marginBottom: "5px" }}>
          {feature}
        </div>
      ))}

      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
        {!expanded && features && features.length > numberLines && (
          <IconButton
            style={{ width: "33px", marginLeft: "5px", display: "inline-block" }}
            size="small"
            onClick={() => setExpanded(true)}
          >
            <ExpandMoreIcon />
          </IconButton>
        )}

        {expanded && (
          <IconButton
            style={{ width: "33px", marginLeft: "5px", display: "inline-block" }}
            size="small"
            onClick={() => setExpanded(false)}
          >
            <ExpandLessIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
}
