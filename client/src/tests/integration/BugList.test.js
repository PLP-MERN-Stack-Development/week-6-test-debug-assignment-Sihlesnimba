import { render, screen, waitFor } from '@testing-library/react';
import BugList from '../../components/BugList';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            _id: '1',
            title: 'Mock Bug',
            description: 'Bug from test',
            status: 'open',
          },
        ]),
    })
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('BugList Integration', () => {
  it('fetches and displays bugs', async () => {
    render(<BugList />);

    expect(screen.getByText(/Loading bugs/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Mock Bug/)).toBeInTheDocument();
      expect(screen.getByText(/\[open\]/)).toBeInTheDocument();
    });
  });
});
