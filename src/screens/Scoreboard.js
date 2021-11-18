import Button from '@mui/material/Button';
import GoogleKeys from "../auth/people-nerd-game-888ba0885f73.json"
import { GoogleSpreadsheet } from "google-spreadsheet"
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
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";

export default function Scoreboard() {
    const history = useHistory();
    const dispatch = useDispatch()
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
        <div>
            <Typography align='center' variant="h4" sx={{marginBottom: '10px'}}>You scored {score}/20!</Typography>
            <Typography variant="h5" sx={{marginBottom: '10px'}}>Scoreboard</Typography>
            {scoreBoard?
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">  
                    <TableHead>
                        <TableRow>
                            <TableCell>Player</TableCell>
                            <TableCell align="right">Avg. score</TableCell>
                            <TableCell align="right">Max score</TableCell>
                            <TableCell align="right">Attempts</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {scoreBoard?
                        scoreBoard.slice(1).map(row => {
                            return (
                                <TableRow
                                    key={row.Username}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell component="th" scope="row">{row.Username}</TableCell>
                                    <TableCell align="right">{formatScore(row['AVERAGE of Score'])}</TableCell>
                                    <TableCell align="right">{row['MAX of Score']}</TableCell>
                                    <TableCell align="right">{row['COUNT of Score']}</TableCell>
                                </TableRow>
                            )
                        })
                        :null}
                    </TableBody>
                </Table>
            </TableContainer>
            : null}
             <div className="scoreboardFooted" >
            <Button 
                onClick={playAgain}
                size="big"
                sx={{fontSize: '15px', marginTop: '10px'}}
                variant="contained" >
                Play again
            </Button>
            </div>
        </div>
    )
}