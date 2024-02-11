import './styles/global.scss';
import { useEffect, useState } from 'react';
import FormattedTime from './components/FormattedTime/FormattedTime';
import Button from './components/Button/Button';
import Container from './components/Container/Container';

const App = () => {
  const [currentTime, setCurrentTime] = useState(0); // stan komponentu, który tyczy się aktualnej wartości odliczanego czasu (wartośc startowa: 0)
  const [intervalId, setIntervalId] = useState(null); // stan komponentu, który tyczy się referencji do setInterval (wartośc startowa: null - nie ma przypisanej żadnej referencji)

  useEffect(() => { // ręczne usunięcie ze stanu komponentu referencji do setInterval (funkcja jest uruchamiana na obiekcie window) w przypadku usunięcia komponentu (odświeżenie, przejście na inną stronę)
    // code that runs once at the start
    return () => {
      // code that runs once at the end of component "life"
      clearInterval(intervalId); // usunięcie ze stanu komponentu referencji do setInterval - zatrzymanie liczenia czasu
    };
  }, [intervalId]);

  const startTimer = () => { // uruchomienie setInterval (arg1 - callback, arg2 - określa okres, co jaki callback ma być uruchamiana) - rozpoczęcie liczenia czasu
    if (!intervalId) {
      const id = setInterval(() => {
        setCurrentTime((prevTime) => prevTime + 100); // zwiększenie o 100ms wartości stanu komponentu z czasem (! JS uruchomi funkcję z opóźnieniem, ponieważ najpierw musi odświeżyć widok)
      }, 100);

      setIntervalId(id); // przypisanie do stanu komponentu referencji do setInterval
    }
  };

  const stopTimer = () => {
    if (intervalId) {
      clearInterval(intervalId); // usunięcie ze stanu komponentu referencji do setInterval - zatrzymanie liczenia czasu
      setIntervalId(null); // ustawienie wartości null dla stanu komponentu
    }
  };

  const resetTimer = () => { // zerowanie wartości stanu komponentu z czasem
    setCurrentTime(0);
  };

  return (
    <Container>
      <FormattedTime time={currentTime} />
      <Button type="button" onClick={startTimer}>Start</Button> {/* dodanie na element nasłuchiwacza eventu click */}
      <Button type="button" onClick={stopTimer}>Stop</Button>
      <Button type="button" onClick={resetTimer}>Reset</Button>
    </Container>
  );
}

export default App;
