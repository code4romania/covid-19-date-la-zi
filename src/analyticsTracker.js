import ReactGA from 'react-ga';

export const initializeGA = () => {
  if (document.location.hostname !== 'datelazi.ro') {
    return;
  }
  ReactGA.initialize('UA-160603540-2');
};

export const logPageView = history => {
  history.listen(location => {
    const page = location.pathname || window.location.pathname;
    ReactGA.set({ page: page });
    ReactGA.pageview(page);
  });
};
