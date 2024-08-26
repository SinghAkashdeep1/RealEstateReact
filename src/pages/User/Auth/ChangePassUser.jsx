import React ,{useState, useEffect } from "react";
import { Container, FormLabel } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import { MdAttachEmail } from "react-icons/md";
import { PiPassword } from "react-icons/pi";
import { PiPasswordFill } from "react-icons/pi";
import { useDispatch , useSelector} from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { userResetPasswordPost } from '../../../userStore/authApi/userAuthSlices';
import {  toast } from 'react-toastify';

const ChangePassUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  console.log("token",token);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password_confirmation: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log('Form submitted:', formData);

    dispatch(userResetPasswordPost({token:token, email:formData.email, password:formData.password,password_confirmation:formData.password_confirmation} ))
      .then(response => {
        console.log('response', response)
        if (response.payload.code === 200) {
          navigate("/login");
          toast.success('Password reset successfully')

        } else {
          console.error('Error adding user:', response);
          toast.error('Something went wrong!')

        }
      })
      .catch(error => {
        console.error('Error adding user:', error);
        toast.error('Something went wrong!')

      });
  };
  return (
    <>
    <Container className="d-flex justify-content-center align-items-center h-100 ">
      <Row>
        <Col>
          <h1 className="text-center mb-4">Reset Password</h1>
          <Form className="shadow-lg p-4" onSubmit={handleSubmit}>
          <FormLabel className="text-dark p-2 fw-semibold">E-Mail Address </FormLabel>
            <Form.Group className="mb-2 d-flex align-items-center" controlId="formGroupEmail">
              <Form.Control
                className="rounded-start-pill p-2 me-2"
                type="email"
                name ="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="email..."
              />
              <MdAttachEmail size={45} />      
        </Form.Group>
        <FormLabel className="text-dark p-2 fw-semibold">New Password </FormLabel>
            <Form.Group className="mb-2 d-flex align-items-center" controlId="formGroupEmail">
              <Form.Control
                className="rounded-start-pill p-2 me-2"
                type="password"
                name = "password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="enter new password..."
              />
              <PiPassword size={45} /> 
        </Form.Group>
        <FormLabel className="text-dark p-2 fw-semibold">Confirm Password </FormLabel>
            <Form.Group className="mb-2 d-flex align-items-center" controlId="formGroupEmail">
              <Form.Control
                className="rounded-start-pill p-2 me-2"
                type="password"
                name ="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleInputChange}
                placeholder="re-enter password..."
              />
              <PiPasswordFill size={45} />      
        </Form.Group>
            <Button type="submit" className="border border-0 rounded-top w-100 bg-success mb-2 mt-2">
          Reset Password
            </Button>
          </Form>
          </Col>
        </Row>
      </Container>
   </>
  )
}

export default ChangePassUser
