import React, { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import TODOListService from "../../services/todolist.service";
import TaskForm from "./newtaskform.component";
import TaskResume from "./taskresume.component";

export default class TODOListForm extends Component {
    tasksList = [];
    state = {
        loading: false,
        message: "",
        success: false,
        showNewTask: false,
        tasks: [],
    };

    constructor(props) {
        super(props);
        this.createList = this.createList.bind(this);
    }

    onAddTask = (e) => {
        e.preventDefault();

        this.setState({ showNewTask: true });
    };

    onDeleteTask = (task) => {
        console.log(task);

        var taskToDelete = this.tasksList.find((t) => t.name === task);
        this.tasksList = this.tasksList.filter((item) => item !== taskToDelete);

        this.setState({
            tasks: this.tasksList,
        });
    };

    handleAddTask = (name, expiration) => {
        console.log("Name:", name);
        console.log("Expires:", expiration);
        this.tasksList.push({ name: name, expirationDate: expiration });
        this.setState({
            tasks: this.tasksList,
        });
        this.hideModal();
    };

    hideModal = () => {
        this.setState({ showNewTask: false });
    };

    createList = (name) => {
        this.setState({ loading: true, message: "" });
        
        TODOListService.newList(name, this.state.tasks).then(
            () => {
                this.setState({ loading: false, success: true });

                setTimeout(() => {
                    this.setState({ success: false });
                    this.props.history.push("/quickview");
                }, 3000);
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                this.setState({
                    loading: false,
                    message: resMessage,
                });
            }
        );
    };

    render() {
        return (
            <div>
                {this.state.success && (
                    <div className="alert alert-success" role="alert">
                        <h4>TO-DO List added successfully!</h4>
                        <p>
                            List "<strong>{this.state.name}"</strong>{" "}
                            successfully added.
                        </p>
                    </div>
                )}

                <h3 className="text-muted">New TO-DO List</h3>

                <Formik
                    initialValues={{ name: "" }}
                    validationSchema={Yup.object({
                        name: Yup.string().required(
                            "TO-DO's List's name is required"
                        ),
                    })}
                    onSubmit={(values) => this.createList(values.name)}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <div className="form-group">
                                <label
                                    className="sr-only form-label"
                                    htmlFor="name"
                                >
                                    List's name
                                </label>
                                <Field
                                    type="text"
                                    name="name"
                                    placeholder="List's name"
                                    className={`form-control ${
                                        touched.name && errors.name
                                            ? "is-invalid"
                                            : ""
                                    }`}
                                />
                                {touched.name && errors.name && (
                                    <div className="form-group">
                                        <div
                                            className="alert alert-danger"
                                            role="alert"
                                        >
                                            <ErrorMessage name="name" />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div>
                                <h5 className="text-muted">Tasks</h5>
                            </div>
                            <div>
                                {this.state.tasks.map((task) => (
                                    <TaskResume
                                        {...task}
                                        key={task.name}
                                        onDelete={this.onDeleteTask}
                                    />
                                ))}
                            </div>

                            <div
                                className="m-2"
                                hidden={this.state.showNewTask}
                            >
                                <button
                                    className="btn btn-outline-success btn-sm"
                                    disabled={this.state.showNewTask}
                                    onClick={this.onAddTask}
                                >
                                    <i
                                        className="fa fa-plus-circle mr-1"
                                        aria-hidden="true"
                                    ></i>
                                    <span>Add Tasks</span>
                                </button>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary mt-3"
                                disabled={this.state.loading}
                            >
                                {this.state.loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Create List</span>
                            </button>
                        </Form>
                    )}
                </Formik>
                {this.state.message && (
                    <div className="alert alert-danger" role="alert">
                        <h4>Error!</h4>
                        <p>
                            {this.state.message}
                        </p>
                    </div>
                )}
                <TaskForm
                    addTask={this.handleAddTask}
                    cancel={this.hideModal}
                    show={this.state.showNewTask}
                />
            </div>
        );
    }
}
