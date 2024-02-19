import React, { useState } from 'react';
import { Grid, TextField, Container, TableRow, TableHead, TableCell, Paper, Button, FormControl, InputLabel, Select, MenuItem, Table } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import UseLoader from '../components/loader/UseLoader';
import Swal from 'sweetalert2';
import ApiCall from '../components/apiCollection/ApiCall';
import axios from "axios";

const AddNewEmployee = () => {
  const [loader, showLoader, hideLoader] = UseLoader();
  const [formData, setFormData] = useState({
    designation: '',
    joinDate: null,
    email: '',
    phoneNumber: '',
    firstName: '',
    middleName: '',
    lastName: '',
    fatherName: '',
    motherName: '',
    dob: null,
    nid: '',
    genderId: '',
    image: '',
    base64: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'image') {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData({ ...formData, [name]: value, base64: reader.result });
      };
    }
    else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDateChange = (date, field) => {
    setFormData({ ...formData, [field]: date.toISOString() });
  };

  async function handleSubmit(e) {
    showLoader();
    e.preventDefault();
    // console.log(formData);
    try {
      const response = await axios.post(`${ApiCall.baseUrl}Employee/create`, formData);

      if (response.data) {



        hideLoader();
        navigate("/admin");
      }

    } catch (error) {
      // <SnackMessage msg={error} isErrorOccured={true}/>
      console.log(error)
      hideLoader();
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "",
      });
    }
  };

  return (
    <>
      <Container>
        <Paper sx={{ p: 3, mt: 3 }}>
          <Table >
            <TableHead>
              <TableRow >
                <TableCell sx={{ fontSize: 32, fontWeight: 'bold', borderBottom: "3px solid  #CC080B" }} align="left" colSpan={12}>
                  Add Employee
                </TableCell>
              </TableRow>

            </TableHead>
          </Table>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={{ paddingTop: '20px' }}>
              {/* First Row */}
              <Grid item xs={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Middle Name"
                      name="middleName"
                      value={formData.middleName}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* Image Picker */}
              <Grid item xs={4}>
                <div style={{ border: '1px dashed #ccc', padding: '20px', textAlign: 'center', height: "100%" }}>
                  <input type="file" accept="image/*" name="image" onChange={handleChange} />
                </div>
              </Grid>

              {/* Second Row */}

              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Spouse Name"
                  name="spouseName"
                  value={formData.spouseName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Father Name"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Mother Name"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleChange}
                  required
                />
              </Grid>

              {/* Third Row */}

              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </Grid>
              {/* Fourth Row */}
              <Grid item xs={3} >
                <FormControl fullWidth sx={{ paddingTop: '8px' }}>
                  <InputLabel >Gender</InputLabel>
                  <Select
                    value={formData.genderId}
                    onChange={handleChange}
                    name="genderId"
                    required
                    label="Gender"


                  >
                    <MenuItem value={0}>Male</MenuItem>
                    <MenuItem value={1}>Female</MenuItem>
                    <MenuItem value={2}>Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                  <DemoContainer components={['DatePicker']} >
                    <DatePicker
                      label="Date of Birth"
                      value={formData.dateOfBirth}
                      onChange={(date) => handleDateChange(date, 'dob')}
                      textField={<TextField fullWidth />}
                    />


                  </DemoContainer>
                </LocalizationProvider>

              </Grid>
              <Grid item xs={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                  <DemoContainer components={['DatePicker']} >
                    <DatePicker
                      label="Date of Join"
                      value={formData.joinDate}
                      onChange={(date) => handleDateChange(date, 'joinDate')}
                      textField={<TextField fullWidth />}
                    />
                  </DemoContainer>
                </LocalizationProvider>

              </Grid>
              <Grid item xs={3} >
                <TextField
                  fullWidth
                  sx={{ paddingTop: '8px' }}
                  label="NID"
                  name="nid"
                  value={formData.nid}
                  onChange={handleChange}
                />
              </Grid>
              {/* Fifth Row */}
              <Grid item xs={12} sx={{ paddingBottom: '10px' }}>
                <Button type="submit" fullWidth variant="outlined" sx={{
                  color: "white",
                  backgroundColor: '#CC080b',
                  border: "2px solid #CC080B",
                  fontSize: "14px",
                  paddingTop: '10px',
                  paddingBottom: '10px',
                  fontWeight: 'bold',
                  "&:hover": {
                    color: "white",
                    backgroundColor: '#CC080b',
                    border: "2px solid #CC080B",
                  },
                }}>Submit</Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>

      {loader}
    </>

  );
};

export default AddNewEmployee;

