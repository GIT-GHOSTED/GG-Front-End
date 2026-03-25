import "./FollowUps.css";

export default function FollowUps({ applications, toggle }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const threeDaysLater = new Date();
  threeDaysLater.setDate(today.getDate() + 3);
  threeDaysLater.setHours(23, 59, 59, 999);

  const followUps = applications.filter((currApp) => currApp.followup_date);

  const upcomingFollowUps = followUps.filter((currApp) => {
    const followUpDate = new Date(currApp.followup_date);
    return followUpDate >= today && followUpDate <= threeDaysLater;
  });

  const overdueFollows = followUps.filter((currApp) => {
    const followUpDate = new Date(currApp.followup_date);
    return followUpDate < today;
  });

  const toggleFollowups = toggle ? overdueFollows : upcomingFollowUps;

  const sortedFollowUps = [...toggleFollowups].sort(
    (a, b) => new Date(a.followup_date) - new Date(b.followup_date),
  );

  if (sortedFollowUps.length === 0)
    return (
      <p> {!toggle ? "No upcoming follow-ups" : "No overdue follow-ups"}</p>
    );

  return (
    <section className="followUpOverflow">
      <ul>
        {sortedFollowUps.map((currApp) => (
          <li key={currApp.id} className="followUpList">
            <section>
              <p>{currApp.company}</p>
              <p>{currApp.role}</p>
            </section>
            <p>{new Date(currApp.followup_date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
