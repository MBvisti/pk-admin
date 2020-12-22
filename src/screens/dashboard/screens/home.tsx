import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { endpoints } from "../../../http/api";

interface PaginatedFees {
  results: Array<{
    addressId: number;
    belongsToId: number;
    comment: string;
    cost: number;
    countryCode: string;
    createdBy: number;
    createdTimestamp: string;
    deleted: boolean;
    distributionKey: string;
    endDate: string;
    externalNote: string;
    id: number;
    internalComment: string;
    latitude: number;
    longitude: number;
    newId: number;
    note: string;
    photo1Filename: string;
    photo2Filename: string;
    photo3Filename: string;
    photo4Filename: string;
    regNo: string;
    settledDate: string;
    settledDate2: string;
    startDate: string;
    status: string;
    ticketPrice: number;
    type: number;
    updatedBy: number;
    updatedTimestamp: string;
    userEmail: string;
    userId: number;
    wrongDoingId: number;
  }>;
  total: number;
}

interface Address {
  city: string;
  // createdBy: number;
  // createdTimestamp: string;
  // deleted: true;
  id: number;
  // image: string;
  // latitude: number;
  // longitude: number;
  // nickName: string;
  // note: string;
  ownerId: number;
  // percentKunde: number;
  // percentOs: number;
  // percentPvagt: number;
  // rentOut: boolean;
  // status: string;
  // statuses: Array<string>;
  street: string;
  streetNumber: string;
  // ticketPrice: number;
  // type: string;
  // updatedBy: number;
  // updatedTimestamp: string;
  zipCode: string;
}

interface FeeData {
  city: string;
  street: string;
  zipCode: string;
  streetCode: string;
  cost: number;
  createdTimestamp: string;
  countryCode: string;
  endDate: string;
  createdBy: number;
  regNo: string;
  userEmail: string;
  userId: number;
  id: number;
}

interface HomeState {
  addressData: Array<Address>;
  feeData: Array<FeeData>;
  loading: boolean;
  start: number;
  end: number;
}

export const Home = () => {
  const [state, setState] = useState<HomeState>({
    addressData: [],
    feeData: [],
    loading: false,
    start: 0,
    end: 5,
  });
  const paginatedAddressMutation = useMutation(
    endpoints.parkingAddresses().paginatedAddresses,
    { mutationKey: "paginatedAddresses" }
  );

  const paginatedFees = useMutation(endpoints.fees().paginatedFees, {
    mutationKey: "paginatedFees",
  });

  useEffect(() => {
    const setupData = () => {
      setState((s) => ({
        ...s,
        loading: true,
      }));
      paginatedAddressMutation.mutate(
        { userId: 17 },
        {
          onSuccess: (data, { userId }) => {
            setState((s) => ({
              ...s,
              loading: paginatedFees.isLoading,
            }));
            let addressData: Array<Address> = [];

            data.results.forEach((address: Address) => {
              addressData.push({
                city: address.city,
                id: address.id,
                ownerId: address.ownerId,
                street: address.street,
                streetNumber: address.streetNumber,
                zipCode: address.zipCode,
              });
            });

            setState((s) => ({
              ...s,
              addressData,
            }));

            paginatedFees.mutate(
              { userId },
              {
                onSuccess: (data: PaginatedFees) => {
                  let feeData: Array<FeeData> = [];

                  data.results.forEach((fee, index) => {
                    const feeAddress = addressData.filter(
                      (address) => address.id === fee.addressId
                    );

                    if (feeAddress[0].city === "Test") {
                      return;
                    }

                    const dateObj = new Date(fee.endDate);
                    const fullEndDate =
                      dateObj.getDay() +
                      "/" +
                      dateObj.getMonth() +
                      "/" +
                      dateObj.getUTCFullYear();

                    if (feeAddress[0]) {
                      const formattedFee: FeeData = {
                        city: feeAddress[0].city,
                        street: feeAddress[0].street.trimEnd(),
                        zipCode: feeAddress[0].zipCode,
                        streetCode: feeAddress[0].streetNumber,
                        cost: fee.cost,
                        countryCode: fee.countryCode,
                        endDate: fullEndDate,
                        regNo: fee.regNo,
                        userEmail: fee.userEmail,
                        id: fee.id,
                        createdBy: fee.createdBy,
                        userId: fee.userId,
                        createdTimestamp: fee.createdTimestamp,
                      };

                      feeData.push(formattedFee);
                    }
                  });

                  setState((s) => ({
                    ...s,
                    feeData,
                    loading: false,
                    addressData,
                  }));
                },
              }
            );
          },
        }
      );
    };
    setupData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="md:flex md:flex-col">
      <div className="md:flex md:flex-col">
        <h2 className="md:text-lg md:font-bold md:mb-4">Latest fees</h2>
        <div className="md:flex md:flex-col md:shadow md:border md:border-b-0 md:text-xl md:border-pk-dark-gray md:rounded md:overflow-y-hidden">
          <div className="md:flex md:border-b md:py-2 md:px-4 md:border-pk-dark-gray">
            <h3 className="md:text-base md:font-semibold md:w-1/3">
              Registration nr.
            </h3>
            <h3 className="md:text-base md:font-semibold md:w-1/3">
              Parking spot
            </h3>
            <h3 className="md:text-base md:font-semibold md:w-1/3 md:text-right">
              End date
            </h3>
          </div>
          {state.loading === true ? (
            <p>loading</p>
          ) : (
            state.feeData.slice(state.start, state.end).map((fee) => {
              return (
                <div
                  key={fee.id}
                  className="md:flex md:justify-between md:items-center md:py-2 md:px-4 md:border-b md:border-pk-dark-gray md:mt-2 md:cursor-pointer"
                >
                  <p className="md:text-sm md:w-1/3">{fee.regNo}</p>
                  <p className="md:text-sm md:flex-1">
                    {fee.street +
                      " " +
                      fee.street +
                      ", " +
                      fee.city +
                      " " +
                      fee.zipCode}
                  </p>
                  <p className="md:text-sm md:text-right md:w-1/3">
                    {fee.endDate}
                  </p>
                </div>
              );
            })
          )}
        </div>
        <div className="md:flex md:w-36 md:shadow md:justify-between md:items-center md:px-4 md:mt-4 md:border md:border-pk-dark-gray md:rounded">
          <button
            onClick={() => {
              if (state.start === 0) {
                return;
              }

              setState({
                ...state,
                end: state.end - 5,
                start: state.start - 5,
              });
            }}
            className={`md:py-2 ${
              state.start === 0
                ? "md:text-gray-400 md:cursor-not-allowed"
                : "md:text-black"
            }`}
          >
            Prev
          </button>
          <span className="md:border md:border-pk-dark-gray md:h-10 md:mr-4 md:ml-4" />
          <button
            onClick={() => {
              if (state.end >= state.feeData.length) {
                return;
              }

              setState({
                ...state,
                end: state.end + 5,
                start: state.start + 5,
              });
            }}
            className={`md:py-2 ${
              state.end >= state.feeData.length
                ? "md:text-gray-400 md:cursor-not-allowed"
                : "md:text-black"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
