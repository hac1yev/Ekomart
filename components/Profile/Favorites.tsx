import React from "react";

const Favorites = () => {
  return (
    <div className="order-table-account">
      <div className="h2 title">Your Orders</div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#1357</td>
              <td>March 45, 2020</td>
              <td>Processing</td>
              <td>$125.00 for 2 item</td>
              <td>
                <a href="#" className="btn-small d-block">
                  View
                </a>
              </td>
            </tr>
            <tr>
              <td>#2468</td>
              <td>June 29, 2020</td>
              <td>Completed</td>
              <td>$364.00 for 5 item</td>
              <td>
                <a href="#" className="btn-small d-block">
                  View
                </a>
              </td>
            </tr>
            <tr>
              <td>#2366</td>
              <td>August 02, 2020</td>
              <td>Completed</td>
              <td>$280.00 for 3 item</td>
              <td>
                <a href="#" className="btn-small d-block">
                  View
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Favorites;
