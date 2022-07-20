import React from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  startAfter,
  orderBy,
  getDocs,
  where,
  limit,
} from "firebase/firestore";
import { db } from "../../firebase";
import Moment from "moment";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import AddEventModal from "../../components/AddEventModal/AddEventModal";
import { formatDate } from "../../functions";

const Event = () => {
  let { id } = useParams();
  const [event, setEvent] = useState([]);
  const [events, setEvents] = useState([]);

  console.log("event prop coming from ", id);

  function formatToTime(date) {
    let unix_timestamp = date;
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();
    var day = date.getDay();
    // Will display time in 10:30:23 format
    var formattedTime = hours + ":" + minutes.substr(-2);
    return formattedTime;
  }

  function formatToDate(date_value) {
    let unix_timestamp = date_value;
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(unix_timestamp * 1000);
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let dayofMonth = date.getDate();
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    let getDate = dayofMonth + " " + months[month] + " " + year;
    return getDate;
  }

  function formatToDay(date) {
    let unix_timestamp = date;
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(unix_timestamp * 1000);
    var day = date.getDay();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const get_day = days[day];
    return get_day;
  }

  useEffect(() => {
    let event = [];
    async function getData() {
      const allDocs = query(
        collection(db, "events"),
        where("event_id", "==", id)
      );
      const querySnapshot = await getDocs(allDocs);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        event.push({ ...doc.data(), id: doc.id });
        if (doc.exists()) {
        }
      });
      setEvent(event[0]);
      console.log(event);
      window.scrollTo(0, 0);
    }
    getData();
  }, [id]);

  useEffect(() => {
    let allEvents = [];
    async function getData() {
      const allDocs = query(
        collection(db, "events"),
        orderBy("event_id"),
        limit(4)
      );
      const querySnapshot = await getDocs(allDocs);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        allEvents.push({ ...doc.data(), id: doc.id });
      });
      setEvents(allEvents);
      console.log(allEvents);
    }
    getData();
  }, []);
  return (
    <>
      <div className="my-5">
        <div className="container">
          <div>
            <div className="title mb-5 pt-5">
              <div className="d-flex justify-content-between align-items-center border-bottom pb-4">
                <h1 className="mb-0">{event.title}</h1>
                <AddEventModal />
              </div>
            </div>

            <div>
              <div className="card p-3 p-md-4 p-lg-5">
                <p className="h5" style={{ lineHeight: "inherit" }}>
                  {event.description}
                </p>
                <div className="mt-5">
                  <div className="row">
                    <div className="col-12 col-md-4">
                      <div>
                        <div className="mb-3">
                          <i className="fa-solid fa-2x fa-calendar fa"></i>
                        </div>

                        <div>
                          <h3 className="fw-bold">
                            {formatDate(event.event_date)}
                          </h3>
                          <p className="mb-0 h6">{event.event_time} GMT</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-4">
                      <div>
                        <div className="mb-3">
                          <i className="fa-solid fa-2x fa-compass fa"></i>
                        </div>

                        <div>
                          <h3 className="fw-bold">{event.venue}</h3>
                          <p className="mb-0 h6"> {event.region}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-4">
                      <div>
                        <div className="mb-3">
                          <i className="fa-solid fa-2x fa-user-o fa"></i>
                        </div>

                        <div>
                          <h3 className="fw-bold">{event.organizer}</h3>
                          <p className="mb-0 h6">Event Admin</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-5">
              <h4 className="fw-bold mb-0">Coming up this week</h4>
            </div>

            <div className="">
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                {events.map((event, i) => (
                  <div key={i} className="col">
                    <div className="card">
                      <div className="card-body">
                        <div className="details mb-4">
                          <div className="text-center">
                            <h4 className="fw-bold mb-1">
                              {formatDate(event.event_date)}
                            </h4>
                            <p className="mb-0">{event.event_time} GMT</p>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between mb-3 align-items-center">
                          <h5 className="card-title fw-bold mb-0">
                            {event.title}
                          </h5>
                          <span className="status alt status-success pointer">
                            New Event
                          </span>
                        </div>
                        <p className="card-text">{event.description}</p>
                        <NavLink
                          className="btn btn-outline-dark"
                          to={`/event/${event.event_id}`}
                        >
                          Details
                        </NavLink>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Event;
