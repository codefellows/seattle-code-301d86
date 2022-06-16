import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Modal from 'react-bootstrap/Modal'
import data from './data.json';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heart: '',
      showModal: false,
      selectedPerson: {}
    };
  };

  addHearts = () => {
    this.setState({
      heart: this.state.heart + '❤️'
    });
  };

  handleOnHide = () => {
    this.setState({
      showModal: false
    });
  };
  handleOnShowModal = (selectedPerson) => {
    // let selected = data.find(pep => pep.name === selectedPerson)
    this.setState({
      showModal: true,
      selectedPerson
    });
  };


  render() {
    return (
      <>
        <Header
          hearts={this.state.heart}
        />
        <Main
          addHearts={this.addHearts}
          data={data}
          handleOnShowModal={this.handleOnShowModal}
        />
        <footer>Code Fellows, 2022</footer>
        <Modal
          show={this.state.showModal}
          onHide={this.handleOnHide}
        >
          <Modal.Header closeButton>
            <Modal.Title>{this.state.selectedPerson.name}</Modal.Title>
          </Modal.Header>
        </Modal>
      </>
    );
  }
}

export default App;
