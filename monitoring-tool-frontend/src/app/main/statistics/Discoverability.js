import React, {useEffect, useLayoutEffect, useState} from 'react'
import ReactApexChart from "react-apexcharts";
import PageTable from "app/shared-components/table/PageTable";
import {useTheme} from "@mui/material/styles";
import {connect, useDispatch, useSelector} from "react-redux";
import {selectContrastMainTheme} from "app/store/fuse/settingsSlice";

const Discoverability = ({endpointsList, noVoid, hasVoid}) => {
    const theme = useTheme();
    const [endpoints, setEndpoints] = useState(null);

    const dispatch = useDispatch();
    const contrastTheme = useSelector(selectContrastMainTheme(theme.palette.primary.main));

    const options = {
        chart: {
            fontFamily: 'inherit',
            foreColor: 'inherit',
            width: '100%',
            height: '100%',
            type: 'donut',
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
        },
        dataLabels: {
            enabled: false,
        },

        grid: {
            show: true,
            position: 'back',

        },
        stroke: {
            width: 2,
        },
        series: [
          noVoid,  hasVoid
        ],
        labels: [
            'Missing VoID document', 'Has VoID document'
        ]

    }

    const headerRows = [
        {
            id: "name",
            align: "left",
            disablePadding: false,
            label: "Name",
            sort: false,
        },
        {
            id: "url",
            align: "left",
            disablePadding: false,
            label: "URL",
            sort: false,
        },
        {
            id: "down",
            align: "left",
            disablePadding: false,
            label: "VoID document",
            sort: false,
        },
        {
            id: "percentageAvailable",
            align: "left",
            disablePadding: false,
            label: "Server Name",
            sort: false,
        }
    ]

    const dataRows = endpointsList.map(endpoint => {
        console.log("ENDPOINT", endpoint)
        return{
            id: endpoint.id,
            values: [
                {
                    type: "text",
                    name: "name",
                    id: "name",
                    value: endpoint.name
                },
                {
                    type: "link",
                    name: "url",
                    id: "url",
                    value: endpoint.url
                },
                {
                    type: "bool",
                    name: "voID",
                    id: "voID",
                    value: endpoint.voID
                },
                {
                    type: "text",
                    name: "serverName",
                    id: "serverName",
                    value: endpoint.serverName
                }
            ]
        }
    })
    return(
        <div>
            <>
                <div className="p-24 row">
                    <div className="col-6">
                        <h4><b>DISCOVERABILITY</b></h4>
                        <div id='chart'>
                            <ReactApexChart options={options} series={options.series} type="donut" height={300} width={600}/>
                        </div>
                    </div>
                    <div>
                        {
                            endpointsList &&
                            (
                                <PageTable
                                    headerRows={headerRows}
                                    rows={dataRows}
                                    clickable={false}
                                    link="availability"
                                />
                            )                    }
                    </div>



                </div>

            </>
        </div>
    )
}
function mapStateToProps(state) {
    return ({
        endpointsList: state.endpoint.endpointsList,
        noVoid: state.endpoint.noVoid,
        hasVoid: state.endpoint.hasVoid
    })
}
export default connect(mapStateToProps,null)(Discoverability);