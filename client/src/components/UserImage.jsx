import { Box } from "@mui/material";
import { useSelector } from "react-redux";

export default function UserImage({ image, size = "60px" }) {
  const baseUrl = useSelector((state) => state.baseUrl);

  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`${baseUrl}/assets/${image}`}
      />
    </Box>
  );
}
