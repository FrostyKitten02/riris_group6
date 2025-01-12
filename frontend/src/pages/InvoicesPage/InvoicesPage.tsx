import React from "react";
import "./InvoicesPage.css";
import InvoiceTable from "./Table/InvoiceTable";
import ExcelFileInput from "./ExcelImporter/ExcelImporter";
import axios from "axios";
import { Invoice } from "../../classes/Invoice";
import {RequestUtil} from "../../utils/RequestUtil";
import {useAuth} from "@clerk/clerk-react";

const InvoicesPage: React.FC = () => {
	const auth = useAuth();
	const importInvoices = async (invoices: Invoice[]) => {
		try {
			await axios.post(RequestUtil.getBaseApiUrl() + "/db/addList", invoices, RequestUtil.getDefaultRequestConfig(await auth.getToken()));
			// Map the response data to Invoice instances
			window.location.reload();
		} catch (error) {
			console.error("Error fetching page count:", error);
			alert("Import not succesful");
		}
	};

	return (
		<div id="table-container">
			<h3>Računi</h3>
			<ExcelFileInput importInvoices={importInvoices} />
			<InvoiceTable />
		</div>
	);
};

export default InvoicesPage;
