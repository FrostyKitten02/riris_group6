import React from "react";
import "./InvoicesPage.css";
import InvoiceTable from "./Table/InvoiceTable";

const InvoicesPage: React.FC = () => {
	return (
		<div id="table-container">
			<h3>Računi</h3>
			<InvoiceTable />
		</div>
	);
};

export default InvoicesPage;
