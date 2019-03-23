import React, {
  Component
} from 'react';
const axios = require('axios');

class App extends Component {

  componentDidMount() {
    // Make a request for a user with a given ID
    axios.get('http://localhost:5000/api/courses')
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }

  render() {
    return ( 
      <div> Hello!! </div>
    );
  }
}

export default App;