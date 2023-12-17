/* global $ */

import React, { useEffect, useState } from 'react'
import './App.css';

// import studentsData from '../../dummyData.js';
import axios from 'axios';
import myApi from '../../myApi.js';
import { useNavigate } from 'react-router-dom';


function App() {

    const navigateTo = useNavigate()
    var loginLocalStorage = JSON.parse(localStorage.getItem('logintoken'));

    let [studentsData, setstudentsData] = useState([])
    let [cuurentSinglestudent, setcuurentSinglestudent] = useState([]);
    let [allcourse, setallcourse] = useState(false);
    let [course, setcourse] = useState(false);
    let [idoflogin, setidoflogin] = useState(loginLocalStorage.student.id);
    const [selectedcourse, setselectedcourse] = useState();
    const [allpersondata, setallpersondata] = useState([]);


    let [errTxt, seterrTxt] = useState();
    let [errTxtInModal, seterrTxtInModal] = useState('');


    useEffect(() => {
        if (loginLocalStorage && loginLocalStorage.student && loginLocalStorage.student.id) {
            setidoflogin(loginLocalStorage.student.id);
            gettingdata();
            gettingpersondata();
            gettingallcourses();
        } else {
            // Handle the case when the loginLocalStorage is not properly set
            navigateTo('login');
        }
    }, []);




    async function gettingallcourses() {
        try {
            var res = await axios.get(`${myApi}getallcourse`);
            var data = await res.data;
            setallcourse(data);
        } catch (error) {
            console.log(error);
        }
    }

    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear();

        return `${month}/${day}/${year}`;
    }


    async function gettingpersondata() {
        try {
            const res = await axios.post(`${myApi}seachStudent`, { id: idoflogin });
            const data = res.data;
            setallpersondata(data.results);
        } catch (error) {
            console.log(error);
        }
    }

    async function gettingdata() {
        try {
            if (idoflogin) {
                const res = await axios.post(`${myApi}seachStudent`, { id: idoflogin });
                const data = res.data;
                if (data.results && data.results.length > 0) {
                    setstudentsData(data.results);
                } else {
                    setstudentsData([]);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }



    function Singlestudentdata({ data }) {


        // Example usage:
        const formattedDate = formatDate("2023-12-17T12:42:58.055Z");
        return (
            <div onClick={() => { setcuurentSinglestudent(data) }} className='singleData d-flex' data-bs-toggle="modal" data-bs-target="#Singlestudent">
                <p style={{ flex: 3 }}>{data.studentname}</p>
                <p style={{ flex: 1 }}>{data.course}</p>
                <p style={{ flex: 1 }}>{data.id}</p>
                <p style={{ flex: 1 }}>{formatDate(data.updatedAt)}</p>
            </div>
        )
    }


    async function markAttendence() {
        try {
            if (idoflogin) {
                const currentDate = new Date();
                const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-based
                const day = currentDate.getDate().toString().padStart(2, '0');
                const year = currentDate.getFullYear();

                const formattedDate = `${month}/${day}/${year}`;


                var res = await axios.post(`${myApi}attendance-student`, {
                    date: formattedDate,
                    studentId: idoflogin,
                    courseName: loginLocalStorage.student.course
                })

                var data = await res.data();
            }
        } catch (error) {
            console.error(error);
            if (idoflogin && error.response && error.response.status === 400) {
                seterrTxtInModal("Attendance has already been marked.");
            } else {
                seterrTxtInModal("Server is not responding. Please try again later.");
            }
        }
    }


    return (
        <div className="homePage">


            {/* modal of Add data */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-2" id="staticBackdropLabel">Add student Data</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body add-studentData-body">
                            <b>Are you Sure to mark your Attendance</b>
                            <select className='form-select' onChange={(e) => setselectedcourse(e.target.value)} aria-label='Default select example'>
                                {allcourse == [] ? "Something went wrong" : allcourse.map((x, i) => {
                                    return (
                                        <option key={i}>{x.coursename}</option>
                                    )
                                })}
                            </select>
                            <input type="text" className="form-control" value={idoflogin} onChange={(e) => setidoflogin(e.target.value)} placeholder="Your Id" aria-label="Server"></input>
                            <p style={{ color: 'red', marginTop: "10px" }}>{errTxtInModal}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={markAttendence}>Mark Attendence</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* modal of single student */}
            <div className="modal fade" id="Singlestudent" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            {console.log(cuurentSinglestudent)}
                            <h1 className="modal-title fs-3" id="staticBackdropLabel">{cuurentSinglestudent.studentname}'s data</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body singlestudentDataModalBody d-flex flex-column">
                            <span>Student Name: <span className='mainWordsinSPDMB'>{cuurentSinglestudent.studentname}</span></span>
                            <span>Student Id: <span className='mainWordsinSPDMB'>{cuurentSinglestudent.id}</span></span>
                            <span>Student Attendece: <span className='mainWordsinSPDMB'>{formatDate(cuurentSinglestudent.updatedAt)}</span></span>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="homeWrapper">
                <div className="headingArea d-flex align-items-center">
                    <h3 style={{ color: '#6f11f5' }}> View your Attendance </h3>
                    <div>
                        <button className='addPtnBtn' data-bs-toggle="modal" data-bs-target="#staticBackdrop">Mark Attendance</button>
                        <button className='searchBtnOfstudent ms-3' onClick={() => {
                            localStorage.setItem('logintoken', JSON.stringify(""));
                            navigateTo('/login')
                        }}> Logout </button>
                    </div>
                </div>


                <div className="allProducts my-4 px-4 py-3">
                    <div className="navofstudentData d-flex mb-3">
                        <h5 style={{ flex: 3 }}>Name</h5>
                        <h5 style={{ flex: 1 }}>Course</h5>
                        <h5 style={{ flex: 1 }}>Id</h5>
                        <h5 style={{ flex: 1 }}>Attendance</h5>
                    </div>
                    {studentsData.length === 0 ? "No data!" : (
                        allpersondata.map((x, i) => (<Singlestudentdata key={i} data={x} />))
                    )}


                </div>
            </div>
        </div>
    );
}

export default App;
