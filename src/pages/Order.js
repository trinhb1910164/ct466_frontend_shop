import React, { useEffect} from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrder } from "../features/user/userSlice";
const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Khách hàng",
    dataIndex: "name",
  },
  {
    title: "Tổng tiền",
    dataIndex: "amount",
  },
  {
    title: "Ngày đặt hàng",
    dataIndex: "date",
  },
  {
    title: "Trạng thái",
    dataIndex: "orderStatus",
    sorter: (a, b) => a.orderStatus.length - b.orderStatus.length,
  }
];
const Order = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserOrder());
  }, []);
  const orderState = useSelector((state) => state.auth.UserOrder);

  const data1 = [];
  if(orderState!==undefined){
    // console.log(orderState)
    
    for (let i = 0; i < orderState.length; i++) {
        data1.push({
            key: i + 1,
            name: orderState[i].user.firstname,
            amount: orderState[i].totalPrice,
            date: new Date(orderState[i].createdAt).toLocaleString(),
            orderStatus: orderState[i].orderStatus,
        });
    }
};
    
  return (
    <div>
      {orderState!==undefined && <>
      <h3 className="mb-4 title" style={{textAlign:"center", fontWeight:"600", margin:"20px"}}>Danh sách đơn hàng</h3>
      <div>{<Table columns={columns} dataSource={data1} />}</div>
    </> }
    </div>
  );
};

export default Order;
