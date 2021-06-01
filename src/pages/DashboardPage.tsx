import React from 'react';

import { dataAreaBump, dataBump, dataLine, dataBar, dataPie } from '../data/dataGraph';
import AreaBump from '../components/diagrams/AreaBump';
import Bump from '../components/diagrams/Bump';
import Line from '../components/diagrams/Line';
import Bar from '../components/diagrams/Bar';
import Pie from '../components/diagrams/Pie';

const DashboardPage = (props: any) => {
  return (
    <div className="dashboardContainer">
      <h1>Good Morning, Tang Seakmeng!</h1>

      <div style={{width: '100%', height: '500px'}}>
        <AreaBump data={dataAreaBump}  />
      </div>

      <div style={{width: '100%', height: '500px'}}>
        <Bump data={dataBump}  />
      </div>

      <div style={{width: '100%', height: '500px'}}>
        <Line data={dataLine}  />
      </div>

      <div style={{width: '100%', height: '500px'}}>
        <Bar data={dataBar}  />
      </div>

      <div style={{width: '100%', height: '500px'}}>
        <Pie data={dataPie}  />
      </div>
    </div>
  );
}

export default DashboardPage;