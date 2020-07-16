import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class AccountVerification extends Component {
    render() {
        return (
            <div>
                <h1>Verify your account</h1>
                <p>An email has been send to the provided address.</p>
                <p>Please confirm your account and then log in.</p>
                <p><Link to="/login">Login page</Link></p>
            </div>
        )
    }
}
