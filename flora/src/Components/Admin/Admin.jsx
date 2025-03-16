import React, { useState, useEffect } from 'react';
import { Col, Container, Image, Modal, Row, Table, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { FaStar, FaTrashAlt } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { FaCirclePlus } from "react-icons/fa6";
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { IoRibbonSharp } from 'react-icons/io5';
import { ThreeDot } from 'react-loading-indicators';

export default function Admin() {
    const [api, setAPI] = useState([]);
    const [showModal, setShowModal] = useState(false); // Used for both Add and Edit modals
    const [isEdit, setIsEdit] = useState(false); // Track if it's in "Edit" mode
    const [currentOrchid, setCurrentOrchid] = useState(null); // Holds the orchid data for editing
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false); // Disable the save button during submission

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const baseURL = `https://670a1768af1a3998baa302a2.mockapi.io/LAB-REACT`;
    const fetchAPI = () => {
        fetch(baseURL + '?sortBy=id&order=desc')
            .then(resp => resp.json())
            .then(data => setAPI(data))
            .catch(err => console.error(err));
    };
    useEffect(() => {
        fetchAPI();
    }, []);
    const handleDelete = (id) => {
        fetch(baseURL + '/' + id, { method: 'DELETE' })
            .then(() => {
                fetchAPI();
                toast.success('Deleted successfully!');
            });
    };

    const handleShowModal = (orchid = null) => {
        setIsEdit(!!orchid);
        setCurrentOrchid(orchid);
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    const handleSave = (id, orchidData) => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        const method = isEdit ? 'PUT' : 'POST';
        const url = isEdit ? `${baseURL}/${id}` : baseURL;

        fetch(url, {
            method: method,
            body: JSON.stringify(orchidData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                fetchAPI();
                toast.success(isEdit ? 'Updated successfully!' : 'Created successfully!');
                handleCloseModal();
                setIsSubmitting(false);
            })
            .catch(err => {
                console.error('Error saving:', err);
                toast.error('Failed to save!');
                setIsSubmitting(false);
            });
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: currentOrchid?.name || '',
            rating: currentOrchid?.rating || '',
            color: currentOrchid?.color || '',
            origin: currentOrchid?.origin || '',
            video: currentOrchid?.video || '',
            isSpecial: currentOrchid?.isSpecial || false,
            image: currentOrchid?.image || '',
            category: currentOrchid?.category || ''
        },
        onSubmit: (values) => {
            handleSave(currentOrchid?.id, values);
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Required.").min(2, "Must be 2 characters or more").max(64),
            image: Yup.string().required("Required.").min(2, "Must be 2 characters or more"),
            rating: Yup.number().required("Required.").min(1, "Must be a number between 1 and 5").max(5),
            color: Yup.string()
                .required("Required.")
                .matches(/^[a-z]+$/, "Must only contain lowercase letters (e.g red)"),
            origin: Yup.string()
                .required("Required.")
                .matches(/^[A-Z][a-z]+$/, "First word capitalized (e.g Vietnam)"),

            video: Yup.string().required("Required.").url("Must be a valid URL"),
        })
    });

    return (
        <Container>
            <Row className='py-5'>
                <ToastContainer />

                {/* Modal for Add and Edit Orchid */}
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{isEdit ? 'Edit Orchid' : 'Add Orchid'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={formik.handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Orchid name"
                                    name='name'
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Rating</Form.Label>
                                <Form.Select
                                    name="rating"
                                    value={formik.values.rating}
                                    onChange={formik.handleChange}
                                >
                                    <option value="1">1 </option>
                                    <option value="2">2 </option>
                                    <option value="3">3 </option>
                                    <option value="4">4 </option>
                                    <option value="5">5 </option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Color</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Color"
                                    name='color'
                                    value={formik.values.color}
                                    onChange={formik.handleChange}
                                    isInvalid={!!formik.errors.color && formik.touched.color} 
                                />
                                {formik.errors.color && formik.touched.color && (
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.color}
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Origin</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Origin (e.g., Viet Nam)"
                                    name='origin'
                                    value={formik.values.origin}
                                    onChange={formik.handleChange}
                                    isInvalid={!!formik.errors.origin && formik.touched.origin}
                                />
                                {formik.errors.origin && formik.touched.origin && (
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.origin}
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group>



                            <Form.Group className="mb-3">
                                <Form.Label>Video URL</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Video URL"
                                    name='video'
                                    value={formik.values.video}
                                    onChange={formik.handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Image URL"
                                    name='image'
                                    value={formik.values.image}
                                    onChange={formik.handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Category</Form.Label>
                                <Form.Select
                                    name='category'
                                    value={formik.values.category}
                                    onChange={formik.handleChange}
                                >
                                    <option value="Dendrobium">Dendrobium</option>
                                    <option value="Brassavola">Brassavola</option>
                                    <option value="Cattleya">Cattleya</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Special Orchid"
                                    name='isSpecial'
                                    checked={formik.values.isSpecial}
                                    onChange={formik.handleChange}
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>

                {/* Orchids Table */}
                {loading ? (
                    <div className='d-flex justify-content-center align-items-center'>
                        <ThreeDot variant="bounce" color="#3137cc" size="medium" text="" textColor="" />
                    </div>
                ) : (
                    <Col>
                        <h1 className='text-center'>Table of Orchids</h1>
                        {/* Responsive Table */}
                        <Table striped bordered hover className='text-center' responsive="sm">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Rating</th>
                                    <th>Color</th>
                                    <th>Origin</th>
                                    <th>Video</th>
                                    <th>Category</th>
                                    <th>Special</th>
                                    <th>Actions <FaCirclePlus className='text-success' onClick={() => handleShowModal()} /></th>
                                </tr>
                            </thead>
                            <tbody className='align-items-center'>
                                {api.map((orchid) => (
                                    <tr key={orchid.id}>
                                        <td>
                                            <Image src={orchid.image} width={60} className="img-fluid" />
                                        </td>
                                        <td>{orchid.name}</td>
                                        <td>{orchid.rating} <FaStar style={{ color: 'orange' }} /></td>
                                        <td >
                                            <div
                                                style={{
                                                    backgroundColor: orchid.color,
                                                    width: '20px',
                                                    height: '20px',
                                                    border: '1px solid #000',
                                                    textAlign: 'center'
                                                }}>
                                            </div>
                                        </td>
                                        <td>{orchid.origin}</td>
                                        <td><a href={orchid.video} target='_blank' rel="noreferrer">Video</a></td>
                                        <td>{orchid.category}</td>
                                        <td>{orchid.isSpecial && <IoRibbonSharp style={{ color: 'red' }} />}</td>
                                        <td>
                                            <MdEditSquare className='text-info me-2' onClick={() =>{if (confirm('Do you wanna edit?'))  handleShowModal(orchid)}} />
                                            <FaTrashAlt className='text-danger' onClick={() =>{if (confirm('Do you wanna delete?'))  handleDelete(orchid.id)}} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                )}
            </Row>
        </Container>
    );
}
