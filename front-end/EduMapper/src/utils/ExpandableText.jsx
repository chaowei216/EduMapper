import React, { useState } from "react";
import { IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ExpandableText = ({ text, maxLength = 100 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const shouldShowExpandButton = text?.length > maxLength;

  return (
    <div>
      <p style={{ display: "inline" }}>
        {isExpanded || !shouldShowExpandButton ? text : text?.slice(0, maxLength) + "..."}
      </p>
      {shouldShowExpandButton && (
        <IconButton
          style={{ width: "33px", marginLeft: "5px", display: "inline-block" }}
          size="small"
          onClick={toggleExpand}
        >
          <ExpandMoreIcon />
        </IconButton>
      )}
    </div>
  );
};

export default ExpandableText;
