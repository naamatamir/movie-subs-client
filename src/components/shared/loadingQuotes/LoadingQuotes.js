import { useState, useEffect } from 'react';
import Button from '../Button';
import { useTheme } from '@emotion/react';
import { Box, Fade } from '@mui/material';
import './loadingQuotesStyles.css';

const allQuotes = [
  { text: 'May the Force be with you', movie: 'Star Wars' },
  { text: "There's no place like home", movie: 'The Wizard of Oz' },
  { text: "I'm the king of the world!", movie: 'Titanic' },
  {
    text: 'Carpe diem. Seize the day, boys. Make your lives extraordinary',
    movie: 'Dead Poets Society',
  },
  {
    text: 'Elementary, my dear Watson',
    movie: 'The Adventures of Sherlock Holmes',
  },
  { text: 'life is like a box of chocolates', movie: 'Forrest Gump' },
  { text: "I'll be back", movie: 'The Terminator' },
  { text: "You're gonna need a bigger boat", movie: 'Jaws' },
  { text: "Here's looking at you, kid", movie: 'Casablanca' },
  { text: 'My precious', movie: 'The Lord of the Rings' },
  { text: 'Houston, we have a problem', movie: 'Apollo 13' },
  { text: "There's no crying in baseball!", movie: 'A League of Their Own' },
  { text: "You can't handle the truth!", movie: 'A Few Good Men' },
  { text: 'A martini. Shaken, not stirred', movie: 'James Bond' },
  { text: 'If you build it, he will come', movie: 'Field of Dreams' },
  {
    text: 'Keep your friends close, but your enemies closer',
    movie: 'The Godfather',
  },
  { text: 'I am your father', movie: 'Star Wars' },
  { text: 'Just keep swimming', movie: 'Finding Nemo' },
  { text: 'You is kind. You is smart. You is important', movie: 'The Help' },
  { text: 'Hasta la vista, baby', movie: 'Terminator 2' },
  { text: 'You talking to me?', movie: 'Taxi Driver' },
  {
    text: "Roads? Where we're going we don't need roads",
    movie: 'Back to the Future',
  },
  { text: "That'll do, pig. That'll do", movie: 'Babe' },
  { text: "I'm walking here! I'm walking here!", movie: 'Midnight Cowboy' },
  { text: 'Stella! Hey, Stella!', movie: 'A Streetcar Named Desire' },
  { text: 'As if!', movie: 'Clueless' },
  { text: "Here's Johnny!", movie: 'The Shining' },
  { text: 'Rosebud', movie: 'Citizen Kane' },
  { text: "I'll have what she's having", movie: 'When Harry Met Sally' },
  { text: 'Inconceivable!', movie: 'The Princess Bride' },
  {
    text: "Fasten your seatbelts. It's going to be a bumpy night",
    movie: 'All About Eve',
  },
  { text: 'Nobody puts Baby in a corner', movie: 'Dirty Dancing' },
  { text: "Well, nobody's perfect", movie: 'Some Like it Hot' },
  { text: 'You had me at ‘hello’', movie: 'Jerry Maguire' },
  {
    text: "They may take our lives, but they'll never take our freedom!",
    movie: 'Braveheart',
  },
  { text: 'To infinity and beyond!', movie: 'Toy Story' },
  {
    text: "Toto, I've a feeling we're not in Kansas anymore",
    movie: 'The Wizard of Oz',
  },
];

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

const getShuffledQuotes = (lastQuote) => {
  let shuffledQuotes;
  do {
    shuffledQuotes = shuffle([...allQuotes]);
  } while (lastQuote.text && shuffledQuotes[0].text === lastQuote.text);

  return shuffledQuotes;
};

const LoadingQuotes = () => {
  const [quote, setQuote] = useState({});
  const [remainingQuotes, setRemainingQuotes] = useState([]);
  const [revealShow, setRevealShow] = useState(false);
  const [title, setTitle] = useState(
    "While the app is waking\nGuess the movie this line's taken"
  );
  const [titleColor, setTitleColor] = useState('#6b48c8');
  const [checked, setChecked] = useState(true);

  useEffect(() => {
    const shuffledQuotes = getShuffledQuotes(quote);
    setQuote(shuffledQuotes[0]);
    setRemainingQuotes(shuffledQuotes.slice(1));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setChecked(false);

      setTimeout(() => {
        setTitle(
          "Don't despair we're Almost there!\nCan you guess this next one?"
        );
        setTitleColor('#1f9abf');
        setChecked(true);
      }, 500);
    }, 18000);

    return () => clearTimeout(timer);
  }, []);

  const theme = useTheme();

  const handleNextQuote = () => {
    if (!remainingQuotes.length) {
      const shuffledQuotes = getShuffledQuotes(quote);
      setQuote(shuffledQuotes[0]);
      setRemainingQuotes(shuffledQuotes.slice(1));
    } else {
      setQuote(remainingQuotes[0]);
      setRemainingQuotes((prevQuotes) => prevQuotes.slice(1));
    }
    setRevealShow(false);
  };

  return (
    <div className='container'>
      <Fade in={checked}>
        <h2 className='title' style={{ color: titleColor }}>
          {title}
        </h2>
      </Fade>
      <Box className='quoteBox' sx={{}}>
        <h2 className='quoteText'>"{quote.text}"</h2>
        {revealShow ? (
          <h2 className='movieName'>{quote.movie}</h2>
        ) : (
          <div style={{ height: '1em' }}></div>
        )}
      </Box>
      {!revealShow ? (
        <Button
          onClick={() => setRevealShow(true)}
          size='large'
          bgColor={theme.palette.primary.main}
          hoverColor='#6b48c8'>
          Reveal Show
        </Button>
      ) : (
        <Button
          onClick={handleNextQuote}
          size='large'
          bgColor={theme.palette.secondary.main}
          hoverColor='#1f9abf'>
          Next Quote
        </Button>
      )}
    </div>
  );
};

export default LoadingQuotes;
