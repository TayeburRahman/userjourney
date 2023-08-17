import Typography from "@mui/material/Typography";
import * as React from "react";
import { useSelector } from "react-redux";
import RecyclingIcon from "@mui/icons-material/Recycling";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { Divider } from "@mui/material";
export default function Deposits() {
  const { scanHistory, user } = useSelector((state) => state.auth);
  const recycled = scanHistory && scanHistory.filter((item) => !item.added_by);

  const notRecycled =
    scanHistory && scanHistory.filter((item) => item.added_by);
  return (
    <React.Fragment>
      <Typography mt={2}>Scanned</Typography>
      <Typography component="p" variant="h4">
        {scanHistory?.length}
      </Typography>
      <div style={{ display: "flex" }}>
        <Typography color="text.secondary" sx={{ flex: 1 }}>
          <RecyclingIcon /> Recycled: {recycled?.length}
        </Typography>
        <Typography color="text.secondary" sx={{ flex: 1 }}>
          <QrCodeScannerIcon />
          Not Recycled: {notRecycled?.length}
        </Typography>
      </div>
      <Divider sx={{ color: "#49b00df7", my: 1 }} />
      <Typography mt={2}>Points Earned</Typography>
      <Typography component="p" variant="h4">
        {user?.points}
      </Typography>
    </React.Fragment>
  );
}
