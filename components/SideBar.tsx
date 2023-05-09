import React from "react";
import { Button } from "@nextui-org/react";
import { FaCog, FaUsers, FaChartLine, FaDatabase, FaSlidersH, FaQuestionCircle, FaSignOutAlt } from "react-icons/fa";

const SideBar: React.FC = () => {
  const buttonStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    textAlign: "left",
    width: "100%",
  };
  

  return (
    <div>
      <h2>SideBar</h2>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {/* ...remaining code */}

        <Button auto size="lg" color="primary" flat style={buttonStyle}>
          <FaCog style={{ marginRight: "4px" }} /> My Settings
        </Button>
        <Button auto size="lg" color="primary" flat style={buttonStyle}>
          <FaUsers style={{ marginRight: "4px" }} /> Team Settings
        </Button>
        <Button auto size="lg" color="primary" flat style={buttonStyle}>
          <FaChartLine style={{ marginRight: "4px" }} /> Analytics
        </Button>
        <Button auto size="lg" color="primary" flat style={buttonStyle}>
          <FaDatabase style={{ marginRight: "4px" }} /> System
        </Button>
        <Button auto size="lg" color="primary" flat style={buttonStyle}>
          <FaSlidersH style={{ marginRight: "4px" }} /> Configurations
        </Button>
        <Button auto size="lg" color="primary" flat style={buttonStyle}>
          <FaQuestionCircle style={{ marginRight: "4px" }} /> Help & Feedback
        </Button>
        <Button auto size="lg" color="error" flat style={buttonStyle}>
          <FaSignOutAlt style={{ marginRight: "4px" }} /> Log Out
        </Button>
      </div>
    </div>
  );
};

export default SideBar;



