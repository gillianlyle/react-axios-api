import React, { Component } from "react";
import axios from "axios";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      error: null,
      users: []
    };
  }

  componentDidMount() {
    axios.get("https://reqres.in/api/users").then(
      result => this.setState({ isLoaded: true, users: result.data.data }),
      error => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    );
  }

  render() {
    const { error, isLoaded, users } = this.state;

    if (error) {
      return <p>Error: {error.message}</p>;
    } else if (!isLoaded) {
      return <p>Loading data, please wait...</p>;
    } else {
      return (
        <table>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <img src={user.avatar} alt="avatar" width="75px" />
              </td>
              <td>
                Name: {user.first_name} {user.last_name} <br />
                Email: {user.email}
              </td>
            </tr>
          ))}
        </table>
      );
    }
  }
}
