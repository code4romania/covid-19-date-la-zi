import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactEcharts from 'echarts-for-react';
import { Constants, ApiURL } from '../../config/globals';
import partnerLogo from '../../images/partener.png';
import DeveloperLogo from '../../images/code4romania.svg';
import CeTrebuieSaFacLogo from '../../images/cetrebuiesafac.svg';
import { formatShortDate } from '../../utils/date';
import './banner-charts.css';

const BANNER_SIZES = ['landscape', 'ultraWide', 'portrait'];

export const BannerChartsPage = () => {
  const [latestData, setLatestData] = useState({});
  const [totals, setTotals] = useState({});
  const [trends, setTrends] = useState({});
  const [updatedAt, setUpdatedAt] = useState(null);
  const [size, setSize] = useState('landscape');
  const { bannerSize } = useParams();
  // eslint-disable-next-line
  const [errors, setErrors] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (BANNER_SIZES.includes(bannerSize)) {
      setSize(bannerSize);
    }
  }, [bannerSize])

  useEffect(() => {
    function parseData(rawData) {
      const rawTotals = rawData.quickStats.totals;
      setTotals(rawTotals);

      setUpdatedAt(rawData.lastDataUpdateDetails.last_updated_on_string.toLowerCase());

      setTrends({
        cured: Math.round(100 * (rawTotals.cured/rawTotals.confirmed)),
        deaths: Math.round(100 * (rawTotals.deaths/rawTotals.confirmed)),
      });

      // Get the data from the past 3 days
      // ordered chronologically
      const latestRawData = rawData.dailyStats.history
        .sort((a, b) =>
          a.datePublished > b.datePublished ? -1 : 1
        )
        .splice(0, 3)
        .sort((a, b) =>
          a.datePublished < b.datePublished ? -1 : 1
        );

      setLatestData({
        dateLabels: latestRawData.map(data => formatShortDate(data.datePublishedString)),
        confirmed: latestRawData.map(data => data.infected),
        cured: latestRawData.map(data => data.cured),
        deaths: latestRawData.map(data => data.deaths)
      });
    };

    fetch(ApiURL.all)
      .then(res => res.json())
      .then(result => {
        if (result.error != null) {
          setErrors(result.error);
        } else {
          parseData(result);
        }
      })
      .catch(error => {
        setErrors(error);
      })
      .finally(() => setIsLoaded(true));
  }, []);

  const getChartOptions = (type, data, labelData) => {
    const labels = ['NUMAR CAZURI PE ZILE'];
    return {
      xAxis: {
        type: 'category',
        data: labelData,
        axisLabel: {
          color: '#4a4a4a',
          fontFamily: 'Titillium Web, sans-serif',
          fontSize: size === 'portrait' ? 22 : 16,
          rotate: 0,
          interval: 0
        }
      },
      yAxis: {
        show: false,
      },
      grid: {
        show: false
      },
      legend: {
        data: labels,
        bottom: size === 'portrait' ? '-10px' : '0px',
        left: 'center',
        icon: 'none',
        textStyle: {
          color: '#4a4a4a',
          fontWeight: 'bold',
          fontFamily: 'Titillium Web, sans-serif',
          fontSize: size === 'portrait' ? 30 : 16,
        }
      },
      series: [
        {
          data,
          label: {
            show: true,
            position: 'top',
            color: '#4a4a4a',
            fontWeight: 'bold',
            fontFamily: 'Titillium Web, sans-serif',
            fontSize: size === 'portrait' ? 40 : 20,
          },
          name: labels[0],
          stack: 'one',
          type: 'bar',
          color: Constants[`${type}Color`]
        }
      ]
    };
  }

  const footer = <footer className="charts-footer">
    <div><p>Un proiect in parteneriat cu</p><img src={partnerLogo} alt="Guvernul Romaniei" /></div>
    <div><p>dezvoltat de</p><img src={DeveloperLogo} alt="Code4Romania" /></div>
  </footer>

  const header = <header>
    <img src={CeTrebuieSaFacLogo} alt="Ce Trebuie Sa Fac" />
    {size !== 'ultraWide' && <div className="charts-header-site">cetrebuiesafac.ro</div>}
    {isLoaded && updatedAt &&
      <div className="charts-header-updated">Date actualizate in <strong>{updatedAt}</strong></div>}
  </header>

  return <div className={`charts-wrapper ${size}`}>
    {header}

    <section>
      <div className="charts-content-wrapper">
        {isLoaded &&
          <div className="chart-column">
            <div className="chart-column-header">
              <div className="chart-type">Cazuri confirmate</div>
              <div className="chart-value">{totals.confirmed}</div>
            </div>

            {size !== 'ultraWide' &&
              <ReactEcharts
                style={{ height: size === 'portrait' ? '320px' : '240px', width: '100%' }}
                className="chart-item"
                option={getChartOptions('confirmed', latestData.confirmed, latestData.dateLabels)}
                theme="light"
              />}
          </div>}

        {isLoaded &&
          <div className="chart-column">
            <div className="chart-column-header">
              <div className="chart-column-title">
                <div className="chart-type">Vindecati</div>
                {size === 'ultraWide' &&
                  <div className="chart-badge chart-badge--green">({trends.cured}% din total)</div>}
              </div>
              <div className="chart-value">{totals.cured}</div>
              {size !== 'ultraWide' &&
                <div className="chart-badge chart-badge--green">{trends.cured}% din total</div>}
            </div>

            {size !== 'ultraWide' &&
              <ReactEcharts
                style={{ height: size === 'portrait' ? '320px' : '240px', width: '100%' }}
                className="chart-item"
                option={getChartOptions('cured', latestData.cured, latestData.dateLabels)}
                theme="light"
              />}
          </div>}

        {isLoaded &&
          <div className="chart-column">
            <div className="chart-column-header">
              <div className="chart-column-title">
                <div className="chart-type">Decedati</div>
                {size === 'ultraWide' &&
                  <div className="chart-badge chart-badge--red">({trends.deaths}% din total)</div>}
              </div>
              <div className="chart-value">{totals.deaths}</div>
              {size !== 'ultraWide' &&
                <div className="chart-badge chart-badge--red">{trends.deaths}% din total</div>}
            </div>

            {size !== 'ultraWide' &&
              <ReactEcharts
                style={{ height: size === 'portrait' ? '320px' : '240px', width: '100%' }}
                className="chart-item"
                option={getChartOptions('death', latestData.deaths, latestData.dateLabels)}
                theme="light"
              />}
          </div>}
      </div>
    </section>

    {footer}
  </div>
}
