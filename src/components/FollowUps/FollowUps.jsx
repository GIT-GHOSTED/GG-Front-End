import "./FollowUps.css";

export default function FollowUps({ applications }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const threeDaysLater = new Date();
  threeDaysLater.setDate(today.getDate() + 3);
  threeDaysLater.setHours(23, 59, 59, 999);

  const followUps = applications.filter((app) => app.followup_date);

  const upcomingFollowUps = followUps.filter((app) => {
    const followUpDate = new Date(app.followup_date);
    return followUpDate >= today && followUpDate <= threeDaysLater;
  });

  const sortedFollowUps = upcomingFollowUps.sort(
    (a, b) => new Date(a.followup_date) - new Date(b.followup_date),
  );

  if (sortedFollowUps.length === 0) return <p>No upcoming follow-ups</p>;

  return (
    <section className="followUpOverflow">
      <ul>
        {sortedFollowUps.map((app) => (
          <li key={app.id}>
            <p>{app.company}</p>
            <p>{app.role}</p>
            <p>{new Date(app.followup_date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
