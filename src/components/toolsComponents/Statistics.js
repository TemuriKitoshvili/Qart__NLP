import "../../scss/Statistics.scss";

function Statistics({ statistics }) {
  return (
    <div className="statistics">
      <div className="statistics__stat">
        <h3>წინადადებები</h3>
        <span>{statistics?.sentences}</span>
      </div>
      <div className="statistics__stat">
        <h3>სიტყვები</h3>
        <span>{statistics?.words}</span>
      </div>
      <div className="statistics__stat">
        <h3>უნიკალური სიტყვები</h3>
        <span>{statistics?.unicWords}</span>
      </div>
      <div className="statistics__stat">
        <h3>საშუალო სიტყვები</h3>
        <span>{statistics?.averageWords}</span>
      </div>
    </div>
  );
}

export default Statistics;
