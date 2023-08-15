import { useState, useEffect } from 'react';
import Button from './Button';
import { useTheme } from '@emotion/react';
import { Box } from '@mui/material';

const allQuotes = [
  { text: 'May the Force be with you.', movie: 'Star Wars' },
  { text: "There's no place like home.", movie: 'The Wizard of Oz' },
  { text: "I'm the king of the world!", movie: 'Titanic' },
  { text: 'Carpe diem. Seize the day, boys. Make your lives extraordinary.', movie: 'Dead Poets Society' },
  { text: 'Elementary, my dear Watson.', movie: 'The Adventures of Sherlock Holmes' },
  { text: "life is like a box of chocolates", movie: 'Forrest Gump' },
  { text: "I'll be back.", movie: 'The Terminator' },
  { text: "You're gonna need a bigger boat.", movie: 'Jaws' },
  { text: "Here's looking at you, kid.", movie: 'Casablanca' },
  { text: "My precious.", movie: 'The Lord of the Rings' },
  { text: "Houston, we have a problem.", movie: 'Apollo 13' },
  { text: "There's no crying in baseball!", movie: 'A League of Their Own' },
  { text: "You can't handle the truth!", movie: 'A Few Good Men' },
  { text: "A martini. Shaken, not stirred.", movie: 'Goldfinger' },
  { text: "If you build it, he will come.", movie: 'Field of Dreams' },
  { text: "Keep your friends close, but your enemies closer.", movie: 'The Godfather' },
  { text: "I am your father.", movie: 'Star Wars' },
  { text: "Just keep swimming.", movie: 'Finding Nemo' },
  { text: "You is kind. You is smart. You is important.", movie: 'The Help' },
  { text: "Hasta la vista, baby.", movie: 'Terminator 2: Judgment Day' },
  { text: "You talking to me?", movie: 'Taxi Driver' },
  { text: "Roads? Where we're going we don't need roads.", movie: 'Back to the Future' },
  { text: "That'll do, pig. That'll do.", movie: 'Babe' },
  { text: "I'm walking here! I'm walking here!", movie: 'Midnight Cowboy' },
  { text: "Stella! Hey, Stella!", movie: 'A Streetcar Named Desire' },
  { text: "As if!", movie: 'Clueless' },
  { text: "Here's Johnny!", movie: 'The Shining' },
  { text: "Rosebud.", movie: 'Citizen Kane' },
  { text: "I'll have what she's having.", movie: 'When Harry Met Sally' },
  { text: "Inconceivable!", movie: 'The Princess Bride' },
  { text: "Fasten your seatbelts. It's going to be a bumpy night.", movie: 'All About Eve' },
  { text: "Nobody puts Baby in a corner.", movie: 'Dirty Dancing' },
  { text: "Well, nobody's perfect.", movie: 'Some Like it Hot' },
  { text: "You had me at ‘hello.’", movie: 'Jerry Maguire' },
  { text: "They may take our lives, but they'll never take our freedom!", movie: 'Braveheart' },
  { text: "To infinity and beyond!", movie: 'Toy Story' },
  { text: "Toto, I've a feeling we're not in Kansas anymore.", movie: 'The Wizard of Oz' }
];


// const allQuotes = [
//   { text: 'I am the danger', show: 'Breaking Bad' },
//   { text: "That's what she said", show: 'The Office' },
//   { text: 'Winter is coming', show: 'Game of Thrones' },
//   { text: 'How you doin?', show: 'Friends' },
//   { text: 'The truth is out there', show: 'X-Files' },
//   { text: 'No soup for you', show: 'Seinfeld' },
//   { text: 'To boldly go where no man has gone before', show: 'Star Trek' },
//   {
//     text: 'Is that your final answer?',
//     show: 'Who Wants to Be a Millionaire?',
//   },
//   { text: 'Oh my God! They killed Kenny!', show: 'South Park' },
// ];

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex,
    tempValue;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    tempValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = tempValue;
  }
  return array;
};

const LoadingQuotes = () => {
  const [quote, setQuote] = useState({});
  const [remainingQuotes, setRemainingQuotes] = useState([...allQuotes]);
  const [revealShow, setRevealShow] = useState(false);

  useEffect(() => {
    if (!remainingQuotes.length) {
      setRemainingQuotes(shuffle([...allQuotes]));
    }
    setQuote(remainingQuotes.pop());
  }, []);

  const theme = useTheme();

  const handleNextQuote = () => {
    if (!remainingQuotes.length) {
      setRemainingQuotes((prevQuotes) => {
        const newQuotes = shuffle([...allQuotes]);
        setQuote(newQuotes[newQuotes.length - 1]);
        return newQuotes.slice(0, newQuotes.length - 1);
      });
    } else {
      setQuote(remainingQuotes[remainingQuotes.length - 1]);
      setRemainingQuotes((prevQuotes) =>
        prevQuotes.slice(0, prevQuotes.length - 1)
      );
    }
    setRevealShow(false);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>
        while Loading takes a spin <br />
        guess the show this quote's been in
      </h2>
      <Box
        sx={{
          backgroundColor: 'white',
          color: 'black',
          padding: '2.3rem 0',
          height: '200px',
          width: '400px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '0 1.2rem 1.2rem 1.2rem',
          border: '1px solid #ccc',
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.26)',
          transition: 'all 0.3s ease-in-out',
        }}>
        <h2
          style={{
            fontFamily: 'Consolas',
            marginBottom: revealShow ? '0' : 'auto',
          }}>
          "{quote.text}"
        </h2>
        {revealShow ? (
          <h2 style={{ fontFamily: 'Consolas', color: 'grey' }}>
            {quote.show}
          </h2>
        ) : (
          <div style={{ height: '1em' }}></div>
        )}
      </Box>
      {!revealShow ? (
        <Button
          onClick={() => setRevealShow(true)}
          bgColor={theme.palette.primary.main}
          hoverColor='#6b48c8'>
          Reveal Show
        </Button>
      ) : (
        <Button
          onClick={handleNextQuote}
          bgColor={theme.palette.secondary.main}
          hoverColor='#1f9abf'>
          Next Quote
        </Button>
      )}
    </div>
  );
};

export default LoadingQuotes;
