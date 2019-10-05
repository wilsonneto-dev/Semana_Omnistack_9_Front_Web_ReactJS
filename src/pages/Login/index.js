import React, { Component } from 'react';
import api from '../../services/api';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = { email: '' };

  async handleSubmit(event) {
    const { history } = this.props;
    event.preventDefault();
    const response = await api.post('/sessions', { email: this.state.email });
    const { _id } = response.data.user;
    localStorage.setItem('user', _id);
    history.push('dashboard');
  }

  render() {
    return (
      <>
        <p>
          Ofereça <strong>spots</strong> para programadores e encontre
          <strong>talentos</strong> para sua empresa.
        </p>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">EMAIL *</label>
          <input
            onChange={e => this.setState({ email: e.target.value })}
            type="email"
            id="email"
            value={this.state.email}
            placeholder="Seu melhor e-mail"
          />
          <button className="btn" type="submit">
            Entrar
          </button>
        </form>
      </>
    );
  }
}

export default Login;
