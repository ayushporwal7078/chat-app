import { Container, Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import React, {useState} from 'react';
import './Signup.css'
import Robot from '../assets/robot.avif'
import {useSignupUserMutation} from  '../services/appApi'



const SignUp = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState("");
const [name, setName] = useState('')
const [signupUser, {isLoading, error}] = useSignupUserMutation()
const [image, setImage] = useState(null)
const [uploadingImg, setUploadingImg] = useState(false)
const [imagePreview, setImagePreview] = useState(null)
const navigate = useNavigate();
const [gender, setGender] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');

const handleGenderChange = (event) => {
  setGender(event.target.value);
};



const handlePasswordChange = (event) => {
  setPassword(event.target.value);
};

const handleConfirmPasswordChange = (event) => {
  setConfirmPassword(event.target.value);
};

const passwordMatch = password === confirmPassword;

function validateImg(e){
  const file = e.target.files[0]
  if(file.size >= 1048756 ){
  return alert("Max file size is 1MB")
  }
  else{
    setImage(file)
    setImagePreview(URL.createObjectURL(file))
  }
  }
  

  
  async function uploadImage(){
      const data = new FormData();
      data.append("file", image)
      data.append('upload_preset', 'sosmcvvg')
      try{
        setUploadingImg(true);
        let res = await fetch('https://api.cloudinary.com/v1_1/dtnjbbbsb/image/upload', {  
        method : 'post',
          body: data,
        })
        const urlData = await res.json();
        setUploadingImg(false);
        return urlData.url ;
      }
      catch(error){
        setUploadingImg(false)
        console.log(error)
      }
  }
  
  async function handleSignUp(e){
       e.preventDefault();
  if(!image) return alert("Please Upload Your Profile picture")
  const url = await uploadImage(image)
  console.log(url);
  //signup the  user
 signupUser({name, email, password, gender, picture: url}).then(({data}) =>{
  if(data){
    console.log(data);
    navigate("/chat");
  }
  
 })
}

  return (
    <Container>
<Row>
    
    <Col md={7} className="d-flex align-items-center justify-content-center flex-direction-column">
    <Form style={{width : '80%', maxWidth: 500}} onSubmit={handleSignUp}>
        <h1 className='text-center'>Create Account</h1>
        <div className='signup-profile-pic_container'>
            <img src={imagePreview || Robot} alt='Hello' className='signup-profile-pic'/>
            <label htmlFor='image-upload' className='image-upload-label'>
                <i className='fas fa-plus-circle add-picture-icon'></i>
            </label>
            <input type="file" id="image-upload" hidden accept='image/png, image/jpeg' onChange={validateImg} />
        </div>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Your Name" onChange={(e)=> setName(e.target.value)} value={name}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=> setEmail(e.target.value)} value={email} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="PasswordConfirm">

      <Form.Label>Password</Form.Label>
      <Form.Control type="password" value={password} onChange={handlePasswordChange} />

        <Form.Label>Confirm Password</Form.Label>
      <Form.Control type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} isInvalid={!passwordMatch} />

      {!passwordMatch && (
        <Form.Control.Feedback type="invalid">
          Passwords do not match.
        </Form.Control.Feedback>
      )}
      </Form.Group>
   
      <Form.Group controlId="genderSelect">
      <Form.Label>Gender</Form.Label>
      <Form.Control as="select" value={gender} onChange={handleGenderChange}>
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="non-binary">Non-binary</option>
      </Form.Control>
    </Form.Group>
      <Button variant="primary" type="submit" onClick={ () =>{navigate("/chat");}}>
        {uploadingImg ? 'Signing you up...' : 'Signup'}
      </Button>
      <div className='py-4'>
      <p className='text-center'>Already have an account ?<Link to='/login'>Login</Link></p></div>
    </Form>
    </Col>
    <Col md={5} className="signup_bg"></Col>
    </Row>
    </Container>
  )
}

export default SignUp
