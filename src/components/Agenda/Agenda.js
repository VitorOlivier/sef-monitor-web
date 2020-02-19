import React, { useEffect, useState } from 'react';

export default function Agenda(props) {
  const [agendamentos, setAgendamentos] = useState([]);
  const [datas, setDatas] = useState([]);
  const { filter } = props;
  useEffect(() => {
    async function fetchData() {
      const parameter = Object.keys(filter)
        .map(key => key + '=' + filter[key])
        .join('&');
      const response = await fetch('http://olivierlab.tplinkdns.com:8080/agendamento?' + parameter, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { agendamentos } = await response.json();
      const dts = agendamentos ? agendamentos.map(agendamento => agendamento.data) : [];
      setAgendamentos(agendamentos);
      setDatas(Array.from(new Set(dts)));
    }
    fetchData();
  }, [filter, filter.service]);

  return (
    <div className="ContainerFlex">
      {datas &&
        datas.map(data => (
          <div className="divLines" key={data}>
            <div className="divData">
              <div className="divDayMonthYear">
                <div className="divDayMonth">
                  <p className="pDay">{new Date(data).toLocaleString('pt', { day: '2-digit' }).toUpperCase()}</p>
                  <p className="pMonth">{new Date(data).toLocaleString('pt', { month: 'short' }).toUpperCase()}</p>
                </div>
                <div className="divWeekDayYear">
                  <p className="pWeekDay">{new Date(data).toLocaleString('pt', { weekday: 'short' }).toUpperCase()}</p>
                  <p className="pYear">{new Date(data).getFullYear()}</p>
                </div>
              </div>
            </div>
            <div className="divLineFlex">
              {agendamentos &&
                agendamentos
                  .filter(a => a.data === data)
                  .map(agendamento => (
                    <div className="divLineHoraLocal" key={agendamento.hora + agendamento.timestamp}>
                      <div className="divHora">{agendamento.hora}</div>
                      <div className="divLocal">{agendamento.local}</div>
                    </div>
                  ))}
            </div>
          </div>
        ))}
    </div>
  );
}
