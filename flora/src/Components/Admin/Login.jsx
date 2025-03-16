import { useState, useEffect } from "react";
import { signInWithPopup, signOut, updateProfile } from "firebase/auth"; 
import { auth, provider } from "./firebase";
import { FaRegUserCircle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { RiExchange2Fill, RiLogoutCircleLine } from "react-icons/ri";
import { MdAdminPanelSettings } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { Dropdown, Image, Form, Button, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; 
import Nav from 'react-bootstrap/Nav';

const Login = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [showNameModal, setShowNameModal] = useState(false); // Toggle for name change modal
  const [newDisplayName, setNewDisplayName] = useState(''); // Store new name input
  const navigate = useNavigate(); 

  const googleLogIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUserInfo(user); 
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  };

  const fetchDataUser = async () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserInfo(user); 
      } else {
        setUserInfo(null); 
      }
    });
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUserInfo(null); 
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  const handleSignInWithAnotherEmail = async () => {
    try {
      await signOut(auth); 
      await googleLogIn(); 
    } catch (error) {
      console.error("Error signing in with another email: ", error);
    }
  };

  const handleChangeUsername = () => {
    setShowNameModal(true); // Show the modal when clicking "Change Name"
  };

  const handleSaveNewName = async () => {
    try {
      await updateProfile(auth.currentUser, { displayName: newDisplayName });
      setUserInfo((prevInfo) => ({
        ...prevInfo,
        displayName: newDisplayName,
      }));
      setShowNameModal(false); // Hide the modal after saving
    } catch (error) {
      console.error("Error updating display name:", error);
    }
  };

  useEffect(() => {
    fetchDataUser(); 
  }, []);

  return (
    <div>
      <Dropdown> 
        <Dropdown.Toggle variant="light" id="dropdown-basic" className="d-flex align-items-center">
          {userInfo ? (
            <Image src={userInfo.photoURL} alt="Avatar" roundedCircle width={30} height={30} />
          ) : (
            <FaRegUserCircle size={25} />
          )}
        </Dropdown.Toggle>

        <Dropdown.Menu align="end">
          {userInfo ? (
            <>
              <Dropdown.Item className="d-flex align-items-center">
                <Image src={userInfo.photoURL} alt="User Avatar" roundedCircle width={40} height={40} className="me-2" />
                <div>
                  <p className="font-weight-bold mb-0">{userInfo.displayName}</p>
                  <small className="text-muted">{userInfo.email}</small>
                </div>
              </Dropdown.Item>

              <Dropdown.Item className="d-flex align-items-center" >
                <MdAdminPanelSettings className="me-2" size={20} /><Nav.Link as={Link} to="/admin">Admin</Nav.Link>
              </Dropdown.Item>

              <Dropdown.Item className="d-flex align-items-center" onClick={handleChangeUsername}>
                <MdEdit className="me-2" size={20} /> Change Name
              </Dropdown.Item>

              <Dropdown.Item className="d-flex align-items-center" onClick={handleSignInWithAnotherEmail}>
                <RiExchange2Fill className="me-2" size={20} /> Sign in with another email
              </Dropdown.Item>

              <Dropdown.Item className="d-flex align-items-center" onClick={handleLogout}>
                <RiLogoutCircleLine className="me-2" size={20} /> Logout
              </Dropdown.Item>
            </>
          ) : (
            <Dropdown.Item className="d-flex align-items-center" onClick={googleLogIn}>
              <FcGoogle className="me-2" size={25} /> Sign in with Google
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>

      {/* Modal for changing name */}
      <Modal show={showNameModal} onHide={() => setShowNameModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formNewDisplayName">
            <Form.Label>New Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter new name"
              value={newDisplayName}
              onChange={(e) => setNewDisplayName(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNameModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveNewName}>
            Save Name
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Login;
