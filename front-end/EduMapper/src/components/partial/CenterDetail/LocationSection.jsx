import React from "react";
import {
  Box,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const locations = [
  "204 Đ. Trần Bình Trọng, Phường 4, Quận 5, Hồ Chí Minh",
  "310 Thích Quảng Đức, P. Phú Cường, TP. Thủ Dầu Một, Tỉnh Bình Dương",
  "Biệt thự 01-10 Khu đô thị Mỗ Lao, Phường Mỗ Lao, Quận Hà Đông, Hà Nội",
];

const LocationSection = () => (
  <Box mt={4}>
    <Typography variant="h6" color="primary" gutterBottom>
      Địa điểm
    </Typography>
    <Grid container spacing={2}>
      {/* Map Image */}
      <Grid item xs={12} md={4}>
        <img
          src="/img/map.png"
          alt="Map"
          style={{ width: "100%", borderRadius: "8px",height: "200px" }}
        />
      </Grid>

      {/* Location List */}
      <Grid item xs={12} md={8}>
        <List>
          {locations.map((location, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <LocationOnIcon style={{ color: "green" }} />
              </ListItemIcon>
              <ListItemText primary={location} />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  </Box>
);

export default LocationSection;
