import React from 'react';
import 'antd/dist/antd.css';
import { DatePicker, Space } from 'antd';

function BookingComponent(date, dateString) {
    // console.log(date, dateString);

    return (
        <div>
            <Space direction="vertical w-100">
                <DatePicker className="w-100 py-2 my-2" onChange={BookingComponent} 
                placeholder="Arrival Date"
                />
            </Space>
        </div>
    )

}

export default BookingComponent;
