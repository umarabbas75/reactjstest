
import './App.css';
import { useTypedSelector } from './hooks/useTypeSelector';
function App() {
  const {logInUser } = useTypedSelector((state) => state.auth);
  console.log('=======logInUser=========',logInUser)
  return (
    <div className="App">
        hello world
    </div>
  );
}

export default App;
