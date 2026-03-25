import "./FollowUps.css";

//* Component filters and displays follow-up tasks based on
//* selected toggle (upcoming or overdue)
export default function FollowUps({ applications, toggle }) {
  //* Creates date object for today and normalize time to start of day
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  //* Creates date object representing 3 days from today
  //* (end of that day)
  const threeDaysLater = new Date();
  threeDaysLater.setDate(today.getDate() + 3);
  threeDaysLater.setHours(23, 59, 59, 999);

  //* Filters applications that contain a follow-up date
  const followUps = applications.filter((currApp) => currApp.followup_date);

  //* Filters follow-ups occurring between today and the next 3 days
  const upcomingFollowUps = followUps.filter((currApp) => {
    const followUpDate = new Date(currApp.followup_date);
    return followUpDate >= today && followUpDate <= threeDaysLater;
  });

  //* Filters follow-ups that are past due (before today)
  const overdueFollows = followUps.filter((currApp) => {
    const followUpDate = new Date(currApp.followup_date);
    return followUpDate < today;
  });

  //* Determines which list to display based on toggle value
  const toggleFollowups =
    toggle === "upcoming" ? upcomingFollowUps : overdueFollows;

  //* Sorts selected follow-ups by date (earliest first)
  const sortedFollowUps = [...toggleFollowups].sort(
    (a, b) => new Date(a.followup_date) - new Date(b.followup_date),
  );

  //* Displays fallback message if no follow-ups exist for selected category
  if (sortedFollowUps.length === 0)
    return (
      <p> {!toggle ? "No upcoming follow-ups" : "No overdue follow-ups"}</p>
    );

  return (
    //* Container allows scroll behavior if follow-up list exceeds available space
    <section className="followUpOverflow">
      <ul>
        {/* //* Maps through sorted follow-ups and renders each as a list item */}
        {sortedFollowUps.map((currApp) => (
          <li key={currApp.id} className="followUpList">
            <section>
              <p>{currApp.company}</p>
              <p>{currApp.role}</p>
            </section>

            {/* //* Formats follow-up date into readable string */}
            <p>{new Date(currApp.followup_date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
