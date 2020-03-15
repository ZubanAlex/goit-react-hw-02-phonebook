import React, { Component } from "react";
// import T from "prop-types";
import { v4 as uuidv4 } from "uuid";

import styles from "./App.module.css";

export default class App extends Component {
  state = {
    contacts: [],
    name: "",
    number: ""
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const name = evt.target.name.value;
    const number = evt.target.number.value;

    const createNewContact = {
      id: uuidv4(),
      name: name,
      number: number
    };
    if (name === "" && number === "") {
      return;
    }
    this.addContact(createNewContact);
  };

  addContact = contact => {
    this.setState(state => ({
      contacts: [...state.contacts, contact]
    }));

    this.resetInput();
  };

  resetInput = () => {
    this.setState({ name: "", number: "" });
  };

  render() {
    const { contacts, name, number } = this.state;
    return (
      <>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <label>
            Name
            <input
              className={styles.input}
              type="text"
              placeholder="Enter name"
              name="name"
              value={name}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Number
            <input
              className={styles.input}
              type="text"
              placeholder="Enter number"
              name="number"
              value={number}
              onChange={this.handleChange}
            />
          </label>

          <button type="submit">Add contact</button>
        </form>
        <ul className={styles.contsctList}>
          {contacts.map(contact => {
            return (
              <li key={contact.id}>
                {contact.name}: {contact.number}
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}
