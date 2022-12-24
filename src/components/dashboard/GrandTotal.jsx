import React from "react";

function GrandTotal({ orders, products, users }) {
  var totalSales = 0;

  if (orders) {
    orders.map(
      (order) => order.isPaid && (totalSales = totalSales + order.totalPrice)
    );
  }
  return (
    <div className="row">
      <div className="col-lg-3">
        <div className="card card-body shadow-sm mb-4">
          <article className="icon-text d-flex">
            <span className="icon icon-sm rounded-circle">
              <i className="text-success fas fa-usd"></i>
            </span>
            <div className="text">
              <h6>Total sales</h6> <span>${totalSales.toFixed(2)}</span>
            </div>
          </article>
        </div>
      </div>

      <div className="col-lg-3">
        <div className="card card-body shadow-sm mb-4">
          <article className="icon-text d-flex">
            <span className="icon icon-sm rounded-circle">
              <i className="text-secondary fas fa-shopping-bag"></i>
            </span>
            <div className="text">
              <h6>Total orders</h6>{" "}
              {orders ? <span>{orders.length}</span> : <span>0</span>}
            </div>
          </article>
        </div>
      </div>

      <div className="col-lg-3">
        <div className="card card-body shadow-sm mb-4">
          <article className="icon-text d-flex">
            <span className="icon icon-sm rounded-circle">
              <i className="text-warning fas fa-shopping-basket"></i>
            </span>
            <div className="text">
              <h6>Total products</h6>{" "}
              {products ? <span>{products.length}</span> : <span>0</span>}
            </div>
          </article>
        </div>
      </div>

      <div className="col-lg-3">
        <div className="card card-body shadow-sm mb-4">
          <article className="icon-text d-flex">
            <span className="icon icon-sm rounded-circle">
              <i className="text-info fas fa-users"></i>
            </span>
            <div className="text">
              <h6>Total users</h6>{" "}
              {users ? <span>{users.length}</span> : <span>0</span>}
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

export default GrandTotal;
