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
const Events = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let allEvents = [];
    async function getData() {
      const allDocs = query(collection(db, "events"), orderBy("event_id"));
      const querySnapshot = await getDocs(allDocs);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        allEvents.push({ ...doc.data(), id: doc.id });
        if (doc.exists()) {
          setIsLoading(false);
        }
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
                <h1 className="mb-0">All Events</h1>

                <AddEventModal />
              </div>
            </div>

            <div className="pt-5">
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                {events.map((event, i) => (
                  <div key={i} className="col">
                    <div className="card">
                      <div className="card-body">
                        <div className="details mb-4">
                          <div>
                            <h4 className="fw-bold mb-1">{event.event_date}</h4>
                            <p className="mb-0">{event.event_time}GMT</p>
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

export default Events;
