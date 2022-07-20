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

import { formatToDate, formatToTime, formatToDay } from "../../functions";
import Modal from "react-bootstrap/Modal";
import { allRegions } from "../../regions";

const AddEventModal = () => {
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
      window.location.reload();
    }
  };
  return (
    <>
      <button className="btn btn-info" onClick={handleShow}>
        <i className="fa-solid fa-plus fa me-1"></i> Create Event
      </button>
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

export default AddEventModal;
