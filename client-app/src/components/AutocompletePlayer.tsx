import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import { debounce } from '@mui/material/utils';
import { Avatar } from '@mui/material';
import { Player } from '../types/player';
import { getFilteredPlayerList, getPlayerResultOnGues } from '../api/playersApi';
import { stringToColor } from '../utils/utils';
import { PlayerWithResult } from '../types/player.results';
import { usePlayerContext } from '../contexts/PlayerContext';
import ResultList from './ResultList';
import { useGameContext } from '../contexts/GameContext';


const AutocompletePlayer = () => {

  const [value, setValue] = React.useState<Player | null>(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<readonly Player[]>([]);
  const [results, setResults] = React.useState<readonly PlayerWithResult[]>([]);
  const { player, setPlayer } = usePlayerContext();
  const { game, setGame } = useGameContext();

  const getPlayersByFilter = React.useMemo(
    () =>
      debounce(async (input: string) => {
        const players = await getFilteredPlayerList(input);
        setOptions(players);
      }, 400),
    []
  );


  const fetchPlayerResults = React.useMemo(
    () =>
      debounce(async (playerId: string) => {
        if (!playerId) return;
        const resultsData = await getPlayerResultOnGues(playerId);
        setResults(resultsData.reverse());
        if (resultsData.length && resultsData[0].result.status === true) {
          console.log("I Found the match, now i have to update the data")
          const selectedPlayer = resultsData[0] as Player
          console.log(" selected player is ", selectedPlayer)
          selectedPlayer.isFinished = true
          setPlayer(selectedPlayer)
        }
      }, 400),
    [setPlayer]
  );

  // Fetch filtered players based on input value
  React.useEffect(() => {
    if (inputValue === '') {
      setOptions([]);
      return;
    }

    getPlayersByFilter(inputValue);
  }, [inputValue, getPlayersByFilter]);

  React.useEffect(() => {
    if (game) {
      console.log("Game is over")
      setResults([])
      setOptions([])
      setInputValue('')
      setValue(null)
      setGame(false)
    }
  }, [game, setOptions, setResults, setInputValue, setValue, setGame]);

  // Fetch results based on selected player
  React.useEffect(() => {
    if (value) {
      fetchPlayerResults(value.id);
    }
  }, [value, fetchPlayerResults]);

  // Fetch results based on selected player
  React.useEffect(() => {
    if (player) {
      console.log("playe is returned", player)
    }
  }, [player]);

  return (
    <div>
      <Autocomplete
        sx={{ width: 300 }}
        getOptionLabel={(option) =>
          typeof option === 'string' ? option : option.name
        }
        filterOptions={(x) => x} // Disable default filtering
        options={options}
        autoComplete
        includeInputInList
        filterSelectedOptions
        value={value}
        noOptionsText="No Player"
        onChange={(event: any, newValue: Player | null) => setValue(newValue)}
        onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
        renderInput={(params) => (
          <TextField {...params} label="Guess the player" fullWidth />
        )}
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            <div className="parent result-info">
              <Avatar sx={{ width: 30, height: 30 }} src={option.team.imagePath} />
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', wordWrap: 'break-word', width: 'calc(80% - 44px)' }}
              >
                {option.name}
              </Typography>
              <Avatar
                sx={{ bgcolor: stringToColor(option.position), width: 30, height: 30 }}
              >
                {option.position}
              </Avatar>
            </div>
          </li>
        )}
      />
      <div>
        <ResultList resultData={results}></ResultList>
      </div>
    </div>
  );
}

export default AutocompletePlayer
