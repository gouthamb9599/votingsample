import React, { useEffect } from 'react';
import Axios from 'axios';
import './test.css';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});




function Test() {
    // const [open, setOpen] = React.useState(false);
    const [Subject, setSubject] = React.useState(0);
    const [Questiontem1, setQuestiontem1] = React.useState('');
    const [Answertem1, setAnswertem1] = React.useState('');
    const [Option1tem1, setOption1tem1] = React.useState('');
    const [Questiontem2, setQuestiontem2] = React.useState('');
    const [Answertem2, setAnswertem2] = React.useState('');
    const [Option1tem2, setOption1tem2] = React.useState('');
    const [Questiontem3, setQuestiontem3] = React.useState('');
    const [Answertem3, setAnswertem3] = React.useState('');
    const [Option1tem3, setOption1tem3] = React.useState('');
    const [Questionarray, setQuestionarray] = React.useState([]);
    const [Answerarray, setAnswerarray] = React.useState([]);
    const [Option1array, setOption1array] = React.useState([]);
    const [Subjectarray, setSubjectarray] = React.useState([]);
    const [Newques, setNewques] = React.useState(true);
    const cancelquestion = () => {

    }

    useEffect(() => {
        Axios.get(`http://localhost:5000/admin/getsubject`)
            .then(res => {
                console.log(res.data.data);
                setSubjectarray(res.data.data);

            })
    }, [])

    const handlequestion1 = () => {
        console.log(Questiontem1, Answertem1, Option1tem1);
        setQuestionarray(Questionarray => [...Questionarray, Questiontem1]);
        setAnswerarray(Answerarray => [...Answerarray, Answertem1]);
        setOption1array(Option1array => [...Option1array, Option1tem1]);
        console.log(Questionarray, Answerarray, Option1array);
    }

    const handlequestion2 = () => {
        console.log(Questiontem2, Answertem2, Option1tem2);
        setQuestionarray(Questionarray => [...Questionarray, Questiontem2]);
        setAnswerarray(Answerarray => [...Answerarray, Answertem2]);
        setOption1array(Option1array => [...Option1array, Option1tem2]);
        console.log(Questionarray, Answerarray, Option1array);
    }
    const handlequestion3 = () => {
        console.log(Questiontem3, Answertem3, Option1tem3);
        setQuestionarray(Questionarray => [...Questionarray, Questiontem3]);
        setAnswerarray(Answerarray => [...Answerarray, Answertem3]);
        setOption1array(Option1array => [...Option1array, Option1tem3]);
        console.log(Questionarray, Answerarray, Option1array);
    }
    const cancelquestion1 = () => {
        setAnswertem1("");
        setQuestiontem1("");
        setOption1tem1("");
    }
    const cancelquestion2 = () => {
        setAnswertem2("");
        setQuestiontem2("");
        setOption1tem2("");
    }
    const submittest = () => {
        console.log(Questionarray, Answerarray, Option1array);

    }
    const canceltest = () => {
        setQuestionarray(Questionarray => [...Questionarray, ""])
        setAnswerarray(Answerarray => [...Answerarray, ""])
        setOption1array(Option1array => [...Option1array, ""])
    }
    const cancelquestion3 = () => {
        setAnswertem3("");
        setQuestiontem3("");
        setOption1tem3("");
    }
    const handleChange = (event) => {
        setSubject(event.target.value);
    };
    const handleQChange1 = (event) => {
        setQuestiontem1(event.target.value);
    }
    const handleAChange1 = (event) => {
        setAnswertem1(event.target.value);
    }
    const handle1Change1 = (event) => {
        setOption1tem1(event.target.value);
    }
    const handleQChange2 = (event) => {
        setQuestiontem2(event.target.value);
    }
    const handleAChange2 = (event) => {
        setAnswertem2(event.target.value);
    }
    const handle1Change2 = (event) => {
        setOption1tem2(event.target.value);
    }
    const handleQChange3 = (event) => {
        setQuestiontem3(event.target.value);
    }
    const handleAChange3 = (event) => {
        setAnswertem3(event.target.value);
    }
    const handle1Change3 = (event) => {
        setOption1tem3(event.target.value);
    }

    const addques = () => {
        setNewques(true);
        console.log(Newques);
        let rows = [];
        while (Newques === true) {
            rows.push(
                <div>
                    <textarea name="questionhead" cols="30" rows="2" placeholder="Question"></textarea>
                    <textarea name="answer" cols="20" rows="2" placeholder="Answer" />
                    <textarea name="option" cols="20" rows="2" placeholder="option" />
                    <Button color="secondary">Submit Question</Button>
                    <Button color="secondary">Cancel</Button>
                </div>)
        }
        setNewques(false);
        console.log(Newques);
        return rows;
    }

    return (
        <div className="testframe">
            <h3 className="testhead">CREATE TEST</h3>
            <div>
                <h5>Choose Subject</h5><Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={Subject}
                    onChange={handleChange}
                >
                    {Subjectarray.map((data) =>
                        (<MenuItem value={data.subject_id}>{data.subject_name}</MenuItem>))
                    }
                </Select>
            </div>
            <div>
                <div>
                    <textarea name="questionhead" cols="30" rows="2" onChange={handleQChange1} value={Questiontem1} placeholder="Question" />
                    <textarea name="answer" cols="20" rows="2" onChange={handleAChange1} value={Answertem1} placeholder="Answer" />
                    <textarea name="option" cols="20" rows="2" onChange={handle1Change1} value={Option1tem1} placeholder="option" />
                </div>
                <div>
                    <Button onClick={handlequestion1} color="secondary">Submit Question</Button>
                    <Button onClick={cancelquestion1} color="secondary">Cancel</Button>
                </div>
            </div>
            <div>
                <div>
                    <textarea name="questionhead" cols="30" rows="2" onChange={handleQChange2} value={Questiontem2} placeholder="Question"></textarea>
                    <textarea name="answer" cols="20" rows="2" onChange={handleAChange2} value={Answertem2} placeholder="Answer" />
                    <textarea name="option" cols="20" rows="2" onChange={handle1Change2} value={Option1tem2} placeholder="option" />
                </div>
                <div>
                    <Button onClick={handlequestion2} color="secondary">Submit Question</Button>
                    <Button onClick={cancelquestion2} color="secondary">Cancel</Button>
                </div>
            </div>
            <div>
                <div>
                    <textarea name="questionhead" cols="30" rows="2" onChange={handleQChange3} value={Questiontem3} placeholder="Question"></textarea>
                    <textarea name="answer" cols="20" rows="2" onChange={handleAChange3} value={Answertem3} placeholder="Answer" />
                    <textarea name="option" cols="20" rows="2" onChange={handle1Change3} value={Option1tem3} placeholder="option" />
                </div>
                <div>
                    <Button onClick={handlequestion3} color="secondary">Submit Question</Button>
                    <Button onClick={cancelquestion3} color="secondary">Cancel</Button>
                </div>
            </div>
            <Button onClick={addques} color="primary">Add Question</Button>
            <div>
                <Button onClick={submittest} color="primary">Submit Test</Button>
                <Button onClick={canceltest} color="primary">Cancel </Button>
            </div>
        </div >
    );
}
export default Test;