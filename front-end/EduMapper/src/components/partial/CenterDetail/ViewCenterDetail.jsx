import { Container } from "@mui/material";
import ProgramSection from "./ProgramSection";
import CostSection from "./CostSection";
import LocationSection from "./LocationSection";
import CenterDetail from "./CenterDetail";

const ViewCenterDetail = () => (
  <Container style={{marginBottom: "25px"}}>
    <CenterDetail />
    <ProgramSection />
    <CostSection />
    <LocationSection />
  </Container>
);

export default ViewCenterDetail;
