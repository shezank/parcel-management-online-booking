import { useQuery } from "@tanstack/react-query";
import React, { Component, useState } from "react";
import ReactApexChart from "react-apexcharts";
import Chart from "react-apexcharts";
import useAxiosSecure from "../../Hoocks/useAxiosSecure/useAxiosSecure";
import { data } from "autoprefixer";

const AdminChart = ({parcelDate}) => {

    const [chartData, setChartData] = useState({
        options: {
            // ApexCharts options go here
            chart: {
                id: 'basic-bar'
            },
            xaxis: {
                categories: [18 , 30 , 50]
            }
        },
        series: [{
            name: 'Sales',
            data: [30, 40, 45, 50, 49, 60, 70, 91, 125, 100, 80, 60]
        }]
    });



    return (

        <div>
            <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
        </div>

    );
};

export default AdminChart;