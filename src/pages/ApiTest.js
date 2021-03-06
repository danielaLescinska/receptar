import React, { Component } from "react";
import {
  Alert,
  Button,
  Form,
  FormControl,
  FormGroup,
  InputGroup,
  PageHeader
} from "react-bootstrap";
import api from "../api/api";

class ApiTestPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      isFetching: false,
      data: null,
      error: null
    };

    this.handleIdChange = this.handleIdChange.bind(this);
    this.handleLoadListClick = this.handleLoadListClick.bind(this);
    this.handleLoadDetailClick = this.handleLoadDetailClick.bind(this);
  }

  handleIdChange(event) {
    this.setState({
      id: event.target.value
    });
  }

  handleLoadListClick() {
    this.setState({
      isFetching: true,
      data: null,
      error: null
    });

    api.get("/recipes").then(({ data, problem }) => {
      this.setState({
        isFetching: false,
        data,
        error: problem
      });
    });
  }

  handleLoadDetailClick() {
    const { id } = this.state;

    this.setState({
      isFetching: true,
      data: null,
      error: null
    });

    api.get(`/recipes/${id}`).then(({ data, problem }) => {
      this.setState({
        isFetching: false,
        data,
        error: problem
      });
    });
  }

  renderResult() {
    const { isFetching, data, error } = this.state;

    if (isFetching) {
      return (
        <span>
          <i className="fa fa-spinner fa-spin" /> Loading&hellip;
        </span>
      );
    }

    if (data) {
      return <pre>{JSON.stringify(data, " ", 2)}</pre>;
    }

    if (error) {
      return <Alert bsStyle="danger">{error}</Alert>;
    }

    return null;
  }

  render() {
    const { id } = this.state;

    return (
      <div>
        <PageHeader>API Test Page</PageHeader>

        <Form inline>
          <Button bsStyle="primary" onClick={this.handleLoadListClick}>
            Load List
          </Button>
          <span>&nbsp;or</span>
          <FormGroup className="m-l-10">
            <InputGroup>
              <FormControl
                type="text"
                value={id}
                onChange={this.handleIdChange}
                placeholder="ID"
                style={{ width: "250px" }}
              />
              <InputGroup.Button>
                <Button
                  onClick={this.handleLoadDetailClick}
                  disabled={!id}
                  className="m-l-10"
                >
                  Load Detail
                </Button>
              </InputGroup.Button>
            </InputGroup>
          </FormGroup>
        </Form>

        <br />

        {this.renderResult()}
      </div>
    );
  }
}

export default ApiTestPage;
