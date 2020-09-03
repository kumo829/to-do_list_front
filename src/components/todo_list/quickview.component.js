import React, { Component } from "react";
import QuickViewServce from "../../services/quickview.service";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";

import overlayFactory from "react-bootstrap-table2-overlay";
import paginationFactory from "react-bootstrap-table2-paginator";
import "./quickview.css";

export default class TODOListsQuickView extends Component {
    state = {
        page: 1,
        resultsPerPage: 25,
        totalSize: 100,

        loading: true,

        lists: [],
        columns: [
            {
                dataField: "id",
                text: "ID",
                hidden: true,
            },
            {
                dataField: "name",
                text: "Name",
            },
            {
                dataField: "completed",
                text: "Completed (%)",
                formatter: this.completionFormatter,
                align: "center",
            },
            {
                dataField: "creationDate",
                text: "Created on",
                formatter: this.dateFormatter,
            },
            {
                dataField: "expiration",
                text: "Time to expire",
                formatter: this.timeToExpireFormatter,
            },
        ],
    };

    completionFormatter(cell, row) {
        var tasks = row.numberOfTask;
        var completed =
            row.numberOfCompletedTasks === null
                ? 0
                : row.numberOfCompletedTasks;

        var result = tasks === 0 ? "0 %" : (completed / tasks) * 100 + " %";

        return <React.Fragment>{result}</React.Fragment>;
    }

    dateFormatter(cell, row) {
        var parts = cell.match(/\d+/g);
        return (
            <span>
                {new Date(
                    parts[0],
                    parts[1] - 1,
                    parts[2],
                    parts[3],
                    parts[4],
                    parts[5]
                ).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                })}
            </span>
        );
    }

    timeToExpireFormatter(cell, row) {
        var time =
            cell && cell.expiration
                ? Date.UTC(cell.year, cell.monthValue, cell.dayOfMonth) -
                  Date.now() +
                  " days"
                : "-";
        return <span>{time}</span>;
    }

    componentDidMount() {
        console.log("Loading lists...");

        QuickViewServce.getPagedTODOLists(
            this.state.page - 1,
            this.state.resultsPerPage
        ).then(
            (response) => {
                console.info("Result:");
                console.debug(response.data);
                this.setState({
                    lists: response.data.content,
                    loading: false,
                    totalSize: response.data.totalElements,
                });
            },
            (error) => {
                console.error(error);
            }
        );
    }

    onNewTODOList = (e) => {
        e.preventDefault();
        this.props.history.push("/newlist");
    };

    noDataIndication = () => (
        <div className="spinner">
            You have no TO-DO Lists yet, please add one.
        </div>
    );

    handleTableChange = (type, { page, sizePerPage }) => {
        this.setState({ page: page, resultsPerPage: sizePerPage });

        console.log("Page: " + page);
        console.log("sizePerPage: " + sizePerPage);
        this.setState({ loading: true });

        console.log("State.page: " + this.state.page);

        QuickViewServce.getPagedTODOLists(page - 1, sizePerPage).then(
            (response) => {
                console.info("Result:");
                console.debug(response.data);
                this.setState({
                    lists: response.data.content,
                    loading: false,
                    totalSize: response.data.totalElements,
                });
            },
            (error) => {
                console.error(error);
                this.setState({ loading: false });
            }
        );
    };

    rowClasses = (row, rowIndex) => {
        if (rowIndex % 2 === 0) {
            return "table-strip-color1";
        }
        return "table-strip-color2";
    };

    rowEvents = {
        /*  onClick: (e, row, rowIndex) => {
            console.log(e);
        }, */

        onDoubleClick: (e, row, rowIndex) => {
            console.log(e);
        },
    };

    render() {
        return (
            <div className="row">
                <button
                    className="offset-md-10 col-md-2 offset-sm-6 col-sm-6 btn btn-primary btn-lg"
                    onClick={this.onNewTODOList}
                >
                    {" "}
                    Add List
                </button>
                <BootstrapTable
                    remote
                    hover
                    bootstrap4
                    condensed
                    keyField="id"
                    headerClasses="table-header"
                    rowClasses={this.rowClasses}
                    rowEvents={this.rowEvents}
                    data={this.state.lists}
                    page={this.state.page}
                    sizePerPage={this.state.resultsPerPage}
                    columns={this.state.columns}
                    loading={this.state.loading}
                    overlay={overlayFactory({
                        spinner: true,
                        styles: {
                            overlay: (base) => ({
                                ...base,
                                background: "rgba(204, 229, 255, 0.5)",
                            }),
                        },
                    })}
                    noDataIndication={this.noDataIndication()}
                    pagination={paginationFactory({
                        sizePerPageList: [25, 50, 100],
                        sizePerPage: this.state.resultsPerPage,
                        page: this.state.page,
                        totalSize: this.state.totalSize,
                    })}
                    onTableChange={this.handleTableChange}
                />
            </div>
        );
    }
}
