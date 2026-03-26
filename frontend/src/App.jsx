import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './App.css';
import { ThemeProvider } from './context/ThemeContext';
import Portfolio from './pages/Portfolio';

function App() {
  return (
    <ThemeProvider>
      <Portfolio />
    </ThemeProvider>
  );
}

export default App;
