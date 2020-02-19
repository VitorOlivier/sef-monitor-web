import React, { useEffect, useState } from 'react';
import Agenda from '../Agenda';
import Header from '../Header';

function App() {
  const [filter, setFilter] = useState({ servico: 'Renovação Título Residência', local: '' });

  useEffect(() => {
    document.title = 'SEF Monitor';
  }, []);

  return (
    <div>
      <Header filter={filter} setFilter={setFilter} />
      <Agenda filter={filter} setFilter={setFilter} />
    </div>
  );
}

export default App;
