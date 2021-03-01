import '../scss/Project.scss';

function Project({ data, createdAt }) {
  return (
    <div className='project'>
      <h2>{data?.name}</h2>
      <p>{data?.description}</p>
      <h6>{createdAt}</h6>
    </div>
  );
}

export default Project;
