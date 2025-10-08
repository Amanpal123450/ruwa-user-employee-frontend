
import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";

export default function KycPortal() {
  const [verified, setVerified] = useState(false);
  const [verifyData, setVerifyData] = useState({ application_no: "", phone: "", name: "" });
  const [formData, setFormData] = useState({});

  const handleVerify = (e) => {
    e.preventDefault();
    // Mock verification
    if (verifyData.application_no && verifyData.phone && verifyData.name) {
      setVerified(true);
    } else {
      alert("Please fill all fields to verify");
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("KYC form submitted (mock)");
  };

  return (
    <Container className="my-4">
      <Card className="shadow p-4">
        {!verified ? (
          <>
            <h3 className="text-center mb-3">Application Verification</h3>
            <Form onSubmit={handleVerify}>
              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Application Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="application_no"
                      placeholder="Enter application number"
                      onChange={(e) =>
                        setVerifyData({ ...verifyData, application_no: e.target.value })
                      }
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      placeholder="Enter phone number"
                      onChange={(e) =>
                        setVerifyData({ ...verifyData, phone: e.target.value })
                      }
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Enter name"
                      onChange={(e) => setVerifyData({ ...verifyData, name: e.target.value })}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <div className="text-center">
                <Button type="submit" variant="primary">
                  Verify & Continue
                </Button>
              </div>
            </Form>
          </>
        ) : (
          <>
            <h3 className="text-center mb-3">E-Verification Form</h3>
            <Form onSubmit={handleSubmit}>
              {/* Personal Information */}
              <h5 className="mt-4 text-primary">1. Personal Information</h5>
              <Row>
                {[
                  "name",
                  "father_name",
                  "mother_name",
                  "spouse_name",
                  "address",
                  "blood_group",
                  "education",
                  "professional_folio",
                ].map((field, i) => (
                  <Col md={6} key={i}>
                    <Form.Group className="mb-3">
                      <Form.Label>{field.replace("_", " ").toUpperCase()}</Form.Label>
                      <Form.Control
                        type="text"
                        name={field}
                        onChange={handleChange}
                        placeholder={`Enter ${field.replace("_", " ")}`}
                      />
                    </Form.Group>
                  </Col>
                ))}
              </Row>

              {/* Location Details */}
              <h5 className="mt-4 text-primary">2. Location Details</h5>
              <Row>
                {[
                  "state",
                  "district",
                  "block",
                  "grampanchayat",
                  "village",
                  "ward",
                  "location_of_kendra",
                  "maps_of_kendra",
                  "east",
                  "south",
                  "west",
                  "north",
                  "area_of_kendra",
                  "length",
                  "width",
                  "height_from_ground",
                ].map((field, i) => (
                  <Col md={6} key={i}>
                    <Form.Group className="mb-3">
                      <Form.Label>{field.replace(/_/g, " ").toUpperCase()}</Form.Label>
                      <Form.Control
                        type="text"
                        name={field}
                        onChange={handleChange}
                        placeholder={`Enter ${field.replace(/_/g, " ")}`}
                      />
                    </Form.Group>
                  </Col>
                ))}
              </Row>

              {/* Environmental & Infrastructure Info */}
              <h5 className="mt-4 text-primary">3. Environmental & Infrastructure Info</h5>
              <Row>
                {[
                  "radiation_effect",
                  "cellular_tower",
                  "electricity_availability",
                  "power_backup",
                  "nearest_metro_city",
                  "nearest_railway_station",
                  "nearest_airport",
                  "nearest_dump_yard",
                  "sewerage_system",
                  "nearest_water_resources",
                  "air_pollution_index",
                  "prior_commutation_source",
                  "road_condition",
                  "road_type",
                  "weather_condition",
                ].map((field, i) => (
                  <Col md={6} key={i}>
                    <Form.Group className="mb-3">
                      <Form.Label>{field.replace(/_/g, " ").toUpperCase()}</Form.Label>
                      <Form.Control
                        type="text"
                        name={field}
                        onChange={handleChange}
                        placeholder={`Enter ${field.replace(/_/g, " ")}`}
                      />
                    </Form.Group>
                  </Col>
                ))}
              </Row>

              {/* Structural Information */}
              <h5 className="mt-4 text-primary">4. Structural Information</h5>
              <Row>
                {[
                  "structure_of_kendra",
                  "floor",
                  "front_profile",
                  "right_profile",
                  "left_profile",
                  "top_profile",
                  "surface_profile",
                  "interiors",
                  "add_for_all_space",
                  "video_clip",
                ].map((field, i) => (
                  <Col md={6} key={i}>
                    <Form.Group className="mb-3">
                      <Form.Label>{field.replace(/_/g, " ").toUpperCase()}</Form.Label>
                      <Form.Control
                        type="text"
                        name={field}
                        onChange={handleChange}
                        placeholder={`Enter ${field.replace(/_/g, " ")}`}
                      />
                    </Form.Group>
                  </Col>
                ))}
              </Row>

              {/* Document Details */}
              <h5 className="mt-4 text-primary">5. Document Details</h5>
              <Row>
                {[
                  "annual_income",
                  "uid",
                  "pan",
                  "bank_passbook",
                  "domicile_certificate",
                  "noc_property",
                  "deed_agreement",
                  "name_of_successor",
                ].map((field, i) => (
                  <Col md={6} key={i}>
                    <Form.Group className="mb-3">
                      <Form.Label>{field.replace(/_/g, " ").toUpperCase()}</Form.Label>
                      <Form.Control
                        type="text"
                        name={field}
                        onChange={handleChange}
                        placeholder={`Enter ${field.replace(/_/g, " ")}`}
                      />
                    </Form.Group>
                  </Col>
                ))}
              </Row>

              {/* Contact & Family Information */}
              <h5 className="mt-4 text-primary">6. Contact & Family Information</h5>
              <Row>
                {[
                  "mobile1",
                  "mobile2",
                  "family_details",
                  "no_of_dependents",
                  "email",
                ].map((field, i) => (
                  <Col md={6} key={i}>
                    <Form.Group className="mb-3">
                      <Form.Label>{field.replace(/_/g, " ").toUpperCase()}</Form.Label>
                      <Form.Control
                        type="text"
                        name={field}
                        onChange={handleChange}
                        placeholder={`Enter ${field.replace(/_/g, " ")}`}
                      />
                    </Form.Group>
                  </Col>
                ))}
              </Row>

              <div className="text-center mt-4">
                <Button type="submit" variant="success">
                  Submit KYC Form
                </Button>
              </div>
            </Form>
          </>
        )}
      </Card>
    </Container>
  );
}
