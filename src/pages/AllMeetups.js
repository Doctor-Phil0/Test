import { useState, useEffect } from 'react';
import mongoose from 'mongoose'


import MeetupList from '../components/meetups/MeetupList';
const connectionString = "mongodb+srv://sohaib:753156@cluster0.yvpgc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

var db = mongoose.connection;

function AllMeetupsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    mongoose.connect(connectionString, {useUnifiedTopology: true, useNewUrlPArser: true});
    db.Books.find(
      { }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const meetups = [];

        for (const key in data) {
          const meetup = {
            id: key,
            ...data[key]
          };
          

          meetups.push(meetup);
        }

        setIsLoading(false);
        setLoadedMeetups(meetups);
      });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section>
      <h1>All Meetups</h1>
      <MeetupList meetups={loadedMeetups} />
    </section>
  );
}

export default AllMeetupsPage;