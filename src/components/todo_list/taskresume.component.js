import React from "react";
import PropTypes from "prop-types";

export default function TaskResume(props) {
    return (
        <div>
            <i className="fa fa-tasks mr-2" aria-hidden="true"></i>
            {props.name}

            {props.expiration && (
                <span>
                    <i className="ml-4 fa fa-clock-o" aria-hidden="true"></i>
                    <span className="ml-1">{props.expiration}</span>
                </span>
            )}
            <span
                style={{ color: "red", cursor: "pointer" }}
                className="align-self-start ml-3"
                aria-hidden="true"
                onClick={(e) => {
                    e.preventDefault();
                    props.onDelete(props.name);
                }}
            >
                <i color="red" className="fa fa-trash" aria-hidden="true"></i>
            </span>
        </div>
    );
}

TaskResume.propTypes = {
    name: PropTypes.string.isRequired,
    expiration: PropTypes.string,
    onDelete: PropTypes.func.isRequired,
};
