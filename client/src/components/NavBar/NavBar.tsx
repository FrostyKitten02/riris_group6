import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const NavBar: React.FC = () => {
	return (
		<nav>
			<div>
				<Link className="nav-button" to="/">
					<FontAwesomeIcon icon={faHome} />
				</Link>
			</div>
			<div>
				<Link className="nav-button" to="/invoices">
					Invoices
				</Link>
				<Link className="nav-button" to="/login">
					<Button variant="light" size="sm">Login</Button>
				</Link>
				<Link className="nav-button" to="/register">
					<Button variant="light" size="sm">Register</Button>
				</Link>
			</div>
		</nav>
	);
};

export default NavBar;
