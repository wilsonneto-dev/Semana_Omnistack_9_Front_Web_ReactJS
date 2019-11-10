import React, { useEffect, useState, useMemo } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client';

import './styles.css';

export default function() {
  const [spots, setSpots] = useState([]);
  const [requests, setRequests] = useState([]);

  const user_id = localStorage.getItem('user');
  
  const socket = useMemo(() => socketio('http://localhost:3333', { 
    query: { user_id }
   }), [user_id]);


  useEffect(() => {
    socket.on('booking_request', data => {
      setRequests([...requests, data]);
    });
  }, [requests, socket]);
 
  useEffect(() => {
    (async function loadSpots() {
      const user_id = localStorage.getItem('user');
      const response = await api.get('/dashboard', {
        headers: { user_id }
      });

      setSpots(response.data);
    })();
  }, []);

  async function handleAccept( id ) {
    const response = await api.post(`/bookings/${id}/approvals`);
    console.log(response);
    setRequests(requests.filter(request => request._id !== id));
  }

  async function handleReject(id) {
    const response = await api.post(`/bookings/${id}/rejections`);
    console.log(response);
    setRequests(requests.filter(request => request._id !== id));
  }

  return (
    <>
      <ul className="notifications">
        {requests.map(request => (
          <li key={request._id}>
            <strong>{request.user.email}</strong>
            está solicitan uma reserva em <strong>{request.spot.company}</strong> 
            para a data <strong>{request.date}</strong>

            <button className="accept" onClick={() => { handleAccept(request._id) }}>aceitar</button>
            <button className="reject" onClick={() => { handleReject(request._id) }}>rejeitar</button>
          </li>
        ))}
      </ul>

      <ul className="spot-list">
        {spots.map(spot => (
          <li key={spot._id}>
            <header
              style={{ backgroundImage: `url(${spot.thumbnail_url})` }}
            ></header>
            <strong>{spot.company}</strong>
            <span>{spot.price ? `R$ ${spot.price}/dia` : 'gratuito'}</span>
          </li>
        ))}
      </ul>
      <Link to="/new">
        <button className="btn">Cadastrar Novo Spot</button>
      </Link>
    </>
  );
}
