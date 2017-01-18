require('./index.scss');
import React from 'react';
import { Link , IndexLink} from 'react-router';

const Navbar = () => (
    <div className="navbar">
        <IndexLink className="link" to="/blue" activeClassName="link-active"> blue</IndexLink>
        <Link className="link" to="/red" activeClassName="link-active"> red</Link>
        <Link className="link" to="/green" activeClassName="link-active"> green</Link>
        <Link className="link" to="/orange" activeClassName="link-active"> orange</Link>
        <Link className="link" to="/todo1" activeClassName="link-active"> Todo1 </Link>
        <Link className="link" to="/todo2" activeClassName="link-active"> Todo2 </Link>
        <Link className="link" to="/todo3" activeClassName="link-active"> Todo3 </Link>
    </div>
);

export default Navbar;