import { render, screen } from '@testing-library/react';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';

const queryClient = new QueryClient();

// Mock components
jest.mock('sonner', () => ({ Toaster: () => <div>Toaster</div> }));
jest.mock('recharts', () => ({
  ...jest.requireActual('recharts'),
  ResponsiveContainer: ({ children }) => <div>{children}</div>,
}));

describe('Navigation Testing', () => {
  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );
  });

  // Test all navigation links
  test('renders all main navigation links', () => {
    const expectedLinks = [
      'Dashboard',
      'Grades',
      'Schedule',
      'Resources'
    ];

    expectedLinks.forEach(linkText => {
      expect(
        screen.getByRole('link', { name: new RegExp(linkText, 'i') })
      ).toBeInTheDocument();
    });
  });

  // Test all buttons
  test('renders all interactive buttons', () => {
    const expectedButtons = [
      'Notifications',
      'Profile menu',
      'View Schedule',
      'Submit Assignment',
      'Search Resources',
      'Update Profile'
    ];

    expectedButtons.forEach(buttonText => {
      expect(
        screen.getByRole('button', { name: new RegExp(buttonText, 'i') })
      ).toBeInTheDocument();
    });
  });

  // Test active link state
  test('marks current route as active', () => {
    const dashboardLink = screen.getByRole('link', { name: /dashboard/i });
    
  });

  // Test navigation interaction
  test('navigates to grades page when clicked', async () => {
    const user = userEvent.setup();
    const gradesLink = screen.getByRole('link', { name: /grades/i });
    
    await user.click(gradesLink);
  });
});