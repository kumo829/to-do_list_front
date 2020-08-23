import React, { Component } from "react";

import PropTypes from "prop-types";
    import { Formik, Field, Form, ErrorMessage } from "formik";
    import * as Yup from "yup";
import SweetAlert from "react-bootstrap-sweetalert";

export default class TaskForm extends Component {
    state = {
        name: "",
        expires: false,
        expirationDate: ""
    };

    constructor(props) {
        super(props);
        this.onFieldChange = this.onFieldChange.bind(this);
    }

    handleInputCheck = (e) => {
        this.setState({ expires: e.target.checked });
    };

    onFieldChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    addTask = () => {
        this.props.addTask(this.state.name, this.state.expirationDate);
        this.setState({ name: "", expires: false, expirationDate: "" });
    };

    render() {
        return (
            <SweetAlert
                title="Add a Task"
                show={ this.props.show}
                btnSize="sm"
                onConfirm={() => {}}
                showConfirm={false}
                showCancel={false}
                confirmBtnText="Add"
            >
                <Formik
                    initialValues={{ name: "", expirationDate: "" }}
                    validationSchema={Yup.object({
                        name: Yup.string().required("Name is required"),
                        expirationDate: Yup.date(),
                    })}
                    onSubmit={(values, { resetForm }) => {
                        this.setState({
                            name: values.name,
                            expirationDate: values.expirationDate,
                            showModal: false,
                        });
                        resetForm({ values: { name: "", expirationDate: "" } });
                        this.addTask();
                    }}
                >
                    {({ errors, touched }) => (
                        <Form className="mt-2">

                            <div className="row ml-2">
                                <div className="form-group mr-2">
                                    <label
                                        htmlFor="taskName"
                                        className="sr-only"
                                    >
                                        Name:
                                    </label>

                                    <Field
                                        name="name"
                                        type="text"
                                        placeholder="Task Name"
                                        className={`form-control-sm ${
                                            touched.name && errors.name
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                    />
                                    <div className="invalid-feedback">
                                        <ErrorMessage name="name" />
                                    </div>
                                </div>

                                <div className="form-group ml-4">
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <input
                                                type="checkbox"
                                                name="isExpires"
                                                checked={this.state.expires}
                                                onChange={this.handleInputCheck}
                                                className="form-check-input"
                                            />
                                            Expires?
                                        </label>
                                    </div>
                                </div>

                                {this.state.expires && (
                                    <div className="form-group ml-2">
                                        <label
                                            htmlFor="expirationDate"
                                            className="sr-only form-label mr-2"
                                        >
                                            Expiration:
                                        </label>
                                        <Field
                                            type="date"
                                            name="expirationDate"
                                            placeholder="Expiration Date"
                                            className="form-control-sm mr-3"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="form-group row justify-content-center">

                            <button type="button" className="btn btn-link" onClick={() => this.props.cancel()}>Cancel</button>

                                <button
                                    type="submit"
                                    className="btn btn-primary btn-sm ml-2"
                                >
                                    <i
                                        className="fa fa-check-square mr-1"
                                        aria-hidden="true"
                                    ></i>
                                    <span>Add</span>
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </SweetAlert>
        );
    }
}

TaskForm.propTypes = {
    addTask: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
};