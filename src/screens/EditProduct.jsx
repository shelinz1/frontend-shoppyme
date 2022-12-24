import React from "react";
import { useParams } from "react-router-dom";
import EditMainProduct from "../components/products/EditMainProduct";

function EditProduct() {
  const { id } = useParams();
  
  return (
    <>
      <main className="main-wrap">
        <EditMainProduct id={id} />
      </main>
    </>
  );
}

export default EditProduct;
