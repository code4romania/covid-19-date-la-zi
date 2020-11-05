import React from 'react';
import PropTypes from 'prop-types';

export const Tabs = ({ tabList, activeTab, onSelect }) =>
  <div className="tabs is-centered is-toggle is-small">
    <ul className="is-marginless">
      {tabList.map(tab =>
        <li
          className={activeTab === tab.value && 'is-active'}
          onClick={() => onSelect(tab)}
          key={tab.value}
        >
          <a href={`#${tab.value}`}>
            <span>
              {tab.label}
            </span>
          </a>
        </li>
      )}
    </ul>
  </div>;

Tabs.propType = {
  tabList: PropTypes.array,
  activeTab: PropTypes.string,
  onSelect: PropTypes.func,
};

Tabs.defaultProps = {
  tabList: [],
};
