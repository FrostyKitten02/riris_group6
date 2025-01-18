import { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import {RequestUtil} from "../../../utils/RequestUtil";
import {useAuth} from "@clerk/clerk-react";
import axios from "axios";

function AddInvoiceForm() {
    const auth = useAuth();
    const [formData, setFormData] = useState({
        user: "",
        name: "",
        amount: 0,
        date: "",
        dueDate: "",
        payer: "",
        statusSent: "",
        statusPaid: "",
    });

    // Handle input changes
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log('Submitted form data:', formData);
        saveInvoice().then(() => {
            setFormData({
                user: "",
                name: "",
                amount: 0,
                date: "",
                dueDate: "",
                payer: "",
                statusSent: "",
                statusPaid: "",
            });
        }).catch((e) => {
            console.log("Error saving ", e)
        })
    };

    async function saveInvoice() {
        return await axios.post(RequestUtil.getBaseApiUrl() + "/db/add", formData, RequestUtil.getDefaultRequestConfig(await auth.getToken()));
    }

    // return (<>aaaa</>)

    return (
        <Container className="mt-4">
            <h2 className="mb-4">Dodaj račun</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="uporabnik">
                    <Form.Label>Uporabnik</Form.Label>
                    <Form.Control
                        type="text"
                        name="user"
                        value={formData.user}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="znesek">
                    <Form.Label>Znesek</Form.Label>
                    <Form.Control
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        step="0.01"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="datumPlacila">
                    <Form.Label>Datum plačila</Form.Label>
                    <Form.Control
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="rokPlacila">
                    <Form.Label>Rok plačila</Form.Label>
                    <Form.Control
                        type="date"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="placnik">
                    <Form.Label>Plačnik</Form.Label>
                    <Form.Control
                        type="text"
                        name="payer"
                        value={formData.payer}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="poslano">
                    <Form.Label>Poslano?</Form.Label>
                    <Form.Select
                        name="statusSent"
                        value={formData.statusSent}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Izberi...</option>
                        <option value="true">Poslano</option>
                        <option value="false">Ne poslano</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="placano">
                    <Form.Label>Plačano?</Form.Label>
                    <Form.Select
                        name="statusPaid"
                        value={formData.statusPaid}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Izberi...</option>
                        <option value="true">Plačano</option>
                        <option value="false">Ne plačano</option>
                    </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Dodaj račun
                </Button>
            </Form>
        </Container>
    );
}

export default AddInvoiceForm;
