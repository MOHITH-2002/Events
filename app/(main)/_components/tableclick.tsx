"use client"
import { IOrderItem } from "@/lib/database/models/order-items-model";
import { formatDateTime } from "@/lib/utils";
import React, { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";

const Tableclick = ({ orders }: any) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const handleRowClick = (orderId: string) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(orderId)) {
        // If the row is already selected, remove it
        return prevSelectedRows.filter((id) => id !== orderId);
      } else {
        // If the row is not selected, add it
        return [...prevSelectedRows, orderId];
      }
    });
  };

  return (
    <tbody>
      {orders && orders.length === 0 ? (
        <tr className="border-b">
          <td colSpan={5} className="py-4 text-center text-gray-500">
            No orders found.
          </td>
        </tr>
      ) : (
        <>
          {orders &&
            orders.map((row: IOrderItem) => (
              <tr
                key={row._id}
                className={`p-regular-14 lg:p-regular-16 border-b ${
                  selectedRows.includes(row._id) ? 'bg-red-500 text-white' : ''
                }`}
                style={{ boxSizing: 'border-box' }}
                onClick={() => handleRowClick(row._id)}
              >
                <Checkbox className='w-[30px] h-[30px]' checked={selectedRows.includes(row._id)}/>
                <td className="min-w-[250px] py-4 text-primary-500">{row._id}</td>
                <td className="min-w-[200px] flex-1 py-4 pr-4">{row.eventTitle}</td>
                <td className="min-w-[150px] py-4">{row.buyer}</td>
                <td className="min-w-[100px] py-4">
                  {formatDateTime(row.createdAt).dateTime}
                </td>
                <td className="min-w-[100px] py-4 text-right">₹ {row.totalAmount}</td>
              </tr>
            ))}
        </>
      )}
    </tbody>
  );
};

export default Tableclick;