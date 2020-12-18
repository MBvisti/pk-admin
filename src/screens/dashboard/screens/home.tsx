import React, { useEffect } from "react";
import { endpoints } from "../../../http/api";

export const Home = () => {
  useEffect(() => {
    const res = endpoints.user().getMemberParkingIds(17);
    res.then((data) => {
      const parkingFees = endpoints.parkingFee().paginatedFee(data.data);
      parkingFees.then((res) => console.log(res));
    });

    const addresses = endpoints.parkingAddress().getAddresses(17);
    console.log(addresses);
  }, []);
  return <div>Home screen</div>;
};
