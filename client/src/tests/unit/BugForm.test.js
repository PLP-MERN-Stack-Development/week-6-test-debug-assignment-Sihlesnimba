import { render, screen, fireEvent } from '@testing-library/react';
import BugForm from '../../components/BugForm';

describe('BugForm', () => {
  it('renders inputs and submits the form', () => {
    render(<BugForm />);
    
    const titleInput = screen.getByPlaceholderText('Bug Title');
    const descInput = screen.getByPlaceholderText('Bug Description');
    const button = screen.getByText('Report Bug');

    fireEvent.change(titleInput, { target: { value: 'Bug A' } });
    fireEvent.change(descInput, { target: { value: 'Description A' } });

    expect(titleInput.value).toBe('Bug A');
    expect(descInput.value).toBe('Description A');

    fireEvent.click(button);
  });
});
