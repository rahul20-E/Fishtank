import React, { Fragment } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { Dashboard } from './Dashboard';
import theme from './theme';

export const App = (props) => {
  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <Dashboard {...props} />
      </ThemeProvider>
    </Fragment>
  );
};

// import Header from './Header';
// import BuildTank from './BuildTank';
// import TankCartBuilder from './TankCartBuilder';
// import NewFish from './NewFish';
// import VideoGalary from './VideoGallary';
// import ResourcesGallary from './Resources';

// export function App({ initialData }) {
//   return (
//     <div className="mainLayout">
//       <Header />
//       <BuildTank />
//       <TankCartBuilder />
//       <NewFish />
//       <VideoGalary />
//       <ResourcesGallary content={"Featured Resourcs"}/>
//       <ResourcesGallary content={"Fish Tank Profession Services"} />
//     </div>
//   );
// }
