import React from "react";
import "./InvoicesPage.css";
import InvoiceTable from "./Table/InvoiceTable";
import ExcelFileInput from "./ExcelImporter/ExcelImporter";

const InvoicesPage: React.FC = () => {
	return (
		<div id="table-container">
			<h3>Računi</h3>
			<ExcelFileInput />
			<InvoiceTable />
		</div>
	);
};

export default InvoicesPage;
