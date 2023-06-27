import { Link, Outlet } from 'react-router-dom';

export const RootPage = () => {
    return (
        <div>
            <h1>Hello world!</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="schedule">Schedule</Link>
                    </li>
                    <li>B</li>
                    <li>C</li>
                </ul>
            </nav>
            <div>
                <Outlet />
            </div>
        </div>
    );
};
