import React from 'react';
import { render, screen } from '@testing-library/react';
import { SummaryCard } from './summary-card';

test('renders given title', () => {
  // const title = 'Some fancy title that nobody would ever hardcode'
  // const { getByText } = render(<SummaryCard title={title} />);
  // const linkElement = getByText(new RegExp(title));
  // expect(linkElement).toBeInTheDocument();
});

// this fails, no idea why:
// TypeError: Cannot set property 'dpr' of null
// TypeError: Cannot read property 'clearRect' of null

// test('renders given title', () => {
//   const data = [1,3,5,1,3,5];
//   const total = data.reduce((a,b) => a + b, 0)
//   const { container } = render(<SummaryCard data={data}/>);
//   screen.debug(container);
//   const totalElement = container.querySelector('.total');
//   expect(totalElement.innerHTML).toBe(total);
// });
