import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import {
	faTrash,
	faFile,
	faCaretLeft,
	faCaretRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./InvoiceTable.css";
import PageSelectModal from "./PageSelectModal";
import axios from "axios";

const InvoiceTable = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [pages, setPages] = useState([1, 2, 5, 6]);
	const [data, setInvoices] = useState({
		id: 1,
		user: "vk",
		name: "Račun 1",
		amount: 500,
		date: new Date(),
		dueDate: new Date("2021-01-01"),
		payer: "UM FERI",
		statusSent: true,
		statusPaid: false,
	});
	const [showModal, setShowModal] = useState(false);

	const invoices = [
		{
			id: 1,
			user: "vk",
			name: "Račun 1",
			amount: 500,
			date: new Date(),
			dueDate: new Date("2021-01-01"),
			payer: "UM FERI",
			statusSent: true,
			statusPaid: false,
		},
		{
			id: 1,
			user: "vk",
			name: "Račun 2",
			amount: 500,
			date: new Date(),
			dueDate: new Date("2021-01-01"),
			payer: "UM FERI",
			statusSent: true,
			statusPaid: false,
		},
		{
			id: 1,
			user: "vk",
			name: "Račun 3",
			amount: 500,
			date: new Date(),
			dueDate: new Date("2021-01-01"),
			payer: "UM FERI",
			statusSent: true,
			statusPaid: false,
		},
		{
			id: 1,
			user: "vk",
			name: "Račun 4",
			amount: 500,
			date: new Date(),
			dueDate: new Date("2021-01-01"),
			payer: "UM FERI",
			statusSent: true,
			statusPaid: false,
		},
		{
			id: 1,
			user: "vk",
			name: "Račun 5",
			amount: 500,
			date: new Date(),
			dueDate: new Date("2021-01-01"),
			payer: "UM FERI",
			statusSent: true,
			statusPaid: false,
		},
		{
			id: 1,
			user: "vk",
			name: "Račun 6",
			amount: 500,
			date: new Date(),
			dueDate: new Date("2021-01-01"),
			payer: "UM FERI",
			statusSent: true,
			statusPaid: false,
		},
	];

	useEffect(() => {
		//call
		const func = async () => {
			const d = await axios.get("/api/db/all");
			console.log(d);

			setTotalPages(6);

			refreshData(1);
		};

		func();
	}, []);

	const onPageClicked = (page: number) => {
		setCurrentPage(page);
		refreshData(page);
	};

	const decreasePage = () => {
		if (currentPage > 1) setCurrentPage(currentPage - 1);
		refreshData(currentPage - 1);
	};

	const increasePage = () => {
		if (currentPage < totalPages) setCurrentPage(currentPage + 1);
		refreshData(currentPage + 1);
	};

	const refreshData = async (page: number) => {
		setInvoices(invoices[page - 1]);
	};

	const closeModal = () => {
		setShowModal(false);
	};

	return (
		<>
			{invoices !== null ? (
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>ID</th>
							<th>Naziv</th>
							<th>Znesek</th>
							<th>Datum izdaje</th>
							<th>Rok plačila</th>
							<th>Plačnik</th>
							<th>Status</th>
							<th>&nbsp;</th>
						</tr>
					</thead>
					<tbody>
						{Array.from({ length: 25 }).map((_, index) => (
							<tr>
								<td>{(index + 1) * currentPage}</td>
								<td>{data.name}</td>
								<td>{data.amount} €</td>
								<td>{data.date.toLocaleDateString()}</td>
								<td
									className={
										data.dueDate > data.date
											? "text-green"
											: "text-red"
									}
								>
									{data.dueDate.toLocaleDateString()}
								</td>
								<td>{data.payer}</td>
								<td>
									<span
										className={
											"status-tag " +
											(data.statusSent
												? "text-green"
												: "text-red")
										}
									>
										{data.statusSent
											? "Poslano"
											: "Neposlano"}
									</span>
									<span
										className={
											data.statusPaid
												? "text-green"
												: "text-red"
										}
									>
										{data.statusPaid
											? "Plačano"
											: "Neplačano"}
									</span>
								</td>
								<td id="table-button-container">
									<Button variant="primary" size="sm">
										<FontAwesomeIcon icon={faFile} />
									</Button>
									<Button variant="danger" size="sm">
										<FontAwesomeIcon icon={faTrash} />
									</Button>
								</td>
							</tr>
						))}
					</tbody>
					<tfoot>
						<tr>
							<td colSpan={8}>
								<div id="pager-container">
									<div id="pager">
										<div
											className="pager-element pager-arrow-left"
											onClick={() => decreasePage()}
										>
											<FontAwesomeIcon
												icon={faCaretLeft}
											/>
										</div>
										<div
											className={
												"pager-element pager-start" +
												(pages[0] == currentPage
													? " bold bg-blue text-white"
													: "")
											}
											onClick={() =>
												onPageClicked(pages[0])
											}
										>
											{pages[0]}
										</div>
										<div
											className={
												"pager-element" +
												(pages[1] == currentPage
													? " bold bold bg-blue text-white"
													: "")
											}
											onClick={() =>
												onPageClicked(pages[1])
											}
										>
											{pages[1]}
										</div>
										{currentPage > 2 &&
										currentPage < totalPages - 1 ? (
											<div
												className="pager-element bold bold bg-blue text-white"
												onClick={() =>
													setShowModal(true)
												}
											>
												{currentPage}
											</div>
										) : (
											<div
												className="pager-element pager-middle"
												onClick={() =>
													setShowModal(true)
												}
											>
												...
											</div>
										)}
										<div
											className={
												"pager-element" +
												(pages[2] == currentPage
													? " bold bold bg-blue text-white"
													: "")
											}
											onClick={() =>
												onPageClicked(pages[2])
											}
										>
											{pages[2]}
										</div>
										<div
											className={
												"pager-element pager-end" +
												(pages[3] == currentPage
													? " bold bold bg-blue text-white"
													: "")
											}
											onClick={() =>
												onPageClicked(pages[3])
											}
										>
											{pages[3]}
										</div>
										<div
											className="pager-element pager-arrow-right"
											onClick={() => increasePage()}
										>
											<FontAwesomeIcon
												icon={faCaretRight}
											/>
										</div>
									</div>
								</div>
							</td>
						</tr>
					</tfoot>
				</Table>
			) : (
				<h2>No invoices</h2>
			)}
			<PageSelectModal
				setPage={setCurrentPage}
				showModal={showModal}
				onCloseModal={closeModal}
			/>
		</>
	);
};

export default InvoiceTable;
