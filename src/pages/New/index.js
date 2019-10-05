import React, { useState, useMemo } from 'react';
import iconCamera from '../../assets/camera.svg';

import api from '../../services/api';

import './styles.css';

function New({ history }) {
  const [company, setCompany] = useState('');
  const [techs, setTechs] = useState('');
  const [price, setPrice] = useState('');
  const [thumbnail, setThumbnail] = useState(null);

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  async function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData();
    data.append('thumbnail', thumbnail);
    data.append('company', company);
    data.append('techs', techs);
    data.append('price', price);

    await api.post('/spots', data, {
      headers: { user_id: localStorage.getItem('user') }
    });

    history.push('/dashboard');
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label
          className={thumbnail && 'hasThumbnail'}
          id="thumbnail"
          style={{ backgroundImage: `url(${preview})` }}
        >
          <input
            type="file"
            onChange={event => setThumbnail(event.target.files[0])}
          />
          <img src={iconCamera} alt="Selecione uma imagem" />
        </label>

        <label htmlFor="company">EMPRESA *</label>
        <input
          id="company"
          placeholder="sua empresa"
          value={company}
          onChange={event => setCompany(event.target.value)}
        ></input>

        <label htmlFor="techs">
          Tecnologias * <span>(separadas por virgula)</span>
        </label>
        <input
          id="techs"
          placeholder="Tecnologias"
          value={techs}
          onChange={event => setTechs(event.target.value)}
        ></input>

        <label htmlFor="price">Preço</label>
        <input
          id="price"
          placeholder="Tecnologias"
          value={price}
          onChange={event => setPrice(event.target.value)}
        ></input>

        <button className="btn" type="submit">
          Cadastrar
        </button>
      </form>
    </>
  );
}

export default New;
