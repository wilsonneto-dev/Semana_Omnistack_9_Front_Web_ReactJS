import React, { useEffect } from 'react';
import api from '../../services/api';

export default function() {
  useEffect(() => {
    (async function loadSpots() {
      const user_id = localStorage.getItem('user');
      const response = await api.get('/dashboard', {
        headers: { user_id }
      });
      console.log(response.data);
    })();
  }, []);

  return <>Dashboard...</>;
}
