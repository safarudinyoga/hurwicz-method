import './App.css';
import Form from './form';
import { Text } from '@chakra-ui/react'

function App() {
  return (
    <div className="App">
      <div className='title'>
        <Text fontSize='4xl'>Tugas Riset & Operasional</Text>
        <Text fontSize='4xl'>Metode Hurwicz</Text>
      </div>

      <Form />

      <div className='footer'>
        <Text fontSize='3xl'>Fatimah Salimah 202043579058<br />Safarudin Alwi Prayogo 202043579059</Text>
      </div>
    </div>
  );
}

export default App;
