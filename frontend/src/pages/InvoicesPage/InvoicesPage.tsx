import React from "react";
import "./InvoicesPage.css";
import InvoiceTable from "./Table/InvoiceTable";
import ExcelFileInput from "./ExcelImporter/ExcelImporter";
import axios from "axios";
import { Invoice } from "../../classes/Invoice";
import {RequestUtil} from "../../utils/RequestUtil";
import {useAuth} from "@clerk/clerk-react";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

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


	async function getInvoices(): Promise<Invoice[] | null> {
		try {
			const response = await axios.get(RequestUtil.getBaseApiUrl() + "/db/all", RequestUtil.getDefaultRequestConfig(await auth.getToken()));
			// Map the response data to Invoice instances
			const invoiceData: Invoice[] = response.data.map((data: any) =>
				Invoice.fromJSON(data)
			);
			return invoiceData;
		} catch (error) {
			console.error("Error fetching invoices:", error);
			return null;
		}
	}

	return (
		<div id="table-container">
			<h3>Računi</h3>
			<div className="container">
				<div className="d-flex flex-row" style={{height: "30px"}}>
					<Link to="/invoices/add">
						<Button variant="primary" size="sm">
							Dodaj
						</Button>
					</Link>
					<Button variant="primary" size="sm" onClick={() => {
						getInvoices()
							.then(i => {
								if (i == null) {
									return
								}

								const jsonString = JSON.stringify(i, null, 2);
								const blob = new Blob([jsonString], { type: 'application/json' });
								const url = URL.createObjectURL(blob);

								const a = document.createElement('a');
								a.href = url;
								a.download = "invoice_export";
								document.body.appendChild(a);

								a.click();

								document.body.removeChild(a);
								URL.revokeObjectURL(url);
							})
					}}>
						Izvozi
					</Button>
					<ExcelFileInput importInvoices={importInvoices} />
				</div>
			</div>
			<InvoiceTable />
		</div>
	);
};

export default InvoicesPage;
