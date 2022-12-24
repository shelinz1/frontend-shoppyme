import React from "react";
import OrderDetailsMain from "../components/orders/OrderDetailsMain";
import { useParams } from "react-router-dom";
const OrderDetailScreen = () => {
  const params = useParams();
  const { id: orderId } = params;

  return (
    <>
      <main className="main-wrap">
        <OrderDetailsMain orderId={orderId} />
      </main>
    </>
  );
};

export default OrderDetailScreen;
