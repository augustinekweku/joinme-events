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
  setDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

import {
  formatToDate,
  formatToTime,
  formatToDay,
  formatDate,
} from "../../functions";
import Modal from "react-bootstrap/Modal";
import { allRegions } from "../../regions";

const Home = () => {
  let navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const title = useRef();
  const organizer = useRef();
  const desc = useRef();
  const subgroup = useRef();
  const event_date = useRef();
  const event_time = useRef();
  const region = useRef();
  const venue = useRef();
  useEffect(() => {
    let allEvents = [];
    async function getData() {
      const allDocs = query(
        collection(db, "events"),
        orderBy("title"),
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

  const handleSave = async (e) => {
    // Add a new document in collection "cities"
    e.preventDefault();
    let eventObj = {
      event_id: uuidv4(),
      title: title.current.value,
      organizer: organizer.current.value,
      description: desc.current.value,
      subgroup: subgroup.current.value,
      event_date: event_date.current.value,
      event_time: event_time.current.value,
      venue: venue.current.value,
      region: region.current.value,
      timestamp: serverTimestamp(),
    };
    console.log(eventObj);
    const req = await addDoc(collection(db, "events"), eventObj);
    console.log(req.id);
    if (req.id) {
      setShow(false);
      navigate("/all-events", { replace: true });
    }
  };

  return (
    <>
      <div className="my-5">
        <div className="container">
          <div>
            <div className="title mb-5 pt-5">
              <h1>Welcome Fatah!</h1>
            </div>

            <div>
              <div className="row g-4">
                <div className="col-12 col-md-8">
                  <div className="bg-faded-gold fsfs">
                    <h2 className="fw-bold">
                      There is currently no featured event
                    </h2>

                    <p className="h5 mb-5">
                      Create your event to get reminders and allow others attend
                      your events
                    </p>

                    <button className="btn btn-primary" onClick={handleShow}>
                      Create Event
                    </button>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="bg-blue fsfs enquiries">
                    <h2 className="fw-bold text-white">
                      Have questions and enquiries?
                    </h2>

                    <p className="text-white h5 mb-4">Reach out to us today.</p>

                    <button className="btn btn-secondary">Make Enquiry</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-5">
              <p className="mb-2">DISCOVER NEW EVENTS</p>
              <h2 className="fw-bold">Upcoming Events</h2>
            </div>

            <div>
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

            <div className="my-5">
              <NavLink
                to="all-events"
                className="h5 text-decoration-none fw-bold"
              >
                See all events
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Add New Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="p-3">
            <div className="">
              <form onSubmit={handleSave}>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    ref={title}
                    placeholder="Enter event title"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput12"
                    className="form-label"
                  >
                    Name of organizer
                  </label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    ref={organizer}
                    placeholder="Full Name"
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    required
                    ref={desc}
                    rows="3"
                    placeholder="What is this event about?"
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput12"
                    className="form-label"
                  >
                    Name of subgroup
                  </label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    ref={subgroup}
                    placeholder="Subgroup name"
                  />
                </div>

                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput12"
                        className="form-label"
                      >
                        Date of Event
                      </label>
                      <input
                        type="date"
                        required
                        className="form-control"
                        ref={event_date}
                        placeholder="Full Name"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput12"
                        className="form-label"
                      >
                        Time
                      </label>
                      <input
                        type="time"
                        required
                        className="form-control"
                        ref={event_time}
                        placeholder="Full Name"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput12"
                    className="form-label"
                  >
                    Venue
                  </label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    ref={venue}
                    placeholder="Enter venue"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput12"
                    className="form-label"
                  >
                    Region
                  </label>
                  <select required ref={region} id="" className="form-control">
                    {allRegions.map((region, index) => (
                      <option key={index} value={region.name}>
                        {region.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button type="submit" className="btn btn-info">
                  <i className="fa-solid fa-plus fa me-1"></i> Create Event
                </button>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Home;
