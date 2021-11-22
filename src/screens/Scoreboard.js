import Button from '@mui/material/Button';
import { Box } from 'reflexbox'
import GoogleKeys from "../auth/people-nerd-game-888ba0885f73.json"
import { GoogleSpreadsheet } from "google-spreadsheet"
import loading from '../style/load.gif'
import { resetScore } from '../redux/scoreSlice';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useHistory } from "react-router-dom";
import { useWindowDimensions } from '../hooks/useWindowDimensions'
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";

export default function Scoreboard() {
    const history = useHistory();
    const dispatch = useDispatch()
    const { width } = useWindowDimensions();
    const userName = useSelector((state) => state.userName.value)
    const score = useSelector((state) => state.score.value)
    const [scoreBoard, setScoreBoard] = useState(null)

    useEffect(() => {
        let isMounted = true
        async function connectToBackend() {
            const doc = new GoogleSpreadsheet('1tImmgrmiQzPgpPoTtUGjxN8Js1GNC6mi8yoJYwBkFLs');
            await doc.useServiceAccountAuth({
                client_email: GoogleKeys.client_email,
                private_key: GoogleKeys.private_key,
            });
            await doc.loadInfo();
            const scoresLog = doc.sheetsByTitle['scoresLog']
            await scoresLog.addRow([Date.now(), userName, score])
            const aggregateScores = doc.sheetsByTitle['aggregateScores']
            const aggregateScoresRows = await aggregateScores.getRows()
            if (isMounted) {
                setScoreBoard(aggregateScoresRows)
            }
        }
        connectToBackend()
        return () => { isMounted = false }
    }, [])

    const playAgain = () => {
        dispatch(resetScore())
        history.push('question/1')
    }

    const formatScore = (scoreValue) => {
        return Math.round(scoreValue * 100) / 100
    }

    return (
        <Box className='scoreboardOuter' sx={{width: Math.min(width - 32, 650)}}>
            <Typography align='center' variant="h4" sx={{marginBottom: '10px'}}>You scored {score}/10!</Typography>
            <Typography variant="h5" sx={{marginBottom: '10px', fontSize: '24px'}}>Scoreboard</Typography>
            {scoreBoard?
            <TableContainer component={Paper}>
                <Table sx={{ width: Math.min(width - 32, 650) }} size="small" aria-label="a dense table">  
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{fontSize: '24px'}}>Player</TableCell>
                            <TableCell sx={{fontSize: '24px'}} align="right">Avg. score</TableCell>
                            <TableCell sx={{fontSize: '24px'}} align="right">Max score</TableCell>
                            <TableCell sx={{fontSize: '24px'}} align="right">Attempts</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {scoreBoard.filter(entry => entry.Username !== '').map(row => {
                            return (
                                <TableRow
                                    key={row.Username}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, fontSize: '24px' }}
                                    >
                                    <TableCell sx={{fontSize: '20px'}} component="th" scope="row"><a href={`https://twitter.com/${row.Username}`} target="_blank">@{row.Username}</a></TableCell>
                                    <TableCell sx={{fontSize: '20px'}} align="right">{formatScore(row['AVERAGE of Score'])}</TableCell>
                                    <TableCell sx={{fontSize: '20px'}} align="right">{row['MAX of Score']}</TableCell>
                                    <TableCell sx={{fontSize: '20px'}} align="right">{row['COUNT of Score']}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            : <img alt='loading icon' className='loading' src={loading} /> }
             <div className="scoreboardFooted" >
            <Button 
                onClick={playAgain}
                size="big"
                sx={{fontSize: '18px', marginTop: '10px'}}
                variant="contained" >
                Play again
            </Button>
            </div>
        </Box>
    )
}