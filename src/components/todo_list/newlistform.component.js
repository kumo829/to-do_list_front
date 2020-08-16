import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import TODOListService from "../../services/todolist.service";

export default class TODOListForm extends Component {
  state = {
    name: "",
    loading: false,
    message: "",
    success: false
  };

  constructor(props) {
    super(props);
    this.onChangeListName = this.onChangeListName.bind(this);
    this.createList = this.createList.bind(this);
  }

  onChangeListName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  createList = (e) => {
    e.preventDefault();
    this.setState({ loading: true, message: "" });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      TODOListService.newList(this.state.name).then(
        () => {
          this.setState({ loading: false, success: true });

          setTimeout (() =>  {
            this.setState({success: false});
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
    } else {
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <div>
        {this.state.success && (
        <div className="alert alert-success" role="alert">
            <h4>TO-DO List added successfully!</h4>
            <p>List "<strong>{this.state.name}"</strong> successfully added.</p>
          </div>)}

        <h3 className="text-muted">New TO-DO List</h3>

        <Form
          onSubmit={this.createList}
          ref={(c) => {
            this.form = c;
          }}
        >
          <div className="form-group">
            <label htmlFor="name"> Name</label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="New list's name"
              value={this.state.name}
              onChange={this.onChangeListName}
              className="form-control"
              validations={[required]}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.createList}
            disabled={this.state.loading}
          >
            {this.state.loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <span>Create</span>
          </button>
          {this.state.message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {this.state.message}
              </div>
            </div>
          )}
          <CheckButton
            style={{ display: "none" }}
            ref={(c) => {
              this.checkBtn = c;
            }}
          />
        </Form>
      </div>
    );
  }
}

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
