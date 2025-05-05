import { OrderDetails } from "@/app/(main)/orders/OrderModel";
import { ListItem, ListItemText } from "@mui/material";

type Props = {
  orderDetail: OrderDetails;
};

function OrderItem({ orderDetail }: Props) {
  return (
    <ListItem>
      <ListItemText sx={{ width: "40%" }}>
        Item: {orderDetail.item.name}
      </ListItemText>
      <ListItemText sx={{ width: "20%" }}>
        Price: {orderDetail.item.price}
      </ListItemText>
      <ListItemText sx={{ width: "20%" }}>
        Qty: {orderDetail.quantity}
      </ListItemText>
      <ListItemText sx={{ width: "20%" }}>
        Sub total: ${orderDetail.quantity * orderDetail.item.price}
      </ListItemText>
    </ListItem>
  );
}

export default OrderItem;
