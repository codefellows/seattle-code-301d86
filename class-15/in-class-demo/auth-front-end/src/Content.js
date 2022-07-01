import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

class Content extends React.Component {

  getBooks = async () => {
    try {
      if (this.props.auth0.isAuthenticated) {
        // We need a token to send to the backend to prove we are authenticated. Let's generate the token
        // Json Web Token = JWT (prounced 'Jot')
        const res = await this.props.auth0.getIdTokenClaims();

        // MUST use double underscore
        const jwt = res.__raw;
        // once you deploy make sure you remove any console logs of your tokemn
        console.log(jwt);

        // Lab 15 only requires you to log token

        // from axios docs, we can send a config object to make our requests
        const config = {
          method: 'get',
          baseURL: process.env.REACT_APP_SERVER_URL,
          url: './books',
          headers: {"Authorization": `Bearer ${jwt}`}
        }

        console.log('config: ', config)
        const bookResults = await axios(config);

        // // the way we are used to seeing it:
        // let url = `${process.env.REACT_APP_SERVER_URL}/books`;
        // const bookResults = await axios.get(url);
        console.log(bookResults.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  componentDidMount() {
    this.getBooks();
  }

  render() {
    // console.log(this.props.auth0.user);
    return (
      <h1>Content Page</h1>
    )
  }

}

export default withAuth0(Content);
