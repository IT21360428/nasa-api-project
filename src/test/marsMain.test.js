const { render } = require('@testing-library/react');
const App = require('../MarsRover/marsApp'); 

describe('App Component', () => {
  test('renders App component', () => {   
    render(<App />);
  });
});
