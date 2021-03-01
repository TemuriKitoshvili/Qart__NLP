import '../scss/ErrorPage.scss';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div>
      <h2>404</h2>
      <Link to='/' />
    </div>
  );
};

export default ErrorPage;
