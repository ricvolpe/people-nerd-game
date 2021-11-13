import GoogleKeys from "../auth/people-nerd-game-888ba0885f73.json"
import { useSelector } from "react-redux";
import { GoogleSpreadsheet } from "google-spreadsheet"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";

export default function Scoreboard() {
    const history = useHistory();
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
    })

    const playAgain = () => {
        history.push('question/1')
    }

    return (
        <div>
            <h2>You scored {score}/20!</h2>
            <table>
                <thead>
                    {scoreBoard?
                            <tr>
                                <th>User</th>
                                <th>Mean score</th>
                                <th>Max score</th>
                                <th>Attempts</th>
                            </tr>
                    :null}
                </thead>
                <tbody>
                    {scoreBoard?
                    scoreBoard.slice(1).map(row => {
                        return (
                            <tr key={row.Username}>
                                <td>{row.Username}</td>
                                <td>{row['AVERAGE of Score']}</td>
                                <td>{row['MAX of Score']}</td>
                                <td>{row['COUNT of Score']}</td>
                            </tr>
                        )
                    })
                    :null}
                </tbody>
            </table>
            <button onClick={playAgain}>Play again!</button>
        </div>
    )
}