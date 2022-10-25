import './App.css';
import Bj from './componets/Bj';

function App() {
  return <Bj  width={document.body.scrollWidth - 20}  height={document.body.scrollWidth / 3} />
}

export default App;
