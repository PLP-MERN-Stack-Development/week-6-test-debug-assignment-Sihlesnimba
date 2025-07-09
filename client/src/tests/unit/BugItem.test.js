import { render, screen, fireEvent } from '@testing-library/react';
import BugItem from '../../components/BugItem';

const mockBug = {
  _id: '123',
  title: 'Bug A',
  description: 'Desc A',
  status: 'open',
};

describe('BugItem', () => {
  it('renders bug details and handles actions', () => {
    const handleUpdate = jest.fn();
    const handleDelete = jest.fn();

    render(<BugItem bug={mockBug} onUpdate={handleUpdate} onDelete={handleDelete} />);

    expect(screen.getByText(/Bug A/)).toBeInTheDocument();
    expect(screen.getByText(/\[open\]/)).toBeInTheDocument();

    fireEvent.click(screen.getByText('Next Status'));
    fireEvent.click(screen.getByText('Delete'));
  });
});
